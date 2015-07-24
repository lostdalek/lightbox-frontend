'use strict';

// import {ConfigService} from '../components/configuration/config.service';
// import {ConfigService} from './components/configuration/config.service';
import {ngController} from '../ng.decorators';

@ngController
export class MainController {
    public isToggledLeftSidebar = false;
    public navbladeConfig = {};
    public sidebarConfig = {};
    protected $translate;
    protected $state;

    /** @ngInject */
    constructor(toastr: Toastr,
                ConfigService: any,
                $scope: ng.IScope,
                $filter: ng.IFilterService,
                $state: ng.ui.IStateService) {
        var appConfig = ConfigService.getConfig();
        this.$translate = $filter('translate');
        this.$state = $state;

        console.log('main controller up')
        this.navbladeConfig = {
            // classes: 'navblade-default',
            logo: {
                src: appConfig.baseUrl + appConfig.staticPath + 'assets/images/logo.png',
                link: '#/dashboard',
                classes: ''
            },
            navigation: [{
               label: this.$translate('app.link.label.applications'),
               children: [{
                    // href: '',
                    // sref: '',
                    label: 'Parade'
               }, {
                   // href: '',
                   // sref: '',
                   label: 'Phraseanet'
               }]
            }, {
                label: this.$translate('app.link.label.profile'),
                classes: 'iconProfile',
                labelAsImage: true,
                icon: false,
                // iconClasses: 'glyphicon glyphicon-user',
                children: [{
                    link: 'nope',
                    label: 'Profile'
                }, {
                    link: 'nope',
                    label: 'Login'
                }, {
                    link: 'nope',
                    label: 'Logout'
                }]
            }]
        };

        this.sidebarConfig =  {
            title: this.$translate('app.sidebar.title'),
            navigation: [{
                label: this.$translate('app.link.label.dashboard'),
                icon: true,
                iconClasses: 'glyphicon glyphicon-dashboard',
                // href: '',
                parent: 'main.dashboard',
                sref: 'main.dashboard',

            }, {
                label: this.$translate('app.link.label.medias'),
                icon: true,
                iconClasses: 'glyphicon glyphicon-picture',
                // href: '',
                parent: 'main.medias',
                sref: 'main.medias.list',
                children: [{
                    label: this.$translate('app.link.label.medias'),
                    icon: true,
                    iconClasses: 'glyphicon glyphicon-picture',
                    // href: '',
                    parent: 'main.medias',
                    sref: 'main.medias.list',
                }]

            }, {
                label: this.$translate('app.link.label.user'),
                icon: true,
                iconClasses: 'glyphicon glyphicon-user',
                // href: '',
                parent: 'main.user',
                sref: 'main.user.list'

            }]
        };

    }

    public toggleLeftSideBar(): void {
        this.isToggledLeftSidebar = !this.isToggledLeftSidebar;
    }

    public showToastr() {
        toastr.info('info');
    }
}
