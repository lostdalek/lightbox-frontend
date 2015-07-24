'use strict';
import {TableSchemaService} from './tableSchema.service';
import {ngService} from '../ng.decorators';

interface IMediaModelProperties {
    [index: number]: string;
}
@ngService
export class AbstractDataModel {
    protected defaultDisplayableRows = ['views'];
    protected tableSchema;
    protected $filter;
    protected tableSchemaService: TableSchemaService;
    protected $translate;


    /** @ngInject */
    constructor($filter: ng.IFilterService,
                $q: ng.IQService,
                TableSchemaService: TableSchemaService
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