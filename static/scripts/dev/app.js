angular.module('app', ['ui.router', 'ngCookies', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/events');

        $stateProvider
            .state('/', {
                url: '/',
                abstact: 'true'
            })

            .state('events', {
                url: '/events',
                controller: 'EventsController',
                controllerAs: 'eventsCtrl',
                templateUrl: 'scripts/dev/activity/events/events-activity.tmpl.html'
            })

            .state('details', {
                url: '/details',
                controller: 'DetailsController',
                controllerAs: 'detailsCtrl',
                templateUrl: 'scripts/dev/activity/details/details-activity.tmpl.html'
            })
    });

/*Controllers*/
angular.module('app')
    .controller('AddEventDialogController', AddEventDialogController)
    .controller('AddContractDialogController', AddContractDialogController)
    .controller('AddDetailDialogController', AddDetailDialogController)
    .controller('DetailsController', DetailsController)
    .controller('EventsController', EventsController);


/*Directives*/
angular.module('app')
    .directive('dialogWrap', dialogWrapDirective)
    .directive('detailsLayout', detailsLayoutDirective)
    .directive('detailItem', detailItemDirective)
    .directive('detailContract', detailContractDirective)
    .directive('eventsLayout', eventsLayoutDirective)
    .directive('eventItem', eventItemDirective)
    .directive('mainHeader', mainHeaderDirective);

/*Factories*/
angular.module('app')
    .factory('dialogWrapFactory', dialogWrapFactory)
    .factory('detailsFactory', detailsFactory)
    .factory('eventsFactory', eventsFactory)
    .factory('restServiceFactory', restServiceFactory);

/*Animations*/
angular.module('app')
    .animation('.tableAnimation', tableAnimation);