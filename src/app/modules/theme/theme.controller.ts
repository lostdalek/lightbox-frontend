module App.Modules {
    'use strict';

    export class ThemeController {
        public name: string;
        public datepickr1: App.Components.Ui.PeriodSelector.IPeriod;
        public datepickr2: App.Components.Ui.PeriodSelector.IPeriod;
        protected $translate;

        /** @ngInject */

        constructor($scope: ng.IScope,
                    $filter: ng.IFilterService,
                    PeriodSelectorService: App.Components.Ui.PeriodSelector.PeriodSelectorService) {

            this.$translate = $filter('translate');
            this.name = 'Medias controller';

            this.datepickr1 = PeriodSelectorService.addPeriod({
                id: 'myCustomID',
                global: false
            });

            this.datepickr2 = PeriodSelectorService.addPeriod({
                id: 'myCustomID2',
                global: false
            });

            // watch period changes:
            $scope.$watch(() => {
                return this.datepickr1.dateRange;
            }, (newVal: any) => {
                // console.log('date changed for p1', newVal);
            });

            $scope.$watch(() => {
                return this.datepickr2.dateRange;
            }, (newVal: any) => {
                // console.log('date changed for p2', newVal);
            });
        }

    }

    App.getModule()
        .controller('ThemeController', ThemeController);
}
