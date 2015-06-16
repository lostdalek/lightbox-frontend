module App.Core {
    'use strict';

    export class Configuration {
        static appModuleName: string = 'lightboxApp';
        static appConfig: App.Core.IConfig = {
            locale: 'en',
            localisation: {
                numberFormat: ',.0f'
            },
            baseUrl: 'http://localhost:3000/',
            basePath: '',
            assetsPath: ''
        };
    };
}
