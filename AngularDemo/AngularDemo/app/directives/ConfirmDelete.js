// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

var ConfirmDelete = (function () {
    function ConfirmDelete($window) {
        var _this = this;
        this.$window = $window;
        this.restrict = "A";
        this.terminal = true;
        this.priority = 1;
        this.link = function (scope, element, attrs) {
            var msg = attrs.confirmDelete || "Are you sure?";
            var clickAction = attrs.ngClick;
            element.bind("click", function () {
                if (_this.$window.confirm(msg)) {
                    scope.$eval(clickAction);
                }
            });
        };
    }
    ConfirmDelete.directiveId = "confirmDelete";
    return ConfirmDelete;
})();

// Update the app1 variable name to be that of your module variable
app.directive(ConfirmDelete.directiveId, [
    '$window', function ($window) {
        return new ConfirmDelete($window);
    }
]);
//# sourceMappingURL=ConfirmDelete.js.map
