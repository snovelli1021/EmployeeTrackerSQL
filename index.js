const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

require("dotenv").config();

// Connecting to staff_db.
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(function (err) {
  console.log("Now connected to staff_db");
  startingPrompt();
});

// Prompt that runs on startup.
async function startingPrompt() {
  await inquirer
    .prompt([
      {
        name: "chooseOption",
        message: "Please choose an option below.",
        type: "list",
        choices: [
          "View All Employees",
          "Add Employee",
          "Change Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])

    // Begins switch statement to return chosen prompts and functions selected by user.
    .then((selection) => {
      switch (selection.chooseOption) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          newDepartment();
          break;
        case "Add Role":
          newRole();
          break;
        case "Add Employee":
          newEmployee();
          break;
        case "Change Role":
          changeRole();
          break;
      }
    });
}

// Function that lets the user view the departments data from the table.
function viewAllDepartments() {
  console.log("Now viewing all of the Departments");
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    startingPrompt();
    if (err) {
      console.log(err);
    }
  });
}

// Function that lets the user view the roles data from the table.
function viewAllRoles() {
  console.log("Now viewing all of the roles");
  db.query(
    `SELECT role.title, role.id, department.name, role.salary FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY id`,
    function (err, results) {
      console.table(results);
      startingPrompt();
      if (err) {
        console.log(err);
      }
    }
  );
}

// Function that lets the user view the employees data from the table.
function viewAllEmployees() {
  console.log("Now viewing all of the employees");
  db.query(
    `SELECT employee.id, employee.first_name,
  employee.last_name, role.title, department.name AS department_name,
  role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name
  FROM employee 
  LEFT JOIN role ON role.id = employee.role_id 
  LEFT JOIN department ON department.id = role.department_id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id 
  ORDER BY employee.id;`,
    function (err, results) {
      console.table(results);
      startingPrompt();
      if (err) {
        console.log(err);
      }
    }
  );
}

// Function that lets the user add a new department to the table.
function newDepartment() {
  console.log("Adding a new department");

  const departmentArray = [
    {
      type: "input",
      name: "Add Department",
      message: "What is the name of the new department?",
    },
  ];

  inquirer.prompt(departmentArray).then((response) => {
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      [response.newDepartment],
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `${response.newDepartment} has been added to departments`
          );
          startingPrompt();
        }
      }
    );
  });
}

// Function that lets the user add a new role to the table.
function newRole() {
  console.log("Adding a new role");

  const roleArray = [
    {
      type: "input",
      name: "Add Role",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "newSalary",
      message: "What is the salary for the new role?",
    },
    {
      type: "list",
      name: "newDepartment",
      message: "Which department is the new role in?",
    },
  ];

  inquirer.prompt(roleArray).then((response) => {
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES  (?,?,?);",
      [response.newRole],
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${response.newRole} has been added to roles`);
          startingPrompt();
        }
      }
    );
  });
}

// Function that lets the user add a new employee to the table.
function newEmployee() {
  console.log("Adding a new employee");

  const employeeArray = [
    {
      type: "input",
      name: "Add Employee",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is their last name?",
    },
    {
      type: "input",
      name: "employeeRole",
      message: "What is their role?",
    },
    {
      type: "input",
      name: "employeeManager",
      message: "What is the name of the new employee's manager?",
    },
  ];

  inquirer.prompt(employeeArray).then((response) => {
    db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [response.newEmployee],
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${response.newEmployee} has been added to employees`);
          startingPrompt();
        }
      }
    );
  });
}

// Function that lets the user add a new role to the table.
function changeRole() {
  console.log("Updating an employee's role");

  const employeeArray = [
    {
      type: "input",
      name: "Change Role",
      message: "What is the employee's new role?",
    },
  ];

  inquirer.prompt(employeeArray).then((response) => {
    db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  (?,?,?,?)",
      [response.changeRole],
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `The employee's new role has been updated to ${response.changeRole}.`
          );
          startingPrompt();
        }
      }
    );
  });
}
