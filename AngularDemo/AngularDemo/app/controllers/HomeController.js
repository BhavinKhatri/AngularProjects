/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../models/Employee.ts"/>

var HomeController = (function () {
    function HomeController($scope, $log, employeeService) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.employeeService = employeeService;
        $scope.Employee = new Model.Employee(false);
        $scope.Action = "Create";
        $scope.CreateOrUpdateEmployee = function (employee) {
            return _this.CreateOrUpdateEmployee(employee);
        };
        $scope.SelectEmployee = function (employee) {
            return _this.SelectEmployee(employee);
        };
        $scope.DeleteEmployee = function (employee) {
            return _this.DeleteEmployee(employee);
        };
        $scope.loadingTracker = this.employeeService.loadingTracker;
        $scope.LoadingText = "Loading...";
        $scope.GetEmployees = function () {
            return _this.GetEmployees();
        };
        $scope.Employees = [];
        $scope.toast = function () {
            toastr.options = {
                'closeButton': false,
                'debug': false,
                'positionClass': "toast-bottom-right",
                "onclick": null,
                "showDuration": 300,
                "hideDuration": 1000,
                "timeOut": 5000,
                "extendedTimeOut": 1000,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            toastr.success('Toaster message.');
        };
        $scope.callLog = function () {
            _this.callLog();
        };
    }
    HomeController.prototype.GetEmployees = function () {
        var _this = this;
        var promise = this.employeeService.GetEmployees();
        promise.then(function (result) {
            _this.$scope.Employees = result;
        });
    };

    HomeController.prototype.callLog = function () {
        this.$log.debug('Log is Called From Button for debug');
        this.$log.info('Log is Called From Button for info');
        this.$log.warn('Log is Called From Button for warning');
        this.$log.error('Log is Called From Button for Error');
    };

    HomeController.prototype.CreateOrUpdateEmployee = function (employee) {
        var _this = this;
        if (this.$scope.Action === "Create") {
            this.$scope.LoadingText = "Saving new employee...";
            this.employeeService.CreateEmployee(employee).then(function (result) {
                _this.$scope.Employees.push(result);
                _this.$scope.Employee = new Model.Employee(false);
            });
        } else {
            this.$scope.LoadingText = "Updating employee...";
            this.employeeService.UpdateEmployee(employee).then(function (result) {
                employee = result;
                _this.$scope.Employee = new Model.Employee(false);
                _this.$scope.Action = "Create";
            });
        }
    };

    HomeController.prototype.SelectEmployee = function (employee) {
        this.$scope.Employee = employee;
        this.$scope.Action = "Update";
    };

    HomeController.prototype.DeleteEmployee = function (employee) {
        var _this = this;
        this.$scope.LoadingText = "Deleteing employee...";
        this.employeeService.DeleteEmployee(employee).then(function (result) {
            var emps = _this.$scope.Employees;
            for (var i = 0; i < emps.length; i++) {
                if (emps[i].Id == result.Id) {
                    emps.splice(i, 1);
                    break;
                }
            }
        });
    };
    HomeController.controllerId = "HomeController";
    return HomeController;
})();
app.controller(HomeController.controllerId, [
    '$scope', '$log', 'EmployeeService', function ($scope, $log, employeeService) {
        return new HomeController($scope, $log, employeeService);
    }
]);
//# sourceMappingURL=HomeController.js.map
