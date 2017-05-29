let homeController = ($scope, $http) => {
    const vm = this;
    $scope.categories = [];
    $scope.selectItems = [];

    $http.get('./api/home/tagCategories.json')
        .then(res => {
            if (angular.isArray(res.data)) {
                console.log(res.data);
                $scope.categories = res.data;
            }
        });

};
homeController.$inject = ['$scope', '$http'];

app.controller('homeController', homeController);