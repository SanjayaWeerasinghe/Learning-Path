# SQL JOINS

## Overview

JOINs combine rows from two or more tables based on related columns. They're essential for working with relational databases where data is distributed across multiple tables.

## Types of JOINS

1. **INNER JOIN** - Returns matching rows from both tables
2. **LEFT JOIN (LEFT OUTER JOIN)** - All rows from left table, matching rows from right
3. **RIGHT JOIN (RIGHT OUTER JOIN)** - All rows from right table, matching rows from left
4. **FULL OUTER JOIN** - All rows from both tables
5. **CROSS JOIN** - Cartesian product of both tables
6. **SELF JOIN** - Table joined with itself

## INNER JOIN

Returns only rows where there's a match in both tables.

### Basic Syntax
```sql
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;
```

### Examples

```sql
-- Employees with their department names
SELECT
    e.employee_id,
    e.first_name,
    e.last_name,
    e.job_title,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Products in orders with customer details
SELECT
    o.order_id,
    c.first_name,
    c.last_name,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;

-- Multiple conditions in JOIN
SELECT
    e.first_name,
    e.last_name,
    e.salary,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id
    AND e.salary > 60000;

-- Using WHERE with JOIN
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE d.location = 'New York'
  AND e.salary > 65000;
```

## LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table and matching rows from the right table. If no match, NULL values for right table columns.

### Basic Syntax
```sql
SELECT columns
FROM table1
LEFT JOIN table2 ON table1.column = table2.column;
```

### Examples

```sql
-- All employees and their departments (including those without departments)
SELECT
    e.first_name,
    e.last_name,
    e.department_id,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- All customers and their order count (including those with no orders)
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name;

-- Find customers with NO orders
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- All products and their order frequency (including never ordered)
SELECT
    p.product_id,
    p.product_name,
    p.price,
    COUNT(oi.order_item_id) AS times_ordered
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.price
ORDER BY times_ordered DESC;
```

## RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table and matching rows from the left table. Less commonly used than LEFT JOIN.

### Basic Syntax
```sql
SELECT columns
FROM table1
RIGHT JOIN table2 ON table1.column = table2.column;
```

### Examples

```sql
-- All departments and their employees (including empty departments)
SELECT
    d.department_name,
    d.location,
    e.first_name,
    e.last_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- Find departments with NO employees
SELECT
    d.department_id,
    d.department_name,
    d.location
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;

-- Note: Most developers prefer LEFT JOIN for readability
-- This RIGHT JOIN can be rewritten as:
SELECT
    d.department_id,
    d.department_name,
    d.location
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
WHERE e.employee_id IS NULL;
```

## FULL OUTER JOIN

Returns all rows from both tables, with NULLs where there's no match. Not supported in MySQL (use UNION instead).

### Basic Syntax
```sql
SELECT columns
FROM table1
FULL OUTER JOIN table2 ON table1.column = table2.column;
```

### Examples (PostgreSQL, SQL Server, Oracle)

```sql
-- All employees and all departments
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- MySQL workaround using UNION
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
UNION
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;
```

## CROSS JOIN

Returns the Cartesian product (all possible combinations) of both tables.

### Basic Syntax
```sql
SELECT columns
FROM table1
CROSS JOIN table2;
```

### Examples

```sql
-- All combinations of employees and departments
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
CROSS JOIN departments d;

-- Generate all possible product-customer combinations
SELECT
    c.customer_id,
    c.first_name,
    p.product_name
FROM customers c
CROSS JOIN products p
LIMIT 20;

-- Create a date range for reporting (with numbers table)
SELECT
    DATE_ADD('2024-01-01', INTERVAL n.num DAY) AS report_date
FROM (
    SELECT 0 AS num UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
    UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
) n
CROSS JOIN (SELECT 0 AS num UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) m;

-- Alternative CROSS JOIN syntax (implicit)
SELECT e.first_name, d.department_name
FROM employees e, departments d;
```

## SELF JOIN

A table joined with itself, useful for hierarchical data or comparing rows within the same table.

### Examples

```sql
-- Find employees and their managers
SELECT
    e.first_name AS employee_name,
    e.last_name AS employee_lastname,
    e.job_title,
    m.first_name AS manager_name,
    m.last_name AS manager_lastname
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- Find employees earning more than their manager
SELECT
    e.first_name AS employee,
    e.salary AS emp_salary,
    m.first_name AS manager,
    m.salary AS mgr_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;

-- Find employees in the same department
SELECT
    e1.first_name AS employee1,
    e2.first_name AS employee2,
    e1.department_id
FROM employees e1
INNER JOIN employees e2
    ON e1.department_id = e2.department_id
    AND e1.employee_id < e2.employee_id
ORDER BY e1.department_id;

-- Find products in the same price range
SELECT
    p1.product_name AS product1,
    p2.product_name AS product2,
    p1.price
FROM products p1
INNER JOIN products p2
    ON p1.category = p2.category
    AND p1.product_id < p2.product_id
    AND ABS(p1.price - p2.price) < 50
ORDER BY p1.price;
```

## Multiple JOINs

Combining three or more tables in a single query.

### Examples

```sql
-- Order details with customer, product info
SELECT
    o.order_id,
    o.order_date,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id, p.product_name;

-- Employees with department and manager info
SELECT
    e.first_name AS employee,
    e.job_title,
    d.department_name,
    d.location,
    m.first_name AS manager,
    m.job_title AS manager_title
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY d.department_name, e.last_name;

-- Complex join: Orders with full details
SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer,
    c.city,
    c.country,
    o.order_date,
    p.product_name,
    p.category,
    oi.quantity,
    oi.unit_price,
    o.status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2023-08-01'
ORDER BY o.order_date DESC, o.order_id;
```

## JOIN with Aggregations

Combining JOINs with GROUP BY and aggregate functions.

### Examples

```sql
-- Employee count by department
SELECT
    d.department_name,
    d.location,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MAX(e.salary) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name, d.location
ORDER BY employee_count DESC;

-- Customer order statistics
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.city,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS lifetime_value,
    AVG(o.total_amount) AS avg_order_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.city
HAVING total_orders > 0
ORDER BY lifetime_value DESC;

-- Product sales summary
SELECT
    p.product_name,
    p.category,
    p.price,
    COUNT(oi.order_item_id) AS times_ordered,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category, p.price
ORDER BY total_revenue DESC;
```

## Practical Examples

### Example 1: Sales Report
```sql
-- Comprehensive sales report
SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    d.department_name,
    p.category,
    COUNT(DISTINCT o.order_id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN employees e ON o.customer_id = e.employee_id -- Assuming employee sales
JOIN departments d ON e.department_id = d.department_id
WHERE o.status = 'Completed'
  AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m'), d.department_name, p.category
ORDER BY month DESC, revenue DESC;
```

### Example 2: Customer 360 View
```sql
-- Complete customer profile with order history
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email,
    c.city,
    c.country,
    c.registration_date,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT oi.product_id) AS unique_products,
    SUM(o.total_amount) AS lifetime_value,
    MAX(o.order_date) AS last_order_date,
    DATEDIFF(CURDATE(), MAX(o.order_date)) AS days_since_last_order
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city, c.country, c.registration_date
ORDER BY lifetime_value DESC;
```

### Example 3: Inventory Valuation
```sql
-- Current inventory value by category
SELECT
    p.category,
    COUNT(p.product_id) AS product_count,
    SUM(p.stock_quantity) AS total_units,
    SUM(p.price * p.stock_quantity) AS inventory_value,
    AVG(p.price) AS avg_price
FROM products p
GROUP BY p.category
ORDER BY inventory_value DESC;
```

### Example 4: Employee Hierarchy Report
```sql
-- Organizational structure with salary rollup
SELECT
    m.first_name AS manager,
    m.job_title AS manager_title,
    COUNT(e.employee_id) AS direct_reports,
    SUM(e.salary) AS team_salary_cost,
    AVG(e.salary) AS avg_team_salary
FROM employees m
LEFT JOIN employees e ON m.employee_id = e.manager_id
WHERE m.manager_id IS NULL OR m.job_title LIKE '%Manager%'
GROUP BY m.employee_id, m.first_name, m.job_title
ORDER BY team_salary_cost DESC;
```

### Example 5: Cross-Selling Opportunities
```sql
-- Products frequently bought together
SELECT
    p1.product_name AS product1,
    p2.product_name AS product2,
    COUNT(*) AS times_together
FROM order_items oi1
JOIN order_items oi2
    ON oi1.order_id = oi2.order_id
    AND oi1.product_id < oi2.product_id
JOIN products p1 ON oi1.product_id = p1.product_id
JOIN products p2 ON oi2.product_id = p2.product_id
GROUP BY p1.product_name, p2.product_name
HAVING times_together > 1
ORDER BY times_together DESC
LIMIT 10;
```

## Practice Exercises

### Exercise 1: Basic INNER JOIN
```sql
-- 1. List all employees with their department names
-- 2. Show all order items with product names
-- 3. Display customers with their orders
-- 4. List products with their order quantities
-- 5. Show employees with their manager's name
```

### Exercise 2: LEFT JOIN
```sql
-- 1. All customers and their order count (include 0 orders)
-- 2. All products and times ordered (include never ordered)
-- 3. All departments and employee count (include empty departments)
-- 4. All employees and their total sales (include those with none)
-- 5. All categories and product count (include empty categories)
```

### Exercise 3: Finding Missing Relationships
```sql
-- 1. Customers who have never placed an order
-- 2. Products that have never been ordered
-- 3. Departments with no employees
-- 4. Employees without a manager
-- 5. Orders with no items (data quality check)
```

### Exercise 4: Multiple JOINs
```sql
-- 1. Orders with customer name and product details
-- 2. Employees with department and manager information
-- 3. Products with category and supplier details
-- 4. Order items with order, customer, and product info
-- 5. Complete sales record (order, customer, product, employee)
```

### Exercise 5: SELF JOIN
```sql
-- 1. List all employees with their manager names
-- 2. Find employees in the same department
-- 3. Find products with similar prices (within $10)
-- 4. Identify employees hired in the same month
-- 5. Find customers from the same city
```

### Exercise 6: Aggregation with JOINs
```sql
-- 1. Total sales by product category
-- 2. Average salary by department
-- 3. Customer order statistics (count, total, average)
-- 4. Product popularity (times ordered) by category
-- 5. Department headcount and total salary budget
```

### Exercise 7: Complex Queries
```sql
-- 1. Top 5 customers by revenue with their order count
-- 2. Products ordered by customers from specific cities
-- 3. Employees whose salary is above their department average
-- 4. Orders with more than 3 different products
-- 5. Departments where all employees earn over $60k
```

### Exercise 8: CROSS JOIN Applications
```sql
-- 1. Generate all employee-project combinations
-- 2. Create a product recommendation matrix
-- 3. Generate date range for reporting
-- 4. All possible customer-product pairings
-- 5. Create test data combinations
```

### Exercise 9: Advanced JOIN Patterns
```sql
-- 1. Running total of orders by customer
-- 2. Employees earning more than their manager
-- 3. Products priced higher than category average
-- 4. Customers with above-average order values
-- 5. Departments with employee growth trends
```

### Exercise 10: Real-World Scenarios
```sql
-- 1. Monthly sales report by category and region
-- 2. Customer retention analysis (repeat customers)
-- 3. Product bundle recommendations
-- 4. Employee performance scorecard
-- 5. Inventory reorder recommendations
```

## Best Practices

### 1. Always Use Table Aliases
```sql
-- ❌ Hard to read
SELECT employees.first_name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.department_id;

-- ✅ Clear and concise
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

### 2. Be Explicit with JOIN Types
```sql
-- ❌ Implicit join (old style, avoid)
SELECT e.first_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id;

-- ✅ Explicit JOIN
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

### 3. Join on Indexed Columns
```sql
-- ✅ Join on primary/foreign keys (already indexed)
SELECT *
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
```

### 4. Filter Early with WHERE
```sql
-- ❌ Filter after join (processes more data)
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE d.location = 'New York';

-- ✅ Filter in JOIN or before (when possible)
-- Though in this case, optimizer usually handles it
```

### 5. Use LEFT JOIN to Find Missing Data
```sql
-- ✅ Pattern for finding orphaned records
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

## Performance Tips

1. **Index JOIN columns** - Especially foreign keys
2. **Join on equality** - More efficient than ranges
3. **Filter early** - Use WHERE to reduce dataset before joining
4. **Avoid SELECT *** - Only select needed columns
5. **Consider JOIN order** - Start with smallest table (optimizer usually does this)
6. **Use EXPLAIN** - Understand query execution plan
7. **Denormalize when necessary** - For frequently joined tables

### Example: Optimized vs Unoptimized
```sql
-- ❌ Unoptimized
SELECT *
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;

-- ✅ Optimized (only needed columns, filtered)
SELECT
    o.order_id,
    c.first_name,
    p.product_name,
    oi.quantity
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2023-01-01'
  AND o.status = 'Completed';
```

## Common Mistakes to Avoid

1. **Cartesian products** - Forgetting JOIN condition
2. **Wrong JOIN type** - Using INNER when LEFT is needed
3. **Ambiguous column names** - Not using table aliases
4. **Joining on wrong columns** - Mismatched data types or keys
5. **Not handling NULLs** - In LEFT/RIGHT JOINs
6. **Over-joining** - Joining tables not actually needed
7. **Inefficient SELF JOINs** - Not limiting combinations properly

## Visual JOIN Reference

```
INNER JOIN - Intersection only
LEFT JOIN - All of left + matching right
RIGHT JOIN - All of right + matching left
FULL OUTER - All of both
CROSS JOIN - All combinations
```

## Next Steps

Now that you've mastered JOINs, proceed to:
- **[02-Aggregate-Functions](../02-Aggregate-Functions/README.md)** - Learn to summarize data with aggregate functions

## Summary

Key takeaways:
- JOINs combine data from multiple tables
- INNER JOIN returns only matching rows
- LEFT/RIGHT JOIN includes all rows from one table
- SELF JOIN compares rows within same table
- Always use table aliases for clarity
- Index JOIN columns for performance
- Choose the right JOIN type for your needs
- Filter early to optimize queries

---

**Master JOINs**: They're fundamental to working with relational databases!
