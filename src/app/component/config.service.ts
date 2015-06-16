/**
 * Configuration Service Provider
 */
module App.Component {
    'use strict';

    import Configuration = App.Core.Configuration;

    /*interface ILocale {
        numberFormat?: string;
    }

    interface IConfig {
        locale?: string;
        localisation?: ILocale;
        baseUrl?: string;
        basePath?: string;
        assetsPath?: string
    }*/

    interface IConfigService {
        // setConfig(config: IConfig): any;
        getConfig(): any;
    }

    export class ConfigService implements ng.IServiceProvider {
        protected config: any = Configuration.appConfig;
        /*{
            locale: 'en',
            localisation: {
                numberFormat: ',.0f'
            },
            baseUrl: 'http://localhost:3000/',
            basePath: '',
            assetsPath: ''
        };*/

        /**
         * register global envConfiguration
         */
        constructor () {
            var envConfiguration = (<any>window).envConfiguration || {};
            this._registerConfig(envConfiguration);
        }

        /**
         * Set config Object
         * Only available in angular config phase
         * @param config
         * @returns {IConfig}
         */
        public setConfig(config: App.Core.IConfig): App.Core.IConfig {
            console.log('setting up config in config phase', config);
            return this._registerConfig(config);
        }

        /**
         * Get Config Object or specified key
         * note: accessible in angular config phase at your own risks
         *
         * @param configKey
         * @returns {IConfig}
         */
        public getConfig(configKey?: any): App.Core.IConfig {

            if (configKey !== undefined) {
                var foundValue = this._findKeyValue(configKey || this.config);
                return foundValue ? foundValue : null;
            }

            return this.config;
        }


        // provider's factory function
        /**
         * Provider Factory function
         * Accessible once angular's config phase is complete
         * @returns {{getConfig: (function(any=): App.Core.IConfig)}}
         */
        public $get(): IConfigService {
            return {
                getConfig: (configKey?: any) => { return this.getConfig(configKey); }
            };
        }

        /**
         *
         * @param config
         * @returns {IConfig}
         * @private
         */
        private _registerConfig(config: App.Core.IConfig): App.Core.IConfig  {
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


    angular.module(Configuration.appModuleName)
        .provider('ConfigService', ConfigService);

}
