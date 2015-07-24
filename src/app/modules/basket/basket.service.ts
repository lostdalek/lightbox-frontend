'use strict';
import {TableSchemaService} from '../../components/tableSchema.service';
import {BasketRepository} from '../../components/lightboxApi/repositories/basket.repository';
import {ngService} from '../../ng.decorators';
@ngService
export class BasketService {
    protected $filter;
    protected $q;
    protected tableSchemaService: TableSchemaService;
    protected tableSchema;
    protected $translate;
    protected basketRepository;


    /** @ngInject */
    constructor($filter: ng.IFilterService,
                $q: ng.IQService,
                LightboxBasketRepository: BasketRepository,
                TableSchemaService: TableSchemaService) {


        this.tableSchemaService = TableSchemaService;
        this.$q = $q;
        this.$filter = $filter;
        this.$translate = $filter('translate');

        this.basketRepository = LightboxBasketRepository;
    }

    public getBasketModel( basketId: number) {
        return this.basketRepository.get(basketId);
    }
    public getBasketCollection() {
        return this.basketRepository.getList();
    }
}