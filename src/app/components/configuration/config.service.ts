
/**
* Config Service Provider
*/

'use strict';

import {appConfig} from '../../config/config.global';
import {ngService} from '../../ng.decorators';

export interface IConfigServiceProvider extends ng.IServiceProvider {
    getConfig(configKey?: any): any;
}

export interface IConfigServiceService {
    getConfig(configKey?: any): any;
}

// @ngService
export class ConfigService implements IConfigServiceProvider {
    protected config: any = appConfig;

    /**
     * register global envConfig
     */
    constructor () {
        var envConfig = (<any>window).envConfiguration || {};
        console.log('CONSTRUCTOR', envConfig)
        this._registerConfig(envConfig);
    }

    /**
     * Set config Object
     * Only available in angular config phase
     * @param config
     * @returns {IConfig}
     */
    public setConfig(config: App.IConfig): App.IConfig {
        return this._registerConfig(config);
    }

    /**
     * Get Config Object or specified key
     * note: accessible in angular config phase at your own risks
     *
     * @param configKey
     * @returns {IConfig}
     */
    public getConfig(configKey?: any): App.IConfig {
        if (configKey !== undefined) {
            var foundValue = this._findKeyValue(configKey || this.config);

            switch (typeof foundValue) {
                case 'string':
                    return foundValue;
                default:
                    return foundValue ? foundValue : null;

            }

        }
        return this.config;
    }


    /**
     * Provider Factory function
     * Accessible once angular's config phase is complete
     * @returns {{getConfig: (function(any=): App.IConfig)}}
     */
    public $get(): IConfigServiceService {
        return {
            getConfig: (configKey?: any) => {
                return this.getConfig(configKey); }
        };
    }

    /**
     *
     * @param config
     * @returns {IConfig}
     * @private
     */
    private _registerConfig(config: App.IConfig): App.IConfig  {
        _.merge(this.config, config);
        return this.config;
    }

    // @TODO cast
    private _findKeyValue(configName: any) {
        if (!configName) {
            return undefined;
        }

        var isStr = angular.isString(configName),
            name  = isStr ? configName : configName.name,
            path  = configName.indexOf('.') > 0 ? true : false;

        if (path) {
            return this._search(this.config, name);
        }
        var state = this.config[name];
        if (state && (isStr || (!isStr && state === configName))) {
            return state;
        } else if ( isStr ) {
            return state;
        }
        return undefined;
    }

    // @TODO cast
    private _search(obj: Object, path: any) {
        if (_.isNumber(path)) {
            path = [path];
        }
        if (_.isEmpty(path)) {
            return obj;
        }
        if (_.isEmpty(obj)) {
            return null;
        }
        if (_.isString(path)) {
            return this._search(obj, path.split('.'));
        }

        var currentPath = path[0];

        if (path.length === 1) {
            if (obj[currentPath] === void 0) {
                return null;
            }
            return obj[currentPath];
        }

        return this._search(obj[currentPath], path.slice(1));
    }
}
