/// <reference path="../../Scripts/jasmine/jasmine.js" />
/// <reference path="../../Scripts/jquery-2.1.0.js" />
/// <reference path="../../Scripts/jquery.signalR-2.0.2.js" />
/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../Scripts/angular-mocks.js" />
/// <reference path="../../Scripts/angular-signalr-hub.js" />

describe("Hub", function () {
    var hubConnection,flag,promise;

    beforeEach(angular.mock.module("SignalR"));


    beforeEach(inject(function (Hub) {        
        flag = false;
        
        hubConnection = new Hub("ChatHub", {
            'hello': function(msg) {                
            }
        }, ["Hello"]);
        spyOn(hubConnection, "start");        
    }));

    it("should connect to server", function () {
        runs(function () {
            console.log(hubConnection);
            hubConnection.promise.done(function() {
                promise = hubConnection.Hello("Hello From Server");                
                flag = true;
            });
        });

        waitsFor(function () {            
            return flag;
        }, "This should make a signalR call", 5000);

        runs(function () {            
            expect(promise).toBeDefined();
            expect($.hubConnection.start).toHaveBeenCalled();
        });        
    });

});