module App.Components {
    'use strict';

    interface IMediaModelProperties {
        [index: number]: string;
    }

    export class AbstractDataModel {
        protected defaultDisplayableRows = ['views'];
        protected tableSchema;
        protected $filter;
        protected tableSchemaService: App.Components.TableSchemaService;
        protected $translate;


        /** @ngInject */
        constructor($filter: ng.IFilterService,
                    $q: ng.IQService,
                    TableSchemaService: App.Components.TableSchemaService
        ) {

            this.tableSchemaService = TableSchemaService;
            this.$filter = $filter;
            this.$translate = $filter('translate');
            this.tableSchema =  {
                views: {
                    type: 'integer',
                    options: {
                        head: {
                            title: this.$translate('app.table.generic.header.views')
                        }
                    }
                }
            };
        }

        public setTableSchema(tableSchema: any) {
            this.tableSchema = tableSchema;
        }

        public getTableSchema(rawCollection: any, displayRows?: any) {
            var displayableRows = this.defaultDisplayableRows;
            if ( displayRows !== undefined) {
                displayableRows = displayRows;
            }
            return <any>this.tableSchemaService.setSchema({
                displayableRows: displayableRows,
                schema: this.tableSchema,
                collection: rawCollection
            });
        }

        public useCustomTableSchema(rawCollection: any, customSchema: any, displayRows: any) {
            return <any>this.tableSchemaService.setSchema({
                displayableRows: displayRows,
                schema: customSchema,
                collection: rawCollection
            });
        }
    }

    App.getModule()
        .service('AbstractDataModel', AbstractDataModel);
}
