module App.Component.Vendor {
    'use strict';

    import Configuration = App.Core.Configuration;

    /*export class Lodash {
        static appModuleName: string = 'lightboxApp';
    }*/

    angular.module(Configuration.appModuleName)
        .constant('_', _);
}
