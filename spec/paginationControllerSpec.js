describe("PaginationController", function(){

	var $scope, ctrl;
	var _stateServiceMock_;

	beforeEach(function(){

		// mock state service
		// stateServiceMock = jasmine.createSpyObj("stateService", ["setNumberPerPage", "getNumberPerPage", "setResults", "getResults", "setCurrentPage", "getCurrentPage", "setPageMax", "getPageMax", "setPageContent", "getPageContent"]);

		module("angular-paginate");
	
		inject(function($rootScope, $controller, stateService){
			$scope = rootScope.$new();
			
			// mock state service
			_stateServiceMock_ = stateService;
			spyOn(stateService, "setNumberPerPage").andCallThrough();
			spyOn(stateService, "getNumberPerPage").andCallThrough();
			spyOn(stateService, "setResults").andCallThrough();
			spyOn(stateService, "getResults").andCallThrough();
			spyOn(stateService, "setCurrentPage").andCallThrough();
			spyOn(stateService, "getCurrentPage").andCallThrough();
			spyOn(stateService, "setPageMax").andCallThrough();
			spyOn(stateService, "getPageMax").andCallThrough();
			spyOn(stateService, "setPageContent").andCallThrough();
			spyOn(stateService, "getPageContent").andCallThrough();

			ctrl = $controller("PaginationController", {
				$scope: $scope,
				stateService: _stateServiceMock_;
			});
		});
	});

})