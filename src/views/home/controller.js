let homeController = ($scope, $http) => {
    const vm = this;
    $scope.categories = [];
    $scope.selectItems = [{id:1}, {id:5}];

    $http.get('./api/home/tagCategories.json')
        .then(res => {
            if (angular.isArray(res.data)) {
                $scope.categories = res.data;
            }
        });

    $scope.delete = function(index) {
        $scope.selectItems.splice(index, 1);
    }

};
homeController.$inject = ['$scope', '$http'];
app.controller('homeController', homeController);