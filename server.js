// Prereqs
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "password",
    database: "employee_db"
});
function startApp() {
  console.log("Connecting to the database...");
  
  db.execute("SELECT 1", [], (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
     }
  
    console.log("Connected to the employee_db database.");
  });
} 
  startApp();