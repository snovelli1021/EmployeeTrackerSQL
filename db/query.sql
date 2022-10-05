SELECT * FROM department;

SELECT role.title, role.id, department.name AS department_name, role.salary
FROM role
JOIN department ON role.department_id = department.id
ORDER BY id;

SELECT employee.id, employee.first_name,
employee.last_name, role.title, department.name AS department_name,
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name
FROM employee 
LEFT JOIN role ON role.id = employee.role_id 
LEFT JOIN department ON department.id = role.department_id 
LEFT JOIN employee manager ON manager.id = employee.manager_id 
ORDER BY employee.id;

INSERT INTO department (name) VALUES  (?);

INSERT INTO role (title, salary, department_id) VALUES  (?);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  (?);

SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name 
FROM employee;

UPDATE employee SET role_id=? WHERE id=?;