module App.Modules {
    'use strict';

    export class DashboardService {
        protected $filter;
        protected $q;
        protected tableSchemaService: App.Components.TableSchemaService;
        protected tableSchema;
        protected $translate;
        protected basketRepository;


        /** @ngInject */
        constructor($filter: ng.IFilterService,
                    $q: ng.IQService,
                    BasketRepository: App.Components.BasketRepository,
                    TableSchemaService: App.Components.TableSchemaService) {


            this.tableSchemaService = TableSchemaService;
            this.$q = $q;
            this.$filter = $filter;
            this.$translate = $filter('translate');

            this.basketRepository = BasketRepository;
        }

        public getBasketCollection() {
            return this.basketRepository.getList();
        }
    }

    App.getModule()
        .service('DashboardService', DashboardService);
}
