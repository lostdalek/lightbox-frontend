import {AbstractDataModel} from 'abstractDataModel';
import {TableSchemaService} from 'tableSchema.service';

    'use strict';

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

    import {getModule} from '../app.module';      getModule()
        .service('AbstractDataService', AbstractDataService);

