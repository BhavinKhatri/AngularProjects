var _this = this;
angular.module("SignalR", []).constant("$", $).factory("Hub", [
    "$", function ($) {
        return function (url, hubName, queryString, listners, methods) {
            var Hub = _this;
            var connection = $.hubConnection(url, queryString, true);
            var proxy = Hub.connection.createHubProxy(hubName);
            var on = function (event, fn) {
                proxy.on(event, fn);
            };
            var invoke = function (methods, args) {
                proxy.invoke.apply(methods, args);
            };

            if (listners) {
                angular.forEach(listners, function (method, event) {
                    on(event, method);
                });
            }
            if (methods) {
                //angular.forEach(methods,)
            }
        };
    }
]);
//# sourceMappingURL=angular-signalr.js.map
