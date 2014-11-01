// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

// Update the app1 variable name to be that of your module variable
app.factory("EmployeeService", [
    '$resource', 'promiseTracker',
    function ($resource, promiseTracker) {
        var updateAction = {
            method: 'PUT',
            isArray: false
        };
        var deleteAction = {
            method: "DELETE",
            isArray: false
        };
        var employees = $resource("/api/employee/:Id", { Id: "@Id" }, { "update": { method: 'PUT' }, "delete": deleteAction });
        var tracker = promiseTracker.register("loadingTracker");
        var service = {
            CreateEmployee: function (employee) {
                var promise = employees.save(employee).$promise;
                tracker.addPromise(promise);
                return promise;
            },
            GetEmployees: function () {
                return employees.query().$promise;
            },
            UpdateEmployee: function (employee) {
                return employees.update(employee).$promise;
            },
            DeleteEmployee: function (employee) {
                return employees.delete({ Id: employee.Id }).$promise;
            },
            loadingTracker: tracker
        };
        return service;
    }
]);
//# sourceMappingURL=EmployeeService.js.map
