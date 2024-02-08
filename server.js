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
  console.log("employees");
  executeQuery("SELECT * FROM employee", [], (err, employees) => {
    if (err) {
      console.log("error");
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
    //console.log("test");
    mainMenu();
  });
}
function viewAllRoles() {
  executeQuery("SELECT * FROM role", [], (err, roles) => {
    if (err) {
      return;
    }

    console.table(roles);
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
        "View All Roles",
        "Exit"
        
      ],
    })
    .then((answers)=> {
      switch (answers.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
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