
module App.Component.Ui.MediaCarousel {
    'use strict';

    export interface IMediaCarouselScope extends ng.IScope {
        // controllerAs:
        mediaCarousel: MediaCarouselController;
    }


    class Media implements App.Core.IMedia{
        public name: string;
        public src: string;

        /*constructor(name: string, src: string) {
            this.name = name;
            this.src = src;
        }*/
    }

    export class MediaCarouselLink {
        // constructor(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IMediaCarouselScope) {}
    }

    export class MediaCarouselController {
        public collection; // binding
        public mediaCollection = new Array<Media>();
        public deferredData;

        static $inject = ['$element', '$scope'];

        constructor($element: JQuery, $scope: IMediaCarouselScope) {

            this.deferredData = $scope.mediaCarousel.deferredData;

            $scope.$watch(() => {
                return this.deferredData;
            }, (newVal) => {
                this.populateCarousel(newVal);
            });
        }

        public populateCarousel(deferedData) {
            if (deferedData.promise) {
                deferedData.promise.then((response) => {
                    this.mediaCollection = response;
                });
            }
        }

        public selectMedia(media: App.Core.IMedia): void {
            console.log('selected media', media);
        }
    }


    angular.module('alchemy-fr.ng.mediaCarousel', [])
        .directive('alchemyMediaCarousel', function (): ng.IDirective {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    collection: '=',
                    deferredData: '='
                },
                templateUrl: 'app/component/alchemy-fr/mediaCarousel/mediaCarousel.html',
                link: MediaCarouselLink,
                bindToController: true,
                controllerAs: 'mediaCarousel',
                controller: MediaCarouselController
            };
        });
}
