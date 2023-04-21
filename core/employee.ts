export interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
}
