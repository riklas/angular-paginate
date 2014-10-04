describe("Create Pages Directive", function(){

	var $scope, scope, elem, directive, compiled, html;

	var results = specData;
	

	var setup = function(_html_){
		inject(function($compile, $rootScope){
        	$scope = $rootScope.$new();

        	// html view         
    		html = _html_;
        	
        	// get element
        	elem = angular.element(html);

        	// compile element and run against scope
			$compile(elem)($scope);

			// get directive scope
        	scope = elem.isolateScope();

        	var pages = [];
        	var pageContent = [];
        	scope.pages = pages;
        	scope.pageContent = pageContent;
        	scope.results = results;

        	// call $apply to fire the event watchers
        	scope.$apply();
        });
	}

	beforeEach(function(){
		module("angular-paginate");
	});

	it("should pass controller expected max page when max page is less than page limit", function(){
		setup("<button create-pages results='results' number-per-page='15' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setPageMax");
		elem.triggerHandler('click');		// click button
		expect(scope.setPageMax).toHaveBeenCalledWith(3);
	});

	it("should pass controller max page as page limit when max page is greater than page limit and page limit is provided", function(){
		setup("<button create-pages results='results' number-per-page='1' pages='pages' page-limit=2 page-content='pageContent'>paginate</button>");
		spyOn(scope, "setPageMax");
		elem.triggerHandler('click');
		expect(scope.setPageMax).toHaveBeenCalledWith(2);
	});

	it("should pass controller max page as default page limit when max page is greater than page limit and page limit is not provided", function(){
		setup("<button create-pages results='results' number-per-page='1' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setPageMax");
		elem.triggerHandler('click');
		expect(scope.setPageMax).toHaveBeenCalledWith(15);
	});

	it("should pass controller expected numberPerPage when numberPerPage is provided", function(){
		setup("<button create-pages results='results' number-per-page='5' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setNumberPerPage");
		elem.triggerHandler('click');
		expect(scope.setNumberPerPage).toHaveBeenCalledWith('5');
	});

	it("should pass controller expected numberPerPage to undefined when numberPerPage is not provided", function(){
		setup("<button create-pages results='results' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setNumberPerPage");
		elem.triggerHandler('click');
		expect(scope.setNumberPerPage).toHaveBeenCalledWith(undefined);
	});

	it("should pass controller pageContent array", function(){
		setup("<button create-pages results='results' number-per-page='5' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setPageContent").and.callThrough();
		elem.triggerHandler('click');
		expect(scope.setPageContent).toHaveBeenCalledWith(scope.pageContent);
	});

	it("should pass controller results array", function(){
		setup("<button create-pages results='results' number-per-page='5' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setResults").and.callThrough();
		elem.triggerHandler('click');
		expect(scope.setResults).toHaveBeenCalledWith(scope.results);
	});

	it("should set default pagination to page 1", function(){
		setup("<button create-pages results='results' number-per-page='5' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "setCurrentPage");
		spyOn(scope, "getPageContent");
		elem.triggerHandler('click');
		expect(scope.setCurrentPage).toHaveBeenCalledWith(1);
		expect(scope.getPageContent).toHaveBeenCalledWith(1);
	});

	it("should bind to click if binding is not provided", function(){
		setup("<button create-pages results='results' pages='pages' page-content='pageContent'>paginate</button>");
		spyOn(scope, "getPageContent");
		elem.triggerHandler('click');
		expect(scope.getPageContent).toHaveBeenCalledWith(1);		// test that directive is binding to click event
	});

	it("should bind to click if binding provided is click", function(){
		setup("<button create-pages results='results' pages='pages' binding='click' page-content='pageContent'>paginate</button>");
		spyOn(scope, "getPageContent");
		elem.triggerHandler('click');
		expect(scope.getPageContent).toHaveBeenCalledWith(1);		// test that directive is binding to click event
	});

	it("should bind to custom binding if binding provided is valid and not click", function(){
		setup("<button create-pages results='results' pages='pages' binding='dblclick' page-content='pageContent'>paginate</button>");
		spyOn(scope, "getPageContent");
		elem.triggerHandler('dblclick');
		expect(scope.getPageContent).toHaveBeenCalledWith(1);
	});

	
});