describe("Pagination Right Directive", function(){

	var $scope, scope, elem, directive, compiled, html;
	
	beforeEach(function(){
		module("angular-paginate");

        inject(function($compile, $rootScope){
            $scope = $rootScope.$new();
            html = "<li ng-class='{disabled: isLastPage()}' pagination-right ><a>&raquo;</a></li>";
            elem = angular.element(html);
            $compile(elem)($scope);
            scope = elem.isolateScope();
            spyOn(scope, "setCurrentPage");
            spyOn(scope, "getPageContent");
            spyOn(scope, "getPageMax").and.returnValue(5);
            scope.$apply();
        });
	});

    it("should increment current page when pagination-right clicked and current page is not last page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(2);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).toHaveBeenCalledWith(3);
    });

    it("should get incremented page content when pagination-right clicked and current page is not last page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(2);
        elem.triggerHandler('click');
        expect(scope.getPageContent).toHaveBeenCalledWith(3);
    });

    it("should do nothing when pagination-right clicked and current page is last page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(5);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).not.toHaveBeenCalled();
        expect(scope.getPageContent).not.toHaveBeenCalled();
    });

    // regression
    it("should do nothing when pagination-right clicked and current page is greater than last page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(6);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).not.toHaveBeenCalled();
        expect(scope.getPageContent).not.toHaveBeenCalled();
    });
});