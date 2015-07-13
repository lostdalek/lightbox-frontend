import {PeriodSelectorService, IPeriod } from '../../components/ui/periodSelector/periodSelector.service';
    'use strict';

    export class ThemeController {
        public name: string;
        public datepickr1: IPeriod;
        public datepickr2: IPeriod;
        protected $translate;

        /** @ngInject */

        constructor($scope: ng.IScope,
                    $filter: ng.IFilterService,
                    PeriodSelectorService: PeriodSelectorService) {

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

    import {getModule} from '../../app.module';      getModule()
        .controller('ThemeController', ThemeController);

