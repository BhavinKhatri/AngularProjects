// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IcheckEmployeeAge extends ng.IDirective {
}

interface IcheckEmployeeAgeScope extends ng.IScope {
    greeting: string;
    changeGreeting: () => void;
}

class checkEmployeeAge implements IcheckEmployeeAge {
    static directiveId: string = "checkEmployeeAge";
    restrict: string = "A";
    require: string = "ngModel";
    scope = {
        age: '=',
    };

    constructor(private $window: ng.IWindowService) {
    }

    link(scope: IcheckEmployeeAgeScope, element, attrs, ngModel) {
        ngModel.$validators.checkAge = (modelValue) => {
            return modelValue < 100;
        };
        scope.greeting = "Hi!";
        scope.changeGreeting = () => {
            scope.greeting = "See ya!";
        };

        scope.$watch('age', () => {
            ngModel.$validate();
        });
    }
}

// Update the app1 variable name to be that of your module variable
app.directive(checkEmployeeAge.directiveId, ['$window', $window =>
    new checkEmployeeAge($window)
]);
