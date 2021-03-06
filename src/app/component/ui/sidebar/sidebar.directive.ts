
module App.Component.Ui.Sidebar {
    'use strict';

    import Configuration = App.Config;

    export interface ISidebarScope extends ng.IScope {
        name: string;
        isToggled: boolean;
        // controllerAs:
        sidebar: SidebarController;
    }

    export class SidebarLink {
        // constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ISidebarScope) {}
    }

    export class SidebarController {
        static $inject = ['$element', '$scope'];
        public name = '';
        public isToggled = false;


        constructor($element: JQuery, $scope: ISidebarScope) {

            this.name = 'sidebar name';

            $scope.$watch(() => {
                return this.isToggled;
            }, (newVal) => {
                this.logWatch(newVal);
            });
            /*
            $scope.$watch(<any>angular.bind(this, function () {
                return this.isToggled;
            }), (newVal) => {
                this.logWatch(newVal);
            });
            */
        }

        public logWatch(value: any) {
            console.log('logged', value);
        }
    }


    angular.module(Configuration.appModuleName)
        .directive('sidebar', function (): ng.IDirective {
        return {
            restrict: 'EA',
            replace: true,
            bindToController: true,
            controllerAs: 'sidebar',
            scope: {
                isToggled: '='
            },
            templateUrl: 'app/component/ui/sidebar/sidebar.html',
            link: SidebarLink,
            controller: SidebarController
        };
    });
}
