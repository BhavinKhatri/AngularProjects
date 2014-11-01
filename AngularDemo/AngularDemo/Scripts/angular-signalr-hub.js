angular.module('SignalR', [])
.constant('$', $)
.factory('Hub', ['$','$log', function ($,$log) {
    var longConnection = $.hubConnection();
    return function (hubName, listeners, methods,options) {
        var Hub = this;
        if(options != undefined && options != null)
        Hub.connection = longConnection;
        Hub.promise = Hub.connection.start();
        Hub.promise.done(function () {
            $log.debug("Connection Established ConnectionId : " + Hub.connection.id);
            if (listeners) {
                angular.forEach(listeners, function (fn, event) {
                    Hub.on(event, fn);
                });
            }

            if (methods) {
                angular.forEach(methods, function (method) {
                    Hub[method] = function () {
                        var args = $.makeArray(arguments);
                        args.unshift(method);
                        return Hub.invoke.apply(Hub, args);
                    };
                });
            }
        });

        Hub.proxy = Hub.connection.createHubProxy(hubName);

        Hub.on = function (event, fn) {
            Hub.proxy.on(event, fn);
        };
        Hub.invoke = function (method, args) {
            return Hub.proxy.invoke.apply(Hub.proxy, arguments);                        
        };
               
        return Hub;
    };
}]);