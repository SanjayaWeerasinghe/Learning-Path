# SELECT Statements

## Overview

The SELECT statement is the most commonly used SQL command. It retrieves data from one or more tables in a database. Mastering SELECT is fundamental to working with SQL.

## Basic Syntax

```sql
SELECT column1, column2, ...
FROM table_name;
```

## SELECT All Columns

Use asterisk (*) to select all columns:

```sql
-- Select all columns from employees
SELECT * FROM employees;

-- Select all columns from products
SELECT * FROM products;
```

**Performance Note**: Avoid `SELECT *` in production code. Always specify needed columns.

## SELECT Specific Columns

```sql
-- Select employee names
SELECT first_name, last_name FROM employees;

-- Select product information
SELECT product_name, price, stock_quantity FROM products;

-- Select customer contact info
SELECT first_name, last_name, email FROM customers;
```

## Column Aliases

Use `AS` to rename columns in results:

```sql
-- Column aliases for readability
SELECT
    first_name AS 'First Name',
    last_name AS 'Last Name',
    salary AS 'Annual Salary'
FROM employees;

-- AS keyword is optional
SELECT
    product_name Name,
    price 'Unit Price',
    stock_quantity 'In Stock'
FROM products;

-- Calculated columns with aliases
SELECT
    first_name,
    last_name,
    salary,
    salary * 12 AS annual_salary
FROM employees;
```

## DISTINCT - Remove Duplicates

```sql
-- Get unique job titles
SELECT DISTINCT job_title FROM employees;

-- Get unique departments
SELECT DISTINCT department_id FROM employees;

-- Get unique product categories
SELECT DISTINCT category FROM products;

-- Multiple columns - unique combinations
SELECT DISTINCT city, country FROM customers;

-- Count distinct values
SELECT COUNT(DISTINCT job_title) AS unique_jobs FROM employees;
```

## Expressions and Calculations

```sql
-- Mathematical operations
SELECT
    product_name,
    price,
    price * 0.9 AS discounted_price,
    price - (price * 0.9) AS discount_amount
FROM products;

-- String concatenation
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    email
FROM employees;

-- Alternative concatenation (MySQL)
SELECT
    first_name || ' ' || last_name AS full_name
FROM employees;

-- Salary calculations
SELECT
    first_name,
    last_name,
    salary,
    salary * 12 AS yearly_salary,
    salary * 12 * 0.15 AS yearly_tax,
    salary * 12 * 0.85 AS yearly_net
FROM employees;
```

## String Functions in SELECT

```sql
-- UPPER and LOWER
SELECT
    UPPER(first_name) AS first_upper,
    LOWER(last_name) AS last_lower,
    email
FROM employees;

-- CONCAT with formatting
SELECT
    CONCAT(UPPER(first_name), ' ', UPPER(last_name)) AS full_name_caps
FROM employees;

-- SUBSTRING
SELECT
    product_name,
    SUBSTRING(product_name, 1, 10) AS short_name
FROM products;

-- LENGTH
SELECT
    product_name,
    LENGTH(product_name) AS name_length
FROM products;

-- TRIM, LTRIM, RTRIM
SELECT
    TRIM(first_name) AS trimmed_name
FROM employees;
```

## Numeric Functions in SELECT

```sql
-- ROUND
SELECT
    product_name,
    price,
    ROUND(price, 0) AS rounded_price,
    ROUND(price * 1.15, 2) AS price_with_tax
FROM products;

-- CEILING and FLOOR
SELECT
    product_name,
    price,
    CEILING(price) AS rounded_up,
    FLOOR(price) AS rounded_down
FROM products;

-- ABS (Absolute value)
SELECT
    product_name,
    price,
    ABS(price - 100) AS difference_from_100
FROM products;

-- MOD (Modulo)
SELECT
    employee_id,
    salary,
    MOD(salary, 1000) AS remainder
FROM employees;
```

## Date Functions in SELECT

```sql
-- Current date and time
SELECT
    NOW() AS current_datetime,
    CURDATE() AS current_date,
    CURTIME() AS current_time;

-- Extract date parts
SELECT
    first_name,
    hire_date,
    YEAR(hire_date) AS hire_year,
    MONTH(hire_date) AS hire_month,
    DAY(hire_date) AS hire_day
FROM employees;

-- Date formatting
SELECT
    order_id,
    order_date,
    DATE_FORMAT(order_date, '%Y-%m-%d') AS formatted_date,
    DATE_FORMAT(order_date, '%M %d, %Y') AS full_date
FROM orders;

-- Date calculations
SELECT
    first_name,
    hire_date,
    DATEDIFF(CURDATE(), hire_date) AS days_employed,
    DATEDIFF(CURDATE(), hire_date) / 365 AS years_employed
FROM employees;

-- Add/subtract dates
SELECT
    order_id,
    order_date,
    DATE_ADD(order_date, INTERVAL 7 DAY) AS expected_delivery,
    DATE_SUB(order_date, INTERVAL 1 MONTH) AS one_month_ago
FROM orders;
```

## CASE Expressions

```sql
-- Simple CASE
SELECT
    first_name,
    last_name,
    salary,
    CASE
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 60000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;

-- Multiple conditions
SELECT
    product_name,
    price,
    stock_quantity,
    CASE
        WHEN stock_quantity = 0 THEN 'Out of Stock'
        WHEN stock_quantity < 50 THEN 'Low Stock'
        WHEN stock_quantity < 100 THEN 'Medium Stock'
        ELSE 'Well Stocked'
    END AS stock_status
FROM products;

-- CASE with calculations
SELECT
    product_name,
    price,
    CASE
        WHEN category = 'Electronics' THEN price * 0.9
        WHEN category = 'Furniture' THEN price * 0.85
        ELSE price * 0.95
    END AS sale_price
FROM products;
```

## NULL Handling

```sql
-- COALESCE - return first non-null value
SELECT
    first_name,
    last_name,
    COALESCE(phone, 'No Phone') AS phone_number
FROM employees;

-- IFNULL / ISNULL (MySQL)
SELECT
    first_name,
    IFNULL(manager_id, 0) AS manager_id
FROM employees;

-- NULLIF - return NULL if values equal
SELECT
    product_name,
    NULLIF(stock_quantity, 0) AS stock
FROM products;

-- IS NULL / IS NOT NULL
SELECT
    first_name,
    last_name,
    CASE
        WHEN manager_id IS NULL THEN 'Top Level'
        ELSE 'Has Manager'
    END AS position_level
FROM employees;
```

## LIMIT and TOP

```sql
-- LIMIT (MySQL, PostgreSQL)
SELECT * FROM employees LIMIT 5;

-- Get top 3 highest priced products
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 3;

-- LIMIT with OFFSET
SELECT * FROM employees LIMIT 5 OFFSET 10;

-- TOP (SQL Server)
SELECT TOP 5 * FROM employees;

-- FETCH FIRST (Standard SQL)
SELECT * FROM employees FETCH FIRST 5 ROWS ONLY;
```

## Practical Examples

### Example 1: Employee Report
```sql
SELECT
    CONCAT(first_name, ' ', last_name) AS employee_name,
    job_title,
    CONCAT('$', FORMAT(salary, 2)) AS formatted_salary,
    DATE_FORMAT(hire_date, '%M %d, %Y') AS hire_date,
    DATEDIFF(CURDATE(), hire_date) / 365 AS years_of_service
FROM employees;
```

### Example 2: Product Inventory Report
```sql
SELECT
    product_name,
    category,
    CONCAT('$', price) AS unit_price,
    stock_quantity,
    price * stock_quantity AS total_value,
    CASE
        WHEN stock_quantity = 0 THEN 'REORDER NOW'
        WHEN stock_quantity < 50 THEN 'Low - Order Soon'
        ELSE 'Sufficient'
    END AS inventory_status
FROM products;
```

### Example 3: Customer List with Formatting
```sql
SELECT
    CONCAT(UPPER(SUBSTRING(first_name, 1, 1)),
           LOWER(SUBSTRING(first_name, 2))) AS first_name,
    CONCAT(UPPER(SUBSTRING(last_name, 1, 1)),
           LOWER(SUBSTRING(last_name, 2))) AS last_name,
    LOWER(email) AS email,
    CONCAT(city, ', ', country) AS location,
    DATEDIFF(CURDATE(), registration_date) AS days_registered
FROM customers;
```

### Example 4: Order Summary
```sql
SELECT
    order_id,
    customer_id,
    DATE_FORMAT(order_date, '%b %d, %Y') AS order_date,
    CONCAT('$', FORMAT(total_amount, 2)) AS total,
    status,
    CASE
        WHEN status = 'Completed' THEN '✓ Done'
        WHEN status = 'Shipped' THEN '→ In Transit'
        WHEN status = 'Processing' THEN '⚙ Processing'
        ELSE '⏳ Pending'
    END AS status_icon
FROM orders;
```

### Example 5: Salary Analysis
```sql
SELECT
    job_title,
    COUNT(*) AS employee_count,
    CONCAT('$', FORMAT(MIN(salary), 2)) AS min_salary,
    CONCAT('$', FORMAT(MAX(salary), 2)) AS max_salary,
    CONCAT('$', FORMAT(AVG(salary), 2)) AS avg_salary,
    CASE
        WHEN AVG(salary) > 70000 THEN 'High Paying'
        WHEN AVG(salary) > 55000 THEN 'Medium Paying'
        ELSE 'Entry Level'
    END AS pay_grade
FROM employees
GROUP BY job_title;
```

## Practice Exercises

### Exercise 1: Basic SELECT
```sql
-- 1. Select all employees' first and last names
-- 2. Select product names and prices
-- 3. Select customer emails and cities
-- 4. Select order IDs and total amounts
-- 5. Select all distinct categories from products
```

### Exercise 2: Column Aliases
```sql
-- 1. Display employee full name as "Employee Name"
-- 2. Show price as "Unit Price" and stock as "Available Quantity"
-- 3. Display salary as "Monthly Pay" and calculate "Annual Pay"
-- 4. Show order_date as "Purchase Date"
-- 5. Display product_name as "Item" and category as "Type"
```

### Exercise 3: Calculations
```sql
-- 1. Calculate 15% tax on all product prices
-- 2. Calculate monthly salary from annual salary
-- 3. Calculate total inventory value per product (price * quantity)
-- 4. Calculate 10% commission on order total amounts
-- 5. Calculate price per unit after 20% discount
```

### Exercise 4: String Functions
```sql
-- 1. Display all employee names in UPPERCASE
-- 2. Display all product names in lowercase
-- 3. Extract first 3 characters of product categories
-- 4. Concatenate customer first and last names with a space
-- 5. Display email addresses in lowercase
```

### Exercise 5: DISTINCT
```sql
-- 1. Find all unique job titles
-- 2. List all unique product categories
-- 3. Find all unique customer cities
-- 4. List all unique order statuses
-- 5. Find unique combinations of city and country
```

### Exercise 6: Date Functions
```sql
-- 1. Display current date and time
-- 2. Extract year from all employee hire dates
-- 3. Calculate days since customer registration
-- 4. Format order dates as "Month DD, YYYY"
-- 5. Find orders placed in the last 30 days
```

### Exercise 7: CASE Statements
```sql
-- 1. Categorize employees: salary > 70000 as 'Senior', else 'Junior'
-- 2. Label products: price > 200 as 'Premium', else 'Standard'
-- 3. Status check: stock > 100 as 'Available', else 'Limited'
-- 4. Customer type: registered > 6 months ago as 'Loyal', else 'New'
-- 5. Order urgency: status 'Pending' as 'Urgent', else 'Normal'
```

### Exercise 8: NULL Handling
```sql
-- 1. Replace NULL phone numbers with 'Not Provided'
-- 2. Display manager_id, show 'CEO' if NULL
-- 3. Show products with NULL suppliers as 'Direct'
-- 4. Replace NULL emails with 'no-email@company.com'
-- 5. Handle NULL order dates
```

### Exercise 9: Complex Expressions
```sql
-- 1. Calculate employee's monthly take-home (salary * 0.85 / 12)
-- 2. Product profit margin if cost is 60% of price
-- 3. Customer lifetime: days registered / 30 (months)
-- 4. Order processing time: current_date - order_date
-- 5. Stock turnover rate (assume monthly sales of 10%)
```

### Exercise 10: Formatting Reports
```sql
-- 1. Create an employee directory with formatted names and contact
-- 2. Generate a product catalog with prices in currency format
-- 3. Create a customer mailing list with formatted addresses
-- 4. Design an order summary with formatted dates and amounts
-- 5. Build a department roster with employee counts
```

## Real-World Scenarios

### Scenario 1: Sales Report
Create a SELECT statement for a daily sales report showing:
- Order ID
- Customer name
- Order date (formatted)
- Total amount (with currency symbol)
- Status with visual indicators

```sql
SELECT
    o.order_id AS 'Order #',
    CONCAT(c.first_name, ' ', c.last_name) AS 'Customer',
    DATE_FORMAT(o.order_date, '%M %d, %Y') AS 'Order Date',
    CONCAT('$', FORMAT(o.total_amount, 2)) AS 'Total',
    CASE
        WHEN o.status = 'Completed' THEN '✓ Completed'
        WHEN o.status = 'Shipped' THEN '→ Shipped'
        ELSE '⏳ ' || o.status
    END AS 'Status'
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
```

### Scenario 2: Employee Performance Dashboard
Create a query for HR showing:
- Employee details
- Years of service
- Salary category
- Department information

### Scenario 3: Inventory Management
Create a query showing:
- Product details
- Stock status
- Reorder recommendations
- Value of inventory

### Scenario 4: Customer Analytics
Create a query displaying:
- Customer information
- Registration duration
- Customer tier (based on order history)
- Contact preferences

## Best Practices

### 1. Column Selection
```sql
-- ❌ Bad: Select all when you need few
SELECT * FROM employees WHERE department_id = 1;

-- ✅ Good: Select only needed columns
SELECT employee_id, first_name, last_name, salary
FROM employees WHERE department_id = 1;
```

### 2. Readable Aliases
```sql
-- ❌ Bad: Cryptic aliases
SELECT fn AS a, ln AS b, sal AS c FROM employees;

-- ✅ Good: Descriptive aliases
SELECT
    first_name AS employee_first_name,
    last_name AS employee_last_name,
    salary AS monthly_salary
FROM employees;
```

### 3. Consistent Formatting
```sql
-- ✅ Good: Well formatted
SELECT
    employee_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    salary,
    hire_date
FROM employees
WHERE department_id = 1
ORDER BY hire_date DESC;
```

### 4. Use DISTINCT Wisely
```sql
-- ❌ Bad: DISTINCT on entire result set when not needed
SELECT DISTINCT * FROM employees;

-- ✅ Good: DISTINCT on specific columns
SELECT DISTINCT department_id FROM employees;
```

### 5. Comment Complex Queries
```sql
-- Calculate employee bonus based on years of service
-- Bonus = 5% of salary for each year, capped at 50%
SELECT
    first_name,
    last_name,
    salary,
    DATEDIFF(CURDATE(), hire_date) / 365 AS years_service,
    LEAST(
        salary * (DATEDIFF(CURDATE(), hire_date) / 365) * 0.05,
        salary * 0.5
    ) AS bonus
FROM employees;
```

## Performance Tips

1. **Avoid SELECT*** - Always specify needed columns
2. **Use aliases** for complex expressions to avoid recalculation
3. **Limit result sets** during development and testing
4. **Index frequently selected columns** (covered in Advanced topics)
5. **Avoid functions on indexed columns** in WHERE clauses (impacts performance)

## Common Mistakes to Avoid

1. **Using SELECT * in production**
   - Retrieves unnecessary data
   - Breaks applications if table structure changes

2. **Not using aliases for readability**
   - Makes queries hard to understand
   - Difficult to maintain

3. **Ignoring NULL values**
   - Can cause unexpected results
   - Always handle NULLs explicitly

4. **Poor formatting**
   - Makes queries unreadable
   - Difficult to debug

5. **Unnecessary DISTINCT**
   - Slows down queries
   - May hide data issues

## Next Steps

Now that you've mastered SELECT statements, proceed to:
- **[03-WHERE-Filtering](../03-WHERE-Filtering/README.md)** - Learn to filter and refine your results

## Summary

Key takeaways:
- SELECT retrieves data from tables
- Use specific columns instead of *
- Aliases improve readability
- Functions transform data in results
- DISTINCT removes duplicates
- CASE adds conditional logic
- Always handle NULL values
- Format for readability and maintenance

---

**Practice regularly**: The more you write SELECT statements, the more natural they become!
