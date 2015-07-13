import {ConfigService} from '../configuration/config.service';
    'use strict';

    export interface ILightboxApiError {
        code: number;
        message: string;
    }
    /**
     * Dedicated configuration for lightbox API
     *
     */
    export class LightboxApi {
        protected api;

        /** @ngInject */
        constructor(Restangular: restangular.IService,
                    _: _.LoDashStatic,
                    ConfigService: ConfigService,
                    $state: ng.ui.IStateService) {

            var baseUrl = <string>ConfigService.getConfig('lightboxApi.baseUrl');
            var basePath = <string>ConfigService.getConfig('lightboxApi.basePath');

            console.log('setup lightbox', baseUrl, basePath)

            if (baseUrl === null ) {
                throw new Error('Lightbox Api baseUrl can\'t be null');
            }
            if (basePath === null ) {
                throw new Error('Lightbox Api basePath can\'t be null');
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

    import {getModule} from '../../app.module';      getModule()
        .service('LightboxApi', LightboxApi);


