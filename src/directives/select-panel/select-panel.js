angular.module('ck.directives', []).directive('selectPanel', ['$parse', '$timeout', ($parse, $timeout) => ({
    restrict: 'E',
    require: 'ngModel',
    templateUrl: 'select-panel/template.html',
    link: (scope, elements, attrs, ngModelCtrl) => {
        scope.directiveId = scope.$id;
        //初始化显示类型: 级联|直接
        let cascadeAsDefault = attrs.cascade == 'true' ? true : false;
        scope.cascade = cascadeAsDefault || false;

        scope.searchPanelVisible = attrs.hasOwnProperty('static') || false;
        scope.togglePanelVisiblity = function (event) {
            event.stopPropagation();
            if (attrs.hasOwnProperty('static')) return;
            scope.searchPanelVisible = !scope.searchPanelVisible;
        }
        const handler = (event) => {
            event.stopPropagation();
            scope.searchPanelVisible && (scope.$apply(scope.searchPanelVisible = false));
        };
        scope.noHide = (event) => {
            event.stopPropagation();
        }

        scope.staticMode = () => {
            return attrs.hasOwnProperty('static');
        }

        //静态显示模式(只显示结果input)，亦或是absolute模式(点击才显示)选择框
        if (!attrs.hasOwnProperty('static')) {
            document.addEventListener('click', handler);
            scope.$on('$destory', function () {
                document.removeEventListener('click', handler);
            });
        }

        //按数组顺序查找每一级
        let arrayKeys = angular.isString(attrs.arrayKeys) ? attrs.arrayKeys.trim().split('=>') : [];
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

        scope.flatItems = [];
        scope.$watch('data', (newVal, oldVal) => {
            //确保数据副本为最新
            data = angular.copy(newVal);
            scope.flatItems = flat(data);
        });

        //输出扁平化数据，最后一级:标签列表
        const flat = (data) => {
            let tempdata = data;
            for (let i = 0; i < treeLength - 1; i++) {
                let arr = [];
                tempdata.forEach((d, index) => {
                    d['tree'] = d['tree'] || [];
                    d['tree'].push('' + i + ',' + index);
                    d['tree'] = [...new Set(d['tree'])];
                    var subItems = d[arrayKeys[i]] || [];
                    subItems.forEach(item => {
                        item['tree'] = d.tree || [];
                        item['tree'].push('' + i + ',' + index);
                        item['tree'] = [...new Set(item['tree'])];
                    });
                    arr.push.apply(arr, subItems);
                });
                tempdata = arr;
            }
            return tempdata;
        }

        scope.visibleColumnRowMatches = [];
        scope.$watch('_searchQuery', function (newVal, oldVal) {
            let visibleColumnRowMatches = new Set();
            if (newVal) {
                scope.flatItems.forEach(item => {
                    item._match = false;
                    let pattern = new RegExp(String(newVal).trim().split('').join('(.)*'), 'ig');
                    let canItemMatch = pattern.test(item[scope.nameKeys[scope.nameKeys.length - 1]]);
                    if (canItemMatch) {
                        // item = angular.copy(item);
                        item._match = true;
                        let tree = item.tree || [];
                        tree.forEach(columnInfo => {
                            visibleColumnRowMatches.add(columnInfo);
                        });
                    } else {
                        item._match = false;
                    }
                });
            }
            scope.visibleColumnRowMatches = [...visibleColumnRowMatches];
            $timeout(() => {
                //here is a trick,expand lists to the first valid item
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click");
                let uls = document.getElementsByClassName('select-panel-list-wrapper')[0]
                    .getElementsByClassName('select-panel-list');
                    Array.prototype.forEach.call(uls, (ul, index) => {
                        setTimeout(() => {
                            let lis = ul.getElementsByTagName('li');
                            Array.prototype.some.call(lis, (li, index) => {
                                if (li.className.indexOf('ng-hide') < 0) {
                                    li.dispatchEvent(e);
                                    return true;
                                }
                            });
                        }, index * 80);
                    });
            }, 100);
        });

        //过滤可见性
        scope.rowVisible = (item, columnIndex, rowIndex) => {
            if (!scope._searchQuery) return true;
            if (item.hasOwnProperty('_match')) return item._match;
            item.tree = item.tree || [];
            let aimMatch = scope.visibleColumnRowMatches.filter(m => {
                return m.indexOf(columnIndex + '') == 0;
            });
            let visible = aimMatch.some(m => {
                return item.tree.some(_m => {
                    return m == _m;
                });
            });
            return visible;
        }

        scope.toggleMode = (isCascade) => {
            scope.selectedItems = {};
            scope.cascade = Boolean(isCascade);
        }

        //取消已经勾选的Tag
        scope.uncheck = function (item, event) {
            event.stopPropagation();
            delete item.checked;
        }

        //获取所有列的数据
        scope.getColumns = (function () {
            // var columns = [];
            // var lastCascade = scope.cascade;
            // var lastData = [];
            // var lastSelectedItems = [];
            return function (cascade) {
                let columns = [];
                // if (lastCascade == scope.cascade
                //     && lastData == scope.flatItems
                //     && lastSelectedItems == scope.selectedItems) {
                //     return columns;
                // }
                // lastCascade = cascade || scope.cascade;
                // lastData = scope.flatItems;
                // lastSelectedItems = scope.selectedItems;
                columns.splice(0, columns.length);
                if (!cascade) {
                    //‘直接选择’模式，直接输出最后一级扁平化数据
                    columns.push(scope.flatItems)
                    return columns;
                }
                for (let i = 0; i < treeLength; i++) {
                    columns.push(getItems(i));
                }
                return columns;
            }
        }());

        scope.$on('$destory', function () {
            //gc manually
            columns = lastCascade = lastData = lastSelectedItems = null;
        });

        //获取某一列中选中项index
        scope.getSelectedIndex = (columnIndex) => {
            if (scope.selectedItems[columnIndex])
                return scope.selectedItems[columnIndex];
            else
                return 0;
        }

        //点击列表项，切换联动显示
        scope.clickItem = (columnIndex, rowIndex) => {
            if (scope.selectedItems[columnIndex] == rowIndex) return;
            let o = {};
            o[columnIndex] = Number(rowIndex);
            scope.selectedItems = Object.assign({}, scope.selectedItems, o);
            Object.keys(scope.selectedItems).forEach(key => {
                if (key > columnIndex) {
                    delete scope.selectedItems[key];
                }
            });
        }

        scope.getCheckedItems = (function () {
            let _emptyItems = [];
            let checkedItems = [];
            return function () {
                if (!angular.isArray(scope.flatItems)) return _emptyItems;
                checkedItems.splice(0, checkedItems.length);
                var arr = scope.flatItems.filter(item => item.checked);
                return checkedItems.push.apply(checkedItems, arr), checkedItems;
            }
        }());

        scope.getModelValues = function () {
            var model = $parse(attrs.ngModel)(scope.$parent);
            return model.map(v => v[attrs.trackBy]).join(',');
        }


        let watcher = function (newVal, oldVal) {
            var model = $parse(attrs.ngModel)(scope.$parent);
            var ids = model.map(item => item[attrs.trackBy]);
            scope.flatItems.forEach(item => {
                if (ids.indexOf(item[attrs.trackBy]) >= 0) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            if (scope.flatItems.length) {
                ngModelCtrl.$setViewValue(scope.getCheckedItems());
            }
        };
        scope.$watchGroup(['getModelValues()', 'flatItems'], watcher);

        /**
         * 样式控制
         */
        scope.panelPositionStyle = function () {
            let isStatic = attrs.hasOwnProperty('static');
            let columnCount = scope.nameKeys.length;
            let absolutewidth = columnCount * 180;
            if (isStatic) {
                return {
                    position: 'static',
                    width: '100%'
                }
            }
            return {
                position: 'absolute',
                width: scope.cascade ? absolutewidth + 'px' : '300px',
                zIndex: 1000
            };
        }
    },
    scope: {
        data: '=pickItemsFrom',
        // arrayKeys: '@',//每一级的子节点数组字段名,从第二级开始制定，因为data[arrayKeys[0]]已经是默认第一级数组了
    }
})]);