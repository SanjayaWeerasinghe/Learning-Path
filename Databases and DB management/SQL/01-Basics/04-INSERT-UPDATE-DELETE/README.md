# INSERT, UPDATE, DELETE - Data Manipulation

## Overview

These DML (Data Manipulation Language) statements allow you to modify data in your database:
- **INSERT** - Add new records
- **UPDATE** - Modify existing records
- **DELETE** - Remove records

## INSERT Statement

### Basic Syntax
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### Insert Single Row

```sql
-- Insert a new employee (specify all columns)
INSERT INTO employees (
    employee_id,
    first_name,
    last_name,
    email,
    phone,
    hire_date,
    job_title,
    salary,
    department_id,
    manager_id
) VALUES (
    11,
    'Sarah',
    'Connor',
    'sarah.connor@company.com',
    '555-0111',
    '2024-01-15',
    'Security Specialist',
    75000.00,
    1,
    1
);

-- Insert without specifying column names (must match table order)
-- Not recommended - fragile if table structure changes
INSERT INTO departments
VALUES (6, 'Research', 'Seattle', 250000.00);

-- Insert partial data (NULL for omitted columns)
INSERT INTO employees (first_name, last_name, email, hire_date, job_title, salary, department_id)
VALUES ('Tom', 'Anderson', 'tom.anderson@company.com', '2024-02-01', 'Intern', 35000.00, 2);

-- Insert with AUTO_INCREMENT (omit ID)
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES ('Wireless Keyboard', 'Electronics', 79.99, 150);
```

### Insert Multiple Rows

```sql
-- Insert multiple employees at once
INSERT INTO employees (first_name, last_name, email, hire_date, job_title, salary, department_id, manager_id)
VALUES
    ('Lisa', 'Wang', 'lisa.wang@company.com', '2024-01-20', 'Data Analyst', 72000.00, 5, 5),
    ('Mark', 'Taylor', 'mark.taylor@company.com', '2024-01-25', 'UX Designer', 68000.00, 2, 2),
    ('Nina', 'Patel', 'nina.patel@company.com', '2024-02-05', 'DevOps Engineer', 82000.00, 1, 1);

-- Insert multiple products
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES
    ('4K Monitor', 'Electronics', 599.99, 40),
    ('Ergonomic Keyboard', 'Electronics', 149.99, 85),
    ('Conference Table', 'Furniture', 899.99, 15),
    ('Bookshelf', 'Furniture', 199.99, 50);

-- Insert multiple customers
INSERT INTO customers (first_name, last_name, email, city, country, registration_date)
VALUES
    ('Alex', 'Murphy', 'alex.murphy@email.com', 'Detroit', 'USA', CURDATE()),
    ('Rachel', 'Green', 'rachel.green@email.com', 'New York', 'USA', CURDATE()),
    ('Ross', 'Geller', 'ross.geller@email.com', 'New York', 'USA', CURDATE());
```

### INSERT with SELECT (Copy Data)

```sql
-- Create a backup table
CREATE TABLE employees_backup AS SELECT * FROM employees WHERE 1=0;

-- Insert data from another table
INSERT INTO employees_backup
SELECT * FROM employees WHERE department_id = 1;

-- Insert with transformation
INSERT INTO employees_backup (employee_id, first_name, last_name, email, salary)
SELECT employee_id, first_name, last_name, email, salary * 1.1
FROM employees
WHERE salary < 60000;

-- Insert from multiple tables (with JOIN)
INSERT INTO order_summary (customer_name, total_spent, order_count)
SELECT
    CONCAT(c.first_name, ' ', c.last_name),
    SUM(o.total_amount),
    COUNT(o.order_id)
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id;
```

### INSERT with Default Values

```sql
-- Insert with DEFAULT keyword
INSERT INTO products (product_name, category, price)
VALUES ('New Product', 'Electronics', DEFAULT);

-- Insert using column defaults
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, CURDATE(), DEFAULT); -- status has DEFAULT 'Pending'

-- Insert multiple rows with defaults
INSERT INTO products (product_name, category, price)
VALUES
    ('Item A', 'Electronics', DEFAULT),
    ('Item B', 'Furniture', DEFAULT),
    ('Item C', 'Electronics', DEFAULT);
```

### INSERT IGNORE (MySQL)

```sql
-- Skip rows that would cause errors (like duplicate keys)
INSERT IGNORE INTO employees (employee_id, first_name, last_name, email)
VALUES (1, 'John', 'Doe', 'john.doe@company.com'); -- Won't fail if ID exists

-- Insert multiple with IGNORE
INSERT IGNORE INTO products (product_id, product_name, category, price)
VALUES
    (1, 'Existing Product', 'Electronics', 99.99), -- Skipped
    (100, 'New Product', 'Furniture', 299.99); -- Inserted
```

### ON DUPLICATE KEY UPDATE (MySQL)

```sql
-- Insert or update if key exists
INSERT INTO products (product_id, product_name, category, price, stock_quantity)
VALUES (1, 'Laptop Pro 15', 'Electronics', 1299.99, 60)
ON DUPLICATE KEY UPDATE
    price = VALUES(price),
    stock_quantity = VALUES(stock_quantity);

-- Update with calculation
INSERT INTO products (product_id, product_name, category, price, stock_quantity)
VALUES (1, 'Laptop Pro 15', 'Electronics', 1299.99, 10)
ON DUPLICATE KEY UPDATE
    stock_quantity = stock_quantity + VALUES(stock_quantity);
```

## UPDATE Statement

### Basic Syntax
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

**WARNING**: Always use WHERE clause! Without it, ALL rows will be updated!

### Update Single Column

```sql
-- Update one employee's salary
UPDATE employees
SET salary = 90000.00
WHERE employee_id = 1;

-- Update product price
UPDATE products
SET price = 1399.99
WHERE product_id = 1;

-- Update order status
UPDATE orders
SET status = 'Completed'
WHERE order_id = 1;

-- Update customer city
UPDATE customers
SET city = 'Los Angeles'
WHERE customer_id = 5;
```

### Update Multiple Columns

```sql
-- Update employee information
UPDATE employees
SET
    salary = 95000.00,
    job_title = 'Senior Software Engineer',
    department_id = 1
WHERE employee_id = 1;

-- Update product details
UPDATE products
SET
    price = 1499.99,
    stock_quantity = 75,
    category = 'Electronics'
WHERE product_id = 1;

-- Update order information
UPDATE orders
SET
    status = 'Shipped',
    total_amount = 1599.98
WHERE order_id = 3;
```

### Update with Calculations

```sql
-- Give 10% raise to all employees in department 1
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1;

-- Increase all product prices by 5%
UPDATE products
SET price = price * 1.05
WHERE category = 'Electronics';

-- Apply discount to products
UPDATE products
SET price = price * 0.9
WHERE stock_quantity > 100;

-- Update based on calculation
UPDATE employees
SET salary = salary + 5000
WHERE YEAR(hire_date) < 2020;
```

### Update with Subqueries

```sql
-- Update salary to department average
UPDATE employees e1
SET salary = (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
)
WHERE employee_id = 1;

-- Update product price based on category average
UPDATE products p1
SET price = (
    SELECT AVG(price)
    FROM products p2
    WHERE p2.category = p1.category
)
WHERE stock_quantity = 0;

-- Update order total from order items
UPDATE orders o
SET total_amount = (
    SELECT SUM(quantity * unit_price)
    FROM order_items oi
    WHERE oi.order_id = o.order_id
)
WHERE order_id = 1;
```

### Update Multiple Rows

```sql
-- Update all employees in a department
UPDATE employees
SET salary = salary * 1.15
WHERE department_id = 1;

-- Update all orders with specific status
UPDATE orders
SET status = 'Cancelled'
WHERE status = 'Pending' AND order_date < '2023-07-01';

-- Update products in category
UPDATE products
SET price = price * 0.8
WHERE category = 'Furniture' AND stock_quantity > 50;

-- Update all matching records
UPDATE customers
SET country = 'United States'
WHERE country = 'USA';
```

### Conditional Updates with CASE

```sql
-- Different raises based on performance
UPDATE employees
SET salary = CASE
    WHEN salary < 50000 THEN salary * 1.15
    WHEN salary < 70000 THEN salary * 1.10
    ELSE salary * 1.05
END
WHERE department_id = 1;

-- Update status based on amount
UPDATE orders
SET status = CASE
    WHEN total_amount > 1000 THEN 'Priority'
    WHEN total_amount > 500 THEN 'Standard'
    ELSE 'Economy'
END
WHERE status = 'Pending';

-- Multiple column updates with CASE
UPDATE products
SET
    price = CASE
        WHEN category = 'Electronics' THEN price * 1.05
        WHEN category = 'Furniture' THEN price * 1.03
        ELSE price
    END,
    stock_quantity = CASE
        WHEN stock_quantity < 50 THEN stock_quantity + 100
        ELSE stock_quantity
    END
WHERE price > 0;
```

### Update with JOIN (MySQL)

```sql
-- Update employee salary based on department budget
UPDATE employees e
JOIN departments d ON e.department_id = d.department_id
SET e.salary = e.salary * 1.10
WHERE d.budget > 400000;

-- Update product prices based on supplier
UPDATE products p
JOIN suppliers s ON p.supplier_id = s.supplier_id
SET p.price = p.price * 1.05
WHERE s.country = 'USA';
```

## DELETE Statement

### Basic Syntax
```sql
DELETE FROM table_name
WHERE condition;
```

**WARNING**: Always use WHERE clause! Without it, ALL rows will be deleted!

### Delete Single Row

```sql
-- Delete specific employee
DELETE FROM employees
WHERE employee_id = 11;

-- Delete specific product
DELETE FROM products
WHERE product_id = 100;

-- Delete specific order
DELETE FROM orders
WHERE order_id = 100;

-- Delete specific customer
DELETE FROM customers
WHERE customer_id = 50;
```

### Delete Multiple Rows

```sql
-- Delete all employees from a department
DELETE FROM employees
WHERE department_id = 6;

-- Delete old orders
DELETE FROM orders
WHERE order_date < '2023-01-01';

-- Delete out-of-stock products
DELETE FROM products
WHERE stock_quantity = 0 AND price < 50;

-- Delete inactive customers
DELETE FROM customers
WHERE registration_date < '2020-01-01'
  AND customer_id NOT IN (SELECT DISTINCT customer_id FROM orders);
```

### Delete with Subqueries

```sql
-- Delete employees with below-average salary
DELETE FROM employees
WHERE salary < (SELECT AVG(salary) FROM employees);

-- Delete products not in any order
DELETE FROM products
WHERE product_id NOT IN (
    SELECT DISTINCT product_id FROM order_items
);

-- Delete customers with no orders
DELETE FROM customers
WHERE customer_id NOT IN (
    SELECT DISTINCT customer_id FROM orders
);
```

### Delete with JOIN (MySQL)

```sql
-- Delete employees from departments with low budget
DELETE e FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.budget < 200000;

-- Delete products from specific suppliers
DELETE p FROM products p
JOIN suppliers s ON p.supplier_id = s.supplier_id
WHERE s.country = 'China';
```

### DELETE vs TRUNCATE

```sql
-- DELETE - Removes rows one by one, can use WHERE, can be rolled back
DELETE FROM employees WHERE department_id = 6;

-- TRUNCATE - Fast, removes all rows, resets AUTO_INCREMENT, cannot be rolled back
TRUNCATE TABLE employees_backup;

-- DROP - Removes entire table structure
DROP TABLE employees_backup;
```

**When to use:**
- **DELETE** - Remove specific rows, need transaction support
- **TRUNCATE** - Clear entire table quickly, don't need rollback
- **DROP** - Remove table completely

## Practical Examples

### Example 1: New Employee Onboarding
```sql
-- Insert new employee
INSERT INTO employees (first_name, last_name, email, hire_date, job_title, salary, department_id, manager_id)
VALUES ('Jennifer', 'Lawrence', 'jennifer.lawrence@company.com', CURDATE(), 'Software Engineer', 75000.00, 1, 1);

-- Get the new employee ID
SELECT LAST_INSERT_ID();

-- Update with additional information
UPDATE employees
SET phone = '555-0199'
WHERE employee_id = LAST_INSERT_ID();
```

### Example 2: Product Price Update Campaign
```sql
-- Backup current prices
CREATE TABLE product_prices_backup AS
SELECT product_id, price, CURDATE() AS backup_date FROM products;

-- Apply seasonal discount
UPDATE products
SET price = CASE
    WHEN category = 'Electronics' THEN price * 0.85
    WHEN category = 'Furniture' THEN price * 0.90
    ELSE price * 0.95
END
WHERE stock_quantity > 30;

-- Verify changes
SELECT
    product_name,
    category,
    old.price AS old_price,
    p.price AS new_price,
    p.price - old.price AS difference
FROM products p
JOIN product_prices_backup old ON p.product_id = old.product_id
WHERE p.price != old.price;
```

### Example 3: Order Processing
```sql
-- Create new order
INSERT INTO orders (customer_id, order_date, total_amount, status)
VALUES (1, CURDATE(), 0, 'Pending');

SET @order_id = LAST_INSERT_ID();

-- Add order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES
    (@order_id, 1, 1, 1299.99),
    (@order_id, 2, 2, 29.99);

-- Update order total
UPDATE orders
SET total_amount = (
    SELECT SUM(quantity * unit_price)
    FROM order_items
    WHERE order_id = @order_id
)
WHERE order_id = @order_id;

-- Update product stock
UPDATE products p
JOIN order_items oi ON p.product_id = oi.product_id
SET p.stock_quantity = p.stock_quantity - oi.quantity
WHERE oi.order_id = @order_id;
```

### Example 4: Data Cleanup
```sql
-- Remove duplicate customers (keep oldest)
DELETE c1 FROM customers c1
JOIN customers c2 ON c1.email = c2.email
WHERE c1.customer_id > c2.customer_id;

-- Remove orphaned order items
DELETE FROM order_items
WHERE order_id NOT IN (SELECT order_id FROM orders);

-- Archive old completed orders
INSERT INTO orders_archive
SELECT * FROM orders
WHERE status = 'Completed' AND order_date < '2023-01-01';

DELETE FROM orders
WHERE status = 'Completed' AND order_date < '2023-01-01';
```

### Example 5: Bulk Data Migration
```sql
-- Insert customers from temp import table
INSERT INTO customers (first_name, last_name, email, city, country, registration_date)
SELECT
    first_name,
    last_name,
    LOWER(email),
    TRIM(city),
    UPPER(country),
    CURDATE()
FROM customers_import
WHERE email IS NOT NULL
  AND email LIKE '%@%'
ON DUPLICATE KEY UPDATE
    city = VALUES(city),
    country = VALUES(country);
```

## Practice Exercises

### Exercise 1: INSERT Operations
```sql
-- 1. Insert a new employee in the Engineering department
-- 2. Insert 3 new products in one statement
-- 3. Insert a new customer with today's registration date
-- 4. Insert a new department
-- 5. Insert order items for an existing order
```

### Exercise 2: INSERT with SELECT
```sql
-- 1. Copy all Electronics products to a products_electronics table
-- 2. Insert high-value orders (>$500) into premium_orders table
-- 3. Create employee_summary with count by department
-- 4. Copy customers from specific cities to regional_customers table
-- 5. Insert aggregated sales data into monthly_summary table
```

### Exercise 3: Basic UPDATE
```sql
-- 1. Update an employee's salary by 10%
-- 2. Change a product's category
-- 3. Update an order's status to 'Shipped'
-- 4. Change a customer's email address
-- 5. Update a department's budget
```

### Exercise 4: Bulk UPDATE
```sql
-- 1. Give 5% raise to all employees in department 1
-- 2. Increase prices by 10% for all Furniture products
-- 3. Change status to 'Cancelled' for old pending orders
-- 4. Update all USA customers to 'United States'
-- 5. Reduce stock by 10% for overstocked items (stock > 150)
```

### Exercise 5: UPDATE with CASE
```sql
-- 1. Update salary tiers: <50k (+15%), 50k-70k (+10%), >70k (+5%)
-- 2. Set order priority: >$1000 (High), $500-1000 (Medium), <$500 (Low)
-- 3. Update product stock status based on quantity ranges
-- 4. Set employee level based on years of service
-- 5. Apply category-specific price adjustments
```

### Exercise 6: UPDATE with Calculations
```sql
-- 1. Double the salary of the lowest paid employee per department
-- 2. Set product prices to category average for items priced at 0
-- 3. Update order totals from sum of order items
-- 4. Adjust employee salaries to be within 20% of department median
-- 5. Update stock quantities based on pending orders
```

### Exercise 7: Basic DELETE
```sql
-- 1. Delete a specific employee by ID
-- 2. Delete all products with 0 stock and price < $20
-- 3. Delete orders older than 2 years
-- 4. Remove customers who never placed an order
-- 5. Delete duplicate entries (keep one)
```

### Exercise 8: DELETE with Subqueries
```sql
-- 1. Delete employees earning less than department average
-- 2. Delete products never ordered
-- 3. Delete orders with no order items
-- 4. Remove customers from cities with no active orders
-- 5. Delete departments with no employees
```

### Exercise 9: Transaction Safety
```sql
-- 1. Insert new employee and update department count in transaction
-- 2. Update order status and inventory in transaction
-- 3. Delete old records with backup in transaction
-- 4. Transfer employee between departments safely
-- 5. Process refund (update order, restore inventory)
```

### Exercise 10: Real-World Scenarios
```sql
-- 1. Complete employee onboarding (insert, update, verify)
-- 2. Process product return (update order, restore stock, refund)
-- 3. Merge duplicate customer records
-- 4. Archive and delete old data
-- 5. Bulk price update with audit trail
```

## Real-World Scenarios

### Scenario 1: Employee Promotion
```sql
-- Start transaction
START TRANSACTION;

-- Update employee details
UPDATE employees
SET
    job_title = 'Senior Software Engineer',
    salary = salary * 1.20,
    manager_id = 1
WHERE employee_id = 6;

-- Log the promotion
INSERT INTO employee_history (employee_id, action, old_title, new_title, change_date)
VALUES (6, 'Promotion', 'Junior Developer', 'Senior Software Engineer', CURDATE());

-- Commit if successful
COMMIT;
```

### Scenario 2: Product Recall
```sql
-- Mark products as recalled
UPDATE products
SET
    stock_quantity = 0,
    price = 0,
    category = 'Discontinued'
WHERE product_name LIKE '%Recalled Item%';

-- Cancel pending orders with recalled products
UPDATE orders o
SET status = 'Cancelled'
WHERE order_id IN (
    SELECT DISTINCT order_id
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    WHERE p.category = 'Discontinued'
)
AND status = 'Pending';

-- Delete recalled items from inventory
DELETE FROM products
WHERE category = 'Discontinued' AND price = 0;
```

### Scenario 3: Customer Data Migration
```sql
-- Import from external source
INSERT INTO customers (first_name, last_name, email, city, country, registration_date)
SELECT
    TRIM(firstname) AS first_name,
    TRIM(lastname) AS last_name,
    LOWER(TRIM(email_address)) AS email,
    TRIM(UPPER(SUBSTRING(city, 1, 1)) || LOWER(SUBSTRING(city, 2))) AS city,
    UPPER(country_code) AS country,
    STR_TO_DATE(reg_date, '%m/%d/%Y') AS registration_date
FROM customer_import
WHERE email_address LIKE '%@%'
  AND email_address NOT IN (SELECT email FROM customers)
ON DUPLICATE KEY UPDATE
    city = VALUES(city),
    country = VALUES(country);
```

### Scenario 4: Inventory Restock
```sql
-- Identify products needing restock
CREATE TEMPORARY TABLE restock_needed AS
SELECT product_id, product_name, stock_quantity,
       CASE
           WHEN stock_quantity < 30 THEN 100
           WHEN stock_quantity < 60 THEN 50
           ELSE 0
       END AS restock_amount
FROM products
WHERE stock_quantity < 60;

-- Update inventory
UPDATE products p
JOIN restock_needed r ON p.product_id = r.product_id
SET p.stock_quantity = p.stock_quantity + r.restock_amount;

-- Log restock action
INSERT INTO inventory_log (product_id, action, quantity, action_date)
SELECT product_id, 'Restock', restock_amount, CURDATE()
FROM restock_needed
WHERE restock_amount > 0;
```

## Best Practices

### 1. Always Use WHERE Clause
```sql
-- ❌ Dangerous: Updates all rows
UPDATE employees SET salary = 50000;

-- ✅ Safe: Updates specific rows
UPDATE employees SET salary = 50000 WHERE employee_id = 1;
```

### 2. Test with SELECT First
```sql
-- ✅ First, verify which rows will be affected
SELECT * FROM employees WHERE department_id = 6;

-- Then perform the update
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 6;
```

### 3. Use Transactions for Multiple Operations
```sql
START TRANSACTION;

UPDATE employees SET department_id = 2 WHERE employee_id = 5;
UPDATE departments SET employee_count = employee_count - 1 WHERE department_id = 1;
UPDATE departments SET employee_count = employee_count + 1 WHERE department_id = 2;

COMMIT; -- or ROLLBACK if something goes wrong
```

### 4. Backup Before Bulk Changes
```sql
-- Create backup
CREATE TABLE employees_backup_20240101 AS SELECT * FROM employees;

-- Perform bulk update
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;
```

### 5. Use Meaningful Default Values
```sql
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, CURDATE(), DEFAULT); -- Uses table's default value for status
```

## Performance Tips

1. **Batch inserts** - Insert multiple rows in one statement
2. **Disable indexes temporarily** for bulk inserts (large datasets)
3. **Use prepared statements** for repeated inserts
4. **Index WHERE columns** for UPDATE and DELETE
5. **Avoid unnecessary updates** - Don't update if values haven't changed
6. **Use LIMIT** with DELETE for large deletions (avoid locking)

## Common Mistakes to Avoid

1. **Forgetting WHERE clause** - Updates/deletes all rows
2. **Not using transactions** for related operations
3. **Ignoring foreign key constraints**
4. **Not validating data** before insert
5. **Using DELETE instead of TRUNCATE** for clearing tables
6. **Not backing up** before bulk operations
7. **Hardcoding IDs** - Use AUTO_INCREMENT
8. **Not handling NULL values** properly

## Safety Checklist

Before running UPDATE or DELETE:
- [ ] Is there a WHERE clause?
- [ ] Have I tested with SELECT first?
- [ ] Is there a backup?
- [ ] Am I in a transaction (if multiple operations)?
- [ ] Have I verified the affected row count?

## Next Steps

Now that you understand data manipulation, proceed to:
- **[05-ORDER-BY-LIMIT](../05-ORDER-BY-LIMIT/README.md)** - Learn to sort and limit results

## Summary

Key takeaways:
- INSERT adds new records to tables
- UPDATE modifies existing records
- DELETE removes records
- Always use WHERE with UPDATE and DELETE
- Test with SELECT before modifying data
- Use transactions for related operations
- Backup data before bulk changes
- Validate data before inserting

---

**Safety first**: Always think twice before running UPDATE or DELETE!
