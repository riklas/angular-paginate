describe("Pagination Left Directive", function(){

	var $scope, scope, elem, directive, compiled, html;
	
	beforeEach(function(){
		module("angular-paginate");

        inject(function($compile, $rootScope){
            $scope = $rootScope.$new();
            html = "<li ng-class='{disabled: isFirstPage()}' pagination-left ><a>&laquo;</a></li>";
            elem = angular.element(html);
            $compile(elem)($scope);
            scope = elem.isolateScope();
            spyOn(scope, "setCurrentPage");
            spyOn(scope, "getPageContent");
            scope.$apply();
        });
	});

    it("should decrement current page when pagination-left clicked and current page is not first page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(2);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).toHaveBeenCalledWith(1);
    });

    it("should get decremented page content when pagination-left clicked and current page is not first page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(2);
        elem.triggerHandler('click');
        expect(scope.getPageContent).toHaveBeenCalledWith(1);
    });

    it("should do nothing when pagination-left clicked and current page is first page", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(1);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).not.toHaveBeenCalled();
        expect(scope.getPageContent).not.toHaveBeenCalled();
    });

    // regression
    it("should do nothing when pagination-left clicked and current page is 0", function(){
        spyOn(scope, "getCurrentPage").and.returnValue(0);
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).not.toHaveBeenCalled();
        expect(scope.getPageContent).not.toHaveBeenCalled();
    });
});