import {ILightboxApi} from'../lightboxApi.service';
import {LightboxRepository} from'../lightboxRepository';
import {ngService} from '../../../ng.decorators';
'use strict';

@ngService
export class BasketRepository extends LightboxRepository {

    /** @ngInject */
    constructor(LightboxApi: ILightboxApi) {
        var route = 'basket';

        super(LightboxApi, route);
        console.log('brepo', LightboxApi)
    }
    // list all record views by user and date range
    public getList(apiParams: any) {
       return (<any>this.restangular).all( this.route +'/' )
            // .withHttpConfig({ cache: true })
            .getList( this.validateParams(apiParams) );
    }

}

