'use strict';
import * as components from '../../components/components';
import {ngService} from '../../ng.decorators';

export interface IDashboardService {

}

@ngService
export class DashboardService implements IDashboardService {
    protected $filter;
    protected $q;
    protected tableSchemaService: components.ITableSchemaService;
    protected tableSchema;
    protected $translate;
    protected basketRepository;


    /** @ngInject */
    constructor($filter: ng.IFilterService,
                $q: ng.IQService,
                BasketRepository: components.BasketRepository,
                TableSchemaService: components.ITableSchemaService) {


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