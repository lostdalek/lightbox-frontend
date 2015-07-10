module App {
    'use strict';

    export class RouterConfig {

        /** @ngInject */
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/modules/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                })
                .state('main', {
                    abstract: true,
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main'
                })
                /*.state('main.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/modules/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                })*/
                .state('main.review', {
                    url: '/review',
                    abstract: true,
                    templateUrl: 'app/modules/review/review.html',
                    controller: 'ReviewController',
                    controllerAs: 'review'
                })
                .state('main.review.records', {
                    url: '/:reviewId/?:recordId',
                    templateUrl: 'app/modules/validation/validation.list.html',
                    controller: 'ValidationListController',
                    controllerAs: 'validationList'
                })
                .state('main.review.records/:reviewId/?:recordId', {
                    url: '/review',
                    templateUrl: 'app/modules/review/review.html',
                    controller: 'ReviewController',
                    controllerAs: 'review'
                })
                .state('main.basket', {
                    url: '/basket',
                    abstract: true,
                    templateUrl: 'app/modules/basket/basket.html',
                    controller: 'BasketController',
                    controllerAs: 'basket'
                })
                .state('main.theme', {
                    url: '/theme',
                    templateUrl: 'app/modules/theme/theme.html',
                    controller: 'ThemeController',
                    controllerAs: 'theme'
                })
                .state('main.unauthorized', {
                    url: '/unauthorized',
                    onEnter: ['$modal', '$location', '$state', '$previousState', '$stateParams',
                        function ($modal: any, $location: ng.ILocationService, $state: ng.ui.IStateService, $previousState: any, $stateParams: any) {
                        var goBackState = 'main.dashboard';
                        $previousState.memo('modalInvoker');
                        // redirect
                        if ( $previousState.get() === null ) {
                            $state.go(goBackState, null, { reload: true });
                        } else {
                            var templateUrl = 'app/main/unauthorized.html',
                                controller = 'UnauthorizedController',
                                // stateParams = $stateParams,
                                modalInstance = $modal.open({
                                    keyboard: 'false',
                                    backdrop: 'static',
                                    templateUrl: templateUrl,
                                    controller: controller,
                                    controllerAs: 'vm'
                                });
                            modalInstance.result.then(function (response: any) {
                                // force refresh:
                                $location.url('/');
                            });
                        }
                    }]
                });


            $urlRouterProvider
                .otherwise('/dashboard');
        }

    }

    App.getModule()
        .config(RouterConfig);
}
