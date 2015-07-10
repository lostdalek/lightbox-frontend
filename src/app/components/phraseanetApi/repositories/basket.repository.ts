module App.Components {
    'use strict';

    export class BasketRepository extends App.Components.PhraseanetRepository {

        /** @ngInject */
        constructor(PhraseanetApi: App.Components.PhraseanetApi) {
            var route = 'baskets';

            super(PhraseanetApi, route);
        }
        // list all record views by user and date range
        public getList(apiParams: any) {
           return (<any>this.restangular).all( this.route + '/list/')
                // .withHttpConfig({ cache: true })
                .getList( this.validateParams(apiParams) );
        }

    }


    App.getModule()
        .service('BasketRepository', BasketRepository);

}
