// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the reference paths,
// then adjust the path value to be relative to this file
/// <reference path='../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../Scripts/typings/angularjs/angular-resource.d.ts'/>

// Create the module and define its dependencies.
var app = angular.module('app', [
    'ngResource',
    'ajoslin.promise-tracker'
]);

app.config([
    '$provide', function ($provide) {
        $provide.decorator('$log', [
            '$delegate', function ($delegate) {
                //var prepareLogFunction = toastrDisplayMethod=> { throw new Error("Not implemented"); };
                $delegate.debug = prepareLogFunction($delegate.debug);
                $delegate.info = prepareLogFunction($delegate.info);
                $delegate.warn = prepareLogFunction($delegate.warn);
                $delegate.error = prepareLogFunction($delegate.error);

                function prepareLogFunction(logFunction) {
                    var enhancedLogFunction = function (text) {
                        var dateTime = new Date(Date.now());
                        var appendStringToDebug = [dateTime + text];
                        logFunction.apply(null, appendStringToDebug);
                    };
                    return enhancedLogFunction;
                }
                return $delegate;
            }]);
    }
]);

app.run(['$q', '$rootScope', function ($q, $rootScope) {
    }]);
//# sourceMappingURL=app.js.map
