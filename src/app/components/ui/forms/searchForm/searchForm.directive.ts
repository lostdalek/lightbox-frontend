

    'use strict';

    export interface ISearchFormScope extends ng.IScope {
        data: any;
    }

    export class SearchFormLink {
        /*constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ISearchFormScope) {
         }*/
    }

    interface ISearchFormOptions {
        id: string;
        fieldSelection: any;
    }

    export class SearchFormController {
        public model;
        public selectedField;
        public formError;
        public formOptions;

        protected $inputSearch;
        protected storage;

        /** @ngInject */
        constructor($element: JQuery,
                    $scope: ISearchFormScope,
                    localStorageService: any,
                    _: _.LoDashStatic) {

            this.storage = localStorageService;
            this.$inputSearch = $element.find('.input-search');

                // set default selected field or user predefined:
            if ( this.formOptions.fieldSelection !== undefined) {

                this.selectedField = this.formOptions.fieldSelection[0];

                var userField = this._getPref('field');
                if ( userField !== null ) {
                    this.selectedField = userField;
                } else {
                    this.selectedField = this.formOptions.fieldSelection[0];
                }

            }
        }

        public selectField(field: any) {

            this.selectedField = field;
            this._setPref('field', this.selectedField);
            this.$inputSearch.focus();
        }

        public submitForm(form: any, model: any) {
            if (form.$valid) {
                var searchParams = {
                    field: this.selectedField.key,
                    searchValue: model.searchInput
                };
                return this.formOptions.onSubmitCallback.apply(null, [searchParams]);
            }
        }

        private _getPref(key: string) {
            var wholePrefs = this.storage.get(this.formOptions.id);
            if ( wholePrefs === null) {
                this.storage.set(this.formOptions.id, {});
                return null;
            }
            return (wholePrefs[key] === undefined ? null : wholePrefs[key]);
        }

        private _setPref(key: string, value: any) {
            var newPref = {};
            var wholePrefs = this.storage.get(this.formOptions.id);

            newPref[key] = value;
            this.storage.set(this.formOptions.id, _.merge(wholePrefs, newPref));
        }

    }

    import {getModule} from '../../../../app.module';      getModule()
        .directive('alchemySearchForm', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                bindToController: true,
                controllerAs: 'search',
                scope: {
                    formOptions: '='
                },
                templateUrl: 'app/components/ui/forms/searchForm/searchForm.html',
                link: SearchFormLink,
                controller: SearchFormController
            };
        });

