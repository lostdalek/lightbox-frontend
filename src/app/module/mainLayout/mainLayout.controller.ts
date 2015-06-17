module App.Module.MainLayout {
    'use strict';

    import Configuration = App.Core.Configuration;

    class Thing {
        public rank: number;
        public title: string;
        public url: string;
        public description: string;
        public logo: string;

        constructor(title: string, url: string, description: string, logo: string) {
            this.title = title;
            this.url = url;
            this.description = description;
            this.logo = logo;
            this.rank = Math.random();
        }
    }

    interface IMainScope {
        isToggledLeftSidebar: boolean;
        awesomeThings: Thing[];
        assetsPath: string;
    }

    export class MainLayoutCtrl implements IMainScope{
        public assetsPath = '';
        public awesomeThings = new Array<Thing>();
        public isToggledLeftSidebar = false;


        static $inject = ['$scope', 'ConfigService'];
        /* @ngInject */
        constructor($scope: ng.IScope, appConfigService: App.Component.ConfigService) {
            var appConfig = appConfigService.getConfig();
            this.assetsPath = appConfig.assetsPath;


            var awesomeThingsDef = [
                {
                    'title': 'AngularJS1',
                    'url': 'https://angularjs.org/',
                    'description': 'HTML enhanced for web apps!',
                    'logo': 'angular.png'
                },
                {
                    'title': 'BrowserSync',
                    'url': 'http://browsersync.io/',
                    'description': 'Time-saving synchronised browser testing.',
                    'logo': 'browsersync.png'
                },
                {
                    'title': 'GulpJS',
                    'url': 'http://gulpjs.com/',
                    'description': 'The streaming build system.',
                    'logo': 'gulp.png'
                },
                {
                    'title': 'Jasmine',
                    'url': 'http://jasmine.github.io/',
                    'description': 'Behavior-Driven JavaScript.',
                    'logo': 'jasmine.png'
                },
                {
                    'title': 'Karma',
                    'url': 'http://karma-runner.github.io/',
                    'description': 'Spectacular Test Runner for JavaScript.',
                    'logo': 'karma.png'
                },
                {
                    'title': 'Protractor',
                    'url': 'https://github.com/angular/protractor',
                    'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
                    'logo': 'protractor.png'
                },
                {
                    'title': 'Bootstrap',
                    'url': 'http://getbootstrap.com/',
                    'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
                    'logo': 'bootstrap.png'
                },
                {
                    'title': 'Angular UI Bootstrap',
                    'url': 'http://angular-ui.github.io/bootstrap/',
                    'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
                    'logo': 'ui-bootstrap.png'
                },
                {
                    'title': 'Sass (Node)',
                    'url': 'https://github.com/sass/node-sass',
                    'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
                    'logo': 'node-sass.png'
                },
                {
                    'title': 'TypeScript',
                    'url': 'http://www.typescriptlang.org/',
                    'description': 'TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.',
                    'logo': 'typescript.png'
                }
            ];


            awesomeThingsDef.forEach((awesomeThing: Thing) => {
                this.awesomeThings.push(awesomeThing);
            });


        }

        public toggleLeftSideBar(): void {
            this.isToggledLeftSidebar = !this.isToggledLeftSidebar;
        }
    }

    angular.module(Configuration.appModuleName)
        .controller('MainLayoutCtrl', MainLayoutCtrl);

}
