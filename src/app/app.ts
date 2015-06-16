/// <reference path="app.d.ts" />

module App {
    'use strict';

    var mainModule: string = App.Core.Configuration.appModuleName;

    var app = angular.module(mainModule, [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'restangular',
            'ui.router',
            'ui.bootstrap'
    ]);


    // override default configuration:
    app
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
