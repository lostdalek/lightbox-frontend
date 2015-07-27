
const appName = 'lightboxApp';
const app = angular.module(appName, [
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

var getApp = () => {
    return app;
};

var ngController = (target: any) => {
    console.log('target name:', target.name);
    getApp().controller(target.name, target);
};

var ngConfig = (target: any) => {
    getApp().config(target.Factory);

    //getApp().config(target);
    /*return function decorator(target, key, descriptor) {
        console.log('descriptor value', descriptor)
        getApp().config(descriptor.value);
    };*/
};

var ngService = (target: any) => {
    getApp().service(target.name, target);
};

var ngDirective= (target: any) => {
    getApp().directive(target.name, target);
};

var ngFilter = (target: any) => {
    getApp().filter(target.name, target.Factory);
};

var ngInject = (...dependencies) => {
    // target.$inject = dependencies;
    /*
    return function decorator(target, key, descriptor) {
        // if it's true then we injecting dependencies into function and not Class constructor
        if(descriptor) {
            const fn = descriptor.value;
            fn.$inject = dependencies;
        } else {
            target.$inject = dependencies;
        }
    };*/
}

//getModule();

export {app, appName, getApp, ngInject, ngConfig, ngService, ngFilter, ngDirective, ngController};