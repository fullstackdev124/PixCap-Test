"use strict";
exports.__esModule = true;
var employeeapp_1 = require("./core/employeeapp");
var will_turner = {
    uniqueId: 2,
    name: 'Will Turner',
    subordinates: []
};
var tina_teff = {
    uniqueId: 3,
    name: 'Tina Teff',
    subordinates: [will_turner]
};
var bob_saget = {
    uniqueId: 4,
    name: 'Bob Saget',
    subordinates: [tina_teff]
};
var mary_blue = {
    uniqueId: 5,
    name: 'Mary Blue',
    subordinates: []
};
var cassandra_reynolds = {
    uniqueId: 6,
    name: 'Cassandra Reynolds',
    subordinates: [mary_blue, bob_saget]
};
var sarah_donald = {
    uniqueId: 7,
    name: 'Sarah Donald',
    subordinates: [cassandra_reynolds]
};
var tomas_brown = {
    uniqueId: 8,
    name: 'Thomas Brown',
    subordinates: []
};
var harry_tobs = {
    uniqueId: 9,
    name: 'Harry Tobs',
    subordinates: [tomas_brown]
};
var george_carrey = {
    uniqueId: 10,
    name: 'George Carrey',
    subordinates: []
};
var gary_styles = {
    uniqueId: 11,
    name: 'Gary Styles',
    subordinates: []
};
var tyler_simpson = {
    uniqueId: 12,
    name: 'Tyler Simpson',
    subordinates: [harry_tobs, george_carrey, gary_styles]
};
var bruce_willis = {
    uniqueId: 13,
    name: 'Bruce Willis',
    subordinates: []
};
var sophie_turner = {
    uniqueId: 14,
    name: 'Sophie Turner',
    subordinates: []
};
var georgina_flangy = {
    uniqueId: 15,
    name: 'Georgina Flangy',
    subordinates: [sophie_turner]
};
var ceo = {
    uniqueId: 1,
    name: 'Mark Zuckerberg',
    subordinates: [sarah_donald, tyler_simpson, bruce_willis, georgina_flangy]
};
// init app
var app = new employeeapp_1.EmployeeOrgApp(ceo);
console.log("--- CEO is initialized ---------------");
app.print();
console.log("--------------------------------------");
console.log("");
console.log("--- Move 'Bob Saget(4)' into 'Cassandra Reynolds(6)' ---------------");
app.move(4, 6);
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Move 'Sarah Donald(7)' into 'Will Turner(2)' ---------------");
app.move(7, 2);
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Undo ---------------");
app.undo();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Move 'Bob Saget(4)' into 'Georgina Flangy(15)' -----------------");
app.move(4, 15);
app.print();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Undo ---------------");
app.undo();
app.print();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Move 'Cassandra Reynolds(6)' into 'Mark Zuckerberg(1)' -----------------");
app.move(6, 1);
app.print();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Move 'Tyler Simpson(12)' into 'Sarah Donald(7)' -----------------");
app.move(12, 7);
app.print();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Undo ---------------");
app.undo();
app.print();
console.log("--------------------------------------------------------------------");
console.log("");
console.log("--- Redo ---------------");
app.redo();
app.print();
console.log("--------------------------------------------------------------------");
