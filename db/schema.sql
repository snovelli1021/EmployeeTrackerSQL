DROP DATABASE IF EXISTS sample_db;

DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(department_id)
REFERENCES department(id)    
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY(role_id)
REFERENCES role(id),
FOREIGN KEY(manager_id)
REFERENCES employee(id)     
);