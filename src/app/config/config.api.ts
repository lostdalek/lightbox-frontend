module App {
    'use strict';

    /**
     * default Global API Config
     *
     */
    export class ApiConfig {
        /** @ngInject */
        constructor(RestangularProvider: restangular.IProvider,
                    _: _.LoDashStatic,
                    ConfigServiceProvider: App.Components.ConfigService) {

            // default headers (overrided by api factories)
            RestangularProvider.setDefaultHeaders({
                'Content-Type': 'application/json'
            });

            // reject data if not json:
            RestangularProvider.addResponseInterceptor(function (data: any, operation: any, what: any, url: any, response: any, deferred: any) {
                if (_.isObject(data) === false) {
                    if (data[0] === '<') {
                        deferred.reject(data);
                        console.log('restangular interceptor: not json:', data);
                    }
                }
                return data;
            });
        }

    }

    App.getModule()
        .config(ApiConfig);
}
