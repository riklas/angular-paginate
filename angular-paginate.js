angular.module("angular-paginate", [])

.controller("MainController", ["$scope", function($scope){
    
    $scope.pages = [];
    $scope.pageContent = [];
    // $scope.pc = []

    $scope.getResults = function(){
        $scope.results = [{name: 'a', avg: 3},{name: 'a', avg: 3},{name: 'a', avg: 3},{name: 'a', avg: 3},{name: 'a', avg: 3},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2}];    
    }
    
}])

.factory("stateService", function(){
    
    var numberPerPage;
    var results;

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
        }
    };
})

.controller("PaginationController", ["$scope", "stateService", function($scope, stateService){
   
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

        while(params.pageContent.length > 0) params.pageContent.pop();   
        
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
    
    // $scope.selectPage = function(pageNumber){
    //     $scope.currentPage = pageNumber;
    //     $scope.pageContent = paginationService.getPageContent($scope.currentPage);
    // };

    // $scope.nextPage = function(){
    //     if(isLastPage()){
    //         $scope.currentPage++;
    //         $scope.pageContent = paginationService.getPageContent($scope.currentPage);
    //     }
    // };

    // $scope.previousPage = function(){
    //     if(currentPage === 1){
    //         $scope.currentPage--;
    //         $scope.pageContent = paginationService.getPageContent($scope.currentPage);
    //     }
    // };
    
    // $scope.isLastPage = function(){
    //     return (currentPage + 1 > pageNumbers[pageNumbers.length - 1]) ? true : false
    // };

    // $scope.isFirstPage = function() {
    //     return (currentPage === 1) ? true : false;
    // };

    // $scope.getPages = function(){
    //     return paginationService.getPages();
    // };


    // $scope.paginationInit = function(model, limit){
    //     $scope.pageNumbers = createPages(model, limit);
    //     $scope.pageContent = getPageContent(1);
    //     $scope.currentPage = 1;
    // };

}])


.directive("createPages", function(){
    return {
        restrict: "A",
        scope: {
            results: "=",       
            numberPerPage: "@",
            pages: "=",
            pageContent: "="
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){ 
                scope.pages = [];

                var currentPage = 1;
                
                // gets last page number
                var pageMax = Math.ceil(scope.results.length / parseInt(scope.numberPerPage));
               
                // sets maximum number of page numbers to 15 if option not provided
                if(!scope.pageLimit) scope.pageLimit = 15;
                pageMax = (pageMax > scope.pageLimit) ? scope.pageLimit : pageMax;

                // // array to store page numbers
                for(var i = 1; i <= pageMax; i++){
                        scope.pages.push(i);
                };
                
                scope.setNumberPerPage(scope.numberPerPage);

                scope.setResults(scope.results);

                scope.getPageContent({page: currentPage, pageContent: scope.pageContent});

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
            // pageLimit: "@",             // optional: set the maximum page numbers to 15
            // binding: "@",               // optional: default pagination creation on click event. set to bind to any other type of event
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){

                scope.getPageContent({results: scope.results, page: parseInt(scope.page), pageContent: scope.pageContent });

                console.log(scope.pageContent[0]);
                scope.$apply();         // apply changes
            }); 
        }
    };
})

.directive("pagination-left", function(){
    return {
        restrict: "A",
        link: function(scope, elem, attrs){
            
        }
    };
})

.directive("pagination-right", function(){
    return {
        restrict: "A",
        link: function(scope, elem, attrs){
            
        }
    };
});
