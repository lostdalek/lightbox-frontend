import {LightboxApi} from'../lightboxApi.service';
import {LightboxRepository} from'../lightboxRepository'
    'use strict';

    export class BasketRepository extends LightboxRepository {

        /** @ngInject */
        constructor(LightboxApi: LightboxApi) {
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


    import {getModule} from '../../../app.module';      getModule()
        .service('LightboxBasketRepository', BasketRepository);


