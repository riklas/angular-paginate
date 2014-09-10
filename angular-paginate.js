angular.module("angular-paginate", [])

.controller("MainController", ["$scope", function($scope){
    
    $scope.pages = [];
    $scope.pageContent = [];
    // $scope.pc = []

    $scope.getResults = function(){
        $scope.results = [{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2},{name: 'a', avg: 2}];    
    }
    
}])

.controller("PaginationController", ["$scope", function($scope){
   
    
    // $scope.pageContent = [];

    // params : object with results, numberPerPage, page attributes
    $scope.getPageContent = function(params){

        var startIndex = params.numberPerPage * params.page - params.numberPerPage;
        var newContent = [];
        
        if(params.results){

            // if there are less results than number per page, display all results in pageContent
            if((startIndex + params.numberPerPage - 1) > params.results.length){
                for(var i = startIndex; i < params.results.length; i++){
                    newContent.push(params.results[i]);
                }
            } else {
                for(var i = startIndex; i < (params.numberPerPage + startIndex); i++){
                    newContent.push(params.results[i]);
                };
            };

            return newContent;            
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
                scope.pageContent = [];
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
                
                scope.pageContent = scope.getPageContent({results: scope.results, page: currentPage, numberPerPage: parseInt(scope.numberPerPage)})

                scope.$apply();         // apply changes
            });
        }
    };
})

.directive("pagination", function(){
    return {
        restrict: "A",
        scope: {
            results: "=",  
            page: "@",
            numberPerPage: "@",
            pageContent: "=",
            pageLimit: "@",             // optional: set the maximum page numbers to 15
            binding: "@",               // optional: default pagination creation on click event. set to bind to any other type of event
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                console.log(scope.pageContent);
                a = [{name: 't', avg: 1}];
                scope.pageContent = a.slice(0);
                scope.$apply();
                // scope.pageContent = scope.getPageContent({results: scope.results, page: scope.page, numberPerPage: parseInt(scope.numberPerPage)});
                console.log(scope.pageContent);

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
