var App;!function(t){var n;!function(t){"use strict";var n=function(){function t(){}return t.appModuleName="lightboxApp",t.appConfig={locale:"en",localisation:{numberFormat:",.0f"},baseUrl:"http://localhost:3000/",basePath:"",assetsPath:""},t}();t.Configuration=n}(n=t.Core||(t.Core={}))}(App||(App={}));var App;!function(t){"use strict";var n=t.Core.Configuration.appModuleName,o=angular.module(n,["ngAnimate","ngCookies","ngTouch","ngSanitize","restangular","ui.router","ui.bootstrap"]);o.config(["ConfigServiceProvider",function(t){t.setConfig({locale:"ene",a:{b:"c",bb:{c:"d"}},"a.b":"c"})}])}(App||(App={}));var App;!function(t){var n;!function(n){"use strict";var o=t.Core.Configuration,r=function(){function t(){this.config=o.appConfig;var t=window.envConfiguration||{};this._registerConfig(t)}return t.prototype.setConfig=function(t){return console.log("setting up config in config phase",t),this._registerConfig(t)},t.prototype.getConfig=function(t){if(void 0!==t){var n=this._findKeyValue(t||this.config);return n?n:null}return this.config},t.prototype.$get=function(){var t=this;return{getConfig:function(n){return t.getConfig(n)}}},t.prototype._registerConfig=function(t){return _.merge(this.config,t),this.config},t.prototype._findKeyValue=function(t){if(!t)return void 0;var n=angular.isString(t),o=n?t:t.name,r=t.indexOf(".")>0?!0:!1;if(r)return this._search(this.config,o);var e=this.config[o];return e&&(n||!n&&e===t)?e:void 0},t.prototype._search=function(t,n){if(_.isNumber(n)&&(n=[n]),_.isEmpty(n))return t;if(_.isEmpty(t))return null;if(_.isString(n))return this._search(t,n.split("."));var o=n[0];return 1===n.length?void 0===t[o]?null:t[o]:this._search(t[o],n.slice(1))},t}();n.ConfigService=r,angular.module(o.appModuleName).provider("ConfigService",r)}(n=t.Component||(t.Component={}))}(App||(App={}));var App;!function(t){"use strict";var n=t.Core.Configuration,o=function(){function t(t){t.date=new Date}return t.$inject=["$scope"],t}();t.NavbarCtrl=o,angular.module(n.appModuleName).controller("NavbarCtrl",o)}(App||(App={}));var App;!function(t){"use strict";var n=t.Core.Configuration,o=(function(){function t(t,n,o,r){this.title=t,this.url=n,this.description=o,this.logo=r,this.rank=Math.random()}return t}(),function(){function t(t,n){var o=n.getConfig();console.log("controller do want",n.getConfig("a.b")),console.log("controller do want",n.getConfig("a.bb.c")),console.log("controller do want",n.getConfig("assetsPath")),t.assetsPath=o.assetsPath;var r=[{title:"AngularJS1",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{title:"TypeScript",url:"http://www.typescriptlang.org/",description:"TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.",logo:"typescript.png"}];t.awesomeThings=new Array,r.forEach(function(n){t.awesomeThings.push(n)})}return t.$inject=["$scope","ConfigService"],t}());t.MainCtrl=o,angular.module(n.appModuleName).controller("MainCtrl",o)}(App||(App={}));var App;!function(t){var n;!function(){"use strict";var n=t.Core.Configuration;angular.module(n.appModuleName).config(["$stateProvider","$urlRouterProvider",function(t,n){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}),n.otherwise("/")}])}(n=t.Component||(t.Component={}))}(App||(App={}));var App;!function(t){var n;!function(n){var o;!function(){"use strict";var n=t.Core.Configuration;angular.module(n.appModuleName).constant("_",_)}(o=n.Vendor||(n.Vendor={}))}(n=t.Component||(t.Component={}))}(App||(App={})),angular.module("lightboxApp").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div ng-include="\'app/component/navbar/navbar.html\'"></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="{{assetsPath}}yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p><a class="btn btn-lg btn-success" ng-href="#">Splendid!</a></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="{{assetsPath}}{{awesomeThing.logo}}" alt="{{awesomeThing.title}}"><div class="caption"><h3>{{awesomeThing.title}}</h3><p>{{awesomeThing.description}}</p><p><a ng-href="{{awesomeThing.url}}">{{awesomeThing.url}}</a></p></div></div></div></div><hr><div class="footer"><p>With ♥ from <a href="https://twitter.com/Swiip">@Swiip</a></p></div></div>'),t.put("app/component/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></div></nav>')}]);