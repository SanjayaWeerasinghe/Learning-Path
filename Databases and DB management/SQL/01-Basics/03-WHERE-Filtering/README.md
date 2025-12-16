# WHERE Clause - Filtering Data

## Overview

The WHERE clause filters records based on specified conditions. It's essential for retrieving specific data from your database rather than entire tables.

## Basic Syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

## Comparison Operators

### Equality (=)
```sql
-- Find employees in department 1
SELECT * FROM employees WHERE department_id = 1;

-- Find products in Electronics category
SELECT * FROM products WHERE category = 'Electronics';

-- Find orders with Completed status
SELECT * FROM orders WHERE status = 'Completed';

-- Find specific employee by ID
SELECT * FROM employees WHERE employee_id = 5;
```

### Inequality (<>, !=)
```sql
-- Find employees NOT in department 1
SELECT * FROM employees WHERE department_id <> 1;

-- Alternative syntax (same result)
SELECT * FROM employees WHERE department_id != 1;

-- Find products not in Furniture category
SELECT * FROM products WHERE category != 'Furniture';

-- Find orders not completed
SELECT * FROM orders WHERE status <> 'Completed';
```

### Greater Than (>)
```sql
-- Find employees with salary greater than 65000
SELECT first_name, last_name, salary
FROM employees
WHERE salary > 65000;

-- Find expensive products (price > 100)
SELECT product_name, price
FROM products
WHERE price > 100;

-- Find products with high stock
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity > 100;
```

### Less Than (<)
```sql
-- Find employees with salary less than 60000
SELECT first_name, last_name, salary
FROM employees
WHERE salary < 60000;

-- Find low-priced products
SELECT product_name, price
FROM products
WHERE price < 50;

-- Find low stock products
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity < 50;
```

### Greater Than or Equal (>=)
```sql
-- Find employees earning at least 70000
SELECT first_name, last_name, salary
FROM employees
WHERE salary >= 70000;

-- Find products priced at 100 or more
SELECT product_name, price
FROM products
WHERE price >= 100;
```

### Less Than or Equal (<=)
```sql
-- Find employees earning 60000 or less
SELECT first_name, last_name, salary
FROM employees
WHERE salary <= 60000;

-- Find affordable products
SELECT product_name, price
FROM products
WHERE price <= 100;
```

## Logical Operators

### AND - All conditions must be true
```sql
-- Find employees in dept 1 with salary > 60000
SELECT first_name, last_name, salary, department_id
FROM employees
WHERE department_id = 1 AND salary > 60000;

-- Find Electronics products under $100
SELECT product_name, category, price
FROM products
WHERE category = 'Electronics' AND price < 100;

-- Find completed orders over $500
SELECT order_id, total_amount, status
FROM orders
WHERE status = 'Completed' AND total_amount > 500;

-- Multiple AND conditions
SELECT first_name, last_name, salary, hire_date
FROM employees
WHERE salary > 60000
  AND department_id = 1
  AND hire_date > '2020-01-01';
```

### OR - At least one condition must be true
```sql
-- Find employees in dept 1 OR dept 2
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id = 1 OR department_id = 2;

-- Find products in Electronics OR Furniture
SELECT product_name, category
FROM products
WHERE category = 'Electronics' OR category = 'Furniture';

-- Find high earners OR senior employees
SELECT first_name, last_name, salary, hire_date
FROM employees
WHERE salary > 80000 OR hire_date < '2019-01-01';

-- Multiple OR conditions
SELECT * FROM orders
WHERE status = 'Completed'
   OR status = 'Shipped'
   OR status = 'Processing';
```

### NOT - Negates a condition
```sql
-- Find employees NOT in department 1
SELECT first_name, last_name, department_id
FROM employees
WHERE NOT department_id = 1;

-- Find products NOT in Electronics
SELECT product_name, category
FROM products
WHERE NOT category = 'Electronics';

-- Combine NOT with other operators
SELECT * FROM employees
WHERE NOT (salary < 60000);

-- NOT with AND
SELECT * FROM products
WHERE NOT (category = 'Electronics' AND price > 100);
```

### Combining AND, OR, NOT
```sql
-- Use parentheses for clarity
SELECT first_name, last_name, salary, department_id
FROM employees
WHERE (department_id = 1 OR department_id = 2)
  AND salary > 60000;

-- Complex combination
SELECT product_name, category, price, stock_quantity
FROM products
WHERE (category = 'Electronics' OR category = 'Furniture')
  AND price < 500
  AND stock_quantity > 50;

-- NOT with combinations
SELECT * FROM employees
WHERE NOT (department_id = 1 AND salary < 60000);

-- Multiple grouped conditions
SELECT * FROM orders
WHERE (status = 'Completed' OR status = 'Shipped')
  AND total_amount > 200
  AND order_date >= '2023-08-01';
```

## Range Operators

### BETWEEN - Inclusive range
```sql
-- Find employees with salary between 60000 and 75000
SELECT first_name, last_name, salary
FROM employees
WHERE salary BETWEEN 60000 AND 75000;

-- Find products in price range
SELECT product_name, price
FROM products
WHERE price BETWEEN 50 AND 200;

-- Find orders in date range
SELECT order_id, order_date, total_amount
FROM orders
WHERE order_date BETWEEN '2023-08-01' AND '2023-08-31';

-- NOT BETWEEN
SELECT product_name, price
FROM products
WHERE price NOT BETWEEN 100 AND 500;
```

### IN - Match any value in a list
```sql
-- Find employees in specific departments
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id IN (1, 2, 3);

-- Find products in specific categories
SELECT product_name, category
FROM products
WHERE category IN ('Electronics', 'Furniture');

-- Find orders with specific statuses
SELECT order_id, status
FROM orders
WHERE status IN ('Completed', 'Shipped');

-- Find customers from specific cities
SELECT first_name, last_name, city
FROM customers
WHERE city IN ('Scranton', 'New York', 'Philadelphia');

-- NOT IN
SELECT product_name, category
FROM products
WHERE category NOT IN ('Electronics');
```

## Pattern Matching with LIKE

### Wildcards
- `%` - Matches any sequence of characters
- `_` - Matches exactly one character

```sql
-- Find employees whose first name starts with 'J'
SELECT first_name, last_name
FROM employees
WHERE first_name LIKE 'J%';

-- Find employees whose last name ends with 'son'
SELECT first_name, last_name
FROM employees
WHERE last_name LIKE '%son';

-- Find employees with 'a' anywhere in first name
SELECT first_name, last_name
FROM employees
WHERE first_name LIKE '%a%';

-- Find products with 'Laptop' in the name
SELECT product_name
FROM products
WHERE product_name LIKE '%Laptop%';

-- Underscore for exact position
-- Find employees with 'o' as second letter
SELECT first_name
FROM employees
WHERE first_name LIKE '_o%';

-- Find products with exactly 4 characters
SELECT product_name
FROM products
WHERE product_name LIKE '____';

-- NOT LIKE
SELECT product_name
FROM products
WHERE product_name NOT LIKE '%Wireless%';

-- Case sensitivity (depends on database)
-- MySQL is case-insensitive by default
SELECT * FROM employees WHERE first_name LIKE 'john';
SELECT * FROM employees WHERE first_name LIKE 'JOHN';
```

### LIKE Examples
```sql
-- Email validation patterns
SELECT email FROM customers
WHERE email LIKE '%@email.com';

-- Phone number patterns
SELECT phone FROM employees
WHERE phone LIKE '555-%';

-- Product codes
SELECT product_name FROM products
WHERE product_name LIKE 'LP-%';

-- Complex patterns
SELECT product_name FROM products
WHERE product_name LIKE '%Pro%' OR product_name LIKE '%Max%';
```

## NULL Values

### IS NULL
```sql
-- Find employees without a manager (manager_id is NULL)
SELECT first_name, last_name, manager_id
FROM employees
WHERE manager_id IS NULL;

-- Find employees without phone numbers
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NULL;

-- Cannot use = NULL (this is wrong!)
-- ❌ Wrong
SELECT * FROM employees WHERE manager_id = NULL;

-- ✅ Correct
SELECT * FROM employees WHERE manager_id IS NULL;
```

### IS NOT NULL
```sql
-- Find employees with a manager
SELECT first_name, last_name, manager_id
FROM employees
WHERE manager_id IS NOT NULL;

-- Find employees with phone numbers
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NOT NULL;

-- Find products with supplier
SELECT product_name, supplier_id
FROM products
WHERE supplier_id IS NOT NULL;
```

### NULL in Combinations
```sql
-- Find employees with manager AND high salary
SELECT first_name, last_name, salary, manager_id
FROM employees
WHERE manager_id IS NOT NULL AND salary > 70000;

-- Find products without supplier OR low stock
SELECT product_name, supplier_id, stock_quantity
FROM products
WHERE supplier_id IS NULL OR stock_quantity < 50;
```

## Date and Time Filtering

```sql
-- Exact date match
SELECT * FROM orders
WHERE order_date = '2023-08-01';

-- Date ranges
SELECT * FROM orders
WHERE order_date >= '2023-08-01'
  AND order_date <= '2023-08-31';

-- Using BETWEEN with dates
SELECT * FROM orders
WHERE order_date BETWEEN '2023-08-01' AND '2023-08-31';

-- Year filtering
SELECT * FROM employees
WHERE YEAR(hire_date) = 2020;

-- Month filtering
SELECT * FROM orders
WHERE MONTH(order_date) = 8;

-- Recent records (last 30 days)
SELECT * FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Future dates
SELECT * FROM orders
WHERE order_date > CURDATE();

-- Date comparisons
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date > '2020-01-01';

-- Day of week
SELECT * FROM orders
WHERE DAYOFWEEK(order_date) = 1; -- Sunday

-- Quarter
SELECT * FROM orders
WHERE QUARTER(order_date) = 3; -- Q3
```

## Practical Examples

### Example 1: Employee Search
```sql
-- Find senior engineers hired after 2019 earning over 70k
SELECT
    first_name,
    last_name,
    job_title,
    salary,
    hire_date
FROM employees
WHERE job_title LIKE '%Engineer%'
  AND hire_date > '2019-01-01'
  AND salary > 70000;
```

### Example 2: Inventory Management
```sql
-- Find Electronics or Furniture under $300 with low stock
SELECT
    product_name,
    category,
    price,
    stock_quantity
FROM products
WHERE (category = 'Electronics' OR category = 'Furniture')
  AND price < 300
  AND stock_quantity < 100
ORDER BY stock_quantity ASC;
```

### Example 3: Customer Segmentation
```sql
-- Find customers from major cities registered in 2023
SELECT
    CONCAT(first_name, ' ', last_name) AS customer_name,
    email,
    city,
    registration_date
FROM customers
WHERE city IN ('New York', 'Philadelphia', 'Miami')
  AND registration_date >= '2023-01-01'
  AND email IS NOT NULL;
```

### Example 4: Order Analysis
```sql
-- Find high-value completed or shipped orders from August
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    status
FROM orders
WHERE (status = 'Completed' OR status = 'Shipped')
  AND total_amount >= 500
  AND order_date BETWEEN '2023-08-01' AND '2023-08-31';
```

### Example 5: HR Report
```sql
-- Find employees without managers OR in specific departments
SELECT
    employee_id,
    CONCAT(first_name, ' ', last_name) AS employee_name,
    department_id,
    manager_id,
    salary
FROM employees
WHERE manager_id IS NULL
   OR department_id IN (1, 2, 3)
   AND salary BETWEEN 50000 AND 80000;
```

## Practice Exercises

### Exercise 1: Basic Filtering
```sql
-- 1. Find all employees with salary greater than 65000
-- 2. Find all products priced under 50
-- 3. Find all orders with status 'Shipped'
-- 4. Find all customers from 'Scranton'
-- 5. Find all products in the 'Electronics' category
```

### Exercise 2: Multiple Conditions (AND)
```sql
-- 1. Find employees in department 1 with salary > 60000
-- 2. Find Electronics products priced between 100 and 500
-- 3. Find completed orders over 1000
-- 4. Find customers from USA registered in 2023
-- 5. Find products with stock > 100 and price < 200
```

### Exercise 3: Alternative Conditions (OR)
```sql
-- 1. Find employees in department 1 OR department 2
-- 2. Find products in Electronics OR Furniture categories
-- 3. Find orders that are Completed OR Shipped
-- 4. Find employees hired before 2020 OR with salary > 80000
-- 5. Find customers from New York OR Philadelphia
```

### Exercise 4: Range Queries (BETWEEN, IN)
```sql
-- 1. Find employees with salary between 55000 and 70000
-- 2. Find products priced between 50 and 150
-- 3. Find orders from August 2023
-- 4. Find employees in departments 1, 2, or 3
-- 5. Find customers from cities: Scranton, New York, Miami
```

### Exercise 5: Pattern Matching (LIKE)
```sql
-- 1. Find employees whose first name starts with 'J'
-- 2. Find products with 'Wireless' in the name
-- 3. Find customers with email ending in '@email.com'
-- 4. Find employees with 'Manager' in their job title
-- 5. Find products with names containing 'Pro' or 'Max'
```

### Exercise 6: NULL Handling
```sql
-- 1. Find employees without a manager
-- 2. Find employees with a phone number
-- 3. Find products without a supplier
-- 4. Find orders with NULL in any field
-- 5. Find customers with complete contact information
```

### Exercise 7: Date Filtering
```sql
-- 1. Find employees hired in 2020
-- 2. Find orders placed in August 2023
-- 3. Find customers registered in the last 6 months
-- 4. Find employees hired before 2019
-- 5. Find orders placed on weekends
```

### Exercise 8: Complex Conditions
```sql
-- 1. Find high-paid employees (>75k) in IT departments hired after 2019
-- 2. Find affordable Electronics (<200) with good stock (>50)
-- 3. Find VIP customers (USA, registered >1 year ago)
-- 4. Find urgent orders (Pending status, placed >7 days ago)
-- 5. Find senior employees (hired before 2019) with salary <70k
```

### Exercise 9: NOT Operator
```sql
-- 1. Find employees NOT in department 1
-- 2. Find products NOT in Electronics category
-- 3. Find orders NOT completed
-- 4. Find customers NOT from USA
-- 5. Find products NOT priced between 100 and 500
```

### Exercise 10: Real-World Queries
```sql
-- 1. Find all potential manager candidates (salary > 70k, employed > 2 years)
-- 2. Find products that need reordering (stock < 50, price > 50)
-- 3. Find new customers (registered in last 30 days)
-- 4. Find stale orders (status Pending, ordered > 14 days ago)
-- 5. Find employees eligible for review (hired > 1 year ago)
```

## Real-World Scenarios

### Scenario 1: E-commerce Flash Sale
Find products eligible for a flash sale:
- Electronics or Furniture category
- Price between $50 and $500
- Stock quantity > 20
- Exclude items with "Refurbished" in name

```sql
SELECT
    product_name,
    category,
    price,
    stock_quantity,
    price * 0.7 AS sale_price
FROM products
WHERE (category = 'Electronics' OR category = 'Furniture')
  AND price BETWEEN 50 AND 500
  AND stock_quantity > 20
  AND product_name NOT LIKE '%Refurbished%';
```

### Scenario 2: HR Salary Review
Find employees due for review:
- Hired more than 1 year ago
- Salary less than department average
- Currently have a manager
- Not in probation period

### Scenario 3: Customer Retention Campaign
Identify customers for re-engagement:
- Registered more than 6 months ago
- Last order more than 90 days ago
- From major cities
- Email address available

### Scenario 4: Inventory Audit
Find problematic inventory items:
- Stock below reorder point (< 30)
- High-value items (price > $200)
- OR items with no recent sales
- Exclude discontinued items

## Best Practices

### 1. Use Appropriate Operators
```sql
-- ❌ Bad: Using OR for ranges
WHERE salary > 60000 OR salary < 80000;

-- ✅ Good: Use BETWEEN
WHERE salary BETWEEN 60000 AND 80000;
```

### 2. Use IN for Multiple Values
```sql
-- ❌ Bad: Multiple OR conditions
WHERE dept_id = 1 OR dept_id = 2 OR dept_id = 3;

-- ✅ Good: Use IN
WHERE dept_id IN (1, 2, 3);
```

### 3. Handle NULL Properly
```sql
-- ❌ Wrong: Using = NULL
WHERE manager_id = NULL;

-- ✅ Correct: Use IS NULL
WHERE manager_id IS NULL;
```

### 4. Use Parentheses for Clarity
```sql
-- ❌ Ambiguous
WHERE dept_id = 1 OR dept_id = 2 AND salary > 60000;

-- ✅ Clear
WHERE (dept_id = 1 OR dept_id = 2) AND salary > 60000;
```

### 5. Optimize LIKE Queries
```sql
-- ❌ Slow: Leading wildcard
WHERE name LIKE '%Smith%';

-- ✅ Faster: No leading wildcard when possible
WHERE name LIKE 'Smith%';
```

## Performance Tips

1. **Index filtered columns** - Columns used in WHERE should be indexed
2. **Avoid functions on columns** - `WHERE YEAR(date) = 2023` prevents index use
3. **Use BETWEEN for ranges** - More efficient than >= AND <=
4. **Leading wildcards are slow** - LIKE '%text' can't use indexes
5. **Use EXISTS instead of IN** - For subqueries (covered later)

## Common Mistakes to Avoid

1. **Using = NULL instead of IS NULL**
2. **Forgetting parentheses in complex conditions**
3. **Not considering NULL in comparisons**
4. **Using OR when AND is needed (logic errors)**
5. **Case sensitivity issues with LIKE**
6. **String comparison with numbers** (use proper data types)
7. **Date format inconsistencies**
8. **Inefficient LIKE patterns** (leading wildcards)

## Operator Precedence

When combining operators, SQL evaluates in this order:
1. Parentheses ()
2. NOT
3. AND
4. OR

```sql
-- These are different!
WHERE a = 1 OR b = 2 AND c = 3  -- AND evaluated first
WHERE (a = 1 OR b = 2) AND c = 3  -- Explicit grouping
```

**Always use parentheses** for complex conditions to be explicit!

## Next Steps

Now that you've mastered filtering with WHERE, proceed to:
- **[04-INSERT-UPDATE-DELETE](../04-INSERT-UPDATE-DELETE/README.md)** - Learn to manipulate data

## Summary

Key takeaways:
- WHERE filters rows based on conditions
- Comparison operators: =, <>, >, <, >=, <=
- Logical operators: AND, OR, NOT
- Range operators: BETWEEN, IN
- Pattern matching: LIKE with % and _
- NULL handling: IS NULL, IS NOT NULL
- Use parentheses for complex conditions
- Consider performance when writing filters

---

**Master filtering**: It's the foundation of effective SQL queries!
