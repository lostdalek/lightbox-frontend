
    'use strict';

    export interface ISidebarScope extends ng.IScope {
        title: string;
        isToggled: boolean;
    }

    export class SidebarLink {
        // constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ISidebarScope) {}
    }

    export class SidebarController {
        public title = '';
        public isToggled = false;
        public navigation: any;
        protected $state;

        /** @ngInject */
        constructor($element: JQuery, $scope: ISidebarScope, $state: ng.ui.IState) {
            this.$state = $state;

            $scope.$watch(() => {
                return this.$state;
            }, (newState: any) => {
                this.$state = newState;
            });
        }

        public getLink(nav: any): string {
            if (nav.sref !== undefined) {
                return this.$state.href(nav.sref);
            }

            return '';
        }

        public isActive(nav: any): boolean {
            return this.$state.includes(nav.parent);
        }
    }


    //App.registerModule('alchemySidebar', ['mgcrea.ngStrap.collapse'])
/*
    import {getModule} from '../../../app.module';      getModule()
        .directive('alchemySidebar', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                bindToController: true,
                controllerAs: 'sidebar',
                scope: {
                    isToggled: '=',
                    title: '=',
                    navigation: '='
                },
                templateUrl: 'app/components/ui/sidebar/sidebar.html',
                link: SidebarLink,
                controller: SidebarController
            };
        });

*/
