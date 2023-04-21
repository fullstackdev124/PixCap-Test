import {Employee} from "./employee";

export interface Action {
    type: 'MOVE' | 'UNDO' | 'REDO';
    performed: boolean,
    employeeID?: number;
    supervisorID?: number;
    subordinates?: Employee[];
    from: 'MOVE' | 'OTHER';
}
