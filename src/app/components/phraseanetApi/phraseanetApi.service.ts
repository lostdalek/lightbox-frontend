import {ConfigService} from '../configuration/config.service';
    'use strict';

    export interface IPhraseanetApiError {
        code: number;
        message: string;
    }
    /**
     * Dedicated configuration for phraseanet API
     *
     */
    export class PhraseanetApi {
        protected api;

        /** @ngInject */
        constructor(Restangular: restangular.IService,
                    _: _.LoDashStatic,
                    ConfigService: ConfigService,
                    $state: ng.ui.IStateService) {

            var baseUrl = <string>ConfigService.getConfig('phraseanetApi.baseUrl');
            var basePath = <string>ConfigService.getConfig('phraseanetApi.basePath');

            if (baseUrl === null ) {
                throw new Error('Phraseanet Api baseUrl can\'t be null');
            }
            if (basePath === null ) {
                throw new Error('Phraseanet Api basePath can\'t be null');
            }

            this.api = Restangular.withConfig( function (RestangularConfigurer: restangular.IProvider) {

                (<any>RestangularConfigurer)
                    .setDefaultHeaders({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    })
                    .setBaseUrl(baseUrl + basePath)
                    .setErrorInterceptor(function(response: any, deferred: any, responseHandler: any) {
                        if ( response.status === 401) {
                            $state.go('main.unauthorized');
                            return false; // error handled
                        }/* else if() {

                        }*/

                        return false; // error not handled
                    })
                    .addResponseInterceptor(function(responseData: any, operation: any, what: any, url: any, response: any, deferred: any) {

                        // console.log(responseData, operation, what, url, response)
                        var extractedData;
                        extractedData = {};
                        // if (operation === 'getList') {
                            if ( responseData.hasOwnProperty('data')) {
                                extractedData = responseData.data;

                                if ( responseData.hasOwnProperty('meta') ) {
                                    extractedData.meta = responseData.meta;
                                }
                            } else {
                                extractedData = responseData;
                            }
                        // }

                        return extractedData;
                    });
            });
        }

        public getApi() {
            return this.api;
        }
    }
/*

    import {getModule} from '../../app.module';      getModule()
        .service('PhraseanetApi', PhraseanetApi);


*/
