/// <reference path="../../../.tmp/typings/tsd.d.ts" />

'use strict';
import {ConfigService} from '../components/configuration/config.service';
import {ngConfig} from '../ng.decorators';

interface ILocale {
    numberFormat?: string;
}

interface IConfig {
    locale?: string;
    localisation?: ILocale;
    baseUrl?: string;
    basePath?: string;
    staticPath?: string
}
export var appConfig: IConfig = {
    locale: 'en',
    localisation: {
        numberFormat: ',.0f'
    },
    baseUrl: 'http://localhost:3000/',
    basePath: '',
    staticPath: '',
    ui: {
        leftSidebarIsTogglable: false
    }
};

@ngConfig
export class Config {
    // @ngInject('$logProvider','toastr','ConfigServiceProvider','ConfigServiceProvider')
    // static $inject = ['$logProvider','toastr','ConfigServiceProvider','ConfigServiceProvider'];

    /*constructor($logProvider: ng.ILogProvider,
                toastr: Toastr,
                ConfigServiceProvider: ConfigService) {

        // enable log
        $logProvider.debugEnabled(true);
        // set options third-party lib
        // toastr.options.timeOut = 3000;
        // toastr.options.positionClass = 'toast-top-right';
        // toastr.options.preventDuplicates = true;
        // toastr.options.progressBar = true;

    }*/
    /** @ngInject */
    public static Factory($logProvider: ng.ILogProvider,
                          toastr: Toastr,
                          ConfigServiceProvider: ConfigService) {

        //return function () {
            // enable log
            $logProvider.debugEnabled(true);
            // set options third-party lib
            // toastr.options.timeOut = 3000;
            // toastr.options.positionClass = 'toast-top-right';
            // toastr.options.preventDuplicates = true;
            // toastr.options.progressBar = true;
        //}
    }

}
