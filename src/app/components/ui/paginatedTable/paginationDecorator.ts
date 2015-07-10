module App.Components.Ui.PaginatedTable {
    'use strict';

    export class PaginationDecorator {

        /** @ngInject */
        constructor($provide: ng.auto.IProvideService) {
            $provide.decorator('paginationDirective', function($delegate: any) {
                var directive = $delegate[0];

                directive.templateUrl = 'app/components/ui/paginatedTable/pagination.html';
                directive.$$isolateBindings.limit = {
                    attrName: 'limit',
                    mode: '=',
                    optional: true
                };
                return $delegate;
            });
        }

    }

    App.getModule()
        .config(PaginationDecorator);
}
