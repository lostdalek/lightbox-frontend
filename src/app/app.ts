/// <reference path="app.d.ts" />

module App {
    'use strict';

    var mainModule: string = App.Config.appModuleName;

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
        .run(function (
            $rootScope: ng.IRootScopeService,
            $state: ng.ui.IState,
            $stateParams: ng.ui.IState) {
                (<any>$rootScope).$state = $state;
                (<any>$rootScope).$stateParams = $stateParams;
                /*
                (<any>$rootScope).$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                    console.log('STATE NOT FOUND>', unfoundState);
                });
                (<any>$rootScope).$on('$stateChangeError', function (event, next, toParams, fromState, fromParams, error) {
                    console.log('STATE ERROR>', next, error);
                });
                $rootScope.$on('$stateChangeSuccess', function (event, next, fromState, fromParams) {
                    onsole.log('STATE SUCCESS>', next)
                });
                */
            }
        );
}
