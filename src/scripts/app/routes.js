app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'homeController',
            controllerAs: 'home'
        })
        .state('readme', {
            url: '/readme',
            templateUrl: 'readme/readme.html',
            controller: 'readmeController',
            controllerAs: 'readme'
        });
}]);