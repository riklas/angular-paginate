describe("Pagination Directive", function(){

	var $scope, scope, elem, directive, compiled, html;
	
	beforeEach(function(){
		module("angular-paginate");

        inject(function($compile, $rootScope){
            $scope = $rootScope.$new();
            html = "<li pagination page='2'>";
            elem = angular.element(html);
            $compile(elem)($scope);
            scope = elem.isolateScope();
            spyOn(scope, "setCurrentPage");
            spyOn(scope, "getPageContent");
            scope.$apply();
        });
	});

    it("should set current page of page clicked", function(){
        elem.triggerHandler('click');
        expect(scope.setCurrentPage).not.toHaveBeenCalledWith('2');
        expect(scope.setCurrentPage).toHaveBeenCalledWith(2);
    });

    it("should get page content of page clicked", function(){
        elem.triggerHandler('click');
        expect(scope.getPageContent).not.toHaveBeenCalledWith('2');
        expect(scope.getPageContent).toHaveBeenCalledWith(2);
    });
});