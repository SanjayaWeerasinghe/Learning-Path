# SQL Learning Path

Complete guide to SQL from basics to advanced concepts with practical examples and exercises.

## Overview

SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. This comprehensive guide covers everything from basic queries to advanced optimization techniques.

## Learning Path Structure

### Basics
1. **[01-Introduction](./Basics/01-Introduction/README.md)** - SQL fundamentals, database concepts, RDBMS overview
2. **[02-SELECT-Statements](./Basics/02-SELECT-Statements/README.md)** - Retrieving data, column selection, DISTINCT
3. **[03-WHERE-Filtering](./Basics/03-WHERE-Filtering/README.md)** - Filtering rows, comparison operators, logical operators
4. **[04-INSERT-UPDATE-DELETE](./Basics/04-INSERT-UPDATE-DELETE/README.md)** - Data manipulation operations
5. **[05-ORDER-BY-LIMIT](./Basics/05-ORDER-BY-LIMIT/README.md)** - Sorting and limiting results

### Intermediate
1. **[01-JOINS](./Intermediate/01-JOINS/README.md)** - INNER, LEFT, RIGHT, FULL OUTER, CROSS joins
2. **[02-Aggregate-Functions](./Intermediate/02-Aggregate-Functions/README.md)** - COUNT, SUM, AVG, MIN, MAX
3. **[03-GROUP-BY-HAVING](./Intermediate/03-GROUP-BY-HAVING/README.md)** - Grouping data and filtering groups
4. **[04-Subqueries](./Intermediate/04-Subqueries/README.md)** - Nested queries, correlated subqueries
5. **[05-Constraints](./Intermediate/05-Constraints/README.md)** - PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK

### Advanced
1. **[01-Indexes](./Advanced/01-Indexes/README.md)** - Index types, creation, optimization
2. **[02-Views](./Advanced/02-Views/README.md)** - Creating and using views, materialized views
3. **[03-Stored-Procedures](./Advanced/03-Stored-Procedures/README.md)** - Procedures, functions, triggers
4. **[04-Transactions](./Advanced/04-Transactions/README.md)** - ACID properties, transaction control
5. **[05-Query-Optimization](./Advanced/05-Query-Optimization/README.md)** - Execution plans, performance tuning

## Sample Database Schema

Throughout this guide, we'll use these sample tables:

### Employees Table
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    hire_date DATE,
    job_title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT,
    manager_id INT
);
```

### Departments Table
```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50),
    location VARCHAR(100),
    budget DECIMAL(15, 2)
);
```

### Products Table
```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT,
    supplier_id INT
);
```

### Orders Table
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    status VARCHAR(20)
);
```

### Order_Items Table
```sql
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2)
);
```

### Customers Table
```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    city VARCHAR(50),
    country VARCHAR(50),
    registration_date DATE
);
```

## How to Use This Guide

1. **Start with Basics** - If you're new to SQL, begin with the Basics section
2. **Practice Each Topic** - Complete the exercises in each README
3. **Build Real Projects** - Apply concepts to real-world scenarios
4. **Review Regularly** - SQL mastery comes with consistent practice

## Prerequisites

- Basic understanding of databases
- Access to a SQL database (MySQL, PostgreSQL, SQL Server, or SQLite)
- SQL client or IDE (MySQL Workbench, pgAdmin, DBeaver, etc.)

## Tips for Success

1. **Write queries by hand** - Don't just read, write actual SQL code
2. **Experiment** - Try variations of queries to understand behavior
3. **Use real data** - Practice with datasets that interest you
4. **Understand execution** - Learn how databases process your queries
5. **Optimize gradually** - First make it work, then make it fast

## Additional Resources

- Official SQL documentation for your database
- SQL fiddle for online practice
- Database performance monitoring tools
- SQL formatting and linting tools

## Common SQL Flavors

While this guide focuses on standard SQL, be aware of these popular implementations:

- **MySQL/MariaDB** - Open source, web applications
- **PostgreSQL** - Advanced features, extensibility
- **SQL Server** - Microsoft ecosystem
- **Oracle** - Enterprise solutions
- **SQLite** - Embedded databases

## Getting Help

- Read error messages carefully
- Check database documentation
- Use EXPLAIN to understand query execution
- Practice with sample datasets
- Join SQL communities and forums

---

**Ready to start?** Begin with [01-Introduction](./Basics/01-Introduction/README.md)!
