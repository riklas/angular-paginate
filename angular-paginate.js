angular.module("angular-paginate", [])

.controller("PaginationController", ["$scope", function($scope){
    $scope.pages = [1,2,3,4,5];
    var results = [];
    $scope.numberPerPage = 15;
    var currentPage = 1;    
    
    $scope.selectPage = function(pageNumber){
        $scope.currentPage = pageNumber;
        $scope.pageContent = paginationService.getPageContent($scope.currentPage);
    };

    $scope.nextPage = function(){
        if(isLastPage()){
            $scope.currentPage++;
            $scope.pageContent = paginationService.getPageContent($scope.currentPage);
        }
    };

    $scope.previousPage = function(){
        if(currentPage === 1){
            $scope.currentPage--;
            $scope.pageContent = paginationService.getPageContent($scope.currentPage);
        }
    };
    
    $scope.isLastPage = function(){
        return (currentPage + 1 > pageNumbers[pageNumbers.length - 1]) ? true : false
    };

    $scope.getPages = function(){
        return paginationService.getPages();
    };


    // must be called first to initialise pages
    var createPages = function(_results_, _numberPerPage_) {

        // initialisation each time pagination is used
        pageNumbers = [];
        results = _results_;
        numberPerPage = _numberPerPage_;
        currentPage = 1;

        var pageMax = Math.ceil(results.length / numberPerPage);
        // sets maximum page numbers to limit of 14
        var pageLimit = 14;
        pageMax = (pageMax > pageLimit) ? pageLimit : pageMax;

        // array to store page numbers
        for(var i = 1; i <= pageMax; i++){
            pageNumbers.push(i);
        };

        return pageNumbers;
    };


    $scope.paginationInit = function(model, limit){
        $scope.pageNumbers = createPages(model, limit);
        $scope.pageContent = getPageContent(1);
        $scope.currentPage = 1;
    };

}])


.factory("paginationService", function(){
    return {
        isFirstPage: function(){
            return (currentPage === 1) ? true : false;
        }
    };
})

.directive("pagination", function(){
    return {
        restrict: "A",
        scope: {
            results: "&results",  
            page: "@",
            numberPerPage: "&",
            pageContent: "=",
        },
        link: function(scope, elem, attrs){
            elem.bind("click", function(){
                console.log(scope.page);
                var startIndex = scope.numberPerPage * scope.page - scope.numberPerPage;
                scope.pageContent = [];
                if(scope.results){
                    // if there are less results than number per page, display all results in pageContent
                    if((startIndex + scope.numberPerPage - 1) > scope.results.length){
                        for(var i = startIndex; i < scope.results.length; i++){
                            scope.pageContent.push(scope.results[i]);
                        }
                    } else {
                        for(var i = startIndex; i < (scope.numberPerPage + startIndex); i++){
                            scope.pageContent.push(scope.results[i]);
                        };
                    };
                };
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
