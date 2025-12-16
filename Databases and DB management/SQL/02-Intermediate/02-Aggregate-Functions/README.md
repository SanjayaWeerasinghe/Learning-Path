# Aggregate Functions

## Overview

Aggregate functions perform calculations on multiple rows and return a single value. They're essential for data analysis, reporting, and summarization.

## Common Aggregate Functions

- **COUNT()** - Count rows or non-NULL values
- **SUM()** - Sum numeric values
- **AVG()** - Calculate average
- **MIN()** - Find minimum value
- **MAX()** - Find maximum value

## COUNT Function

### Basic COUNT

```sql
-- Count all rows
SELECT COUNT(*) AS total_employees
FROM employees;

-- Count non-NULL values in a column
SELECT COUNT(phone) AS employees_with_phone
FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department_id) AS department_count
FROM employees;

-- Count distinct categories
SELECT COUNT(DISTINCT category) AS category_count
FROM products;

-- Count orders by status
SELECT
    status,
    COUNT(*) AS order_count
FROM orders
GROUP BY status;
```

### COUNT with Conditions

```sql
-- Count employees with high salary
SELECT COUNT(*) AS high_earners
FROM employees
WHERE salary > 70000;

-- Count products in stock
SELECT COUNT(*) AS in_stock_products
FROM products
WHERE stock_quantity > 0;

-- Count completed orders
SELECT COUNT(*) AS completed_orders
FROM orders
WHERE status = 'Completed';

-- Conditional counting with CASE
SELECT
    COUNT(CASE WHEN salary > 70000 THEN 1 END) AS high_salary,
    COUNT(CASE WHEN salary BETWEEN 50000 AND 70000 THEN 1 END) AS mid_salary,
    COUNT(CASE WHEN salary < 50000 THEN 1 END) AS low_salary
FROM employees;
```

## SUM Function

### Basic SUM

```sql
-- Total payroll
SELECT SUM(salary) AS total_payroll
FROM employees;

-- Total inventory value
SELECT SUM(price * stock_quantity) AS total_inventory_value
FROM products;

-- Total revenue
SELECT SUM(total_amount) AS total_revenue
FROM orders
WHERE status = 'Completed';

-- Sum with filtering
SELECT SUM(salary) AS engineering_payroll
FROM employees
WHERE department_id = 1;
```

### SUM with GROUP BY

```sql
-- Total sales by product
SELECT
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS total_sales
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_sales DESC;

-- Department payroll
SELECT
    d.department_name,
    SUM(e.salary) AS department_payroll
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;
```

## AVG Function

### Basic AVG

```sql
-- Average salary
SELECT AVG(salary) AS avg_salary
FROM employees;

-- Average product price
SELECT AVG(price) AS avg_price
FROM products;

-- Average order value
SELECT AVG(total_amount) AS avg_order_value
FROM orders;

-- Average by category
SELECT
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
FROM products
GROUP BY category;
```

### AVG with Comparisons

```sql
-- Employees earning above average
SELECT
    first_name,
    last_name,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Products priced above category average
SELECT
    p1.product_name,
    p1.category,
    p1.price,
    (SELECT AVG(p2.price)
     FROM products p2
     WHERE p2.category = p1.category) AS category_avg
FROM products p1
WHERE p1.price > (
    SELECT AVG(p2.price)
    FROM products p2
    WHERE p2.category = p1.category
);
```

## MIN and MAX Functions

### Basic MIN and MAX

```sql
-- Salary range
SELECT
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees;

-- Price range by category
SELECT
    category,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    AVG(price) AS avg_price
FROM products
GROUP BY category;

-- Date ranges
SELECT
    MIN(hire_date) AS first_hire,
    MAX(hire_date) AS most_recent_hire
FROM employees;

-- Order date range
SELECT
    MIN(order_date) AS first_order,
    MAX(order_date) AS last_order,
    DATEDIFF(MAX(order_date), MIN(order_date)) AS days_span
FROM orders;
```

### Finding MIN/MAX Records

```sql
-- Highest paid employee
SELECT first_name, last_name, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- Most expensive product
SELECT product_name, price
FROM products
WHERE price = (SELECT MAX(price) FROM products);

-- Newest customer
SELECT first_name, last_name, registration_date
FROM customers
WHERE registration_date = (SELECT MAX(registration_date) FROM customers);
```

## Combining Multiple Aggregates

```sql
-- Comprehensive employee statistics
SELECT
    COUNT(*) AS total_employees,
    SUM(salary) AS total_payroll,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    MIN(hire_date) AS earliest_hire,
    MAX(hire_date) AS latest_hire
FROM employees;

-- Product inventory summary
SELECT
    category,
    COUNT(*) AS product_count,
    SUM(stock_quantity) AS total_units,
    AVG(price) AS avg_price,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    SUM(price * stock_quantity) AS inventory_value
FROM products
GROUP BY category;

-- Customer analytics
SELECT
    COUNT(DISTINCT c.customer_id) AS total_customers,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_revenue,
    AVG(o.total_amount) AS avg_order_value,
    MAX(o.total_amount) AS largest_order
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
```

## Aggregate Functions with DISTINCT

```sql
-- Count unique values
SELECT
    COUNT(DISTINCT category) AS unique_categories,
    COUNT(DISTINCT department_id) AS unique_departments
FROM products;

-- Sum of distinct values (removes duplicates first)
SELECT
    SUM(DISTINCT salary) AS sum_unique_salaries,
    COUNT(DISTINCT salary) AS unique_salary_levels
FROM employees;

-- Average of distinct prices
SELECT
    category,
    AVG(DISTINCT price) AS avg_unique_price
FROM products
GROUP BY category;
```

## Practical Examples

### Example 1: Sales Dashboard
```sql
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS revenue,
    AVG(total_amount) AS avg_order_value,
    MIN(total_amount) AS min_order,
    MAX(total_amount) AS max_order
FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
```

### Example 2: Employee Analytics
```sql
SELECT
    d.department_name,
    COUNT(e.employee_id) AS headcount,
    SUM(e.salary) AS total_payroll,
    AVG(e.salary) AS avg_salary,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary,
    AVG(DATEDIFF(CURDATE(), e.hire_date) / 365) AS avg_tenure_years
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY total_payroll DESC;
```

### Example 3: Product Performance
```sql
SELECT
    p.product_name,
    p.category,
    p.price,
    COUNT(oi.order_item_id) AS times_ordered,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue,
    AVG(oi.quantity) AS avg_quantity_per_order
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category, p.price
HAVING times_ordered > 0
ORDER BY total_revenue DESC
LIMIT 20;
```

### Example 4: Customer Segmentation
```sql
SELECT
    CASE
        WHEN order_count = 0 THEN 'No Orders'
        WHEN order_count = 1 THEN 'One-Time'
        WHEN order_count <= 5 THEN 'Regular'
        ELSE 'VIP'
    END AS customer_segment,
    COUNT(*) AS customer_count,
    AVG(total_spent) AS avg_lifetime_value,
    SUM(total_spent) AS segment_revenue
FROM (
    SELECT
        c.customer_id,
        COUNT(o.order_id) AS order_count,
        COALESCE(SUM(o.total_amount), 0) AS total_spent
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id
) customer_stats
GROUP BY customer_segment
ORDER BY segment_revenue DESC;
```

### Example 5: Inventory Health
```sql
SELECT
    category,
    COUNT(*) AS total_products,
    SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) AS out_of_stock,
    SUM(CASE WHEN stock_quantity < 30 THEN 1 ELSE 0 END) AS low_stock,
    AVG(stock_quantity) AS avg_stock,
    SUM(stock_quantity * price) AS inventory_value,
    MIN(price) AS cheapest_item,
    MAX(price) AS most_expensive
FROM products
GROUP BY category;
```

## Practice Exercises

### Exercise 1: Basic Aggregates
```sql
-- 1. Count total employees
-- 2. Sum all employee salaries
-- 3. Calculate average product price
-- 4. Find minimum and maximum salary
-- 5. Count distinct job titles
```

### Exercise 2: Conditional Aggregates
```sql
-- 1. Count employees earning over 60k
-- 2. Sum revenue from completed orders only
-- 3. Average price of Electronics products
-- 4. Count orders placed this year
-- 5. Sum inventory value for in-stock items
```

### Exercise 3: GROUP BY with Aggregates
```sql
-- 1. Count employees per department
-- 2. Sum sales by product category
-- 3. Average salary by job title
-- 4. Count orders by status
-- 5. Total revenue by month
```

### Exercise 4: Multiple Aggregates
```sql
-- 1. Employee stats: count, avg/min/max salary
-- 2. Product stats by category: count, avg/min/max price
-- 3. Order stats: count, total/avg revenue
-- 4. Customer stats: count, total/avg orders
-- 5. Department stats: count, total/avg/min/max salary
```

### Exercise 5: DISTINCT Aggregates
```sql
-- 1. Count distinct categories in products
-- 2. Count unique customers who placed orders
-- 3. Sum distinct salary values
-- 4. Count distinct cities in customers
-- 5. Average distinct prices per category
```

### Exercise 6: Complex Calculations
```sql
-- 1. Calculate total payroll vs budget by department
-- 2. Find products with above-average prices
-- 3. Customers spending more than average
-- 4. Products ordered more than average
-- 5. Employees with above-department-average salary
```

### Exercise 7: Date Aggregates
```sql
-- 1. Count orders per month
-- 2. Revenue by quarter
-- 3. New customers per month
-- 4. Average order value by day of week
-- 5. Employee hires by year
```

### Exercise 8: Nested Aggregates
```sql
-- 1. Departments with above-average employee count
-- 2. Products priced above category average
-- 3. Customers with above-average order count
-- 4. Employees earning above department average
-- 5. Orders with above-average item count
```

### Exercise 9: Ratio Calculations
```sql
-- 1. Each department's % of total payroll
-- 2. Each product's % of category inventory
-- 3. Each customer's % of total revenue
-- 4. Completed orders as % of all orders
-- 5. Each category's % of total products
```

### Exercise 10: Business Metrics
```sql
-- 1. Customer lifetime value distribution
-- 2. Product sell-through rate (sold/stocked)
-- 3. Department productivity (revenue per employee)
-- 4. Average days between customer orders
-- 5. Inventory turnover rate by category
```

## Best Practices

### 1. Use Appropriate Aggregate
```sql
-- ✅ COUNT(*) for all rows
SELECT COUNT(*) FROM employees;

-- ✅ COUNT(column) for non-NULL values
SELECT COUNT(phone) FROM employees;

-- ✅ COUNT(DISTINCT) for unique values
SELECT COUNT(DISTINCT department_id) FROM employees;
```

### 2. Handle NULLs
```sql
-- ✅ Aggregates ignore NULLs (except COUNT(*))
SELECT
    COUNT(*) AS total_rows,
    COUNT(phone) AS rows_with_phone,
    AVG(salary) AS avg_salary  -- Ignores NULL salaries
FROM employees;
```

### 3. Use COALESCE for NULL Results
```sql
-- ✅ Handle cases with no data
SELECT
    COALESCE(SUM(total_amount), 0) AS total_revenue
FROM orders
WHERE customer_id = 999;  -- May return no rows
```

### 4. Group By All Non-Aggregate Columns
```sql
-- ✅ Correct
SELECT department_id, COUNT(*)
FROM employees
GROUP BY department_id;

-- ❌ Error in strict mode
SELECT department_id, job_title, COUNT(*)
FROM employees
GROUP BY department_id;  -- Missing job_title in GROUP BY
```

## Performance Tips

1. **Index GROUP BY columns** - Improves grouping performance
2. **Filter before aggregating** - Use WHERE, not HAVING, when possible
3. **Limit aggregation scope** - Don't aggregate more data than needed
4. **Use covering indexes** - Include aggregate columns in indexes
5. **Consider materialized views** - For frequently-used aggregations

## Common Mistakes

1. **Forgetting GROUP BY** - Mixing aggregates with non-aggregates
2. **Using HAVING instead of WHERE** - Filter before grouping when possible
3. **Counting NULLs incorrectly** - Use COUNT(*) or COUNT(column) appropriately
4. **Not handling division by zero** - When calculating averages or ratios
5. **Ignoring NULL behavior** - Aggregates skip NULLs

## Next Steps

- **[03-GROUP-BY-HAVING](../03-GROUP-BY-HAVING/README.md)** - Master grouping and filtering groups

## Summary

- Aggregate functions summarize multiple rows
- COUNT, SUM, AVG, MIN, MAX are most common
- Aggregates ignore NULL values (except COUNT(*))
- Use with GROUP BY for category analysis
- Essential for reporting and analytics

---

**Practice aggregates**: They're fundamental to data analysis!
