/**
 *
 */
module App.Route {
    'use strict';

    import Configuration = App.Config;

    angular.module(Configuration.appModuleName)
        .config(function (
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            console.log('route configured')
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/module/mainLayout/mainLayout.html',
                    controller: 'MainLayoutCtrl as main'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'app/module/mainLayout/mainLayout.html',
                    controller: 'MainLayoutCtrl as main'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'app/module/mainLayout/mainLayout.html',
                    controller: 'MainLayoutCtrl as main'
                });

            $urlRouterProvider.otherwise('/');
        });

}
