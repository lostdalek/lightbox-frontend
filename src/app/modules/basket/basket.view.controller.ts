import {BasketService} from 'basket.service';
import {getModule} from '../../app.module';
'use strict';

interface IBasketViewParams extends ng.ui.IStateParamsService {
    basketId: string;
}

export class BasketViewController {
    public basketId: number;
    public basketModel;

    protected basketService: BasketService;
    /** @ngInject */

    constructor($scope:ng.IScope,
                $stateParams: IBasketViewParams,
                BasketService: BasketService
                ) {

        this.basketService = BasketService;
        if ( $stateParams.hasOwnProperty('basketId') ) {

            this.basketId = parseInt($stateParams.basketId, 10);

            this._getBasketModel(this.basketId);
        }
     }

    private _getBasketModel(basketId: number) {
        return this.basketService.getBasketModel(basketId)
            .then( (response: any) => {
              this.basketModel = response;
            });
    }
}

getModule()
    .controller('BasketViewController', BasketViewController);

