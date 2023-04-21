"use strict";
exports.__esModule = true;
exports.EmployeeOrgApp = void 0;
var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.parentResult = null;
        this.findResult = null;
        this.isAncestry = false;
        this.lastAction = {
            type: 'MOVE',
            performed: false,
            employeeID: 0,
            supervisorID: 0,
            from: 'MOVE'
        };
        this.ceo = ceo;
    }
    EmployeeOrgApp.prototype.move = function (employeeID, supervisorID) {
        var _this = this;
        this.find(employeeID);
        var employee = this.findResult;
        var parentEmployee = this.parentResult;
        if (employee == null) {
            console.log("      No Employeer for ID: " + employeeID);
            this.setAction(false);
            return;
        }
        this.find(supervisorID);
        var supervisor = this.findResult;
        var supervisorEmployee = this.parentResult;
        if (supervisor == null) {
            console.log("      No Employeer for ID: " + employeeID);
            this.setAction(false);
            return;
        }
        var isParent = supervisor.subordinates.filter(function (item) { return item.uniqueId == employee.uniqueId; });
        if (isParent != null && isParent.length > 0) {
            console.log("      Supervisor have already this employer as child. ");
            this.setAction(false);
            return;
        }
        // this.checkAncestry(employeeID, supervisor)
        // if (this.isAncestry) {
        //     console.log("--- Both Employeers have ancestry relation. it cannot be moved.")
        // this.setAction(false, employeeID, supervisorID)
        //     return;
        // }
        this.checkAncestry(supervisorID, employee);
        if (this.isAncestry) {
            console.log("      Both Employeers have ancestry relation. it cannot be moved.");
            this.setAction(false, employeeID, supervisorID);
            return;
        }
        var subordinates = [];
        employee.subordinates.forEach(function (item) {
            parentEmployee.subordinates.push(item);
            subordinates.push(item);
        });
        employee.subordinates = [];
        var originalEmployee = parentEmployee.subordinates.filter(function (item) { return item.uniqueId != employee.uniqueId; });
        parentEmployee.subordinates = originalEmployee;
        supervisor.subordinates.push(employee);
        if (this.lastAction.type == 'UNDO' && this.lastAction.from == 'OTHER') {
            var indexes_1 = [];
            supervisor.subordinates.forEach(function (item, index) {
                var isExist = _this.lastAction.subordinates.filter(function (row) { return row.uniqueId == item.uniqueId; });
                if (isExist != null && isExist.length > 0)
                    indexes_1.push(index);
            });
            indexes_1.reverse();
            indexes_1.forEach(function (row) {
                supervisor.subordinates.splice(row, 1);
            });
            employee.subordinates = this.lastAction.subordinates;
            this.setAction(true, 'UNDO', employeeID, parentEmployee.uniqueId, subordinates);
        }
        else if (this.lastAction.type == 'REDO' && this.lastAction.from == 'OTHER') {
            this.setAction(true, 'REDO', employeeID, parentEmployee.uniqueId, subordinates);
        }
        else {
            this.setAction(true, 'MOVE', employeeID, parentEmployee.uniqueId, subordinates);
        }
    };
    EmployeeOrgApp.prototype.redo = function () {
        if (!this.lastAction.performed || this.lastAction.type != 'UNDO') {
            console.log("      It cannot be performed 'REDO' action. last action was not succeed or not 'UNDO'. ");
            return;
        }
        this.setAction(this.lastAction.performed, 'REDO', this.lastAction.employeeID, this.lastAction.supervisorID, this.lastAction.subordinates, 'OTHER');
        this.move(this.lastAction.employeeID, this.lastAction.supervisorID);
    };
    EmployeeOrgApp.prototype.undo = function () {
        if (!this.lastAction.performed || this.lastAction.type != 'MOVE') {
            console.log("      It cannot be performed 'UNDO' action. last action was not succeed or not 'MOVE'. ");
            return;
        }
        this.setAction(this.lastAction.performed, 'UNDO', this.lastAction.employeeID, this.lastAction.supervisorID, this.lastAction.subordinates, 'OTHER');
        this.move(this.lastAction.employeeID, this.lastAction.supervisorID);
    };
    EmployeeOrgApp.prototype.setAction = function (performed, type, employeeID, supervisorID, subordinates, from) {
        if (type === void 0) { type = 'MOVE'; }
        if (employeeID === void 0) { employeeID = 0; }
        if (supervisorID === void 0) { supervisorID = 0; }
        if (subordinates === void 0) { subordinates = []; }
        if (from === void 0) { from = 'MOVE'; }
        this.lastAction = {
            type: type,
            performed: performed,
            employeeID: employeeID,
            supervisorID: supervisorID,
            subordinates: subordinates,
            from: from
        };
    };
    EmployeeOrgApp.prototype.find = function (employeeID) {
        var _this = this;
        this.findResult = null;
        this.parentResult = null;
        var findEmployee = function (employeeID, employee, parent) {
            if (employee.uniqueId == employeeID) {
                _this.findResult = employee;
                _this.parentResult = parent;
                return;
            }
            employee.subordinates.forEach(function (item) {
                findEmployee(employeeID, item, employee);
            });
        };
        findEmployee(employeeID, this.ceo, null);
    };
    EmployeeOrgApp.prototype.checkAncestry = function (employeeID, employee) {
        var _this = this;
        this.isAncestry = false;
        var findEmployee = function (employeeID, employee) {
            if (employee.uniqueId == employeeID) {
                _this.isAncestry = true;
                return;
            }
            employee.subordinates.forEach(function (item) {
                findEmployee(employeeID, item);
            });
        };
        findEmployee(employeeID, employee);
    };
    EmployeeOrgApp.prototype.print = function () {
        var printEmployee = function (employee, level) {
            console.log(level + "- " + employee.name + ": " + employee.uniqueId);
            employee.subordinates.forEach(function (item) {
                printEmployee(item, level + "    ");
            });
        };
        printEmployee(this.ceo, "");
    };
    return EmployeeOrgApp;
}());
exports.EmployeeOrgApp = EmployeeOrgApp;
