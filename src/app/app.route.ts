/**
 *
 */
module App.Route {
    'use strict';

    import Configuration = App.Core.Configuration;

    angular.module(Configuration.appModuleName)
        .config(function (
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/module/mainLayout/mainLayout.html',
                    controller: 'MainLayoutCtrl as main'
                });

            $urlRouterProvider.otherwise('/');
        });

}
