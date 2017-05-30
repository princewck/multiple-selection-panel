[TOC]

# Select-panel

a muti-select panel build with angular1.* directive weigh at a 7kb js and a 15kb css files.

demo: princewck.github.io/select-panel



## Dependencies

angularJs  @v1.5+



## Usage

To use the directive, include the select-panel or minified version javascript and css files in your web page:

```html
<!DOCTYPE HTML>
<html>
<head>
  <link href="vendor/select-panel/select-panel.css" rel="stylesheet" type="text/css" />
</head>
<body ng-app="app">
  <!--...-->
  <script src="src/select-panel/select-panel.js"></script>
</body>
</html>
```

Then, add module dependency in ur angular app:

```javascript
angular.module('app', ['ck.directives']);
```

Finally, all this directive anywhere in your app

```html
<select-panel ng-model="selectItems" pick-items-from="categories" 
              array-keys="subGroups=>tags"
              cascade = "true"
              track-by = "id"
              static/>
```

## DOC

| Option          | Restrict |   Default    |               Description                |
| :-------------- | :------: | :----------: | :--------------------------------------: |
| ng-model        | required |      /       |  model bind to your select items array   |
| pick-items-from | required |      /       |         the dictionery item tree         |
| track-by        | required |      /       | track and identify  leaf items by this key |
| array-keys      | required |      /       | specify the array keys form level two, split with '=>', eg: 'subgroups=>tags' |
|                 |          |              |                                          |
| name-keys       | optional | 'name,…name' | specify the name keys for each level of your tree |
| cascade         | optional |              | default show `direct mode`or `cascade mode` |
| static          | optional |              | show as `static mode` which the panel nested in the dom otherwise the select  panel will present with a dropdown menu. |



## Example

```html
<div class="container" ng-controller="panelContoller">
  <select-panel ng-model="selectItems" 
               pick-items-from="categories" 
               array-keys="subGroups=>tags"
               name-keys="groupName,subGroupName,tagName"
               cascade = "true"
               track-by = "id"
               static/>
</div>
```



controller:

```javascript
app.controller('panelContoller', ['$scope', function() {
	//here we track by `id`, so `id` must specified and with id we know its real item in the panel item list.
  	$scope.selectItems = [
      {id: 5},
      {id: 10}
	];
    
  	//test data
    $scope.categories = [
      {
        id: 1,
        groupName: 'group1',
        subGroups: [
          {
            id:1,
            subGroupName: 'sb1',
            tags: [
              {
                id: 1,
                tagName: 'tag1'
              },
              {
                id: 2,
                tagName: 'tag2'
              }
            ]
          },
          {
            id:2,
            subGroupName: 'sb2',
            tags: [
              {
                id: 3,
                tagName: 'tag3'
              },
              {
                id: 4,
                tagName: 'tag4'
              }
            ]
          }          
        ]
      },
      {
        id: 2,
        groupName: 'group2',
        subGroups: [
          {
            id:3,
            subGroupName: 'sb3',
            tags: [
              {
                id: 5,
                tagName: 'tag5'
              },
              {
                id: 6,
                tagName: 'tag6'
              }
            ]
          },
          {
            id:4,
            subGroupName: 'sb4',
            tags: [
              {
                id: 7,
                tagName: 'tag7'
              },
              {
                id: 8,
                tagName: 'tag8'
              }
            ]
          }          
        ]
      }      
    ];
  
}])
```