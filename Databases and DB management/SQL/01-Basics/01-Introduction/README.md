# SQL Introduction

## Overview

SQL (Structured Query Language) is a standardized programming language used to manage and manipulate relational databases. It's essential for data analysts, developers, and anyone working with data.

## What is SQL?

SQL is a declarative language that allows you to:
- **Query** data from databases
- **Insert** new records
- **Update** existing records
- **Delete** records
- **Create** database structures
- **Control** access to data

## Key Concepts

### Database
A structured collection of data stored electronically. Example: Company database containing employee, product, and sales information.

### Table
A collection of related data organized in rows and columns. Example: `employees` table.

### Row (Record)
A single entry in a table representing one entity. Example: One employee's information.

### Column (Field)
A specific attribute of data in a table. Example: `first_name`, `salary`.

### Primary Key
A unique identifier for each row in a table. Example: `employee_id`.

### Foreign Key
A field that links one table to another. Example: `department_id` in employees table links to departments table.

## RDBMS (Relational Database Management System)

Popular RDBMS platforms:
- **MySQL** - Open source, widely used in web applications
- **PostgreSQL** - Advanced open source, excellent for complex queries
- **SQL Server** - Microsoft's enterprise solution
- **Oracle** - Enterprise-grade, feature-rich
- **SQLite** - Lightweight, embedded databases

## SQL Command Categories

### 1. DDL (Data Definition Language)
Defines database structure:
- `CREATE` - Create database objects
- `ALTER` - Modify database objects
- `DROP` - Delete database objects
- `TRUNCATE` - Remove all records from a table

### 2. DML (Data Manipulation Language)
Manipulates data:
- `SELECT` - Retrieve data
- `INSERT` - Add new data
- `UPDATE` - Modify existing data
- `DELETE` - Remove data

### 3. DCL (Data Control Language)
Controls access:
- `GRANT` - Give user access
- `REVOKE` - Remove user access

### 4. TCL (Transaction Control Language)
Manages transactions:
- `COMMIT` - Save changes
- `ROLLBACK` - Undo changes
- `SAVEPOINT` - Create rollback point

## Sample Database Setup

### Create Database
```sql
CREATE DATABASE company_db;
USE company_db;
```

### Create Tables

#### Employees Table
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    hire_date DATE,
    job_title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT,
    manager_id INT
);
```

#### Departments Table
```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    budget DECIMAL(15, 2)
);
```

#### Products Table
```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT DEFAULT 0,
    supplier_id INT
);
```

#### Customers Table
```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    city VARCHAR(50),
    country VARCHAR(50),
    registration_date DATE
);
```

#### Orders Table
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'Pending'
);
```

#### Order_Items Table
```sql
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2)
);
```

### Insert Sample Data

#### Departments
```sql
INSERT INTO departments (department_name, location, budget) VALUES
('Engineering', 'San Francisco', 500000.00),
('Marketing', 'New York', 300000.00),
('Sales', 'Chicago', 400000.00),
('Human Resources', 'Boston', 200000.00),
('Finance', 'New York', 350000.00);
```

#### Employees
```sql
INSERT INTO employees (first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id) VALUES
('John', 'Doe', 'john.doe@company.com', '555-0101', '2020-01-15', 'Software Engineer', 85000.00, 1, NULL),
('Jane', 'Smith', 'jane.smith@company.com', '555-0102', '2019-03-22', 'Marketing Manager', 75000.00, 2, NULL),
('Bob', 'Johnson', 'bob.johnson@company.com', '555-0103', '2021-06-10', 'Sales Representative', 60000.00, 3, NULL),
('Alice', 'Williams', 'alice.williams@company.com', '555-0104', '2018-09-05', 'HR Manager', 70000.00, 4, NULL),
('Charlie', 'Brown', 'charlie.brown@company.com', '555-0105', '2020-11-20', 'Financial Analyst', 68000.00, 5, NULL),
('David', 'Lee', 'david.lee@company.com', '555-0106', '2022-02-14', 'Junior Developer', 55000.00, 1, 1),
('Emma', 'Davis', 'emma.davis@company.com', '555-0107', '2021-08-30', 'Marketing Coordinator', 50000.00, 2, 2),
('Frank', 'Wilson', 'frank.wilson@company.com', '555-0108', '2019-12-01', 'Senior Sales Rep', 72000.00, 3, 3),
('Grace', 'Martinez', 'grace.martinez@company.com', '555-0109', '2023-01-10', 'Recruiter', 52000.00, 4, 4),
('Henry', 'Anderson', 'henry.anderson@company.com', '555-0110', '2020-07-15', 'Accountant', 62000.00, 5, 5);
```

#### Products
```sql
INSERT INTO products (product_name, category, price, stock_quantity) VALUES
('Laptop Pro 15', 'Electronics', 1299.99, 50),
('Wireless Mouse', 'Electronics', 29.99, 200),
('Office Chair', 'Furniture', 299.99, 75),
('Desk Lamp', 'Furniture', 49.99, 150),
('USB-C Cable', 'Electronics', 19.99, 300),
('Monitor 27inch', 'Electronics', 399.99, 60),
('Keyboard Mechanical', 'Electronics', 129.99, 100),
('Standing Desk', 'Furniture', 599.99, 30),
('Webcam HD', 'Electronics', 79.99, 120),
('Headphones Wireless', 'Electronics', 199.99, 90);
```

#### Customers
```sql
INSERT INTO customers (first_name, last_name, email, city, country, registration_date) VALUES
('Michael', 'Scott', 'michael.scott@email.com', 'Scranton', 'USA', '2023-01-15'),
('Pam', 'Beesly', 'pam.beesly@email.com', 'Scranton', 'USA', '2023-02-20'),
('Jim', 'Halpert', 'jim.halpert@email.com', 'Philadelphia', 'USA', '2023-03-10'),
('Dwight', 'Schrute', 'dwight.schrute@email.com', 'Scranton', 'USA', '2023-01-25'),
('Stanley', 'Hudson', 'stanley.hudson@email.com', 'New York', 'USA', '2023-04-05'),
('Kevin', 'Malone', 'kevin.malone@email.com', 'Scranton', 'USA', '2023-05-12'),
('Angela', 'Martin', 'angela.martin@email.com', 'Scranton', 'USA', '2023-02-28'),
('Oscar', 'Martinez', 'oscar.martinez@email.com', 'Scranton', 'USA', '2023-06-15'),
('Ryan', 'Howard', 'ryan.howard@email.com', 'New York', 'USA', '2023-07-01'),
('Kelly', 'Kapoor', 'kelly.kapoor@email.com', 'Miami', 'USA', '2023-03-22');
```

#### Orders
```sql
INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2023-08-01', 1329.98, 'Completed'),
(2, '2023-08-05', 49.99, 'Completed'),
(3, '2023-08-10', 1699.97, 'Shipped'),
(4, '2023-08-12', 299.99, 'Processing'),
(5, '2023-08-15', 79.99, 'Completed'),
(1, '2023-08-20', 599.99, 'Shipped'),
(3, '2023-08-22', 229.98, 'Completed'),
(6, '2023-08-25', 399.99, 'Processing'),
(7, '2023-08-28', 149.98, 'Completed'),
(8, '2023-09-01', 1299.99, 'Shipped');
```

#### Order Items
```sql
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1299.99),
(1, 2, 1, 29.99),
(2, 4, 1, 49.99),
(3, 1, 1, 1299.99),
(3, 6, 1, 399.99),
(4, 3, 1, 299.99),
(5, 9, 1, 79.99),
(6, 8, 1, 599.99),
(7, 7, 1, 129.99),
(7, 10, 1, 199.99);
```

## SQL Syntax Basics

### Statement Structure
```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1;
```

### Key Rules
1. SQL is **case-insensitive** for keywords (SELECT = select)
2. Statements end with a **semicolon** (;)
3. **String values** use single quotes ('text')
4. **Comments**:
   - Single line: `-- Comment`
   - Multi-line: `/* Comment */`

### Example Queries
```sql
-- View all employees
SELECT * FROM employees;

-- Count total employees
SELECT COUNT(*) FROM employees;

-- View table structure
DESCRIBE employees;

-- Show all tables in database
SHOW TABLES;
```

## Practice Exercises

### Exercise 1: Database Exploration
1. List all tables in your database
2. View the structure of the `employees` table
3. Count the total number of records in each table

### Exercise 2: Basic Understanding
1. Identify the primary key in the `products` table
2. What data type is used for `salary` in employees?
3. Which tables have foreign key relationships?

### Exercise 3: Simple Queries
```sql
-- Write queries for:
1. Select all columns from the departments table
2. Count how many products are in the database
3. Display the first 5 customers
4. Show all distinct job titles from employees
5. Count how many orders have status 'Completed'
```

### Exercise 4: Table Creation
Create a new table called `suppliers`:
- supplier_id (Primary Key, Auto Increment)
- company_name (VARCHAR, NOT NULL)
- contact_name (VARCHAR)
- phone (VARCHAR)
- country (VARCHAR)

### Exercise 5: Data Insertion
Insert 3 suppliers into your newly created table.

### Exercise 6: Understanding Relationships
1. Explain the relationship between `orders` and `order_items`
2. Why does the `employees` table have a `manager_id` column?
3. What happens if you try to insert an order with a customer_id that doesn't exist?

### Exercise 7: Database Design
Design a table structure for a library system with:
- Books (book_id, title, author, ISBN, publication_year)
- Members (member_id, name, email, join_date)
- Loans (loan_id, book_id, member_id, loan_date, return_date)

### Exercise 8: Data Types
Choose appropriate data types for:
1. A phone number field
2. A product price field
3. A birth date field
4. A boolean field for "is_active"
5. A large text description

### Exercise 9: Constraints
Add these constraints to the `suppliers` table:
1. Make `company_name` UNIQUE
2. Add a CHECK constraint for phone format
3. Set a default value for country

### Exercise 10: Documentation
Write comments for:
1. The purpose of the `employees` table
2. Why we use AUTO_INCREMENT for IDs
3. The relationship between departments and employees

## Real-World Scenarios

### Scenario 1: E-commerce Platform
You're building an online store. What tables would you need? Consider:
- Products and categories
- Customer accounts
- Shopping cart
- Orders and order history
- Payment information
- Shipping addresses

### Scenario 2: Hospital Management
Design tables for:
- Patients
- Doctors
- Appointments
- Medical records
- Prescriptions
- Departments

### Scenario 3: School Management
Design tables for:
- Students
- Teachers
- Courses
- Enrollments
- Grades
- Classrooms

## Best Practices

1. **Naming Conventions**
   - Use lowercase with underscores: `employee_id`
   - Be descriptive: `order_date` not `od`
   - Plural for table names: `employees`, `orders`

2. **Data Types**
   - Choose appropriate sizes
   - Use INT for IDs
   - Use DECIMAL for money
   - Use DATE/DATETIME for dates

3. **Constraints**
   - Always define PRIMARY KEY
   - Use NOT NULL for required fields
   - Add FOREIGN KEY constraints
   - Consider UNIQUE constraints

4. **Documentation**
   - Comment complex logic
   - Document table purposes
   - Keep a data dictionary

## Performance Tips

1. **Index primary keys** (automatic in most RDBMS)
2. **Limit SELECT*** usage in production
3. **Use appropriate data types** to save space
4. **Normalize tables** to reduce redundancy
5. **Plan for scalability** from the start

## Common Mistakes to Avoid

1. Not using primary keys
2. Storing calculated data
3. Using inappropriate data types
4. Poor naming conventions
5. Not planning relationships
6. Ignoring data validation
7. Not backing up data
8. Forgetting about security

## Next Steps

Now that you understand SQL basics, proceed to:
- **[02-SELECT-Statements](../02-SELECT-Statements/README.md)** - Learn to query data effectively

## Additional Resources

- SQL Standard Documentation
- Database-specific manuals (MySQL, PostgreSQL, etc.)
- Online SQL sandboxes for practice
- Database design tools (draw.io, dbdiagram.io)

---

**Key Takeaway**: SQL is about understanding data relationships and structure. Master the fundamentals before moving to complex queries.
