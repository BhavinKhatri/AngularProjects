// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

var EmployeeServ = (function () {
    function EmployeeServ($resource) {
        this.$resource = $resource;
        var updateAction = {
            method: 'PUT',
            isArray: false
        };
        var deleteAction = {
            method: "DELETE",
            isArray: false
        };

        var employees = $resource("/api/employee/:Id", { Id: "@Id" }, { "update": { method: 'PUT' }, "delete": deleteAction });
    }
    EmployeeServ.serviceId = "EmployeeServ";
    return EmployeeServ;
})();

// Update the app1 variable name to be that of your module variable
app.factory(EmployeeServ.serviceId, [
    '$resource', function ($resource) {
        return new EmployeeServ($resource);
    }
]);
//# sourceMappingURL=EmployeeServ.js.map
