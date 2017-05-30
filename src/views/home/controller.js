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
        //这里必须用新数组，不能改变原来的数组
        $scope.selectItems = $scope.selectItems.slice(0, index)
            .concat($scope.selectItems.slice(index+1, $scope.selectItems.length));
    }

};
homeController.$inject = ['$scope', '$http'];
app.controller('homeController', homeController);