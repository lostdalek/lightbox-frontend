
    'use strict';

    interface IPeriodConfig {
        id: string;
        global: boolean;
        initDateStart?: any;
        initDateEnd?: any;
    }

    export interface IPeriod {
        id: string;
        global: boolean;
        dateRange: any;
        initDateStart?: any;
        initDateEnd?: any;
        getDateRange: Function;
        getIsoDateRange: Function;
    }


    export class Period implements IPeriod {
        public id: string;
        public global: boolean;
        public dateRange = {
            dateStart: '',
            dateEnd: ''
        };
        public initDateStart = null;
        public initDateEnd = null;
        public onChangeCallback: Function;


        /** @ngInject */
        constructor( id: string, global: boolean, onChangeCallback: Function) {
            this.id = id;
            this.global = global;
            this.onChangeCallback = onChangeCallback;
        }

        // only accept timestamp
        /**
         * Register dateRange
         * dates should be provided as timestamp
         * @param dateStart
         * @param dateEnd
         */
        public initDateRange(dateStart: any, dateEnd: any) {

            this.dateRange = {
                dateStart: dateStart, // moment(dateStart).format('x'),
                dateEnd: dateEnd // moment(dateEnd).format('x')
            };
        }

        /**
         * Update Date Range - Angular UI datePicker require JSDate
         * dates should be provided as Date Object
         * @param dateStart
         * @param dateEnd
         * @param silent
         */
        public setDateRange(dateStart: any, dateEnd: any, silent: boolean = false) {
            this.dateRange = {
                dateStart: moment(dateStart).format('x'),
                dateEnd: moment(dateEnd).format('x')
            };
            // invoke callback function onChangeEvent
            if (!silent) {
                this.onChangeCallback(this);
            }

        }

        /**
         * Date Picker Output
         * @returns {{dateStart: string, dateEnd: string}}
         */
        public getDateRange() {
            var ds = this.dateRange.dateStart === '' ? '' : new Date(parseInt(this.dateRange.dateStart, 10));
            var de = this.dateRange.dateEnd === '' ? '' : new Date(parseInt(this.dateRange.dateEnd, 10));

            return {
                dateStart: ds,
                dateEnd: de
            };
        }

        /**
         * Standard Output: ISO Date for api
         * @returns {{from: string, to: string}}
         */
        public getIsoDateRange() {
            return {
                from: moment(new Date(parseInt(this.dateRange.dateStart, 10))).format('YYYY-MM-DD') + 'T00:00:00Z',
                to: moment(new Date(parseInt(this.dateRange.dateEnd, 10))).format('YYYY-MM-DD') + 'T23:59:59Z'
            };
        }

    }

    export class PeriodSelectorService {
        protected periodCollection = {};
        protected storage: any;
        protected localStorageService: any;
        private storageNamespace = 'psInstances';
        private initialized = false;

        /** @ngInject */
        constructor(localStorageService: any) {
            this.storage = localStorageService;
            this.initStorage();
        }

        /**
         * Attach a new Period instance or refresh if already exists in local storage
         * @param config
         * @returns {any}
         */
        public addPeriod(config: IPeriodConfig): IPeriod {
            this.initStorage();

            var period = new Period(
                config.id,
                config.global,
                (self: Period) => {
                    // callback func on date range change:
                    this.onPeriodChange(config.id, self);
                });
            // watch if exists in local storage
            if ( !(this.periodCollection[config.id] instanceof Period) ) {
                // if there is something usable in localstorage
                if ( this.periodCollection[config.id] !== undefined ) {
                    var origDateRange = this.periodCollection[config.id].dateRange;
                    // keep it silent
                    period.initDateRange(origDateRange.dateStart, origDateRange.dateEnd);
                } else {
                    // nothing is initialized - let's put a default date range (last month):
                    var currentMonth = moment().subtract(1, 'month');
                    period.initDateRange(parseInt(currentMonth.format('x'), 10), parseInt(moment().format('x'), 10));

                }
            } else {
                // repopulate:
                period.initDateRange(this.periodCollection[config.id].dateRange.dateStart, this.periodCollection[config.id].dateRange.dateEnd);

            }
            return this.onPeriodChange(config.id, period );
        }

        protected onPeriodChange(periodKey: string, periodInstance: Period) {
            this.periodCollection[periodKey] = periodInstance;
            this.storage.set(this.storageNamespace, this.periodCollection);

            return periodInstance;
        }

        protected initStorage() {
            if ( !this.initialized ) {
                this.initialized = true;
                var localPsInstances = this.storage.get(this.storageNamespace);
                if ( localPsInstances === null ) {
                    this.storage.set(this.storageNamespace, {});
                }
                this.periodCollection = this.storage.get(this.storageNamespace);
                return this.periodCollection;
            }

        }

    }

    import {getModule} from '../../../app.module';      getModule()
        .service('PeriodSelectorService', PeriodSelectorService);

