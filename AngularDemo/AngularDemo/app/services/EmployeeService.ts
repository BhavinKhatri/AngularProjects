// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

interface IEmployeeService {
    CreateEmployee: (employee: Model.Employee) => ng.IPromise<Model.Employee>;
    UpdateEmployee: (employee: Model.Employee) => ng.IPromise<Model.Employee>;
    GetEmployees: () => ng.IPromise<Model.Employee[]>;
    GetEmployee: (id: number) => ng.IPromise<Model.Employee>;
    DeleteEmployee: (id: number) => void;
}



// Update the app1 variable name to be that of your module variable
app.factory("EmployeeService", [
     '$resource', 'promiseTracker',
    ( $resource, promiseTracker) => {
        var updateAction: ng.resource.IActionDescriptor = {
            method: 'PUT',
            isArray: false
        };
        var deleteAction: ng.resource.IActionDescriptor = {
            method: "DELETE",
            isArray: false
        };
        var employees = $resource("/api/employee/:Id", { Id: "@Id" }, { "update": {method:'PUT'}, "delete": deleteAction });
        var tracker = promiseTracker.register("loadingTracker");
        var service = {
            CreateEmployee: (employee: Model.Employee) => {                                
                var promise = employees.save(employee).$promise;
                tracker.addPromise(promise);
                return promise;
            },
            GetEmployees: () => {               
                return employees.query().$promise;                
            },
            UpdateEmployee: (employee: Model.Employee) => {                                
                return employees.update(employee).$promise;                
            },
            DeleteEmployee: (employee: Model.Employee) => {                
                return  employees.delete({ Id: employee.Id }).$promise;                
            },
            loadingTracker: tracker
        };
        return service;
    }
]);

