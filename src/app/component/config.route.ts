/**
 *
 */
module App.Component {
    'use strict';

    import Configuration = App.Core.Configuration;

    angular.module(Configuration.appModuleName)
        .config(function (
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl'
                });

            $urlRouterProvider.otherwise('/');
        });

}