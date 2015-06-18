/// <reference path="app.d.ts" />

module App {
    'use strict';

    var mainModule: string = App.Core.Configuration.appModuleName;

    angular.module(mainModule, [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'restangular',
            'ui.router',
            'ui.bootstrap',
            'cgBusy',
            'alchemy-fr.ng.mediaCanvas',
            'alchemy-fr.ng.mediaCarousel'
        ])
        // override default configuration:
        .config(function (ConfigServiceProvider: App.Component.ConfigService) {

            ConfigServiceProvider.setConfig({
                locale: 'ene',
                a: {
                    b: 'c',
                    bb: {
                        c : 'd'
                    }
                },
                'a.b' : 'c'
            });
        });
}
