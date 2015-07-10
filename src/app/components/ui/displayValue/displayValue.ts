
module App.Components.Ui.DisplayValue {
    'use strict';

    export interface IDisplayValueScope extends ng.IScope {
        parent: any;
        source: any;
    }

    export class DisplayValueLink {
        /*constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IDisplayValueScope) {
         }*/
    }

    export class DisplayValueController {
        public basePath: any;
        public parent: any;
        public source: any;
        protected value: any;
        protected type: any;
        protected options: any;

        protected $q;

        /** @ngInject */
        constructor($element: JQuery,
                    $scope: IDisplayValueScope,
                    _: _.LoDashStatic,
                    ConfigService: App.Components.ConfigService) {
            this.parent = this.parent.getParent();

            this.basePath  = <string>ConfigService.getConfig('baseUrl') + <string>ConfigService.getConfig('staticPath');

            if ( this.source !== undefined ) {
                this.value = this.source.value;
                this.type = this.source.type || 'string';
                this.options = this.source.options || {};
            } else {
                this.value = 'ERR: no schema key provided';
                this.type = 'string';
            }
        }


    }

    App.getModule()
        .directive('alchemyDisplayValue', function (): ng.IDirective {
            return {
                restrict: 'E',
                bindToController: true,
                controllerAs: 'cell',
                scope: {
                    source: '=',
                    parent: '='
                },
                templateUrl: 'app/components/ui/displayValue/displayValue.html',
                link: DisplayValueLink,
                controller: DisplayValueController
            };
        });
}
