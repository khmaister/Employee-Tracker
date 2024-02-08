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
// Initialize
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
// View Employees
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
//Add Employee
function addEmployee() {
  executeQuery("SELECT * FROM role", [], (err, roles) => {
    if (err) {
      return;
    }

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter employee's last name:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          name: "managerId",
          type: "number",
          message:
            "Enter the Manager's id employee will report to.",
        },
      ])
      .then((answers) => {
        executeQuery(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId,
          ],
          (err) => {
            if (err) {
              return;
            }

            console.log(
              `Employee "${answers.firstName} ${answers.lastName}" added successfully!`
            );
            mainMenu();
          }
        );
      });
  });
}
// View Departments
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
// View Roles
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
        case "Add Employee":
          addEmployee();
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

startApp();