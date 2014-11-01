/// <reference path="../../scripts/typings/jasmine/jasmine-1.3.d.ts" />
/// <reference path="../../scripts/typings/karma-jasmine/karma-jasmine.d.ts" />
/// <reference path="../../scripts/typings/sinon/sinon.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-mocks.d.ts" />
"use strict";
describe("EmployeeServiceSpec", function () {
    var httpBackend, employeeService;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject(function (EmployeeService, $httpBackend) {
        httpBackend = $httpBackend;
        employeeService = EmployeeService;
    }));

    it("should call GET on /api/employee", function () {
        httpBackend.when("GET", "/api/employee").respond([{ Id: 1 }, { Id: 2 }, { Id: 3 }]);
        var promise = employeeService.GetEmployees();
        promise.then(function (result) {
            expect(result[0].Id).toBe(1);
            expect(result.length).toBe(3);
        });
        httpBackend.flush();
    });

    it("should call GET on /api/employee and server should return 500 Server Error", function () {
        httpBackend.when("GET", "/api/employee").respond(500, [], []);
        var promise = employeeService.GetEmployees();
        promise.then(function (result) {
        }, function (result) {
            expect(result.status).toBe(500);
        });
        httpBackend.flush();
    });

    it("should call POST on /api/employee with new employee data", function () {
        var emp = new Model.Employee(false);
        emp.Name = "Chintan";
        emp.Income = 25000;
        emp.Age = 27;
        httpBackend.when("POST", "/api/employee", emp).respond(201, emp, []);
        var promise = employeeService.CreateEmployee(emp);
        promise.then(function (result) {
            expect(result.Name).toBe("Chintan");
        });
        httpBackend.flush();
    });

    it("should call POST on /api/employee to create new employee with invalid data and server should return status code 400 as bad request", function () {
        var emp = new Model.Employee(false);

        //Name is required field on server
        emp.Name = null;
        emp.Income = 25000;
        emp.Age = 27;
        httpBackend.when("POST", "/api/employee", emp).respond(400, { "Name": "Name is required field" }, []);
        var promise = employeeService.CreateEmployee(emp);
        promise.then(function (result) {
        }, function (result) {
            expect(result.status).toBe(400);
            expect(result.data.Name).toBe("Name is required field");
        });
        httpBackend.flush();
    });

    it("should call PUT on /api/employee/1 to update employee with id 1 data", function () {
        var emp = new Model.Employee(false);
        emp.Id = 1;
        emp.Name = "Chintan";
        emp.Income = 25000;
        emp.Age = 27;

        httpBackend.when("PUT", "/api/employee/1", emp).respond(204, {}, []);
        var promise = employeeService.UpdateEmployee(emp);
        promise.then(function (result, headers, additional) {
            expect(true).toBe(true);
        });
        httpBackend.flush();
    });

    it("should call PUT on /api/employee/100 to update employee with id 100 and server should return status code 404 as Not found", function () {
        var emp = new Model.Employee(false);
        emp.Id = 100;
        emp.Name = "Chintan";
        emp.Income = 25000;
        emp.Age = 27;

        httpBackend.when("PUT", "/api/employee/100", emp).respond(404, {}, []);
        var promise = employeeService.UpdateEmployee(emp);
        promise.then(function (result) {
        }, function (result) {
            expect(result.status).toBe(404);
        });
        httpBackend.flush();
    });

    it("should call PUT on /api/employee/1 to update employee with id 1 but with invalid model data and server should return status code 200 as Bad Request", function () {
        var emp = new Model.Employee(false);
        emp.Id = 1;

        //Name is required field
        emp.Name = null;
        emp.Income = 25000;
        emp.Age = 27;

        httpBackend.when("PUT", "/api/employee/1", emp).respond(400, { "Name": "Name is required field" }, []);
        var promise = employeeService.UpdateEmployee(emp);
        promise.then(function (result) {
        }, function (result) {
            expect(result.status).toBe(400);
            expect(result.data.Name).toBe("Name is required field");
        });
        httpBackend.flush();
    });

    it("should call DELETE on /api/employee/1 to delete an employee with id 1 data", function () {
        var emp = new Model.Employee(false);
        emp.Id = 1;
        emp.Name = "Chintan";
        emp.Income = 25000;
        emp.Age = 27;

        httpBackend.when("DELETE", "/api/employee/1", { Id: 1 }).respond(200, emp, []);
        var promise = employeeService.DeleteEmployee(emp);
        promise.then(function (result, headers, additional) {
            expect(true).toBe(true);
        });
        httpBackend.flush();
    });

    it("should call DELETE on /api/employee/10 to delete a non existent employee with id 10", function () {
        var emp = new Model.Employee(false);
        emp.Id = 10;
        emp.Name = "Chintan";
        emp.Income = 25000;
        emp.Age = 27;

        httpBackend.when("DELETE", "/api/employee/10", { Id: 10 }).respond(404, [], []);
        var promise = employeeService.DeleteEmployee(emp);
        promise.then(function (result, headers, additional) {
        }, function (result) {
            expect(result.status).toBe(404);
        });
        httpBackend.flush();
    });
});
//# sourceMappingURL=EmployeeServiceSpec.js.map
