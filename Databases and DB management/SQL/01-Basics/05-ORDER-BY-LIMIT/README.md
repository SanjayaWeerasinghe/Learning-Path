# ORDER BY and LIMIT

## Overview

- **ORDER BY** - Sorts query results by one or more columns
- **LIMIT** - Restricts the number of rows returned
- Together they provide powerful control over result sets

## ORDER BY Clause

### Basic Syntax
```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;
```

- **ASC** - Ascending order (default)
- **DESC** - Descending order

### Single Column Sorting

```sql
-- Sort employees by first name (ascending)
SELECT first_name, last_name, salary
FROM employees
ORDER BY first_name;

-- Sort by first name explicitly ascending
SELECT first_name, last_name, salary
FROM employees
ORDER BY first_name ASC;

-- Sort employees by salary (descending)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- Sort products by price (lowest to highest)
SELECT product_name, price
FROM products
ORDER BY price;

-- Sort products by price (highest to lowest)
SELECT product_name, price
FROM products
ORDER BY price DESC;

-- Sort customers by registration date (newest first)
SELECT first_name, last_name, registration_date
FROM customers
ORDER BY registration_date DESC;

-- Sort orders by date (oldest first)
SELECT order_id, order_date, total_amount
FROM orders
ORDER BY order_date ASC;
```

### Multiple Column Sorting

```sql
-- Sort by department, then by salary within each department
SELECT first_name, last_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;

-- Sort products by category, then by price
SELECT product_name, category, price
FROM products
ORDER BY category ASC, price DESC;

-- Sort by country, city, then last name
SELECT first_name, last_name, city, country
FROM customers
ORDER BY country, city, last_name;

-- Sort orders by status, then date
SELECT order_id, status, order_date, total_amount
FROM orders
ORDER BY status, order_date DESC;

-- Three levels of sorting
SELECT first_name, last_name, department_id, job_title, salary
FROM employees
ORDER BY department_id, job_title, salary DESC;
```

### Sort by Column Position

```sql
-- Sort by first column in SELECT
SELECT first_name, last_name, salary
FROM employees
ORDER BY 1; -- Same as ORDER BY first_name

-- Sort by third column
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC; -- Same as ORDER BY salary DESC

-- Multiple columns by position
SELECT department_id, job_title, salary
FROM employees
ORDER BY 1, 3 DESC; -- department_id ASC, salary DESC
```

**Note**: Using column positions is less readable. Use column names for clarity.

### Sort by Alias

```sql
-- Sort by calculated column alias
SELECT
    first_name,
    last_name,
    salary,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;

-- Sort by concatenated column alias
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    salary
FROM employees
ORDER BY full_name;

-- Sort by CASE expression alias
SELECT
    product_name,
    price,
    CASE
        WHEN price < 100 THEN 'Budget'
        WHEN price < 500 THEN 'Mid-Range'
        ELSE 'Premium'
    END AS price_category
FROM products
ORDER BY price_category, price;
```

### Sort by Expressions

```sql
-- Sort by calculated value
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary * 12 DESC; -- Annual salary

-- Sort by string function
SELECT first_name, last_name, email
FROM employees
ORDER BY LENGTH(first_name);

-- Sort by date function
SELECT first_name, last_name, hire_date
FROM employees
ORDER BY YEAR(hire_date) DESC, MONTH(hire_date) DESC;

-- Sort by CASE expression
SELECT product_name, category, price, stock_quantity
FROM products
ORDER BY
    CASE category
        WHEN 'Electronics' THEN 1
        WHEN 'Furniture' THEN 2
        ELSE 3
    END,
    price DESC;
```

### NULL Values in Sorting

```sql
-- NULLs typically appear first in ASC, last in DESC (varies by database)
SELECT first_name, last_name, manager_id
FROM employees
ORDER BY manager_id;

-- Force NULLs to end (MySQL)
SELECT first_name, last_name, manager_id
FROM employees
ORDER BY manager_id IS NULL, manager_id;

-- Force NULLs to beginning
SELECT first_name, last_name, phone
FROM employees
ORDER BY phone IS NOT NULL, phone;

-- PostgreSQL syntax for NULL handling
-- ORDER BY column NULLS FIRST
-- ORDER BY column NULLS LAST
```

## LIMIT Clause

### Basic LIMIT

```sql
-- Get first 5 employees
SELECT * FROM employees
LIMIT 5;

-- Get top 3 highest paid employees
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- Get 10 most recent orders
SELECT order_id, order_date, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 10;

-- Get 5 cheapest products
SELECT product_name, price
FROM products
ORDER BY price ASC
LIMIT 5;
```

### LIMIT with OFFSET (Pagination)

```sql
-- Skip first 5 rows, get next 5
SELECT * FROM employees
LIMIT 5 OFFSET 5;

-- Alternative syntax (MySQL)
SELECT * FROM employees
LIMIT 5, 5; -- LIMIT offset, count

-- Page 1: First 10 products
SELECT product_name, price
FROM products
ORDER BY product_name
LIMIT 10 OFFSET 0;

-- Page 2: Next 10 products
SELECT product_name, price
FROM products
ORDER BY product_name
LIMIT 10 OFFSET 10;

-- Page 3: Next 10 products
SELECT product_name, price
FROM products
ORDER BY product_name
LIMIT 10 OFFSET 20;

-- Pagination formula: LIMIT page_size OFFSET (page_number - 1) * page_size
```

### TOP (SQL Server Alternative)

```sql
-- SQL Server syntax
SELECT TOP 5 * FROM employees;

-- SQL Server with ORDER BY
SELECT TOP 10 first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- TOP with PERCENT
SELECT TOP 10 PERCENT *
FROM employees
ORDER BY salary DESC;
```

### FETCH (Standard SQL)

```sql
-- Standard SQL syntax
SELECT * FROM employees
ORDER BY salary DESC
FETCH FIRST 5 ROWS ONLY;

-- With OFFSET
SELECT * FROM employees
ORDER BY salary DESC
OFFSET 10 ROWS
FETCH NEXT 5 ROWS ONLY;
```

## Practical Examples

### Example 1: Employee Ranking
```sql
-- Top 5 highest paid employees
SELECT
    CONCAT(first_name, ' ', last_name) AS employee_name,
    job_title,
    CONCAT('$', FORMAT(salary, 2)) AS salary,
    department_id
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### Example 2: Product Catalog
```sql
-- Products sorted by category and price
SELECT
    product_name,
    category,
    CONCAT('$', price) AS price,
    stock_quantity
FROM products
ORDER BY category, price DESC;
```

### Example 3: Recent Order History
```sql
-- 10 most recent orders with details
SELECT
    order_id,
    customer_id,
    DATE_FORMAT(order_date, '%M %d, %Y') AS order_date,
    CONCAT('$', FORMAT(total_amount, 2)) AS total,
    status
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 10;
```

### Example 4: Customer Leaderboard
```sql
-- Top 10 customers by total spending
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    CONCAT('$', FORMAT(SUM(o.total_amount), 2)) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY SUM(o.total_amount) DESC
LIMIT 10;
```

### Example 5: Inventory Alert
```sql
-- Low stock products (need reorder)
SELECT
    product_name,
    category,
    stock_quantity,
    CONCAT('$', price) AS unit_price,
    CONCAT('$', price * stock_quantity) AS total_value
FROM products
WHERE stock_quantity < 100
ORDER BY stock_quantity ASC, price DESC
LIMIT 20;
```

### Example 6: Salary Distribution
```sql
-- Employees grouped by salary range
SELECT
    CONCAT(first_name, ' ', last_name) AS employee_name,
    job_title,
    salary,
    CASE
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 60000 THEN 'Medium'
        ELSE 'Entry'
    END AS salary_band,
    DATEDIFF(CURDATE(), hire_date) / 365 AS years_employed
FROM employees
ORDER BY
    CASE
        WHEN salary >= 80000 THEN 1
        WHEN salary >= 60000 THEN 2
        ELSE 3
    END,
    salary DESC;
```

### Example 7: Pagination Example
```sql
-- Function to get page of results
-- Page 1
SELECT product_name, category, price
FROM products
ORDER BY product_name
LIMIT 10 OFFSET 0;

-- Page 2
SELECT product_name, category, price
FROM products
ORDER BY product_name
LIMIT 10 OFFSET 10;

-- Generic pagination
SET @page_size = 10;
SET @page_number = 3;

SELECT product_name, category, price
FROM products
ORDER BY product_name
LIMIT @page_size OFFSET (@page_number - 1) * @page_size;
```

### Example 8: Complex Multi-Level Sort
```sql
-- Sort by multiple criteria with priority
SELECT
    first_name,
    last_name,
    department_id,
    job_title,
    salary,
    hire_date
FROM employees
ORDER BY
    department_id ASC,                    -- Primary: Department
    CASE                                   -- Secondary: Role priority
        WHEN job_title LIKE '%Manager%' THEN 1
        WHEN job_title LIKE '%Senior%' THEN 2
        WHEN job_title LIKE '%Junior%' THEN 4
        ELSE 3
    END,
    hire_date ASC,                        -- Tertiary: Seniority
    salary DESC;                          -- Quaternary: Compensation
```

## Practice Exercises

### Exercise 1: Basic Sorting
```sql
-- 1. List all employees sorted by last name
-- 2. Show products sorted by price (lowest first)
-- 3. Display customers sorted by registration date (newest first)
-- 4. List orders sorted by total amount (highest first)
-- 5. Show departments sorted alphabetically by name
```

### Exercise 2: Multi-Column Sorting
```sql
-- 1. Sort employees by department, then salary (highest first)
-- 2. Sort products by category, then stock quantity (lowest first)
-- 3. Sort customers by country, then city, then last name
-- 4. Sort orders by status, then date (newest first)
-- 5. Sort employees by job title, then hire date (earliest first)
```

### Exercise 3: Sorting with Expressions
```sql
-- 1. Sort employees by annual salary (salary * 12)
-- 2. Sort products by total inventory value (price * stock_quantity)
-- 3. Sort customers by how long they've been registered
-- 4. Sort employees by length of their full name
-- 5. Sort products by discount price (price * 0.9)
```

### Exercise 4: Top N Queries
```sql
-- 1. Find top 5 highest paid employees
-- 2. Get 3 most expensive products
-- 3. Show 10 most recent orders
-- 4. Display 5 customers who registered most recently
-- 5. List top 3 departments by budget
```

### Exercise 5: LIMIT with OFFSET
```sql
-- 1. Get employees 6-10 when sorted by salary (page 2 of 5 per page)
-- 2. Retrieve products 11-20 sorted by name (page 2 of 10 per page)
-- 3. Show orders 21-30 sorted by date (page 3 of 10 per page)
-- 4. Display customers 16-20 sorted by last name (page 4 of 5 per page)
-- 5. List products 31-40 sorted by price (page 4 of 10 per page)
```

### Exercise 6: Complex Sorting
```sql
-- 1. Sort products: Electronics first, then by price descending
-- 2. Sort employees: Managers first, then by hire date
-- 3. Sort orders: Completed status first, then by amount descending
-- 4. Sort products: In-stock first, then by category, then by price
-- 5. Sort employees: Has manager first, then by department, then by salary
```

### Exercise 7: NULL Handling
```sql
-- 1. Sort employees with manager_id NULLs appearing last
-- 2. Sort employees with phone numbers appearing first
-- 3. Sort products with supplier_id, NULLs at the end
-- 4. List employees with manager, NULLs at the beginning
-- 5. Sort products by supplier_id (NULLs first), then by price
```

### Exercise 8: Ranking Queries
```sql
-- 1. Top 5 products by total inventory value
-- 2. Top 10 customers by number of orders
-- 3. Bottom 5 employees by salary
-- 4. 5 least expensive products in each category
-- 5. Top 3 departments by number of employees
```

### Exercise 9: Pagination Scenarios
```sql
-- 1. Implement pagination for products (10 per page, get page 2)
-- 2. Show page 3 of employees sorted by name (15 per page)
-- 3. Display page 5 of orders sorted by date (20 per page)
-- 4. Get page 2 of customers by city (25 per page)
-- 5. Show page 1 of high-value orders (>$500, 10 per page)
```

### Exercise 10: Real-World Queries
```sql
-- 1. Recent high-value orders for dashboard (top 20)
-- 2. Products needing reorder (stock < 50, sorted by stock)
-- 3. New hires in last 6 months (sorted by hire date)
-- 4. Best-selling products (by order frequency, top 15)
-- 5. Customers due for follow-up (no order in 90 days, sorted by last order)
```

## Real-World Scenarios

### Scenario 1: Sales Dashboard
```sql
-- Top 10 orders this month by value
SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    DATE_FORMAT(o.order_date, '%b %d') AS order_date,
    CONCAT('$', FORMAT(o.total_amount, 2)) AS total,
    o.status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
ORDER BY o.total_amount DESC, o.order_date DESC
LIMIT 10;
```

### Scenario 2: Employee Directory
```sql
-- Paginated employee listing (page 2, 20 per page)
SELECT
    employee_id,
    CONCAT(last_name, ', ', first_name) AS employee_name,
    job_title,
    department_id,
    email,
    phone
FROM employees
ORDER BY last_name, first_name
LIMIT 20 OFFSET 20;
```

### Scenario 3: Product Recommendations
```sql
-- Top 5 products in same category as product #1
SELECT
    p2.product_name,
    p2.price,
    p2.stock_quantity
FROM products p1
JOIN products p2 ON p1.category = p2.category
WHERE p1.product_id = 1
  AND p2.product_id != 1
  AND p2.stock_quantity > 0
ORDER BY p2.price ASC
LIMIT 5;
```

### Scenario 4: VIP Customer Report
```sql
-- Top 20 customers by lifetime value
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.city,
    COUNT(o.order_id) AS total_orders,
    CONCAT('$', FORMAT(SUM(o.total_amount), 2)) AS lifetime_value,
    DATE_FORMAT(MAX(o.order_date), '%M %d, %Y') AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.city
HAVING total_orders > 0
ORDER BY SUM(o.total_amount) DESC
LIMIT 20;
```

### Scenario 5: Inventory Restock Priority
```sql
-- Products needing urgent restock (sorted by priority)
SELECT
    product_name,
    category,
    stock_quantity,
    price,
    price * stock_quantity AS current_value,
    CASE
        WHEN stock_quantity = 0 THEN 'URGENT'
        WHEN stock_quantity < 20 THEN 'HIGH'
        WHEN stock_quantity < 50 THEN 'MEDIUM'
        ELSE 'LOW'
    END AS priority
FROM products
WHERE stock_quantity < 50
ORDER BY
    CASE
        WHEN stock_quantity = 0 THEN 1
        WHEN stock_quantity < 20 THEN 2
        WHEN stock_quantity < 50 THEN 3
    END,
    price DESC,
    stock_quantity ASC
LIMIT 25;
```

## Best Practices

### 1. Always Use ORDER BY with LIMIT
```sql
-- ❌ Bad: Results are unpredictable
SELECT * FROM employees LIMIT 5;

-- ✅ Good: Results are consistent
SELECT * FROM employees ORDER BY employee_id LIMIT 5;
```

### 2. Use Column Names, Not Positions
```sql
-- ❌ Less readable
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC;

-- ✅ More readable
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;
```

### 3. Be Explicit About Sort Direction
```sql
-- ❌ Implicit (assumes ASC)
SELECT * FROM employees ORDER BY hire_date;

-- ✅ Explicit
SELECT * FROM employees ORDER BY hire_date ASC;
```

### 4. Consider NULL Handling
```sql
-- ✅ Handle NULLs explicitly
SELECT first_name, last_name, manager_id
FROM employees
ORDER BY manager_id IS NULL, manager_id;
```

### 5. Use Consistent Pagination
```sql
-- ✅ Always use same ORDER BY for pagination
SELECT * FROM products
ORDER BY product_id -- Stable sort key
LIMIT 10 OFFSET 20;
```

### 6. Optimize Expensive Sorts
```sql
-- ❌ Slow: Sorting by expression
SELECT * FROM employees
ORDER BY CONCAT(first_name, ' ', last_name);

-- ✅ Faster: Create computed column or index
```

## Performance Tips

1. **Index ORDER BY columns** - Dramatically improves sort performance
2. **Avoid sorting large result sets** - Use WHERE to filter first
3. **Use LIMIT** - Don't retrieve more rows than needed
4. **Index for pagination** - Ensure ORDER BY columns are indexed
5. **Avoid expressions in ORDER BY** - Use indexed columns when possible
6. **Consider covering indexes** - Include all columns in SELECT and ORDER BY

### Example: Efficient vs Inefficient
```sql
-- ❌ Inefficient: Sorts all rows, then limits
SELECT * FROM orders
ORDER BY order_date DESC
LIMIT 10;

-- ✅ More efficient: With index on order_date
CREATE INDEX idx_orders_date ON orders(order_date);
SELECT * FROM orders
ORDER BY order_date DESC
LIMIT 10;
```

## Common Mistakes to Avoid

1. **Using LIMIT without ORDER BY**
   - Results are unpredictable and inconsistent

2. **Inconsistent sorting for pagination**
   - Different ORDER BY = missing/duplicate records

3. **Sorting by non-indexed columns**
   - Slow performance on large tables

4. **Using expensive calculations in ORDER BY**
   - Computed on every row before sorting

5. **Not handling NULL values**
   - May appear in unexpected positions

6. **Using OFFSET for deep pagination**
   - Becomes slow as offset increases
   - Consider cursor-based pagination for large datasets

7. **Forgetting timezone considerations**
   - Date sorting may vary by timezone

## Advanced Techniques

### Random Order
```sql
-- Get random employees (MySQL)
SELECT * FROM employees
ORDER BY RAND()
LIMIT 5;

-- Random order (PostgreSQL)
SELECT * FROM employees
ORDER BY RANDOM()
LIMIT 5;
```

### Custom Sort Order
```sql
-- Custom priority sort
SELECT * FROM orders
ORDER BY
    CASE status
        WHEN 'Urgent' THEN 1
        WHEN 'Processing' THEN 2
        WHEN 'Pending' THEN 3
        WHEN 'Shipped' THEN 4
        WHEN 'Completed' THEN 5
        ELSE 6
    END,
    order_date DESC;
```

### Conditional Sorting
```sql
-- Sort differently based on condition
SET @sort_by = 'salary'; -- or 'name' or 'date'

SELECT * FROM employees
ORDER BY
    CASE @sort_by
        WHEN 'salary' THEN salary
        WHEN 'name' THEN first_name
        WHEN 'date' THEN YEAR(hire_date)
    END DESC;
```

## Next Steps

You've completed the SQL Basics! Proceed to Intermediate topics:
- **[Intermediate/01-JOINS](../../Intermediate/01-JOINS/README.md)** - Learn to combine data from multiple tables

## Summary

Key takeaways:
- ORDER BY sorts query results
- Default sort order is ASC (ascending)
- Can sort by multiple columns
- LIMIT restricts number of rows returned
- LIMIT with OFFSET enables pagination
- Always use ORDER BY with LIMIT for consistent results
- Index columns used in ORDER BY for better performance
- Handle NULL values explicitly in sorts

---

**Practice makes perfect**: Experiment with different sorting combinations to master result control!
