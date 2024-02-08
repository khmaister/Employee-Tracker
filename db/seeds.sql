-- Starter Data
-- Departments
INSERT INTO department (name)
VALUES ("Production"),
       ("Shipping/Receiving"),
       ("Quality"),
       ("Maintenance"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Operator", 40000, 1),
       ("Production Manager", 60000, 1),
       ("Packer", 40000, 2),
       ("Logistics Manager", 60000, 2),
       ("Inspector", 45000, 3),
       ("Quality Manager", 60000, 3),
       ("Maintenance Tech", 50000, 4),
       ("Maintenance Manager", 62000, 4),
       ("Engineer", 60000, 5),
       ("Engineering Manager", 70000, 5);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Adam", "Adams", 2 ),
       (2, "David", "Davis", null),
       (3, "Cathy", "Clark", 4),
       (4, "Billy", "Bob", null),
       (5, "Eric", "Ericson", 6),
       (6, "Fred", "Fredricks", null),
       (7, "Gordon", "Grover", 8),
       (8, "Henry", "Henricks", null),
       (9, "Ivan", "Irwin", 10),
       (10, "Jackie", "Jackson", null);