// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resovle the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../Scripts/typings/angularjs/angular-signalr.ts" />

var ChatService = (function () {
    function ChatService($http, Hub) {
        this.$http = $http;
        this.Hub = Hub;
        this.greeting = "Hello";
        var hub = new Hub("ChatHub", [], []);
    }
    ChatService.prototype.changeGreeting = function () {
        this.greeting = "Bye";
    };
    ChatService.serviceId = "ChatService";
    return ChatService;
})();

// Update the app1 variable name to be that of your module variable
app.factory(ChatService.serviceId, [
    '$http', 'Hub', function ($http, Hub) {
        return new ChatService($http, Hub);
    }
]);
//# sourceMappingURL=ChatService.js.map
