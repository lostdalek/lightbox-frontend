module App.Components {
    'use strict';

    export class AbstractDataService {
        public abstractDataModel: App.Components.AbstractDataModel;
        public tableSchemaService: App.Components.TableSchemaService;

        constructor(AbstractDataModel: App.Components.AbstractDataModel, TableSchemaService: App.Components.TableSchemaService) {
            this.abstractDataModel = AbstractDataModel;
            this.tableSchemaService = TableSchemaService;
        }

        protected outputError(error: any) {
            //     toastr.error('failed to fetch resource: ' + error.message);

            return error;
        }
    }

    App.getModule()
        .service('AbstractDataService', AbstractDataService);
}
