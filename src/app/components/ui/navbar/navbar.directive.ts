

    'use strict';

    export interface INavbarScope extends ng.IScope {
        title: string;
    }

    export class NavbarLink {
        // constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: INavbarScope) {}
    }

    export class NavbarController {
        public title = '';
        public navigation: any;
        protected $state;

        /** @ngInject */
        constructor($element: JQuery, $scope: INavbarScope, $state: ng.ui.IState) {
            this.$state = $state;

            $scope.$watch(() => {
                return this.$state;
            }, (newState: any) => {
                this.$state = newState;
            });

        }

        public getLink(nav: any): string {
            if ( nav.sref !== undefined ) {
                return this.$state.href(nav.sref);
            }

            return '';
        }

        public isActive(nav: any): boolean {
            return this.$state.includes(nav.parent);
        }
    }


    import {getModule} from '../../../app.module';      getModule()
        .directive('alchemyNavbar', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                bindToController: true,
                controllerAs: 'navbar',
                scope: {
                    title: '=',
                    navigation: '='
                },
                templateUrl: 'app/components/ui/navbar/navbar.html',
                link: NavbarLink,
                controller: NavbarController
            };
        });

