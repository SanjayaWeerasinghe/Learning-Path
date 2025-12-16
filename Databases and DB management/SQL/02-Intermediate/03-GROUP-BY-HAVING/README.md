# GROUP BY and HAVING

## Overview

- **GROUP BY** - Groups rows with same values into summary rows
- **HAVING** - Filters groups after aggregation (WHERE filters before)

## GROUP BY Clause

### Basic Syntax
```sql
SELECT column1, aggregate_function(column2)
FROM table_name
WHERE condition
GROUP BY column1
ORDER BY column1;
```

### Single Column Grouping

```sql
-- Count employees by department
SELECT
    department_id,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- Total revenue by product category
SELECT
    category,
    SUM(price * stock_quantity) AS total_value
FROM products
GROUP BY category;

-- Orders by status
SELECT
    status,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY status;

-- Customers by country
SELECT
    country,
    COUNT(*) AS customer_count
FROM customers
GROUP BY country
ORDER BY customer_count DESC;
```

### Multiple Column Grouping

```sql
-- Employees by department and job title
SELECT
    department_id,
    job_title,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_title
ORDER BY department_id, job_title;

-- Sales by category and month
SELECT
    category,
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
GROUP BY category, DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC, revenue DESC;

-- Customer orders by city and country
SELECT
    country,
    city,
    COUNT(DISTINCT c.customer_id) AS customer_count,
    COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY country, city
ORDER BY country, city;
```

### Grouping by Expressions

```sql
-- Group by calculated field
SELECT
    YEAR(hire_date) AS hire_year,
    COUNT(*) AS hires_count,
    AVG(salary) AS avg_starting_salary
FROM employees
GROUP BY YEAR(hire_date)
ORDER BY hire_year DESC;

-- Group by CASE expression
SELECT
    CASE
        WHEN salary < 50000 THEN 'Entry Level'
        WHEN salary < 70000 THEN 'Mid Level'
        ELSE 'Senior Level'
    END AS salary_band,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY
    CASE
        WHEN salary < 50000 THEN 'Entry Level'
        WHEN salary < 70000 THEN 'Mid Level'
        ELSE 'Senior Level'
    END;

-- Group by price ranges
SELECT
    CASE
        WHEN price < 100 THEN 'Budget'
        WHEN price < 500 THEN 'Mid-Range'
        ELSE 'Premium'
    END AS price_category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY price_category;
```

### GROUP BY with ROLLUP (MySQL, SQL Server)

```sql
-- Subtotals and grand total
SELECT
    department_id,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department_id, job_title WITH ROLLUP;

-- Category and grand totals
SELECT
    category,
    COUNT(*) AS product_count,
    SUM(price * stock_quantity) AS inventory_value
FROM products
GROUP BY category WITH ROLLUP;
```

## HAVING Clause

### Basic HAVING

```sql
-- Departments with more than 2 employees
SELECT
    department_id,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 2;

-- Categories with average price > $200
SELECT
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING AVG(price) > 200;

-- Customers with total spending > $1000
SELECT
    customer_id,
    COUNT(order_id) AS order_count,
    SUM(total_amount) AS total_spent
FROM orders
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC;
```

### HAVING vs WHERE

```sql
-- WHERE filters BEFORE grouping
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
WHERE salary > 50000  -- Filter individual rows first
GROUP BY department_id;

-- HAVING filters AFTER grouping
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 60000;  -- Filter groups

-- Combining WHERE and HAVING
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2020-01-01'  -- Filter rows first
GROUP BY department_id
HAVING COUNT(*) >= 2  -- Then filter groups
ORDER BY avg_salary DESC;
```

### Multiple HAVING Conditions

```sql
-- Departments with specific criteria
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 3
   AND AVG(salary) > 60000
   AND SUM(salary) < 500000
ORDER BY total_payroll DESC;

-- Product categories meeting multiple conditions
SELECT
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MIN(stock_quantity) AS min_stock
FROM products
GROUP BY category
HAVING COUNT(*) >= 2
   AND AVG(price) BETWEEN 100 AND 500
   AND MIN(stock_quantity) > 0;
```

### HAVING with Complex Expressions

```sql
-- Using HAVING with calculations
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees
GROUP BY department_id
HAVING MAX(salary) - MIN(salary) > 20000;

-- HAVING with percentage calculations
SELECT
    category,
    COUNT(*) AS product_count,
    SUM(stock_quantity) AS total_stock,
    (SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS out_of_stock_pct
FROM products
GROUP BY category
HAVING (SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) > 10;
```

## Practical Examples

### Example 1: Department Performance Report
```sql
SELECT
    d.department_name,
    COUNT(e.employee_id) AS headcount,
    AVG(e.salary) AS avg_salary,
    SUM(e.salary) AS total_payroll,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 0
ORDER BY total_payroll DESC;
```

### Example 2: Customer Segmentation
```sql
SELECT
    CASE
        WHEN order_count >= 5 THEN 'VIP'
        WHEN order_count >= 2 THEN 'Regular'
        WHEN order_count = 1 THEN 'One-Time'
        ELSE 'Inactive'
    END AS customer_type,
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
) customer_summary
GROUP BY customer_type
HAVING SUM(total_spent) > 0
ORDER BY segment_revenue DESC;
```

### Example 3: Product Performance Analysis
```sql
SELECT
    p.category,
    COUNT(DISTINCT p.product_id) AS product_count,
    COUNT(DISTINCT oi.order_id) AS orders_with_category,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue,
    AVG(oi.quantity * oi.unit_price) AS avg_sale_value
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.category
HAVING SUM(oi.quantity) > 10
ORDER BY total_revenue DESC;
```

### Example 4: Monthly Sales Trends
```sql
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS monthly_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  AND status = 'Completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
HAVING monthly_revenue > 1000
ORDER BY month DESC;
```

### Example 5: Inventory Health by Category
```sql
SELECT
    category,
    COUNT(*) AS total_products,
    SUM(stock_quantity) AS total_units,
    AVG(stock_quantity) AS avg_units_per_product,
    SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) AS out_of_stock_count,
    (SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS out_of_stock_pct,
    SUM(price * stock_quantity) AS inventory_value
FROM products
GROUP BY category
HAVING COUNT(*) >= 2
ORDER BY inventory_value DESC;
```

## Practice Exercises

### Exercise 1: Basic GROUP BY
```sql
-- 1. Count employees by department_id
-- 2. Sum total inventory value by category
-- 3. Count orders by status
-- 4. Average salary by job_title
-- 5. Count customers by country
```

### Exercise 2: Multiple Column GROUP BY
```sql
-- 1. Count employees by department and job title
-- 2. Sum revenue by category and month
-- 3. Count customers by country and city
-- 4. Average price by category and supplier
-- 5. Order count by status and month
```

### Exercise 3: GROUP BY with Expressions
```sql
-- 1. Count employees by hire year
-- 2. Group products by price range (budget/mid/premium)
-- 3. Group employees by salary band
-- 4. Count orders by quarter
-- 5. Group customers by registration year
```

### Exercise 4: Basic HAVING
```sql
-- 1. Departments with more than 3 employees
-- 2. Categories with avg price > $150
-- 3. Customers with total orders > $500
-- 4. Products ordered more than 5 times
-- 5. Cities with more than 2 customers
```

### Exercise 5: WHERE vs HAVING
```sql
-- 1. High-salary employees (>60k) grouped by dept (use WHERE)
-- 2. Departments with avg salary > 65k (use HAVING)
-- 3. Recent orders (2023+) by customer, total > $1000
-- 4. Electronics products grouped by supplier, count > 2
-- 5. Employees hired after 2020, grouped by dept with headcount > 2
```

### Exercise 6: Complex HAVING
```sql
-- 1. Depts with 3+ employees AND avg salary > 60k
-- 2. Categories with 5+ products AND inventory value > 10k
-- 3. Customers with 2+ orders AND avg order > $200
-- 4. Months with revenue > $5000 AND 10+ orders
-- 5. Products with 3+ orders AND total quantity > 20
```

### Exercise 7: Aggregates with GROUP BY
```sql
-- 1. Department stats: count, avg/min/max salary
-- 2. Category metrics: product count, total/avg price, stock
-- 3. Customer analysis: order count, total/avg revenue
-- 4. Monthly trends: orders, revenue, unique customers
-- 5. Product performance: order count, quantity sold, revenue
```

### Exercise 8: GROUP BY with JOINs
```sql
-- 1. Department names with employee count
-- 2. Product names with order frequency
-- 3. Customer names with lifetime value
-- 4. Category names with inventory value
-- 5. Manager names with team size
```

### Exercise 9: Advanced Grouping
```sql
-- 1. Quartile analysis of customer spending
-- 2. Product ABC classification by revenue
-- 3. Employee tenure distribution (0-1yr, 1-3yr, 3+yr)
-- 4. Order value distribution by ranges
-- 5. Customer activity status (active/inactive)
```

### Exercise 10: Business Analytics
```sql
-- 1. Top 5 product categories by revenue
-- 2. Departments exceeding budget (salary > budget * 0.8)
-- 3. Customer retention by cohort (registration month)
-- 4. Products with declining sales trend
-- 5. Underperforming categories (revenue < average)
```

## Best Practices

### 1. GROUP BY All Non-Aggregate Columns
```sql
-- ✅ Correct
SELECT department_id, job_title, COUNT(*)
FROM employees
GROUP BY department_id, job_title;

-- ❌ Error (missing job_title in GROUP BY)
SELECT department_id, job_title, COUNT(*)
FROM employees
GROUP BY department_id;
```

### 2. Use WHERE Before GROUP BY
```sql
-- ✅ Efficient: Filter before grouping
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department_id;

-- ❌ Less efficient: Filtering after grouping not possible for row conditions
```

### 3. Use Column Aliases in ORDER BY
```sql
-- ✅ Readable
SELECT
    department_id,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING emp_count > 2
ORDER BY emp_count DESC;
```

### 4. Consider Query Performance
```sql
-- ✅ Index GROUP BY columns
CREATE INDEX idx_dept ON employees(department_id);

-- ✅ Filter early with WHERE
-- ✅ Use covering indexes when possible
```

## Performance Tips

1. **Index GROUP BY columns** - Speeds up grouping
2. **Filter with WHERE first** - Reduce rows before grouping
3. **Avoid unnecessary DISTINCT** - GROUP BY already creates unique groups
4. **Use summary tables** - For frequently-run group queries
5. **Limit result sets** - Use TOP/LIMIT with ORDER BY

## Common Mistakes

1. **Not including all non-aggregate columns in GROUP BY**
2. **Using WHERE for aggregate conditions** (use HAVING)
3. **Using HAVING for row conditions** (use WHERE)
4. **Forgetting to handle NULLs in aggregates**
5. **Not aliasing complex expressions**

## Execution Order

SQL processes clauses in this order:
1. **FROM** - Get data from tables
2. **WHERE** - Filter rows
3. **GROUP BY** - Group rows
4. **HAVING** - Filter groups
5. **SELECT** - Select columns
6. **ORDER BY** - Sort results
7. **LIMIT** - Limit results

## Next Steps

- **[04-Subqueries](../04-Subqueries/README.md)** - Learn nested queries

## Summary

- GROUP BY groups rows with same values
- HAVING filters groups (after aggregation)
- WHERE filters rows (before aggregation)
- Can group by multiple columns or expressions
- Essential for analytical queries and reporting

---

**Master GROUP BY**: Foundation of data analysis and reporting!
