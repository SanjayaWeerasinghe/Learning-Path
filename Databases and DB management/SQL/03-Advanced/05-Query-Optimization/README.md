# Query Optimization

## What is Query Optimization?

The process of improving query performance by reducing execution time and resource consumption.

## Execution Plans

### Viewing Execution Plans

**SQL Server:**
```sql
SET SHOWPLAN_TEXT ON;
GO
SELECT * FROM employees WHERE department_id = 5;
GO
SET SHOWPLAN_TEXT OFF;

-- Or graphical plan
-- Ctrl + L in SSMS
```

**PostgreSQL:**
```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 5;

-- With execution details
EXPLAIN ANALYZE SELECT * FROM employees WHERE department_id = 5;
```

**MySQL:**
```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 5;
```

## Query Performance Issues

### 1. Full Table Scan
Reads entire table instead of using index.

```sql
-- Bad: Full table scan
SELECT * FROM employees WHERE YEAR(hire_date) = 2023;

-- Good: Index scan
SELECT * FROM employees WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';
```

### 2. SELECT * Antipattern
Retrieves unnecessary columns.

```sql
-- Bad
SELECT * FROM employees WHERE department_id = 5;

-- Good: Only needed columns
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE department_id = 5;
```

### 3. Implicit Type Conversion
Prevents index usage.

```sql
-- Bad: employee_id is INT, but comparing with string
SELECT * FROM employees WHERE employee_id = '123';

-- Good
SELECT * FROM employees WHERE employee_id = 123;
```

### 4. Function on Indexed Column
Prevents index usage.

```sql
-- Bad: Function on indexed column
SELECT * FROM employees WHERE UPPER(last_name) = 'SMITH';

-- Good: Use computed column or full-text index
-- Or store uppercase version in separate column
SELECT * FROM employees WHERE last_name = 'Smith';
```

## Optimization Techniques

### 1. Proper Indexing

```sql
-- Index on frequently filtered columns
CREATE INDEX idx_department ON employees(department_id);

-- Composite index for multiple columns
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Covering index (includes all query columns)
CREATE INDEX idx_covering ON employees(department_id)
INCLUDE (first_name, last_name, salary);
```

### 2. Query Rewriting

**Use EXISTS instead of IN for large sets:**
```sql
-- Slower
SELECT * FROM customers
WHERE customer_id IN (SELECT customer_id FROM orders);

-- Faster
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);
```

**Use UNION ALL instead of UNION when duplicates are okay:**
```sql
-- Slower (removes duplicates)
SELECT first_name FROM employees WHERE department_id = 1
UNION
SELECT first_name FROM employees WHERE department_id = 2;

-- Faster (keeps duplicates)
SELECT first_name FROM employees WHERE department_id = 1
UNION ALL
SELECT first_name FROM employees WHERE department_id = 2;
```

### 3. Join Optimization

```sql
-- Use INNER JOIN instead of WHERE clause joins
-- Bad
SELECT e.first_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id;

-- Good
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Join order matters (put smallest table first)
SELECT *
FROM small_table s
INNER JOIN large_table l ON s.id = l.small_id;
```

### 4. Subquery Optimization

```sql
-- Bad: Correlated subquery
SELECT e.first_name, e.salary,
    (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) AS avg_dept_salary
FROM employees e;

-- Good: Join or CTE
WITH dept_avg AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT e.first_name, e.salary, da.avg_salary
FROM employees e
JOIN dept_avg da ON e.department_id = da.department_id;
```

### 5. Limit Result Sets

```sql
-- Always use TOP/LIMIT when you don't need all rows
SELECT TOP 100 * FROM employees ORDER BY hire_date DESC;

-- PostgreSQL/MySQL
SELECT * FROM employees ORDER BY hire_date DESC LIMIT 100;
```

## Statistics and Cardinality

### Update Statistics

```sql
-- SQL Server
UPDATE STATISTICS employees;

-- PostgreSQL
ANALYZE employees;

-- MySQL
ANALYZE TABLE employees;
```

### Check Statistics

```sql
-- SQL Server
DBCC SHOW_STATISTICS ('employees', 'idx_department');

-- PostgreSQL
SELECT * FROM pg_stats WHERE tablename = 'employees';
```

## Query Hints

Use sparingly - optimizer usually knows best!

```sql
-- Force index usage
SELECT * FROM employees WITH (INDEX(idx_department))
WHERE department_id = 5;

-- Force join order
SELECT * FROM employees e
INNER LOOP JOIN departments d ON e.department_id = d.department_id;

-- No lock (dirty read)
SELECT * FROM employees WITH (NOLOCK);
```

## Pagination Optimization

```sql
-- Bad: OFFSET becomes slow with large offsets
SELECT * FROM products
ORDER BY product_id
OFFSET 100000 ROWS FETCH NEXT 20 ROWS ONLY;

-- Good: Keyset pagination
SELECT * FROM products
WHERE product_id > 100020
ORDER BY product_id
FETCH NEXT 20 ROWS ONLY;
```

## Batch Processing

```sql
-- Bad: Row-by-row processing
DECLARE @id INT;
DECLARE cur CURSOR FOR SELECT employee_id FROM employees;
OPEN cur;
FETCH NEXT FROM cur INTO @id;
WHILE @@FETCH_STATUS = 0
BEGIN
    UPDATE employees SET salary = salary * 1.1 WHERE employee_id = @id;
    FETCH NEXT FROM cur INTO @id;
END
CLOSE cur;
DEALLOCATE cur;

-- Good: Set-based operation
UPDATE employees SET salary = salary * 1.1;

-- For large updates, batch them
WHILE 1 = 1
BEGIN
    UPDATE TOP (1000) employees
    SET salary = salary * 1.1
    WHERE salary < 100000 AND salary = salary; -- Not yet updated

    IF @@ROWCOUNT < 1000 BREAK;
END
```

## Common Table Expressions (CTE) vs Temp Tables

```sql
-- CTE: Good for readability, single use
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT * FROM high_earners WHERE department_id = 5;

-- Temp table: Good for reuse, large datasets
SELECT * INTO #high_earners FROM employees WHERE salary > 100000;
CREATE INDEX idx_dept ON #high_earners(department_id);
SELECT * FROM #high_earners WHERE department_id = 5;
SELECT COUNT(*) FROM #high_earners; -- Reused
DROP TABLE #high_earners;
```

## Monitoring Slow Queries

### SQL Server
```sql
-- Find expensive queries
SELECT TOP 10
    query_stats.query_hash,
    SUM(query_stats.total_worker_time) / SUM(query_stats.execution_count) AS avg_cpu_time,
    MIN(query_stats.statement_text) AS statement_text
FROM
(
    SELECT
        qs.query_hash,
        qs.total_worker_time,
        qs.execution_count,
        SUBSTRING(st.text, (qs.statement_start_offset/2)+1,
            ((CASE qs.statement_end_offset
                WHEN -1 THEN DATALENGTH(st.text)
                ELSE qs.statement_end_offset
            END - qs.statement_start_offset)/2) + 1) AS statement_text
    FROM sys.dm_exec_query_stats AS qs
    CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
) AS query_stats
GROUP BY query_stats.query_hash
ORDER BY avg_cpu_time DESC;
```

### PostgreSQL
```sql
-- Enable slow query log
-- In postgresql.conf:
-- log_min_duration_statement = 1000  -- 1 second

-- Query pg_stat_statements
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Index Maintenance

```sql
-- Rebuild fragmented indexes (SQL Server)
ALTER INDEX ALL ON employees REBUILD;

-- Update index statistics
UPDATE STATISTICS employees;

-- Remove unused indexes
-- First, identify unused indexes
SELECT
    OBJECT_NAME(i.object_id) AS table_name,
    i.name AS index_name,
    i.index_id,
    user_seeks,
    user_scans,
    user_lookups,
    user_updates
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats s
    ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE OBJECTPROPERTY(i.object_id, 'IsUserTable') = 1
    AND s.user_seeks = 0 AND s.user_scans = 0 AND s.user_lookups = 0
    AND i.index_id > 1; -- Exclude clustered index

-- Then drop if truly unused
DROP INDEX idx_unused ON employees;
```

## Partitioning for Performance

```sql
-- Partition large tables by date
CREATE PARTITION FUNCTION pf_orders (DATE)
AS RANGE RIGHT FOR VALUES ('2022-01-01', '2023-01-01', '2024-01-01');

CREATE PARTITION SCHEME ps_orders
AS PARTITION pf_orders ALL TO ([PRIMARY]);

CREATE TABLE orders (
    order_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2)
) ON ps_orders(order_date);

-- Queries on specific partitions are faster
SELECT * FROM orders WHERE order_date >= '2024-01-01';
```

## Query Optimization Checklist

1. ✅ Are there indexes on WHERE clause columns?
2. ✅ Are there indexes on JOIN columns?
3. ✅ Is SELECT * avoided?
4. ✅ Are functions avoided on indexed columns?
5. ✅ Is the data type correct (no implicit conversion)?
6. ✅ Are statistics up to date?
7. ✅ Is the query using the right index?
8. ✅ Can subqueries be eliminated?
9. ✅ Can correlated subqueries be rewritten as JOINs?
10. ✅ Is result set limited appropriately?

## Performance Testing

```sql
-- Measure query time
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT * FROM employees WHERE department_id = 5;

SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;
```

## Interview Tips

- Explain execution plan reading
- Know index types and when to use each
- Discuss query rewriting techniques
- Understand statistics importance
- Know common antipatterns
- Explain partition benefits
- Discuss monitoring and profiling

## Common Mistakes

1. Over-indexing (slows INSERT/UPDATE)
2. Using SELECT *
3. Not updating statistics
4. Ignoring execution plans
5. Using cursors instead of set operations
6. Not using appropriate data types
7. Premature optimization

## Key Takeaways

1. Always check execution plans
2. Index strategically (not everything)
3. Avoid functions on indexed columns
4. Keep statistics updated
5. Use set-based operations over cursors
6. Limit result sets appropriately
7. Monitor and profile slow queries
8. Test before and after optimization
