
module App.Component.Ui.MediaCarousel {
    'use strict';

    export class OwlCarousel implements ng.IDirective
    {
        public restrict = 'A';
        public transclude = true;
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any, $transclude) => void;

        constructor(private $parse: ng.IModelParser)
        {
            this.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any, $transclude) =>
            {
                var owlOptions = [
                    'items',
                    'margin',
                    'loop',
                    'center',
                    'mouseDrag',
                    'touchDrag',
                    'pullDrag',
                    'freeDrag',
                    'merge',
                    'mergeFit',
                    'autoWidth',
                    'startPosition',
                    'URLhashListener',
                    'nav',
                    'navRewind',
                    'navText',
                    'slideBy',
                    'dots',
                    'dotsEach',
                    'dotData',
                    'lazyLoad',
                    'lazyContent',
                    'autoplay',
                    'autoplayTimeout',
                    'autoplayHoverPause',
                    'smartSpeed',
                    'fluidSpeed',
                    'autoplaySpeed',
                    'dotsSpeed',
                    'dragEndSpeed',
                    'callbacks',
                    'responsive',
                    'responsiveRefreshRate',
                    'responsiveBaseElement',
                    'responsiveClass',
                    'video',
                    'videoHeight',
                    'videoWidth',
                    'animateOut',
                    'animateIn',
                    'fallbackEasing',
                    'info',
                    'nestedItemSelector',
                    'itemElement',
                    'stageElement',
                    'navContainer',
                    'dotsContainer',
                    // classes
                    'themeClass',
                    'baseClass',
                    'itemClass',
                    'centerClass',
                    'activeClass',
                    'navContainerClass',
                    'navClass',
                    'controlsClass',
                    'dotClass',
                    'dotsClass',
                    'autoHeightClass',
                    // callbacks
                    'onInitialize',
                    'onInitialized',
                    'onResize',
                    'onResized',
                    'onRefresh',
                    'onRefreshed',
                    'onDrag',
                    'onDragged',
                    'onTranslate',
                    'onTranslated',
                    'onChange',
                    'onChanged',
                    'onStopVideo',
                    'onPlayVideo',
                    'onLoadLazy',
                    'onLoadedLazy'
                ];

                // available options: http://owlcarousel.owlgraphic.com/docs/api-options.html

                var $el = (<any>$(element));

                var options = {},
                    owlCarousel = null,
                    propertyName = (<any>attrs).owlCarousel;

                for (var i = 0; i < owlOptions.length; i++) {
                    var opt = owlOptions[i];
                    if (attrs[opt] !== undefined) {
                        options[opt] = $parse(attrs[opt])();
                    }
                }

                scope.$watchCollection(propertyName, function (newItems, oldItems) {

                    if (owlCarousel) {
                        owlCarousel.destroy();
                    }

                    $el.empty();

                    for (var i in newItems) {
                        $transclude(function (clone, scope) {
                            scope.item = newItems[i];
                            $el.append(clone[1]);
                        });
                    }

                    $el.owlCarousel(options);
                    owlCarousel = $el.data('owlCarousel');
                });

                $el.on('mousewheel', '.owl-stage', function (e) {
                    if (e.deltaY>0) {
                        $el.trigger('next.owl');
                    } else {
                        $el.trigger('prev.owl');
                    }
                    e.preventDefault();
                });
            };
        }

        public static Factory(): ng.IDirectiveFactory
        {
            var directive = ($parse: ng.IModelParser) =>
            {
                return new OwlCarousel($parse);
            };

            directive['$inject'] = ['$parse'];

            return directive;
        }
    }

    angular.module('alchemy-fr.ng.mediaCarousel')
        .directive('owlCarousel', OwlCarousel.Factory());
}
