import {Period} from 'periodSelector.service';

    'use strict';

    export interface IPeriodSelectorScope extends ng.IScope {
        initDateStart: any;
        initDateEnd: any;
    }

    export class PeriodSelectorLink {
        /*constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IPeriodSelectorScope) {
        }*/
    }

    export class PeriodSelectorController {
        public initDateStart: any;
        public initDateEnd: any;
        public period: any;
        public rangeIsValid = false;
        protected today: any;
        protected openedStart = false;
        protected openedEnd = false;
        protected isolatedDateStart: any;
        protected isolatedDateEnd: any;
        protected dateFormat = 'dd/MM/yyyy';
        protected dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            'show-weeks': false,
            initDate: new Date()
        };

        /** @ngInject */
        constructor($element: JQuery, $scope: IPeriodSelectorScope, _: _.LoDashStatic, moment: moment.MomentStatic) {

            $scope.$watch( () => {
                return this.isolatedDateStart;
            }, (newVal: any) => {
                this.validateDates();
            });
            $scope.$watch( () => {
                return this.isolatedDateEnd;
            }, (newVal: any) => {
                this.validateDates();
            });

            if ( !(this.period instanceof Period) ) {
                throw new Error('period should be a <object>Period');
            }

            // check if period instance has already a date Range:

            var dr = this.period.getDateRange();

            if (dr.dateStart !== undefined && dr.dateEnd !== undefined && dr.dateStart !== '' && dr.dateEnd !== '') {
                this.isolatedDateStart = angular.copy(dr.dateStart);
                this.isolatedDateEnd = angular.copy(dr.dateEnd);
            } else {
                // else init with default values

                if (this.initDateStart === undefined) {
                    var currentMonth = moment().subtract(1, 'month');

                    this.isolatedDateStart = new Date(parseInt(currentMonth.format('x'), 10));
                } else {
                    this.isolatedDateStart = angular.copy(this.initDateStart);
                }
                if (this.initDateEnd === undefined) {
                    this.isolatedDateEnd = new Date();
                } else {
                    this.isolatedDateEnd = angular.copy(this.initDateEnd);
                }

                this.period.setDateRange(this.isolatedDateStart, this.isolatedDateEnd);
            }

            this.today = new Date();
            this.validateDates();
        }

        /**
         * validate date range
         */

        public validateDates() {

            if (moment(this.isolatedDateStart).format('x') <= moment(this.isolatedDateEnd).format('x')) {
                this.rangeIsValid = true;
            } else {
                this.rangeIsValid = false;
            }
        }

        /**
         * Open dateStart calendar
         * @param $event
         */

        public openStart($event: any) {
            $event.preventDefault();
            $event.stopPropagation();

            this.openedStart = true;
        }

        /**
         * Open dateEnd calendar
         * @param $event
         */

        public openEnd($event: any) {
            $event.preventDefault();
            $event.stopPropagation();

            this.openedEnd = true;
        }

        /**
         * set new date Range to Period Object
         * @param $event
         */

        public submit($event: any) {
            $event.preventDefault();
            $event.stopPropagation();
            this.period.setDateRange(this.isolatedDateStart, this.isolatedDateEnd);
        }
    }

    import {getModule} from '../../../app.module';      getModule()
        .directive('alchemyPeriodSelector', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                bindToController: true,
                controllerAs: 'period',
                scope: {
                    initDateStart: '@',
                    initDateEnd: '@',
                    period: '='
                },
                templateUrl: 'app/components/ui/periodSelector/periodSelector.html',
                link: PeriodSelectorLink,
                controller: PeriodSelectorController
            };
        });

