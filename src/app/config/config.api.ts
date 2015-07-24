'use strict';
import {ConfigService} from '../components/configuration/config.service';
import {ngConfig} from '../ng.decorators';

/**
 * default Global API Config
 *
 */

@ngConfig
export class ConfigApi {

    /** @ngInject */
    public static Factory(RestangularProvider: restangular.IProvider,
                          _: _.LoDashStatic,
                          ConfigServiceProvider: ConfigService) {
        // default headers (overrided by api factories)
        RestangularProvider.setDefaultHeaders({
            'Content-Type': 'application/json'
        });

        // reject data if not json:
        RestangularProvider.addResponseInterceptor(function (data:any, operation:any, what:any, url:any, response:any, deferred:any) {
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