angular.module("SignalR", [])
    .constant("$", $)
    .factory("Hub", [
        "$", ($) => {
        return (url:string, hubName: string, queryString:string , listners: Function[], methods: string[])=> {
            var Hub = this;
            var connection = $.hubConnection(url, queryString, true);
            var proxy = Hub.connection.createHubProxy(hubName);
            var on = (event, fn)=> {
                proxy.on(event, fn);
            };
            var invoke = (methods: string, args: any)=> {
                proxy.invoke.apply(methods, args);
            };

            if (listners) {
                angular.forEach(listners, (method: Function, event: any)=> {
                    on(event, method);
                });
            }
            if (methods) {
                //angular.forEach(methods,)
            }
        };

    }
    ]);