// Prereqs
const inquirer = require('inquirer');
const mysql = require("mysql2");

// Database
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employee_db",
    multipleStatements: true,
});
function startApp() {
  console.log("Connecting to the database...");

  db.execute("SELECT 1", [], (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
     }
  
    console.log("Connected to the employee_db database.");
    mainMenu();
  });
} 
function executeQuery(sql, values, callback) {
  db.execute(sql, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return callback(err, null);
    }

    callback(null, results);
  });
}
function viewAllEmployees() {
  executeQuery("SELECT * FROM employee", [], (err, employees) => {
    if (err) {
      return;
    }

    console.table(employees);
    mainMenu();
  });
}
function viewAllDepartments() {
  console.log("department");
  executeQuery("SELECT * FROM department", [], (err, departments) => {
    if (err) {
      return;
    }
    
    console.table(departments);
    console.log("test");
    mainMenu();
  });
}
function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "View All Departments",
        "Exit"
        
      ],
    })
    .then((answers)=> {
      switch (answers.menu) {
        case "View All Emplyees":
          viewAllEmployees ();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Exit":
          console.log("Goodbye!");
          db.end();
          process.exit()
      }
    });
}
/*function viewAllEmployees() {
  executeQuery("SELECT * FROM employee", [], (err, employees) => {
    if (err) {
      return;
    }

    console.table(employees);
    mainMenu();
  });
}*/
startApp();