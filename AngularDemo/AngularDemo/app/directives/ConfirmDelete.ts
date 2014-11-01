// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

interface IConfirmDelete extends ng.IDirective {
}

interface IConfirmDeleteScope extends ng.IScope {
    greeting: string;
    changeGreeting: () => void;
}

class ConfirmDelete implements IConfirmDelete {
    static directiveId: string = "confirmDelete";
    restrict: string = "A";
    terminal: boolean = true;
    priority: number = 1;

    constructor(private $window: ng.IWindowService) {

    }

    link = (scope: IConfirmDeleteScope, element, attrs) => {
        var msg = attrs.confirmDelete || "Are you sure?";
        var clickAction = attrs.ngClick;
        element.bind("click", () => {
            if (this.$window.confirm(msg)) {
                scope.$eval(clickAction);
            }
        });
    }
}

// Update the app1 variable name to be that of your module variable
app.directive(ConfirmDelete.directiveId, ['$window', $window =>
    new ConfirmDelete($window)
]);
