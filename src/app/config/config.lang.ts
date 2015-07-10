module App {
    'use strict';

    export class LangConfig {

        /** @ngInject */
        constructor(ConfigServiceProvider: App.Components.ConfigService,
                    $translateProvider: angular.translate.ITranslateProvider) {

            var locale = (<any> ConfigServiceProvider).getConfig('locale');
            $translateProvider.translations('en', {
                'app.name': 'Reports',
                'app.sidebar.title': 'Menu',
                'app.link.label.applications': 'Applications',
                'app.link.label.profile': 'Profile',
                'app.link.label.profile.login': 'Login',
                'app.link.label.profile.logout': 'Logout',
                'app.link.label.dashboard': 'Dashboard',
                'app.link.label.medias': 'Medias',
                'app.link.label.user': 'Users',
                'app.link.back': 'Back',

                'app.dashboard.ctrl.title': 'Dashboard',
                'app.dashboard.validation.title': 'Validations en cours',
                'app.dashboard.basket.title': 'Paniers reçus',

                'app.unauthorized.title': 'Session Expired',
                'app.unauthorized.msg': 'Your session has expired, you will be redirected to the login form',
                'app.unauthorized.action': 'Go to Login',
                'app.user.searchform.input.placeholder': 'Search'

            });

            $translateProvider.translations('fr', {
                'app.name': 'Reports',
                'app.sidebar.title': 'Menu',
                'app.link.label.applications': 'Applications',
                'app.link.label.profile': 'Profil',
                'app.link.label.profile.login': 'Connexion',
                'app.link.label.profile.logout': 'Déconnexion',
                'app.link.label.dashboard': 'Tableau de bord',
                'app.link.label.medias': 'Medias',
                'app.link.label.user': 'Utilisateurs',
                'app.link.back': 'Retour',

                'app.dashboard.ctrl.title': 'Tableau de bord',
                'app.dashboard.validation.title': 'Validations en cours',
                'app.dashboard.basket.title': 'Paniers reçus',


                'app.unauthorized.title': 'Session Expirée',
                'app.unauthorized.msg': 'Votre session a expiré, vous allez être redirigé ver le formulaire de' +
                ' connexion',
                'app.unauthorized.action': 'Go to Login',
                'app.user.searchform.input.placeholder': 'Search'

            });

            $translateProvider
                .useSanitizeValueStrategy('escaped')
                .preferredLanguage(locale);
        }

    }

    App.getModule()
        .config(LangConfig);
}
