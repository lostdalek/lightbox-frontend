/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../theme/client.config.ts" />
/// <reference path="app.d.ts" />
'use strict';

import{TestService} from './components/libes6';

angular.module('lightboxApp', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'cgBusy',
    'LocalStorageModule',
    'restangular',
    'ui.router',
    'ct.ui.router.extras',
    'ui.bootstrap',
    'pascalprecht.translate'
]);

export function getModule() {
    return angular.module('lightboxApp');
}


module App {
    'use strict';

    let appDependencies = [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'cgBusy',
        'LocalStorageModule',
        'restangular',
        'ui.router',
        'ct.ui.router.extras',
        'ui.bootstrap',
        'pascalprecht.translate'
    ];





    export function getModule() {
        return angular.module('lightboxApp');
    }

    export function registerModule(moduleName: string, dependencies: any) {
        return angular.module(moduleName, dependencies);
    }

    /** @ngInject */
    export function runBlock($log: ng.ILogService) {
        $log.debug('runBlock end');

        let tt = new TestService();
        console.log(tt.getConst());
        /*for(module of appDependencies) {
            console.log('aa', module);
        }*/
    }

    getModule()
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', _)
        .run(runBlock)
        // controllers and services/factories are self declared
    ;
}
