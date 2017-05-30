let homeController = ($scope, $http) => {
    const vm = this;
    $scope.categories = [];
    loadApi('./api/home/tagCategories.json', 'categories');
    $scope.selectItems = [{ id: 1 }, { id: 5 }];

    $scope.tags = [];
    loadApi('./api/home/tags.json', 'tags');
    $scope.selectItems2 = [{id: 5}];


    

    function loadApi(url, instance) {
        $http.get(url)
            .then(res => {
                if (angular.isArray(res.data)) {
                    $scope[instance] = res.data;
                }
            });
    }

    $scope.delete = function (index) {
        //这里必须用新数组，不能改变原来的数组
        $scope.selectItems = $scope.selectItems.slice(0, index)
            .concat($scope.selectItems.slice(index + 1, $scope.selectItems.length));
    }

    $scope.deleteTag = function (index) {
        $scope.selectItems2 = $scope.selectItems2.slice(0, index)
            .concat($scope.selectItems2.slice(index + 1, $scope.selectItems2.length));
    }    

};
homeController.$inject = ['$scope', '$http'];
app.controller('homeController', homeController);