
module App {
    'use strict';

    interface ILocale {
        numberFormat?: string;
    }

    interface IConfig {
        locale?: string;
        localisation?: ILocale;
        baseUrl?: string;
        basePath?: string;
        staticPath?: string
    }

    export class Config {
        static appConfig: IConfig = {
            locale: 'en',
            localisation: {
                numberFormat: ',.0f'
            },
            baseUrl: 'http://localhost:3000/',
            basePath: '',
            staticPath: '',
            ui: {
                leftSidebarIsTogglable: false
            }
        };

        /** @ngInject */
        constructor($logProvider: ng.ILogProvider,
                    toastr: Toastr,
                    ConfigServiceProvider: App.Components.ConfigService ) {
            // enable log
            $logProvider.debugEnabled(true);
            // set options third-party lib
            toastr.options.timeOut = 3000;
            toastr.options.positionClass = 'toast-top-right';
            toastr.options.preventDuplicates = true;
            toastr.options.progressBar = true;

            /*
            // Extra config sample:
            ConfigServiceProvider.setConfig({
                locale: 'en',
                a: {
                    b: 'c',
                    bb: {
                        c : 'd'
                    }
                },
                'a.b' : 'c'
            });
            */
        }

    }

   App.getModule()
       .config(Config);
}
