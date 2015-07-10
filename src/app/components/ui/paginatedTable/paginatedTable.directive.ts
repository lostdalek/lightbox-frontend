
module App.Components.Ui.PaginatedTable {
    'use strict';

    interface IOrdering {

}

    export interface IPagination {
        total?: number;
        pages?: number;
        page: number;
        limit: number;
    }

    export interface IDateRange {
        from: string;
        to: string;
    }

    export interface ISortBy {
        sort: string;
        dir: string;
    }

    export interface IResolvable {
        service: any;
        method: string;
        methodArgs?: any;
    }

    export interface IUserOptions {
        id: string;
        placeholder?: any;
        paginate: IPagination;
        search: any;
        sortBy: ISortBy;
        dateRange: IDateRange;
        resolveOnLoad: boolean;
        resolveWith: IResolvable;
    }

    interface ITableOptions extends IUserOptions{
        id: string;
        placeholder: any;
        currentPage: number;
        page: number;
        limit: number;
    }

    export interface IPaginatedTableScope extends ng.IScope {
        tableOptions: ITableOptions;
    }

    export class PaginatedTableLink {
        /*constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IPaginatedTableScope) {
         }*/
    }

    export class PaginatedTableController {
        public dataCollection = [];
        public firstTime = true;
        public dataCollectionReady = {};

        public userOptions: IUserOptions;
        public tableOptions: ITableOptions;

        public paginationReady = false;
        public totalItems: number = 0;
        public maxSize: number = 5; // maximum displayed page
        public bigCurrentPage: number = 1; // first page
        public limit;

        protected $scope;
        protected storage;
        protected $q;
        protected sortByState = { sort: null, dir: null };

        /** @ngInject */
        constructor($element: JQuery,
                    $scope: IPaginatedTableScope,
                    $q: ng.IQService,
                    _: _.LoDashStatic,
                    localStorageService: any,
                    moment: moment.MomentStatic) {

            this.$q = $q;
            this.$scope = $scope;
            this.storage = localStorageService;

            this.tableOptions = (<any>_.merge({
                placeholder: {
                    emptyData: {
                        active: true,
                        tpl: 'app/components/ui/paginatedTable/placeholderEmpty.html'
                    },
                    initData: {
                        active: false,
                        tpl: 'app/components/ui/paginatedTable/placeholderInit.html'
                    }
                }
            },  this.userOptions));


            // set sortBy default or user predefined:
            if ( this.tableOptions.hasOwnProperty('sortBy') ) {
                var userSortBy = this._getPref('sortBy');
                if ( userSortBy !== null ) {
                    this.sortByState = this.tableOptions.sortBy = userSortBy;
                } else {
                    this.sortByState = this.tableOptions.sortBy;
                }
            }


            // set pagination limit default or user predefined:
            if ( this.tableOptions.hasOwnProperty('paginate') ) {
                var userLimit = this._getPref('limit');
                if ( userLimit !== null ) {
                    this.limit = this.tableOptions.paginate.limit = parseInt(userLimit, 10);
                } else {
                    this.limit = this.tableOptions.paginate.limit;
                }
            }

            $scope.$on('paginatedTable:refresh', (event: any) => this._getCollectionPromise(this.tableOptions));
            $scope.$on('paginatedTable:criteriaChanged', (event: any, criteria: any) => this.onCriteriaChange(criteria) );

            if ( this.tableOptions.resolveOnLoad === true ) {
                this._getCollectionPromise(this.tableOptions);
            }

            $scope.$watch(() => { return this.limit; }, (newLimit: string, oldLimit: string) => {
                if ( newLimit !== undefined && newLimit !== oldLimit) {
                    this._setPref('limit', parseInt(newLimit, 10));
                    this.onCriteriaChange({
                        paginate: {
                            limit: parseInt(newLimit, 10)
                        }

                    });
                }
            });
        }

        public onCriteriaChange(criteria: any) {
            this.tableOptions = (<any>_.merge(this.tableOptions,  criteria));
            this._getCollectionPromise( this.tableOptions );
        }

        /**
         * On page change event,
         * init a new data promise
         */

        public pageChange() {
            // new page is directly mapped into tableOptions
            this._getCollectionPromise( this.tableOptions );
        }

        public dateRangeChange() {
            this._getCollectionPromise( this.tableOptions );
        }

        public sortBy(row: any) {
            if ( !row.sortable) {
                return '';
            }

            var rowKey = row.sortKey,
                defaultOrder = 'asc',
                altOrder = 'desc';

            // if key is already sorted, inverse order:
            var order = defaultOrder;
            // if key is already the same, change order:
            if ( this.tableOptions.sortBy.sort === rowKey ) {
                order = this.tableOptions.sortBy.dir === defaultOrder ? altOrder : defaultOrder;
            }
            this.tableOptions.sortBy = {sort: rowKey, dir: order};
            this.sortByState = this.tableOptions.sortBy;
            this._setPref('sortBy', this.sortByState);
            this._getCollectionPromise( this.tableOptions );
        }

        public isSortActive(row: any) {
            return this.sortByState.sort === row.sortKey;
        }
        public getSortState(row: any) {
            if ( !row.sortable) {
                return '';
            }
            var rowKey = row.sortKey,
                classes = '';
            if (this.sortByState.sort === rowKey) {
                classes = this.sortByState.dir === 'asc' ? 'glyphicon glyphicon-triangle-top' : 'glyphicon' +
                ' glyphicon-triangle-bottom';
            }
            return classes;
        }

        private _getCollectionPromise(tableOptions: ITableOptions) {
            this.dataCollectionReady = {
                promise: this._refreshCollection(tableOptions),
                message: '',
                backdrop: true,
                templateUrl: 'app/components/vendors/angular-busy/loading.bounce.html',
                delay: 0,
                minDuration: 0
            };
        }

        private _refreshCollection(tableOptions: ITableOptions) {
            var service = tableOptions.resolveWith.service;

            var resolveArgs = [];

            if ( tableOptions.resolveWith.hasOwnProperty('methodArgs') ) {
                _.forEach(tableOptions.resolveWith.methodArgs, function(arg: any){
                    resolveArgs.push(arg);
                });
            }

            resolveArgs.push(tableOptions.paginate);
            resolveArgs.push(tableOptions.sortBy);
            resolveArgs.push(tableOptions.dateRange);
            resolveArgs.push(tableOptions.search);

            return service[tableOptions.resolveWith.method].apply(service, resolveArgs)
                .then((response: any) => {
                    this.dataCollection = response.data;
                    this._refreshPagination(response.meta.pagination);
                    this.firstTime = false;
                }, (error: any) => {
                    // empty or not
                    this.dataCollection = [];
                    return this.dataCollection;
                });
        }

        private _refreshPagination(pageOptions?: IPagination) {
            if ( pageOptions !== undefined ) {
                this.paginationReady = true;

                this.totalItems = (<number>pageOptions.total);
                this.maxSize = 5; // maximum displayed page
                this.bigCurrentPage = 1; // first page
            }
        }

        private _getPref(key: string) {
            var wholePrefs = this.storage.get(this.tableOptions.id);
            if ( wholePrefs === null) {
                this.storage.set(this.tableOptions.id, {});
                return null;
            }
            return (wholePrefs[key] === undefined ? null : wholePrefs[key]);
        }

        private _setPref(key: string, value: any) {
            var newPref = {};
            var wholePrefs = this.storage.get(this.tableOptions.id);

            newPref[key] = value;
            this.storage.set(this.tableOptions.id, _.merge(wholePrefs, newPref));
        }
    }

    App.getModule()
        .directive('alchemyPaginatedTable', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                bindToController: true,
                controllerAs: 'table',
                scope: {
                    userOptions: '=options'
                },
                templateUrl: 'app/components/ui/paginatedTable/paginatedTable.html',
                link: PaginatedTableLink,
                controller: PaginatedTableController
            };
        });
}
