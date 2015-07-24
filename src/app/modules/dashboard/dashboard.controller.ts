'use strict';
import * as clientConfig from '../../client.config';
import {ngController} from '../../ng.decorators';

//import {ConfigService} from '../../components/configuration/config.service';
import * as dashboard from './dashboard.service';

@ngController
export class DashboardController {
    public navbladeConfig;
    public basketCollection = [];

    protected $translate;
    protected $scope;
    protected clientConfig;
    protected dashboardService;

    /** @ngInject */
    constructor($scope: ng.IScope,
                ConfigService: any,
                DashboardService: dashboard.IDashboardService,
                $filter: ng.IFilterService) {

        var appConfig = ConfigService.getConfig();
        this.clientConfig = clientConfig.getClientConfig();
        this.dashboardService = DashboardService;
        this.$translate = $filter('translate');
        this.$scope = $scope;
        this.navbladeConfig = {
            // classes: 'navblade-default',
            logo: {
                src: appConfig.baseUrl + appConfig.staticPath + 'assets/images/logo.png',
                link: '#/dashboard',
                classes: ''
            },
            navigation: [{
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


        this._getBasketCollection();
        this._getReviewCollection();
    }

    private _getReviewCollection() {
        // @TODO
    }

    private _getBasketCollection() {
        this.dashboardService.getBasketCollection()
            .then( (response: any) => {

            this.basketCollection = response;
            console.log('response', response);
        });
    }


}

