app.directive('selectPanel', ['$parse', ($parse) => ({
    restrict: 'E',
    require: 'ngModel',
    templateUrl: 'select-panel/template.html',
    link: (scope, elements, attrs, ngModelCtrl) => {
        //初始化显示类型: 级联|直接
        let cascadeAsDefault = attrs.cascade == 'true' ? true : false;
        scope.cascade = cascadeAsDefault || false;

        //按数组顺序查找每一级
        let arrayKeys = angular.isString(scope.arrayKeys) ? scope.arrayKeys.trim().split('=>') : [];
        let treeLength = arrayKeys.length + 1;//多少列,树的深度+1

        //每一级显示名映射的字段名,默认全部为name
        var _defaultNameKeys = [];
        for (let i = 0; i < treeLength; i++) {
            _defaultNameKeys.push('name');
        }
        scope.nameKeys = attrs.hasOwnProperty('nameKeys') ? attrs.nameKeys.split(',') : _defaultNameKeys;

        let items = $parse(attrs['ngModel'])(scope.$parent);
        //默认选中项目
        scope.selectedItems = {};
        //获取第几列的数据 0开始
        let _emptyItems = [];
        let data = scope.data;
        let getItems = index => {
            let item = {};
            let list = data;
            for (let i = 0; i < index; i++) {
                var selectedIndex = scope.selectedItems[i] || 0;
                item = list[selectedIndex];
                if (!item) {
                    return _emptyItems;
                }
                list = item[arrayKeys[i]] || _emptyItems;
            }
            return list;
        }
        scope.$watch('data', (newVal, oldVal) => {
            //确保数据副本为最新
            data = angular.copy(newVal);
        });

        //输出扁平化数据，最后一级:标签列表
        const flatItems = (data) => {
            let item = {};
            let list = data;
            for (let i = 0; i < treeLength; i++) {
                //递归，输出扁平化数据
            }
            return list;
        }

        function reduceGroups(items, key) {
            scope.nameKeys
        }

        scope.getColumns = (function () {
            var columns = [];
            return function () {
                columns.splice(0, columns.length);
                for (let i = 0; i < treeLength; i++) {
                    columns.push(getItems(i));
                }
                return columns;
            }
        }());

        //获取某一列中选中项index
        scope.getSelectedIndex = (columnIndex) => {
            if (scope.selectedItems[columnIndex])
                return scope.selectedItems[columnIndex];
            else
                return 0;
        }

        scope.clickItem = (columnIndex, rowIndex) => {
            if (scope.selectedItems[columnIndex] == rowIndex) return;
            scope.selectedItems[columnIndex] = Number(rowIndex);
            Object.keys(scope.selectedItems).forEach(key => {
                if (key > columnIndex) {
                    delete scope.selectedItems[key];
                }
            });
        }

        ngModelCtrl.$formatters.push(modelValue => {
            if (typeof modelValue == 'undefined')
                return [];
            return modelValue;
        });
    },
    scope: {
        data: '=pickItemsFrom',
        arrayKeys: '@',//每一级的子节点数组字段名,从第二级开始制定，因为data[arrayKeys[0]]已经是默认第一级数组了
    }
})]);