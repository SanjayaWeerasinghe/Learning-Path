# SQL Views

## Overview

A view is a virtual table based on a SELECT query. Views don't store data themselves but provide a way to simplify complex queries, enhance security, and present data differently.

## Creating Views

### Basic Syntax
```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### Simple Views

```sql
-- View of active employees
CREATE VIEW active_employees AS
SELECT employee_id, first_name, last_name, job_title, salary
FROM employees
WHERE termination_date IS NULL;

-- View of high-value customers
CREATE VIEW vip_customers AS
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
HAVING lifetime_value > 1000;

-- View of product inventory
CREATE VIEW product_inventory AS
SELECT
    product_id,
    product_name,
    category,
    price,
    stock_quantity,
    price * stock_quantity AS inventory_value,
    CASE
        WHEN stock_quantity = 0 THEN 'Out of Stock'
        WHEN stock_quantity < 30 THEN 'Low Stock'
        ELSE 'In Stock'
    END AS stock_status
FROM products;
```

### Views with JOINs

```sql
-- Employee details with department
CREATE VIEW employee_details AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    e.email,
    e.job_title,
    e.salary,
    d.department_name,
    d.location,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- Complete order information
CREATE VIEW order_summary AS
SELECT
    o.order_id,
    o.order_date,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email,
    c.city,
    c.country,
    o.total_amount,
    o.status,
    COUNT(oi.order_item_id) AS item_count
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.order_date, c.first_name, c.last_name,
         c.email, c.city, c.country, o.total_amount, o.status;

-- Product sales performance
CREATE VIEW product_sales AS
SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.price,
    COALESCE(SUM(oi.quantity), 0) AS total_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category, p.price;
```

## Using Views

```sql
-- Query view like a regular table
SELECT * FROM active_employees;

-- Filter view results
SELECT * FROM vip_customers
WHERE order_count > 5
ORDER BY lifetime_value DESC;

-- Join views with tables
SELECT
    e.full_name,
    e.department_name,
    pi.stock_status
FROM employee_details e
JOIN product_inventory pi ON e.employee_id = pi.product_id;

-- Use view in subquery
SELECT *
FROM orders
WHERE customer_id IN (
    SELECT customer_id FROM vip_customers
);
```

## Modifying Views

```sql
-- Replace existing view (CREATE OR REPLACE)
CREATE OR REPLACE VIEW active_employees AS
SELECT
    employee_id,
    first_name,
    last_name,
    job_title,
    salary,
    hire_date
FROM employees
WHERE termination_date IS NULL
  AND is_active = TRUE;

-- Alter view (SQL Server)
ALTER VIEW active_employees AS
SELECT employee_id, first_name, last_name
FROM employees
WHERE is_active = TRUE;
```

## Dropping Views

```sql
-- Drop view
DROP VIEW active_employees;

-- Drop if exists
DROP VIEW IF EXISTS active_employees;

-- Drop multiple views
DROP VIEW IF EXISTS view1, view2, view3;
```

## Updatable Views

Some views allow INSERT, UPDATE, DELETE if they meet criteria:
- Based on single table
- No aggregate functions
- No GROUP BY, DISTINCT, UNION
- No calculated columns in modification

```sql
-- Updatable view
CREATE VIEW tech_employees AS
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE department_id = 1;

-- Update through view
UPDATE tech_employees
SET salary = salary * 1.1
WHERE employee_id = 5;

-- Insert through view
INSERT INTO tech_employees (first_name, last_name, salary)
VALUES ('New', 'Employee', 75000);

-- Delete through view
DELETE FROM tech_employees WHERE employee_id = 15;

-- Non-updatable view (has aggregation)
CREATE VIEW dept_stats AS
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;

-- This will fail:
-- UPDATE dept_stats SET avg_salary = 60000;
```

## WITH CHECK OPTION

Prevents modifications that would make rows disappear from view.

```sql
-- Without CHECK OPTION
CREATE VIEW high_salary_employees AS
SELECT * FROM employees WHERE salary > 60000;

-- This UPDATE succeeds but row disappears from view
UPDATE high_salary_employees
SET salary = 50000  -- Below threshold
WHERE employee_id = 1;

-- With CHECK OPTION (prevents the above)
CREATE OR REPLACE VIEW high_salary_employees AS
SELECT * FROM employees WHERE salary > 60000
WITH CHECK OPTION;

-- This UPDATE now fails
UPDATE high_salary_employees
SET salary = 50000  -- Error: violates CHECK OPTION
WHERE employee_id = 1;
```

## View Metadata

```sql
-- Show view definition (MySQL)
SHOW CREATE VIEW employee_details;

-- List all views
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_SCHEMA = 'your_database';

-- View details
SELECT *
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_NAME = 'employee_details';

-- Show views in database
SHOW FULL TABLES WHERE TABLE_TYPE = 'VIEW';
```

## Materialized Views

Physically stores query results for faster access. Needs periodic refresh.

```sql
-- PostgreSQL syntax
CREATE MATERIALIZED VIEW product_stats AS
SELECT
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock_quantity) AS total_stock
FROM products
GROUP BY category;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW product_stats;

-- MySQL workaround: Use regular table
CREATE TABLE product_stats_cache AS
SELECT category, COUNT(*) AS product_count, AVG(price) AS avg_price
FROM products
GROUP BY category;

-- Refresh by truncate and insert
TRUNCATE TABLE product_stats_cache;
INSERT INTO product_stats_cache
SELECT category, COUNT(*), AVG(price)
FROM products
GROUP BY category;
```

## Practical Examples

### Example 1: Security - Hide Sensitive Data
```sql
-- Full employee table has salary, SSN
-- Create view without sensitive data for general access
CREATE VIEW employee_directory AS
SELECT
    employee_id,
    first_name,
    last_name,
    email,
    phone,
    job_title,
    department_id
FROM employees;

-- Grant access to view, not table
GRANT SELECT ON employee_directory TO public_users;
```

### Example 2: Simplify Complex Queries
```sql
-- Complex query users run frequently
CREATE VIEW monthly_sales_report AS
SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    c.country,
    p.category,
    COUNT(DISTINCT o.order_id) AS orders,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.status = 'Completed'
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m'), c.country, p.category;

-- Now users just query:
SELECT * FROM monthly_sales_report
WHERE month = '2024-01'
ORDER BY revenue DESC;
```

### Example 3: Data Abstraction Layer
```sql
-- Normalize underlying structure changes
CREATE VIEW customer_info AS
SELECT
    customer_id,
    CONCAT(first_name, ' ', last_name) AS customer_name,
    email,
    CONCAT(city, ', ', country) AS location,
    registration_date
FROM customers;

-- If table structure changes, update view, applications unchanged
```

### Example 4: Calculated Columns
```sql
CREATE VIEW order_analytics AS
SELECT
    o.order_id,
    o.customer_id,
    o.order_date,
    o.total_amount,
    DATEDIFF(CURRENT_DATE, o.order_date) AS days_since_order,
    CASE
        WHEN o.total_amount > 1000 THEN 'High'
        WHEN o.total_amount > 500 THEN 'Medium'
        ELSE 'Low'
    END AS order_value_category,
    (SELECT COUNT(*)
     FROM order_items oi
     WHERE oi.order_id = o.order_id) AS item_count
FROM orders o;
```

### Example 5: Dashboard Views
```sql
-- Executive dashboard view
CREATE VIEW executive_dashboard AS
SELECT
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM customers
     WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS new_customers_30d,
    (SELECT COUNT(*) FROM orders WHERE status = 'Completed') AS completed_orders,
    (SELECT SUM(total_amount) FROM orders WHERE status = 'Completed') AS total_revenue,
    (SELECT AVG(total_amount) FROM orders WHERE status = 'Completed') AS avg_order_value,
    (SELECT COUNT(DISTINCT customer_id) FROM orders
     WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS active_customers_30d;
```

## Practice Exercises

### Exercise 1: Basic Views
```sql
-- 1. Create view of employees in Engineering dept
-- 2. Create view of products under $100
-- 3. Create view of completed orders
-- 4. Create view of customers from USA
-- 5. Query each view
```

### Exercise 2: Views with Calculations
```sql
-- 1. View with employee annual salary
-- 2. View with product profit margins
-- 3. View with order age in days
-- 4. View with customer lifetime value
-- 5. View with inventory turnover rate
```

### Exercise 3: Views with JOINs
```sql
-- 1. Employee view with department names
-- 2. Order view with customer details
-- 3. Product view with sales statistics
-- 4. Customer view with order counts
-- 5. Complete order details view
```

### Exercise 4: Updatable Views
```sql
-- 1. Create updatable employee view
-- 2. Update data through view
-- 3. Insert data through view
-- 4. Test WITH CHECK OPTION
-- 5. Identify non-updatable view scenarios
```

### Exercise 5: Security Views
```sql
-- 1. View hiding salary information
-- 2. View for specific department only
-- 3. View filtering active records
-- 4. View masking sensitive fields
-- 5. Grant appropriate permissions
```

### Exercise 6: Complex Business Views
```sql
-- 1. Monthly sales by category view
-- 2. Product performance view
-- 3. Customer segmentation view
-- 4. Department budget utilization view
-- 5. Inventory health view
```

### Exercise 7: View Modifications
```sql
-- 1. Replace existing view with new logic
-- 2. Add columns to view
-- 3. Change filtering conditions
-- 4. Modify JOIN logic
-- 5. Test backward compatibility
```

### Exercise 8: View Dependencies
```sql
-- 1. Create view based on another view
-- 2. Identify view dependencies
-- 3. Test cascading updates
-- 4. Handle circular dependencies
-- 5. Document view relationships
```

### Exercise 9: Performance Considerations
```sql
-- 1. Compare view vs direct query performance
-- 2. Identify slow views
-- 3. Create indexed views (if supported)
-- 4. Use materialized views for expensive queries
-- 5. Optimize underlying queries
```

### Exercise 10: Real-World Applications
```sql
-- 1. Create reporting views for BI tools
-- 2. Build API data layer with views
-- 3. Create audit trail view
-- 4. Build data validation views
-- 5. Design ETL support views
```

## Best Practices

### 1. Use Clear, Descriptive Names
```sql
-- ✅ Good
CREATE VIEW active_employees_with_dept AS ...

-- ❌ Bad
CREATE VIEW v1 AS ...
```

### 2. Document Views
```sql
-- ✅ Add comments
-- View: active_employees_with_dept
-- Purpose: Provides employee details with department info
-- Filters out terminated employees
-- Used by: HR reporting, employee directory
CREATE VIEW active_employees_with_dept AS
SELECT ...
```

### 3. Keep Views Simple
```sql
-- ❌ Overly complex view
CREATE VIEW complex_view AS
SELECT ... (50 JOINs, subqueries, calculations)

-- ✅ Break into multiple simpler views
CREATE VIEW base_view AS ...
CREATE VIEW calculated_view AS SELECT * FROM base_view ...
```

### 4. Consider Performance
```sql
-- ✅ Add indexes on underlying tables
CREATE INDEX idx_dept ON employees(department_id);

-- ✅ Use materialized views for expensive queries (if available)
```

### 5. Version Control View Definitions
```sql
-- Save CREATE VIEW statements in version control
-- Treat views as code
```

## Performance Tips

1. **Index underlying tables** - Views use base table indexes
2. **Avoid nested views** - Can hurt performance
3. **Use materialized views** - For expensive aggregations
4. **Filter in base tables** - Don't rely only on view filtering
5. **Monitor view usage** - Remove unused views
6. **EXPLAIN view queries** - Check execution plans

## Common Mistakes

1. **Overly complex views** - Hard to maintain and slow
2. **Views on views on views** - Degraded performance
3. **Not documenting views** - Purpose unclear
4. **Assuming views are fast** - Still runs underlying query
5. **Using views for everything** - Sometimes direct queries better
6. **Not considering updatability** - Unexpected behavior
7. **Forgetting WITH CHECK OPTION** - Data integrity issues

## Views vs Tables

| Aspect | View | Table |
|--------|------|-------|
| Storage | No data (virtual) | Stores data |
| Performance | Runs query each time | Direct access |
| Flexibility | Easy to change | Schema changes harder |
| Security | Hide sensitive data | All-or-nothing access |
| Updates | Limited scenarios | Always updatable |

## Next Steps

- **[03-Stored-Procedures](../03-Stored-Procedures/README.md)** - Reusable SQL code blocks

## Summary

- Views are virtual tables from SELECT queries
- Simplify complex queries
- Enhance security by hiding columns
- Can be updatable (with restrictions)
- WITH CHECK OPTION enforces view conditions
- Materialized views store results physically
- Use for abstraction, not performance
- Document view purpose and dependencies

---

**Use views wisely**: Great for abstraction, but not a performance solution!
