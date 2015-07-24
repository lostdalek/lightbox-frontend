'use strict';
import {AbstractDataModel} from 'abstractDataModel';
import {TableSchemaService} from 'tableSchema.service';
import {ngService} from '../ng.decorators';
@ngService
export class AbstractDataService {
    public abstractDataModel: AbstractDataModel;
    public tableSchemaService: TableSchemaService;

    constructor(AbstractDataModel: AbstractDataModel, TableSchemaService: TableSchemaService) {
        this.abstractDataModel = AbstractDataModel;
        this.tableSchemaService = TableSchemaService;
    }

    protected outputError(error: any) {
        //     toastr.error('failed to fetch resource: ' + error.message);

        return error;
    }
}
