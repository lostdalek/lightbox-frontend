
module Components.Ui.Navblade {
    'use strict';

    interface INavigationBlade {

    }

    export interface INavbladeScope extends ng.IScope {
        logoSrc: string;
        logoLink: string;
    }

    export class NavbladeLink {
        /*constructor(scope: INavbladeScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: INavbladeScope) {

        }*/
    }

    /**
     * NavBlade controller
     *
     */
    export class NavbladeController {

        public logoSrc: string;
        public logoLink: string;
        /**
         * define css classes for container
         */
        public classes: string;
        public navigation: any;
        protected $state;

        /** @ngInject */
        constructor($element: JQuery, $scope: INavbladeScope, $state: ng.ui.IState) {
            this.$state = $state;

            if ( this.classes === undefined) {
                this.classes = 'navblade-default';
            }
        }

        public getLink(nav: any): string {

            if (nav.sref !== undefined) {
                return this.$state.href(nav.sref);
            }

            return '';
        }
    }


    App.getModule()
        .directive('alchemyNavblade', function (): ng.IDirective {
            return {
                restrict: 'E',
                replace: true,
                bindToController: true,
                controllerAs: 'navblade',
                scope: {
                    logoSrc: '=',
                    logoLink: '=',
                    classes: '=',
                    navigation: '=navigation'
                },
                templateUrl: 'app/components/ui/navblade/navblade.html',
                link: NavbladeLink,
                controller: NavbladeController
            };
        });
}
