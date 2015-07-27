/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../theme/client.config.ts" />
/// <reference path="app.d.ts" />

'use strict';
import {ConfigService} from './components/configuration/config.service';
import * as config from './config/config';
var c = config; // Force typescript to import non explicitly used modules

import * as mainApp from './main/module';
var a = mainApp; // Force typescript to import non explicitly used modules

import * as basket from './modules/basket/module';
var b = basket; // Force typescript to import non explicitly used modules

import * as dashboard from './modules/dashboard/module';
var d = dashboard; // Force typescript to import non explicitly used modules

import { getApp, appName } from './ng.decorators';

getApp()
    .provider('ConfigService', ConfigService)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('_', _)
    .run(runBlock);
console.log(getApp())

/*angular.element(document).ready(function() {
    angular.bootstrap(document, [appName], {
         strictDi: true
    });
});*/


/** @ngInject */
export function runBlock($log: ng.ILogService) {
    $log.debug('runBlock end');
}