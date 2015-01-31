// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file

var checkEmployeeAge = (function () {
    function checkEmployeeAge($window) {
        this.$window = $window;
        this.restrict = "A";
        this.require = "ngModel";
        this.scope = {
            age: '='
        };
    }
    checkEmployeeAge.prototype.link = function (scope, element, attrs, ngModel) {
        ngModel.$validators.checkAge = function (modelValue) {
            return modelValue < 100;
        };
        scope.greeting = "Hi!";
        scope.changeGreeting = function () {
            scope.greeting = "See ya!";
        };

        scope.$watch('age', function () {
            ngModel.$validate();
        });
    };
    checkEmployeeAge.directiveId = "checkEmployeeAge";
    return checkEmployeeAge;
})();

// Update the app1 variable name to be that of your module variable
app.directive(checkEmployeeAge.directiveId, [
    '$window', function ($window) {
        return new checkEmployeeAge($window);
    }
]);
//# sourceMappingURL=checkEmployeeAge.js.map
