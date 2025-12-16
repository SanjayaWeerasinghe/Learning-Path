# Subqueries

## Overview

A subquery (nested query or inner query) is a SELECT statement inside another SQL statement. Subqueries can return single values, lists, or tables.

## Types of Subqueries

1. **Scalar Subquery** - Returns single value
2. **Row Subquery** - Returns single row
3. **Column Subquery** - Returns single column (list)
4. **Table Subquery** - Returns multiple rows and columns
5. **Correlated Subquery** - References outer query

## Scalar Subqueries

Returns a single value (one row, one column).

```sql
-- Compare employee salary to company average
SELECT
    first_name,
    last_name,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,
    salary - (SELECT AVG(salary) FROM employees) AS difference
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find employees earning more than John Doe
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
    SELECT salary
    FROM employees
    WHERE first_name = 'John' AND last_name = 'Doe'
);

-- Products priced above average
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Most recent order for each customer
SELECT
    customer_id,
    first_name,
    last_name,
    (SELECT MAX(order_date)
     FROM orders o
     WHERE o.customer_id = c.customer_id) AS last_order_date
FROM customers c;
```

## Column Subqueries (IN, NOT IN)

Returns a list of values (single column, multiple rows).

```sql
-- Employees in departments located in New York
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location = 'New York'
);

-- Customers who placed orders
SELECT first_name, last_name, email
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
);

-- Products never ordered
SELECT product_name, price
FROM products
WHERE product_id NOT IN (
    SELECT DISTINCT product_id
    FROM order_items
    WHERE product_id IS NOT NULL
);

-- Employees not managing anyone
SELECT first_name, last_name, job_title
FROM employees
WHERE employee_id NOT IN (
    SELECT DISTINCT manager_id
    FROM employees
    WHERE manager_id IS NOT NULL
);
```

## Table Subqueries (FROM Clause)

Returns a table (multiple rows and columns).

```sql
-- Query against aggregated data
SELECT
    dept_stats.department_id,
    dept_stats.avg_salary,
    dept_stats.employee_count
FROM (
    SELECT
        department_id,
        AVG(salary) AS avg_salary,
        COUNT(*) AS employee_count
    FROM employees
    GROUP BY department_id
) AS dept_stats
WHERE dept_stats.avg_salary > 60000;

-- Customer lifetime value
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    customer_orders.order_count,
    customer_orders.total_spent
FROM customers c
JOIN (
    SELECT
        customer_id,
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
) AS customer_orders ON c.customer_id = customer_orders.customer_id
WHERE customer_orders.total_spent > 1000;

-- Product sales rankings
SELECT
    p.product_name,
    p.category,
    sales.total_quantity,
    sales.total_revenue
FROM products p
JOIN (
    SELECT
        product_id,
        SUM(quantity) AS total_quantity,
        SUM(quantity * unit_price) AS total_revenue
    FROM order_items
    GROUP BY product_id
) AS sales ON p.product_id = sales.product_id
ORDER BY sales.total_revenue DESC;
```

## Correlated Subqueries

References columns from outer query. Executed once per outer row.

```sql
-- Employees earning above their department average
SELECT
    e1.first_name,
    e1.last_name,
    e1.department_id,
    e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);

-- Products priced above their category average
SELECT
    p1.product_name,
    p1.category,
    p1.price
FROM products p1
WHERE p1.price > (
    SELECT AVG(p2.price)
    FROM products p2
    WHERE p2.category = p1.category
);

-- Customers with above-average order values
SELECT
    c.customer_id,
    c.first_name,
    c.last_name
FROM customers c
WHERE (
    SELECT AVG(o.total_amount)
    FROM orders o
    WHERE o.customer_id = c.customer_id
) > (
    SELECT AVG(total_amount)
    FROM orders
);

-- Latest order for each customer
SELECT
    o1.order_id,
    o1.customer_id,
    o1.order_date,
    o1.total_amount
FROM orders o1
WHERE o1.order_date = (
    SELECT MAX(o2.order_date)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);
```

## EXISTS and NOT EXISTS

Tests for existence of rows. More efficient than IN for large datasets.

```sql
-- Customers who placed orders (using EXISTS)
SELECT c.first_name, c.last_name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
);

-- Customers with no orders
SELECT c.first_name, c.last_name, c.email
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
);

-- Products ordered in the last month
SELECT p.product_name, p.price
FROM products p
WHERE EXISTS (
    SELECT 1
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE oi.product_id = p.product_id
      AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
);

-- Departments with high-earning employees (>80k)
SELECT d.department_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.department_id
      AND e.salary > 80000
);
```

## ANY and ALL Operators

Compare value to set of values from subquery.

```sql
-- Employees earning more than ANY employee in dept 3
SELECT first_name, last_name, salary
FROM employees
WHERE salary > ANY (
    SELECT salary
    FROM employees
    WHERE department_id = 3
);

-- Employees earning more than ALL employees in dept 3
SELECT first_name, last_name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary
    FROM employees
    WHERE department_id = 3
);

-- Products cheaper than ANY Electronics product
SELECT product_name, category, price
FROM products
WHERE price < ANY (
    SELECT price
    FROM products
    WHERE category = 'Electronics'
)
AND category != 'Electronics';

-- Products more expensive than ALL budget products
SELECT product_name, price
FROM products
WHERE price > ALL (
    SELECT price
    FROM products
    WHERE price < 100
);
```

## Subqueries in SELECT Clause

```sql
-- Employee with department and manager info
SELECT
    e.first_name,
    e.last_name,
    e.salary,
    (SELECT d.department_name
     FROM departments d
     WHERE d.department_id = e.department_id) AS department,
    (SELECT m.first_name
     FROM employees m
     WHERE m.employee_id = e.manager_id) AS manager_name,
    (SELECT COUNT(*)
     FROM employees e2
     WHERE e2.department_id = e.department_id) AS dept_size
FROM employees e;

-- Product with category statistics
SELECT
    product_name,
    price,
    category,
    (SELECT AVG(price)
     FROM products p2
     WHERE p2.category = p1.category) AS category_avg_price,
    (SELECT COUNT(*)
     FROM products p2
     WHERE p2.category = p1.category) AS products_in_category
FROM products p1;
```

## Practical Examples

### Example 1: Top Performers by Department
```sql
-- Highest paid employee in each department
SELECT
    e1.first_name,
    e1.last_name,
    e1.department_id,
    e1.salary
FROM employees e1
WHERE e1.salary = (
    SELECT MAX(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);
```

### Example 2: Customer Segmentation
```sql
-- Classify customers by spending
SELECT
    customer_id,
    first_name,
    last_name,
    CASE
        WHEN customer_id IN (
            SELECT customer_id
            FROM orders
            GROUP BY customer_id
            HAVING SUM(total_amount) > 2000
        ) THEN 'VIP'
        WHEN customer_id IN (
            SELECT customer_id
            FROM orders
            GROUP BY customer_id
            HAVING COUNT(*) >= 3
        ) THEN 'Regular'
        ELSE 'Occasional'
    END AS customer_tier
FROM customers;
```

### Example 3: Product Performance Analysis
```sql
-- Products selling better than category average
SELECT
    p.product_name,
    p.category,
    sales.total_sold,
    (SELECT AVG(total_sold)
     FROM (
         SELECT SUM(oi2.quantity) AS total_sold
         FROM order_items oi2
         JOIN products p2 ON oi2.product_id = p2.product_id
         WHERE p2.category = p.category
         GROUP BY oi2.product_id
     ) AS category_sales
    ) AS category_avg_sales
FROM products p
JOIN (
    SELECT product_id, SUM(quantity) AS total_sold
    FROM order_items
    GROUP BY product_id
) AS sales ON p.product_id = sales.product_id
WHERE sales.total_sold > (
    SELECT AVG(total_sold)
    FROM (
        SELECT SUM(oi2.quantity) AS total_sold
        FROM order_items oi2
        JOIN products p2 ON oi2.product_id = p2.product_id
        WHERE p2.category = p.category
        GROUP BY oi2.product_id
    ) AS category_sales
);
```

### Example 4: Department Budget Analysis
```sql
-- Departments exceeding salary budget threshold
SELECT
    d.department_name,
    d.budget,
    (SELECT SUM(e.salary)
     FROM employees e
     WHERE e.department_id = d.department_id) AS current_payroll,
    d.budget - (SELECT COALESCE(SUM(e.salary), 0)
                FROM employees e
                WHERE e.department_id = d.department_id) AS remaining_budget
FROM departments d
WHERE (
    SELECT SUM(e.salary)
    FROM employees e
    WHERE e.department_id = d.department_id
) > d.budget * 0.8;
```

### Example 5: Complex Customer Analytics
```sql
-- Customers with orders in multiple categories
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    (SELECT COUNT(DISTINCT p.category)
     FROM orders o
     JOIN order_items oi ON o.order_id = oi.order_id
     JOIN products p ON oi.product_id = p.product_id
     WHERE o.customer_id = c.customer_id) AS categories_purchased
FROM customers c
WHERE (
    SELECT COUNT(DISTINCT p.category)
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.customer_id = c.customer_id
) > 1;
```

## Practice Exercises

### Exercise 1: Scalar Subqueries
```sql
-- 1. Employees with above-average salary
-- 2. Products with above-average price
-- 3. Orders with above-average total
-- 4. Customers who registered after average date
-- 5. Departments with above-average budget
```

### Exercise 2: IN/NOT IN Subqueries
```sql
-- 1. Employees in New York departments
-- 2. Products never ordered
-- 3. Customers who placed orders
-- 4. Employees who are managers
-- 5. Products in top 3 categories by sales
```

### Exercise 3: EXISTS/NOT EXISTS
```sql
-- 1. Customers with at least one order
-- 2. Products with no orders
-- 3. Departments with high earners (>75k)
-- 4. Customers who bought Electronics
-- 5. Employees with no subordinates
```

### Exercise 4: Correlated Subqueries
```sql
-- 1. Employees with above-department-average salary
-- 2. Products priced above category average
-- 3. Customers with above-average order value
-- 4. Most recent order per customer
-- 5. Best-selling product per category
```

### Exercise 5: Table Subqueries
```sql
-- 1. Query customer order statistics
-- 2. Departments with aggregated employee data
-- 3. Product sales rankings
-- 4. Monthly revenue trends
-- 5. Category performance metrics
```

### Exercise 6: Complex Conditions
```sql
-- 1. Employees earning more than ANY manager
-- 2. Products cheaper than ALL premium items
-- 3. Orders larger than customer's average
-- 4. Departments with all employees earning >50k
-- 5. Products ordered by ALL VIP customers
```

### Exercise 7: Multi-Level Subqueries
```sql
-- 1. Employees in top 3 departments by headcount
-- 2. Products in categories with >5 products
-- 3. Customers in cities with >3 customers
-- 4. Orders from customers with >2 orders
-- 5. Products priced in top quartile
```

### Exercise 8: Subqueries in SELECT
```sql
-- 1. Employee with department name (subquery)
-- 2. Product with category avg price
-- 3. Customer with order count
-- 4. Order with customer city
-- 5. Employee with manager name
```

### Exercise 9: Performance Comparison
```sql
-- 1. Rewrite IN as EXISTS
-- 2. Rewrite NOT IN as NOT EXISTS
-- 3. Rewrite correlated subquery as JOIN
-- 4. Optimize nested subqueries
-- 5. Compare execution plans
```

### Exercise 10: Real-World Scenarios
```sql
-- 1. Find duplicate customers (same email)
-- 2. Identify inactive customers (no orders in 90 days)
-- 3. Products needing restock (below category avg stock)
-- 4. Employees due for review (hired 1 year ago)
-- 5. Trending products (sales increasing monthly)
```

## Best Practices

### 1. Use EXISTS Instead of IN (for large datasets)
```sql
-- ✅ Better performance with large datasets
SELECT c.first_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- ❌ Can be slow with large order tables
SELECT c.first_name
FROM customers c
WHERE c.customer_id IN (
    SELECT customer_id FROM orders
);
```

### 2. Avoid Correlated Subqueries When Possible
```sql
-- ❌ Slow: Runs for each row
SELECT e.first_name
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e.department_id
);

-- ✅ Faster: Use JOIN
SELECT e.first_name
FROM employees e
JOIN (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) dept_avg ON e.department_id = dept_avg.department_id
WHERE e.salary > dept_avg.avg_salary;
```

### 3. Use Column Aliases
```sql
-- ✅ Readable
SELECT
    product_name,
    (SELECT AVG(price) FROM products) AS avg_price
FROM products;
```

## Performance Tips

1. **Use EXISTS over IN** - More efficient for large datasets
2. **Avoid correlated subqueries** - Consider JOINs instead
3. **Index subquery columns** - Especially those in WHERE
4. **Limit subquery results** - Don't return more than needed
5. **Use EXPLAIN** - Analyze query execution plan
6. **Cache subquery results** - Use CTEs or temp tables for reused subqueries

## Common Mistakes

1. **Returning multiple rows in scalar subquery**
2. **Not handling NULLs in NOT IN**
3. **Overusing correlated subqueries**
4. **Forgetting table aliases in nested queries**
5. **Inefficient nesting levels**

## Next Steps

- **[05-Constraints](../05-Constraints/README.md)** - Learn database integrity rules

## Summary

- Subqueries are queries within queries
- Can be scalar, column, row, or table subqueries
- EXISTS is often faster than IN
- Correlated subqueries reference outer query
- Balance readability with performance
- Consider JOINs as alternatives

---

**Master subqueries**: Powerful tool for complex data retrieval!
