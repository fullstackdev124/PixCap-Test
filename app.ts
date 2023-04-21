import {Employee} from "./core/employee";
import {EmployeeOrgApp} from "./core/employeeapp";

const will_turner: Employee = {
    uniqueId: 2,
    name: 'Will Turner',
    subordinates: [],
};
const tina_teff: Employee = {
    uniqueId: 3,
    name: 'Tina Teff',
    subordinates: [will_turner],
};
const bob_saget: Employee = {
    uniqueId: 4,
    name: 'Bob Saget',
    subordinates: [tina_teff],
};
const mary_blue: Employee = {
    uniqueId: 5,
    name: 'Mary Blue',
    subordinates: [],
}
const cassandra_reynolds: Employee = {
    uniqueId: 6,
    name: 'Cassandra Reynolds',
    subordinates: [mary_blue, bob_saget],
}
const sarah_donald: Employee = {
    uniqueId: 7,
    name: 'Sarah Donald',
    subordinates: [cassandra_reynolds],
}

const tomas_brown: Employee = {
    uniqueId: 8,
    name: 'Thomas Brown',
    subordinates: [],
}
const harry_tobs: Employee = {
    uniqueId: 9,
    name: 'Harry Tobs',
    subordinates: [tomas_brown],
}
const george_carrey: Employee = {
    uniqueId: 10,
    name: 'George Carrey',
    subordinates: [],
}
const gary_styles: Employee = {
    uniqueId: 11,
    name: 'Gary Styles',
    subordinates: [],
}
const tyler_simpson: Employee = {
    uniqueId: 12,
    name: 'Tyler Simpson',
    subordinates: [harry_tobs, george_carrey, gary_styles],
}

const bruce_willis: Employee = {
    uniqueId: 13,
    name: 'Bruce Willis',
    subordinates: [],
}

const sophie_turner: Employee = {
    uniqueId: 14,
    name: 'Sophie Turner',
    subordinates: [],
}
const georgina_flangy: Employee = {
    uniqueId: 15,
    name: 'Georgina Flangy',
    subordinates: [sophie_turner],
}

const ceo: Employee = {
    uniqueId: 1,
    name: 'Mark Zuckerberg',
    subordinates: [sarah_donald, tyler_simpson, bruce_willis, georgina_flangy],
};

// init app
const app = new EmployeeOrgApp(ceo);

console.log("--- CEO is initialized ---------------")
app.print();
console.log("--------------------------------------")

console.log("")
console.log("--- Move 'Bob Saget(4)' into 'Cassandra Reynolds(6)' ---------------")
app.move(4, 6);
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Move 'Sarah Donald(7)' into 'Will Turner(2)' ---------------")
app.move(7, 2);
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Undo ---------------")
app.undo();
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Move 'Bob Saget(4)' into 'Georgina Flangy(15)' -----------------")
app.move(4, 15);
app.print()
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Undo ---------------")
app.undo();
app.print()
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Move 'Cassandra Reynolds(6)' into 'Mark Zuckerberg(1)' -----------------")
app.move(6, 1);
app.print()
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Move 'Tyler Simpson(12)' into 'Sarah Donald(7)' -----------------")
app.move(12, 7);
app.print()
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Undo ---------------")
app.undo();
app.print()
console.log("--------------------------------------------------------------------")

console.log("")
console.log("--- Redo ---------------")
app.redo();
app.print()
console.log("--------------------------------------------------------------------")
