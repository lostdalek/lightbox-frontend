module App {
    'use strict';

    export class UnauthorizedController {
        protected $translate;
        protected $modalInstance;
        public max = 100;
        public iterations = 100;
        public counter = 0;

        /** @ngInject */
        constructor(
                $scope: ng.IScope,
                $interval: ng.IIntervalService,
                $filter: ng.IFilterService,
                $modalInstance: any ) {

            this.$translate = $filter('translate');
            this.$modalInstance = $modalInstance;


            var that = this;
            $interval(function(){
                that.counter += (that.max / that.iterations);
            }, 100, this.iterations);

            $scope.$watch(() => {
                return this.counter;
            }, (newVal: any) => {
                if (newVal === this.max) {
                    this.$modalInstance.close({action: 'processChange'});
                }
            });

        }

        public closeModal() {
            this.$modalInstance.close();
        }

        public cancelChange() {
            this.$modalInstance.close({action: 'cancelChange'});
        }

        public processChange() {
            this.$modalInstance.close({action: 'processChange'});
        }

    }

    App.getModule()
        .controller('UnauthorizedController', UnauthorizedController);
}
