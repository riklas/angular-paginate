angular.module("angular-paginate", [])

.controller("MainController", ["$scope", function($scope){
    
    $scope.pages = [];
    $scope.pageContent = [];

    $scope.getResults = function(){
        $scope.results = [  {name:"MSDhoni", avg: 67.72},
                            {name:"TMDilshan", avg: 54.91},
                            {name:"ABdeVilliers", avg: 53.73},
                            {name:"GJBailey", avg: 53.24},
                            {name:"VKohli", avg: 50.06},
                            {name:"KCSangakkara", avg: 50.05},
                            {name:"LRTaylor", avg: 47.86},
                            {name:"Misbah-ul-Haq", avg: 47.03},
                            {name:"SDhawan", avg: 46.76},
                            {name:"RAJadeja", avg: 46.41} ];    
    }
}])

.factory("stateService", function(){
    
    var numberPerPage;
    var results;
    var currentPage;
    var pageMax;

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

    // params : object with page attributes
    $scope.getPageContent = function(params){
        var numberPerPage = stateService.getNumberPerPage();
        var results = stateService.getResults();
        var startIndex = numberPerPage * params.page - numberPerPage;

        while(params.pageContent.length > 0) params.pageContent.pop();      // clear previous page content 
        
        if(results){

            // if there are less results than number per page, display all results in pageContent
            if((startIndex + numberPerPage - 1) > results.length){
                for(var i = startIndex; i < results.length; i++){
                    params.pageContent.push(results[i]);
                }
            } else {
                for(var i = startIndex; i < (numberPerPage + startIndex); i++){
                    params.pageContent.push(results[i]);
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
            // pageLimit: "@",             // optional: set the maximum page numbers to 15
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){ 
                scope.pages = [];
                
                // gets last page number
                var pageMax = Math.ceil(scope.results.length / parseInt(scope.numberPerPage));
               
                // sets maximum number of page numbers to 15 if option not provided
                if(!scope.pageLimit) scope.pageLimit = 15;
                pageMax = (pageMax > scope.pageLimit) ? scope.pageLimit : pageMax;

                // // array to store page numbers
                for(var i = 1; i <= pageMax; i++){
                        scope.pages.push(i);
                };
                
                // store pageMax in service to access when styling right-pagination
                scope.setPageMax(pageMax);

                // set number of results per page
                scope.setNumberPerPage(scope.numberPerPage);

                // results = data set
                scope.setResults(scope.results);

                // intialise current page as 1
                scope.setCurrentPage(1);

                scope.getPageContent({page: 1, pageContent: scope.pageContent});

                scope.$apply();         // apply changes
            });
        }
    };
})

.directive("pagination", function(){
    return {
        restrict: "A",
        scope: {
            pageContent: "=",
            page: "@",
            // binding: "@",               // optional: default pagination creation on click event. set to bind to any other type of event
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){

                // set current page (for styles)
                scope.setCurrentPage(parseInt(scope.page));

                // get content for selected page
                scope.getPageContent({page: parseInt(scope.page), pageContent: scope.pageContent });

                scope.$apply();         // apply changes
            }); 
        }
    };
})

.directive("paginationLeft", function(){
    return {
        restrict: "A",
        scope: {
            pageContent: "=",
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                var currentPage = scope.getCurrentPage();
                
                if(currentPage !== 1){
                    scope.setCurrentPage( --currentPage );                                           // move to previous page
                    scope.getPageContent({page: currentPage, pageContent: scope.pageContent });      // reset content to previous page
                    scope.$apply();     // apply changes
                }
            });
        }
    };
})

.directive("paginationRight", function(){
    return {
        restrict: "A",
        scope: {
            pageContent: "=",
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                var currentPage = scope.getCurrentPage();
                
                if(currentPage !== scope.getPageMax()){
                        scope.setCurrentPage(++currentPage);
                        scope.getPageContent({page: currentPage, pageContent: scope.pageContent});
                        scope.$apply();                 // apply changes                    
                }
            });
        }
    };
});
