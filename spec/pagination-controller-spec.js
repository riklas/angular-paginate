describe("Pagination Controller", function(){
	var $scope, ctrl;
	var stateServiceMock;

	beforeEach(function(){

		module("angular-paginate");
	
		inject(function($rootScope, $controller){     

			$scope = $rootScope.$new();     // mock state service

			stateServiceMock = jasmine.createSpyObj("stateServiceMock", ["getNumberPerPage", "setNumberPerPage",
			"getResults", "setResults", "getCurrentPage", "setCurrentPage", "getPageMax", "setPageMax", "setPageContent",
			"getPageContent"]);


			ctrl = $controller("PaginationController", {
				$scope: $scope,
				stateService: stateServiceMock
			});
		});
	});

	it("should call service when setting max pages", function(){
		$scope.setPageMax(10);
		
		expect(stateServiceMock.setPageMax).toHaveBeenCalledWith(10);
	});

	it("should call service when getting max pages", function(){
		$scope.getPageMax();
		
		expect(stateServiceMock.getPageMax).toHaveBeenCalled();
	});

	it("should call service when setting current page", function(){
		$scope.setCurrentPage(3);
		
		expect(stateServiceMock.setCurrentPage).toHaveBeenCalledWith(3);
	});

	it("should call service when getting current page", function(){
		$scope.getCurrentPage();
		
		expect(stateServiceMock.getCurrentPage).toHaveBeenCalled();
	});

	it("should call service when setting number per page", function(){
		$scope.setNumberPerPage(10);
		
		expect(stateServiceMock.setNumberPerPage).toHaveBeenCalledWith(10);
	});

	it("should call service when setting results array", function(){
		var results = [];
		$scope.setResults(results);
		
		expect(stateServiceMock.setResults).toHaveBeenCalledWith(results);
	});

	it("should return true when checking first page if current page is first page", function(){
		stateServiceMock.getCurrentPage.and.returnValue(1);
		var isFirstPage = $scope.isFirstPage();

		expect(isFirstPage).toEqual(true);
	});

	it("should return false when checking first page if current page is not first page", function(){
		stateServiceMock.getCurrentPage.and.returnValue(2);
		var isFirstPage = $scope.isFirstPage();

		expect(isFirstPage).toEqual(false);
	});

	it("should return true when checking last page if current page is last page", function(){
		stateServiceMock.getPageMax.and.returnValue(3);
		stateServiceMock.getCurrentPage.and.returnValue(3);
		var isLastPage = $scope.isLastPage();

		expect(isLastPage).toEqual(true);
	});

	it("should return false when checking last page if current page is not last page", function(){
		stateServiceMock.getPageMax.and.returnValue(3);
		stateServiceMock.getCurrentPage.and.returnValue(1);
		var isLastPage = $scope.isLastPage();

		expect(isLastPage).toEqual(false);
	});

	it("should call service when setting page content array", function(){
		var pageContent = [];
		$scope.setPageContent(pageContent);
		expect(stateServiceMock.setPageContent).toHaveBeenCalledWith(pageContent);
	});

	it("should clear previous page content when getPageContent is called", function(){
		var pageContent = ['a','b','c'];
		stateServiceMock.getNumberPerPage.and.returnValue(3);
		stateServiceMock.getPageContent.and.returnValue(pageContent);

		$scope.getPageContent(2);

		expect(pageContent.length).toEqual(0);
	});

	it("should display all results in page content when getPageContent is called and there are less results than number per page", function(){
		var pageContent = [];
		stateServiceMock.getNumberPerPage.and.returnValue(10);
		stateServiceMock.getResults.and.returnValue(['a','b','c']);
		stateServiceMock.getPageContent.and.returnValue(pageContent);
		$scope.getPageContent(1);

		expect(pageContent).toEqual(['a','b','c']);
	});

	it("should display new page content when getPageContent is called and there are less results than number per page", function(){
		var pageContent = [];
		stateServiceMock.getNumberPerPage.and.returnValue(2);
		stateServiceMock.getResults.and.returnValue(['a','b','c']);
		stateServiceMock.getPageContent.and.returnValue(pageContent);
		$scope.getPageContent(2);

		expect(pageContent).toEqual(['c']);
	});

});