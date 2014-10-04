# angular-paginate


Module that provides UI-agnostic dynamic or static pagination using angular js.


Can be plugged into any css framework/use your own styles for pagination.

- UI agnostic pagination - no dependencies except angular js
- Display pagination on double-click, mouseover, focus, blur and all supported angular event bindings
- Ease-of-use - implemented as angular directives
- Supports static or dynamic data sets


## Demo
See examples on how it has been used with twitter bootstrap css:

http://riklas.github.io/angular-paginate

http://jsfiddle.net/rikin5/eps38o0m/3/


## Browser Support
* Chrome
* Firefox
* IE8+

## Setup

Only AngularJs is required to use this module, css frameworks can be complimentary.

Download angular-paginate.js and import it in your angular application

```javascript
angular.module('myApp', ['angular-paginate']);
```
## Usage
angular-paginate is based on the usage of directives:

### create-pages directive

Used to display initial pagination. Must be setup before the pagination directive and in the DOM element that leads to pagination creation.

```html
<button create-pages results="results" number-per-page="10" ng-click="getResults();showPaginate=true" pages="pages" page-content="pageContent" page-limit="15" binding="mouseup">Paginate!</button>
```

* ```results```:  binds to list that holds your pagination data. **required**
* ```number-per-page```:  set number of data items to be displayed per page. **required**
* ```pages```: binds to list that will hold page numbers that you will display. **required**
* ```page-content```: binds to list that will hold data items for a single page. **required**
* ```page-limit```: maximum page number. optional (default = 15)
* ```binding```: event (click, mouseup etc.) that will trigger pagination. optional (default = "click")
                 **Note:** this event must correspond with angular's event binding directive. So if binding="click", you must                     include ng-click in the directive. If binding="mouseover", ng-mouseover.
* ```ng-click```: angular directive that should correspond to the binding attribute, to populate results list and display pagination when the specified event is fired.


### pagination directive

set disabled css class on left arrow pagination by calling convenience method isFirstPage
```html
<li ng-class="{disabled: isFirstPage()}" pagination-left ><a>&laquo;</a></li>
```

set pagination to display numbers from your pages list provided in the create-pages directive, and set active css class calling convenience method getCurrentPage().
```html
<li pagination ng-class="{active: page == getCurrentPage() }" page="{{page}}" ng-repeat="page in pages">
    <a>{{page}}</a>
</li>
```

set disabled css class on right arrow pagination by calling convenience method isLastPage
```html
<li ng-class="{disabled: isLastPage()}" pagination-right ><a>&raquo;</a></li>
```

display content from your page-content list provided in the create-pages directive
```html
<table class="table">
  <thead>
      <tr>
          <th>Player</th>
          <th>Goals</th>
      </tr>
  </thead>
  <tbody>
      <tr ng-repeat="content in pageContent">
          <td>{{content.name}}</td>
          <td>{{content.goals}}</td>
      </tr>
  </tbody>
</table>
```

