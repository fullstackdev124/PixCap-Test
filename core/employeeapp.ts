import {IEmployeeOrgApp} from "./iemployeeorgapp";
import {Employee} from "./employee";
import {Action} from "./action";

export class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;
    private parentResult: Employee = null;
    private findResult: Employee = null;
    private isAncestry = false;
    private lastAction: Action = {
        type: 'MOVE',
        performed: false,
        employeeID: 0,
        supervisorID: 0,
        from: 'MOVE',
    };

    constructor(ceo: Employee) {
        this.ceo = ceo;
    }

    move(employeeID: number, supervisorID: number): void {
        this.find(employeeID);
        const employee = this.findResult;
        const parentEmployee = this.parentResult;
        if (employee == null) {
            console.log("      No Employeer for ID: " + employeeID);
            this.setAction(false)
            return;
        }

        this.find(supervisorID)
        const supervisor = this.findResult;
        const supervisorEmployee = this.parentResult;
        if (supervisor == null) {
            console.log("      No Employeer for ID: " + employeeID);
            this.setAction(false)
            return;
        }

        const isParent = supervisor.subordinates.filter(item => item.uniqueId == employee.uniqueId)
        if (isParent!=null && isParent.length>0) {
            console.log("      Supervisor have already this employer as child. ");
            this.setAction(false)
            return;
        }

        // this.checkAncestry(employeeID, supervisor)
        // if (this.isAncestry) {
        //     console.log("--- Both Employeers have ancestry relation. it cannot be moved.")
        // this.setAction(false, employeeID, supervisorID)
        //     return;
        // }

        this.checkAncestry(supervisorID, employee)
        if (this.isAncestry) {
            console.log("      Both Employeers have ancestry relation. it cannot be moved.")
            this.setAction(false, employeeID, supervisorID)
            return;
        }

        const subordinates = [];
        employee.subordinates.forEach(item => {
            parentEmployee.subordinates.push(item)
            subordinates.push(item);
        })
        employee.subordinates = [];

        let originalEmployee = parentEmployee.subordinates.filter(item => item.uniqueId != employee.uniqueId)
        parentEmployee.subordinates = originalEmployee;
        supervisor.subordinates.push(employee)

        if (this.lastAction.type == 'UNDO' && this.lastAction.from == 'OTHER') {
            let indexes = [];
            supervisor.subordinates.forEach((item, index) => {
                let isExist = this.lastAction.subordinates.filter(row => row.uniqueId == item.uniqueId)
                if (isExist != null && isExist.length > 0)
                    indexes.push(index)
            })
            indexes.reverse();

            indexes.forEach(row => {
                supervisor.subordinates.splice(row, 1)
            })

            employee.subordinates = this.lastAction.subordinates;

            this.setAction(true, 'UNDO', employeeID, parentEmployee.uniqueId, subordinates)

        } else if (this.lastAction.type == 'REDO' && this.lastAction.from == 'OTHER') {
            this.setAction(true, 'REDO', employeeID, parentEmployee.uniqueId, subordinates)

        } else {
            this.setAction(true, 'MOVE', employeeID, parentEmployee.uniqueId, subordinates)
        }

    }

    redo(): void {
        if (!this.lastAction.performed || this.lastAction.type!='UNDO') {
            console.log("      It cannot be performed 'REDO' action. last action was not succeed or not 'UNDO'. ")
            return;
        }

        this.setAction(this.lastAction.performed, 'REDO', this.lastAction.employeeID, this.lastAction.supervisorID, this.lastAction.subordinates, 'OTHER');
        this.move(this.lastAction.employeeID, this.lastAction.supervisorID)
    }

    undo(): void {
        if (!this.lastAction.performed || this.lastAction.type!='MOVE') {
            console.log("      It cannot be performed 'UNDO' action. last action was not succeed or not 'MOVE'. ")
            return;
        }

        this.setAction(this.lastAction.performed, 'UNDO', this.lastAction.employeeID, this.lastAction.supervisorID, this.lastAction.subordinates, 'OTHER');
        this.move(this.lastAction.employeeID, this.lastAction.supervisorID)
    }

    private setAction(performed: boolean, type: any = 'MOVE', employeeID: number = 0, supervisorID: number = 0, subordinates: any = [], from: any = 'MOVE') {
        this.lastAction = {
            type: type,
            performed: performed,
            employeeID: employeeID,
            supervisorID: supervisorID,
            subordinates: subordinates,
            from: from,
        }
    }

    private find(employeeID: number) {
        this.findResult = null;
        this.parentResult = null;
        const findEmployee = (employeeID: number, employee: Employee, parent: Employee) => {
            if (employee.uniqueId == employeeID) {
                this.findResult = employee;
                this.parentResult = parent;
                return;
            }

            employee.subordinates.forEach((item: Employee) => {
                findEmployee(employeeID, item, employee);
            })
        }

        findEmployee(employeeID, this.ceo, null);
    }

    private checkAncestry(employeeID: number, employee: Employee) {
        this.isAncestry = false;
        const findEmployee = (employeeID: number, employee: Employee) => {
            if (employee.uniqueId == employeeID) {
                this.isAncestry = true
                return;
            }

            employee.subordinates.forEach((item: Employee) => {
                findEmployee(employeeID, item);
            })
        }

        findEmployee(employeeID, employee);
    }

    print(): void {
        const printEmployee = (employee: Employee, level: string) => {
            console.log(level + "- " + employee.name + ": " + employee.uniqueId)
            employee.subordinates.forEach(item => {
                printEmployee(item, level + "    ")
            })
        }

        printEmployee(this.ceo, "");
    }

    // public getFindResult() {
    //     return this.findResult;
    // }

    // public printEmployee(employee: Employee) {
    //     if (employee == null) {
    //         console.log("No Employee")
    //         return;
    //     }
    //
    //     const printEmployee = (employee: Employee, level: string) => {
    //         console.log(level + "-" + employee.name + ": " + employee.uniqueId)
    //         employee.subordinates.forEach(item => {
    //             printEmployee(item, level + "    ")
    //         })
    //     }
    //
    //     console.log("-" + employee.name + ": " + employee.uniqueId)
    //     employee.subordinates.forEach(item => {
    //         printEmployee(item, "    ")
    //     })
    // }
}
