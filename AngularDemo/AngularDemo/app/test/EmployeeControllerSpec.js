/// <reference path="../../scripts/typings/jasmine/jasmine-1.3.d.ts" />
/// <reference path="../../scripts/typings/karma-jasmine/karma-jasmine.d.ts" />
/// <reference path="../../scripts/typings/sinon/sinon.d.ts" />
"use strict";
describe("EmployeeControllerSpec", function () {
    var scope, $controllerConstructor, mockedEventService, log, $qService, homeController, defered;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject(function ($controller, $rootScope, $log, $q, EmployeeService) {
        $controllerConstructor = $controller;
        mockedEventService = EmployeeService;
        scope = $rootScope.$new(true);
        log = $log;
        $qService = $q;

        //Initialize
        initialize();
        defered = $q.defer();
        spyOn(log, "debug").andCallFake(function (msg) {
            console.debug(msg);
        });
    }));
    afterEach(function () {
        //scope.Employees = null;
    });

    it("should setup scope in constructor", function () {
        expect(scope.Employee).toBeDefined();
        expect(scope.GetEmployees).toBeDefined();
        expect(scope.CreateOrUpdateEmployee).toBeDefined();
        expect(scope.DeleteEmployee).toBeDefined();
        expect(scope.SelectEmployee).toBeDefined();
        expect(scope.Action).toBe("Create");
        expect(scope.LoadingText).toBe("Loading...");
        expect(scope.Employees.length).toBe(0);
    });

    it("should initialize employee list on startup.", function () {
        var mockEmployees = [];
        var defer = $qService.defer();
        spyOn(mockedEventService, "GetEmployees").andReturn(defer.promise);

        //homeController.GetEmployees();
        scope.GetEmployees();
        defer.resolve(mockEmployees);
        scope.$root.$apply();
        expect(scope.Employees).toBe(mockEmployees);
    });

    it("should create new employee", function () {
        var newEmployee = { Id: 1, Name: "Chintan Shah", Age: 27, Income: 27000 };
        scope.Action = "Create";
        spyOn(mockedEventService, "CreateEmployee").andCallFake(function (employee) {
            return defered.promise;
        });
        scope.CreateOrUpdateEmployee(newEmployee);
        defered.resolve(newEmployee);

        scope.$root.$apply();
        expect(scope.Employees.length).toBe(1);
        expect(scope.Employees[0]).toBe(newEmployee);
    });

    it("should update an existing employee", function () {
        var existingEmployee = { Id: 1, Name: "Chintan Shah", Age: 27, Income: 27000 };
        scope.Action = "Update";
        scope.Employees.push(existingEmployee);
        spyOn(mockedEventService, "UpdateEmployee").andReturn(defered.promise);
        scope.CreateOrUpdateEmployee(existingEmployee);
        defered.resolve(existingEmployee);
        scope.$root.$apply();
        expect(scope.Employees.length).toBe(1);
        expect(scope.Action).toBe("Create");
    });

    it("should select an employee for updation", function () {
        var existingEmployee = { Id: 1 };
        scope.SelectEmployee(existingEmployee);
        expect(scope.Employee).toBe(existingEmployee);
        expect(scope.Action).toBe("Update");
    });

    it("should delete an existing employee", function () {
        //console.log(scope.Employees.length);
        var existingEmployee = { Id: 1, Name: "Chintan Shah", Age: 27, Income: 27000 };

        //
        var localMmockEmployees = [];
        localMmockEmployees.push(existingEmployee);
        localMmockEmployees.push({ Id: 2, Name: "Chintan B Shah", Age: 29, Income: 34500 });
        localMmockEmployees.push({ Id: 3, Name: "Chintan BR Shah", Age: 30, Income: 34500 });
        scope.Employees = localMmockEmployees;

        //
        spyOn(mockedEventService, "DeleteEmployee").andReturn(defered.promise);

        scope.DeleteEmployee(existingEmployee);
        defered.resolve(existingEmployee);

        scope.$root.$apply();

        expect(scope.Employees.length).toBe(2);
        expect(scope.Employees[0].Id).toBe(2);
    });

    function initialize() {
        homeController = $controllerConstructor("HomeController", { $scope: scope, $log: log, employeeService: mockedEventService });
    }
});
//# sourceMappingURL=EmployeeControllerSpec.js.map
