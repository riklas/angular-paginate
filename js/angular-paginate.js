angular.module("angular-paginate", [])

.factory("stateService", function(){
    
    var numberPerPage;
    var results;
    var currentPage;
    var pageMax;
    var pageContent;

    return {
        setNumberPerPage: function(_numberPerPage_){
            numberPerPage = parseInt(_numberPerPage_);
        },

        getNumberPerPage: function(){
            return numberPerPage;
        },

        setResults: function(_results_){
            results = _results_.slice(0);
        },

        getResults: function(){
            return results;
        },

        setCurrentPage: function(_currentPage_){
            currentPage = _currentPage_;
        },

        getCurrentPage: function(){
            return currentPage;
        },

        setPageMax: function(_pageMax_){
            pageMax = _pageMax_;
        },

        getPageMax: function(){
            return pageMax;
        },

        setPageContent: function(_pageContent_){
            pageContent = _pageContent_;
        },

        getPageContent: function(){
            return pageContent;
        }
    };
})

.controller("PaginationController", ["$scope", "stateService", function($scope, stateService){
    
    $scope.setPageMax = function(pageMax){
        stateService.setPageMax(pageMax);
    };

    $scope.getPageMax = function(){
        return stateService.getPageMax();
    }

    $scope.isFirstPage = function(){
        return ($scope.getCurrentPage() === 1) ? true : false;
    };

    $scope.isLastPage = function(){
        return ($scope.getCurrentPage() === $scope.getPageMax()) ? true : false
    };

    $scope.getCurrentPage = function(){
        return stateService.getCurrentPage();
    }

    $scope.setCurrentPage = function(currentPage){
        stateService.setCurrentPage(currentPage);
    }

    $scope.setNumberPerPage = function(numberPerPage){
        stateService.setNumberPerPage(numberPerPage);
    }

    $scope.setResults = function(results){
        stateService.setResults(results);
    }

    $scope.setPageContent = function(pageContent){
        stateService.setPageContent(pageContent);
    }

    $scope.getPageContent = function(page){
        var numberPerPage = stateService.getNumberPerPage();
        var results = stateService.getResults();
        var startIndex = numberPerPage * page - numberPerPage;
        var pageContent = stateService.getPageContent();

        while(pageContent.length > 0) pageContent.pop();      // clear previous page content 
        
        if(results){
            // if there are less results than number per page, display all results in pageContent
            if((startIndex + numberPerPage - 1) > results.length){
                for(var i = startIndex; i < results.length; i++){
                    pageContent.push(results[i]);
                }
            } else {
                for(var i = startIndex; i < (numberPerPage + startIndex); i++){
                    pageContent.push(results[i]);
                    if(i === results.length) break;
                };
            };
        };
    };
    
}])


.directive("createPages", function(){
    return {
        restrict: "A",
        scope: {
            results: "=",       
            numberPerPage: "@",
            pages: "=",
            pageContent: "=",
            pageLimit: "@",                  // optional: default maximum page numbers = 15
            binding: "@"                     // optional: default pagination creation = on 'click'
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            
            // check if binding attribute present otherwise default to click
            if(!scope.binding) scope.binding = "click";
            
            elem.bind(scope.binding, function(){ 
                scope.pages = [];
                
                // gets last page number
                var pageMax = Math.ceil(scope.results.length / parseInt(scope.numberPerPage));                
               
                // sets maximum number of page numbers to 15 if option not provided
                if(!scope.pageLimit) scope.pageLimit = 15;
                pageMax = (pageMax > parseInt(scope.pageLimit)) ? parseInt(scope.pageLimit) : pageMax;

                // // array to store page numbers
                for(var i = 1; i <= pageMax; i++){
                        scope.pages.push(i);
                };
                
                // store pageMax in service to access when styling right-pagination
                scope.setPageMax(pageMax);

                // set number of results per page
                scope.setNumberPerPage(scope.numberPerPage);

                // set page content variable
                scope.setPageContent(scope.pageContent);

                // results = data set
                scope.setResults(scope.results);

                // intialise current page as 1
                scope.setCurrentPage(1);

                // update pageContent with page 1
                scope.getPageContent(1);

                scope.$apply();         // apply changes
            });
        }
    };
})

.directive("pagination", function(){
    return {
        restrict: "A",
        scope: {
            page: "@"
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){

                // set current page (for styles)
                scope.setCurrentPage(parseInt(scope.page));

                // get content for selected page
                scope.getPageContent(parseInt(scope.page));

                scope.$apply();         // apply changes
            }); 
        }
    };
})

.directive("paginationLeft", function(){
    return {
        restrict: "A",
        scope: {},
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                var currentPage = scope.getCurrentPage();
                
                if(currentPage !== 1){
                    scope.setCurrentPage( --currentPage );          // move to previous page
                    scope.getPageContent(currentPage);              // reset content to previous page
                    scope.$apply();                                 // apply changes
                }
            });
        }
    };
})

.directive("paginationRight", function(){
    return {
        restrict: "A",
        scope: {},
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                var currentPage = scope.getCurrentPage();
                
                if(currentPage !== scope.getPageMax()){
                        scope.setCurrentPage(++currentPage);        // move to next page
                        scope.getPageContent(currentPage);          // reset contents to next page
                        scope.$apply();                             // apply changes
                }
            });
        }
    };
});
