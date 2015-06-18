/**
 *
 */
module App.Service {
    'use strict';

    import Configuration = App.Config;

    angular.module(Configuration.appModuleName)
        // override default configuration:
        .config(function (ConfigServiceProvider: App.Core.ConfigService) {

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
