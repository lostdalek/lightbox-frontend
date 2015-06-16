/// <reference path="../../app.d.ts" />

module App {
  'use strict';

    import Configuration = App.Core.Configuration;

    interface INavbarScope extends ng.IScope {
        date: Date
    }

    export class NavbarCtrl {
      static $inject = ['$scope'];
    /* @ngInject */
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
    }

    angular.module(Configuration.appModuleName)
        .controller('NavbarCtrl', NavbarCtrl);

}
