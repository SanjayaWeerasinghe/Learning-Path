# Database Indexes

## Overview

Indexes are special data structures that improve query performance by allowing faster data retrieval. Like a book's index, they help locate data without scanning every row.

## How Indexes Work

- **B-Tree Structure** - Most common, balanced tree for fast lookups
- **Hash Indexes** - Fast equality checks, no range queries
- **Full-Text Indexes** - Optimized for text search
- **Spatial Indexes** - For geographical data

## Types of Indexes

### 1. Primary Index
Automatically created with PRIMARY KEY.

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,  -- Automatically indexed
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
```

### 2. Unique Index
Automatically created with UNIQUE constraint.

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE  -- Automatically indexed
);

-- Or explicitly
CREATE UNIQUE INDEX idx_email ON customers(email);
```

### 3. Regular (Non-Unique) Index

```sql
-- Single column index
CREATE INDEX idx_lastname ON employees(last_name);

-- Multi-column (composite) index
CREATE INDEX idx_name ON employees(last_name, first_name);

-- Index on expression
CREATE INDEX idx_email_lower ON customers(LOWER(email));

-- Index with prefix (for long strings)
CREATE INDEX idx_description ON products(description(100));
```

### 4. Full-Text Index

```sql
-- For text search
CREATE FULLTEXT INDEX idx_product_search
ON products(product_name, description);

-- Usage
SELECT * FROM products
WHERE MATCH(product_name, description)
AGAINST ('laptop wireless' IN NATURAL LANGUAGE MODE);
```

### 5. Covering Index
Includes all columns needed for a query.

```sql
-- Covers SELECT first_name, last_name WHERE department_id = X
CREATE INDEX idx_dept_names
ON employees(department_id, first_name, last_name);
```

## Creating Indexes

### Basic Syntax

```sql
-- Create index
CREATE INDEX index_name ON table_name(column);

-- Create unique index
CREATE UNIQUE INDEX index_name ON table_name(column);

-- Multi-column index
CREATE INDEX index_name ON table_name(col1, col2, col3);

-- Descending index
CREATE INDEX index_name ON table_name(column DESC);

-- Named index with IF NOT EXISTS (MySQL 8.0+)
CREATE INDEX IF NOT EXISTS idx_salary ON employees(salary);
```

### Practical Examples

```sql
-- Index for frequently queried column
CREATE INDEX idx_order_date ON orders(order_date);

-- Composite index for common query pattern
CREATE INDEX idx_customer_date
ON orders(customer_id, order_date);

-- Index for sorting
CREATE INDEX idx_price_desc ON products(price DESC);

-- Index for JOIN columns
CREATE INDEX idx_order_customer
ON orders(customer_id);

CREATE INDEX idx_orderitems_order
ON order_items(order_id);

CREATE INDEX idx_orderitems_product
ON order_items(product_id);

-- Covering index for specific query
-- SELECT product_name, price FROM products WHERE category = 'Electronics'
CREATE INDEX idx_category_covering
ON products(category, product_name, price);
```

## Dropping Indexes

```sql
-- Drop index
DROP INDEX index_name ON table_name;

-- MySQL specific
ALTER TABLE table_name DROP INDEX index_name;

-- Drop if exists (MySQL 8.0+)
DROP INDEX IF EXISTS idx_salary ON employees;
```

## Viewing Indexes

```sql
-- Show indexes on table (MySQL)
SHOW INDEXES FROM employees;

-- Show create table (includes indexes)
SHOW CREATE TABLE employees;

-- Information schema
SELECT *
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_NAME = 'employees';

-- Analyze index usage
SHOW INDEX FROM employees WHERE Key_name = 'idx_lastname';
```

## When to Use Indexes

### ✅ Create Index When:

```sql
-- 1. Frequently used in WHERE clause
CREATE INDEX idx_status ON orders(status);
SELECT * FROM orders WHERE status = 'Pending';

-- 2. Used in JOIN conditions
CREATE INDEX idx_dept ON employees(department_id);
SELECT * FROM employees e
JOIN departments d ON e.department_id = d.department_id;

-- 3. Used in ORDER BY
CREATE INDEX idx_date_desc ON orders(order_date DESC);
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;

-- 4. Used in GROUP BY
CREATE INDEX idx_category ON products(category);
SELECT category, COUNT(*) FROM products GROUP BY category;

-- 5. Foreign key columns
CREATE INDEX idx_fk_customer ON orders(customer_id);

-- 6. Columns used in range queries
CREATE INDEX idx_salary ON employees(salary);
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 70000;
```

### ❌ Don't Create Index When:

```sql
-- 1. Small tables (< 1000 rows) - full scan is faster
-- 2. Columns with many duplicates (low cardinality)
--    Example: gender (only 2-3 values)

-- 3. Frequently updated columns
--    Indexes slow down INSERT/UPDATE/DELETE

-- 4. Columns never used in queries

-- 5. Already covered by composite index
--    idx(a, b, c) covers idx(a) and idx(a, b)
```

## Index Performance

### Query Without Index
```sql
-- Slow: Full table scan
SELECT * FROM employees WHERE last_name = 'Smith';
-- Scans all rows

-- Check execution plan
EXPLAIN SELECT * FROM employees WHERE last_name = 'Smith';
-- type: ALL (bad)
```

### Query With Index
```sql
-- Fast: Index seek
CREATE INDEX idx_lastname ON employees(last_name);

SELECT * FROM employees WHERE last_name = 'Smith';
-- Uses index

EXPLAIN SELECT * FROM employees WHERE last_name = 'Smith';
-- type: ref (good)
```

## Composite Index Column Order

Order matters! Most selective column first.

```sql
-- Good: Selective column first
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Covers these queries:
SELECT * FROM employees WHERE department_id = 1;
SELECT * FROM employees WHERE department_id = 1 AND salary > 60000;

-- Does NOT cover:
SELECT * FROM employees WHERE salary > 60000;
-- (salary is second column)

-- Rule: Index on (A, B, C) helps queries on:
-- A
-- A, B
-- A, B, C
-- But NOT: B, C or just C
```

## Index Maintenance

```sql
-- Analyze table (update index statistics)
ANALYZE TABLE employees;

-- Optimize table (rebuild indexes, reclaim space)
OPTIMIZE TABLE employees;

-- Check table health
CHECK TABLE employees;

-- Repair table
REPAIR TABLE employees;

-- Show index cardinality
SHOW INDEX FROM employees;
```

## Practical Examples

### Example 1: E-commerce Indexes
```sql
-- Orders table indexes
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_customer_date ON orders(customer_id, order_date);

-- Products table indexes
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_product_price ON products(price);
CREATE INDEX idx_product_stock ON products(stock_quantity);
CREATE INDEX idx_product_name ON products(product_name);

-- Covering index for product listing
CREATE INDEX idx_product_listing
ON products(category, price, product_name, stock_quantity);
```

### Example 2: Query Optimization
```sql
-- Before: Slow query
SELECT c.first_name, c.last_name, COUNT(o.order_id) AS orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY orders DESC;

-- Add indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- After: Fast query with same logic
```

### Example 3: Composite Index Strategy
```sql
-- Common query pattern:
-- WHERE status = ? AND order_date > ? ORDER BY order_date DESC

-- Optimal composite index:
CREATE INDEX idx_status_date ON orders(status, order_date DESC);

-- Now this query uses the index efficiently:
SELECT *
FROM orders
WHERE status = 'Pending'
  AND order_date >= '2024-01-01'
ORDER BY order_date DESC;
```

## Practice Exercises

### Exercise 1: Basic Indexes
```sql
-- 1. Create index on employees.salary
-- 2. Create unique index on customers.email
-- 3. Create index on orders.order_date
-- 4. Create index on products.category
-- 5. View all indexes on employees table
```

### Exercise 2: Composite Indexes
```sql
-- 1. Create index on (department_id, salary)
-- 2. Create index on (category, price)
-- 3. Create index on (customer_id, order_date)
-- 4. Create index on (status, order_date DESC)
-- 5. Test which queries use each index
```

### Exercise 3: Query Analysis
```sql
-- 1. Use EXPLAIN on slow query
-- 2. Identify missing indexes
-- 3. Create appropriate indexes
-- 4. Re-run EXPLAIN to verify improvement
-- 5. Measure query performance before/after
```

### Exercise 4: Index Optimization
```sql
-- 1. Find redundant indexes
-- 2. Combine indexes where possible
-- 3. Remove unused indexes
-- 4. Create covering indexes for common queries
-- 5. Optimize composite index column order
```

### Exercise 5: Full-Text Search
```sql
-- 1. Create FULLTEXT index on product descriptions
-- 2. Search for keywords in products
-- 3. Use boolean mode search
-- 4. Rank results by relevance
-- 5. Combine FULLTEXT with WHERE conditions
```

### Exercise 6: Index Maintenance
```sql
-- 1. Analyze index statistics
-- 2. Check index fragmentation
-- 3. Rebuild fragmented indexes
-- 4. Update table statistics
-- 5. Monitor index usage over time
```

### Exercise 7: Foreign Key Indexes
```sql
-- 1. Identify all foreign keys
-- 2. Create indexes on FK columns
-- 3. Test JOIN performance
-- 4. Verify index usage in JOINs
-- 5. Measure query improvement
```

### Exercise 8: Covering Indexes
```sql
-- 1. Identify frequently-run query
-- 2. Design covering index
-- 3. Create index
-- 4. Verify using EXPLAIN
-- 5. Measure performance gain
```

### Exercise 9: Index Anti-Patterns
```sql
-- 1. Identify over-indexed tables
-- 2. Find unused indexes
-- 3. Locate redundant indexes
-- 4. Remove unnecessary indexes
-- 5. Measure INSERT performance improvement
```

### Exercise 10: Real-World Optimization
```sql
-- 1. Analyze slow query log
-- 2. Identify missing indexes
-- 3. Create optimal index strategy
-- 4. Test with realistic data volumes
-- 5. Document index decisions
```

## Best Practices

### 1. Index Foreign Keys
```sql
-- ✅ Always index FK columns
CREATE INDEX idx_fk_customer ON orders(customer_id);
```

### 2. Don't Over-Index
```sql
-- ❌ Too many indexes slow down writes
-- ✅ Index only frequently-queried columns
```

### 3. Consider Column Order in Composite Indexes
```sql
-- ✅ Most selective column first
CREATE INDEX idx_status_date ON orders(status, order_date);
```

### 4. Use Covering Indexes for Hot Queries
```sql
-- ✅ Include all SELECT columns
CREATE INDEX idx_covering
ON products(category, product_name, price);
```

### 5. Monitor and Maintain
```sql
-- ✅ Regular maintenance
ANALYZE TABLE orders;
OPTIMIZE TABLE products;
```

## Performance Tips

1. **Index selectivity** - High cardinality columns benefit most
2. **Index size** - Keep indexes small for better performance
3. **Read vs Write** - More indexes = faster reads, slower writes
4. **Query patterns** - Index based on actual queries
5. **Covering indexes** - Avoid table lookups when possible
6. **Index maintenance** - Regular ANALYZE and OPTIMIZE

## Common Mistakes

1. **Not indexing foreign keys**
2. **Over-indexing** - Too many indexes
3. **Wrong column order** in composite indexes
4. **Indexing low-cardinality columns** (gender, boolean)
5. **Not using EXPLAIN** to verify index usage
6. **Creating indexes before understanding queries**
7. **Not maintaining indexes** (ANALYZE)
8. **Redundant indexes** - idx(a) when idx(a,b) exists

## Index vs Full Table Scan

Database chooses between index and full scan based on:
- **Table size**
- **Index selectivity**
- **Query result size**
- **Index statistics**

```sql
-- Index used (few rows returned)
SELECT * FROM orders WHERE order_id = 123;

-- Full scan might be faster (many rows returned)
SELECT * FROM orders WHERE status = 'Completed';
-- If 90% of orders are completed
```

## Next Steps

- **[02-Views](../02-Views/README.md)** - Virtual tables for simplified queries

## Summary

- Indexes speed up data retrieval
- Create indexes on frequently-queried columns
- Foreign keys should always be indexed
- Composite index column order matters
- Too many indexes slow down writes
- Use EXPLAIN to verify index usage
- Regular maintenance keeps indexes efficient

---

**Index wisely**: Balance read performance with write overhead!
