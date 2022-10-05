USE staff_db;

INSERT INTO department (name)
VALUES
("English"),
("Math"),
("Science"),
("Business");

INSERT INTO role (title, salary, department_id)
VALUES
("Professor", 100000, 1),
("Teaching Assistant", 80000, 1),
("Professor", 110000, 2),
("Teaching Assistant", 85000, 2),
("Professor", 120000, 3),
("Teaching Assistant", 90000, 3),
("Professor", 125000, 4),
("Teaching Assistant", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Stephen", "Novelli", 1, NULL),
("Sean", "Miller", 1, 1),
("Sarah", "Johnson", 3, NULL),
("Susan", "White", 4, 3);
