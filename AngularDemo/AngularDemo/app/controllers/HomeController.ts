/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../models/Employee.ts"/>

interface IHomeControllerScope extends ng.IScope {
    Title: string;
    GetEmployees: () => void;
    GetEmployee: (id: number) => ng.IPromise<Model.Employee>;
    CreateOrUpdateEmployee: (employee: Model.Employee, form: ng.IFormController) => void;
    DeleteEmployee: (employee: Model.Employee) => void;
    Employee: any;
    Employees: Model.Employee[];
    SelectEmployee: (employee: Model.Employee) => void;
    Action: string;    
    loadingTracker: any;
    LoadingText: string;
    employeeForm: ng.IFormController;
    toast: () => void;
    callLog:()=>void;
}

interface IHomeController {    
}

class HomeController implements IHomeController {
    static controllerId: string = "HomeController";
    _log:any;
    constructor(
        private $scope: IHomeControllerScope,
        private $log: ng.ILogService,
        public employeeService) {
        this.$log.info('Controller called.');            
        $scope.Employee = new Model.Employee(false);
        $scope.Action = "Create";
        $scope.CreateOrUpdateEmployee = (employee: Model.Employee) => this.CreateOrUpdateEmployee(employee);
        $scope.SelectEmployee = (employee: Model.Employee) => this.SelectEmployee(employee);
        $scope.DeleteEmployee = (employee: Model.Employee) => this.DeleteEmployee(employee);        
        $scope.loadingTracker = this.employeeService.loadingTracker;
        $scope.LoadingText = "Loading...";                    
            $scope.GetEmployees = () => this.GetEmployees();
        $scope.Employees = [];
        $scope.toast = () => {
            toastr.options= {
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
        $scope.callLog = () => { this.callLog(); };
    }

    public GetEmployees() {
        var promise = this.employeeService.GetEmployees();                     
        promise.then((result) => {
            this.$scope.Employees = result;
        });
    }    

    private callLog() {
        this.$log.debug('Log is Called From Button for debug');
        this.$log.info('Log is Called From Button for info');
        this.$log.warn('Log is Called From Button for warning');
        this.$log.error('Log is Called From Button for Error');
    }

    private CreateOrUpdateEmployee(employee: Model.Employee) {               
        if (this.$scope.Action === "Create") {
            this.$scope.LoadingText = "Saving new employee...";
            this.employeeService.CreateEmployee(employee).then((result) => {
                this.$scope.Employees.push(result);
                this.$scope.Employee = new Model.Employee(false);
            });
        } else {
            this.$scope.LoadingText = "Updating employee...";
            this.employeeService.UpdateEmployee(employee).then((result) => {
                employee = result;
                this.$scope.Employee = new Model.Employee(false);
                this.$scope.Action = "Create";
            });
        }
    }

    private SelectEmployee(employee: Model.Employee) {
        this.$scope.Employee = employee;
        this.$scope.Action = "Update";
    }

    private DeleteEmployee(employee: Model.Employee) {        
        this.$scope.LoadingText = "Deleteing employee...";            
        this.employeeService.DeleteEmployee(employee).then((result) => {                                   
            var emps = this.$scope.Employees;            
            for (var i = 0; i < emps.length; i++) {                
                if (emps[i].Id == result.Id) {                                      
                    emps.splice(i, 1);
                    break;
                }
            }                        
        });
    }
}
app.controller(HomeController.controllerId, ['$scope', '$log', 'EmployeeService', ($scope, $log, employeeService) =>
    new HomeController($scope, $log, employeeService)
]);




