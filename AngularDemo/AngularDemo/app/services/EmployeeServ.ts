// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

interface IEmployeeServ {

}



class EmployeeServ implements IEmployeeServ {
    static serviceId: string = "EmployeeServ";

    
    constructor(private $resource: ng.resource.IResourceService) {
        var updateAction: ng.resource.IActionDescriptor = {
            method: 'PUT',
            isArray: false
        };
        var deleteAction: ng.resource.IActionDescriptor = {
            method: "DELETE",
            isArray: false
        };
        
        var employees = $resource("/api/employee/:Id", { Id: "@Id" }, { "update": { method: 'PUT' }, "delete": deleteAction });

    }
}

// Update the app1 variable name to be that of your module variable
app.factory(EmployeeServ.serviceId, [
    '$resource', ($resource) =>
        new EmployeeServ($resource)
]);
