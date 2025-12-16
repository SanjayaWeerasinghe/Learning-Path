# Stored Procedures, Functions, and Triggers

## Overview

- **Stored Procedures** - Reusable SQL code blocks that can accept parameters and perform actions
- **Functions** - Return single value, used in SELECT statements
- **Triggers** - Automatically execute in response to table events

## Stored Procedures

### Basic Syntax (MySQL)

```sql
DELIMITER //

CREATE PROCEDURE procedure_name(
    IN param1 datatype,
    OUT param2 datatype,
    INOUT param3 datatype
)
BEGIN
    -- SQL statements
END //

DELIMITER ;
```

### Simple Stored Procedure

```sql
-- Procedure without parameters
DELIMITER //

CREATE PROCEDURE get_all_employees()
BEGIN
    SELECT * FROM employees;
END //

DELIMITER ;

-- Call procedure
CALL get_all_employees();
```

### Procedures with Parameters

```sql
-- IN parameter
DELIMITER //

CREATE PROCEDURE get_employee_by_id(IN emp_id INT)
BEGIN
    SELECT *
    FROM employees
    WHERE employee_id = emp_id;
END //

DELIMITER ;

CALL get_employee_by_id(5);

-- Multiple IN parameters
DELIMITER //

CREATE PROCEDURE get_employees_by_dept_salary(
    IN dept_id INT,
    IN min_salary DECIMAL(10,2)
)
BEGIN
    SELECT employee_id, first_name, last_name, salary
    FROM employees
    WHERE department_id = dept_id
      AND salary >= min_salary
    ORDER BY salary DESC;
END //

DELIMITER ;

CALL get_employees_by_dept_salary(1, 60000);
```

### OUT Parameters

```sql
-- Return values through OUT parameters
DELIMITER //

CREATE PROCEDURE get_employee_count(
    IN dept_id INT,
    OUT emp_count INT
)
BEGIN
    SELECT COUNT(*)
    INTO emp_count
    FROM employees
    WHERE department_id = dept_id;
END //

DELIMITER ;

-- Call with user variable
CALL get_employee_count(1, @count);
SELECT @count AS employee_count;
```

### INOUT Parameters

```sql
DELIMITER //

CREATE PROCEDURE increase_salary(
    INOUT salary DECIMAL(10,2),
    IN increase_pct DECIMAL(5,2)
)
BEGIN
    SET salary = salary * (1 + increase_pct / 100);
END //

DELIMITER ;

-- Usage
SET @current_salary = 50000;
CALL increase_salary(@current_salary, 10);
SELECT @current_salary; -- 55000
```

### Control Flow Structures

```sql
-- IF statement
DELIMITER //

CREATE PROCEDURE give_bonus(
    IN emp_id INT,
    IN performance_rating INT
)
BEGIN
    DECLARE bonus_amount DECIMAL(10,2);

    IF performance_rating >= 5 THEN
        SET bonus_amount = 10000;
    ELSEIF performance_rating >= 3 THEN
        SET bonus_amount = 5000;
    ELSE
        SET bonus_amount = 1000;
    END IF;

    UPDATE employees
    SET salary = salary + bonus_amount
    WHERE employee_id = emp_id;
END //

DELIMITER ;

-- CASE statement
DELIMITER //

CREATE PROCEDURE categorize_salary(
    IN salary DECIMAL(10,2),
    OUT category VARCHAR(20)
)
BEGIN
    CASE
        WHEN salary < 50000 THEN
            SET category = 'Entry Level';
        WHEN salary < 70000 THEN
            SET category = 'Mid Level';
        WHEN salary < 90000 THEN
            SET category = 'Senior Level';
        ELSE
            SET category = 'Executive';
    END CASE;
END //

DELIMITER ;
```

### Loops

```sql
-- WHILE loop
DELIMITER //

CREATE PROCEDURE populate_numbers(IN max_num INT)
BEGIN
    DECLARE counter INT DEFAULT 1;

    WHILE counter <= max_num DO
        INSERT INTO numbers_table VALUES (counter);
        SET counter = counter + 1;
    END WHILE;
END //

DELIMITER ;

-- LOOP
DELIMITER //

CREATE PROCEDURE example_loop()
BEGIN
    DECLARE counter INT DEFAULT 0;

    my_loop: LOOP
        SET counter = counter + 1;

        IF counter = 10 THEN
            LEAVE my_loop;
        END IF;
    END LOOP;

    SELECT counter;
END //

DELIMITER ;

-- REPEAT
DELIMITER //

CREATE PROCEDURE repeat_example()
BEGIN
    DECLARE counter INT DEFAULT 0;

    REPEAT
        SET counter = counter + 1;
    UNTIL counter >= 10
    END REPEAT;

    SELECT counter;
END //

DELIMITER ;
```

### Error Handling

```sql
DELIMITER //

CREATE PROCEDURE safe_insert_employee(
    IN fname VARCHAR(50),
    IN lname VARCHAR(50),
    IN email VARCHAR(100),
    OUT result VARCHAR(100)
)
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET result = 'Error occurred during insert';
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO employees (first_name, last_name, email)
    VALUES (fname, lname, email);

    SET result = 'Employee inserted successfully';
    COMMIT;
END //

DELIMITER ;
```

### Practical Stored Procedures

```sql
-- Process order
DELIMITER //

CREATE PROCEDURE process_order(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    OUT p_order_id INT,
    OUT p_message VARCHAR(200)
)
BEGIN
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_stock INT;
    DECLARE v_total DECIMAL(10,2);

    -- Check stock
    SELECT price, stock_quantity
    INTO v_price, v_stock
    FROM products
    WHERE product_id = p_product_id;

    IF v_stock < p_quantity THEN
        SET p_message = 'Insufficient stock';
        SET p_order_id = NULL;
    ELSE
        -- Create order
        START TRANSACTION;

        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (p_customer_id, CURDATE(), v_price * p_quantity, 'Processing');

        SET p_order_id = LAST_INSERT_ID();

        -- Add order item
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES (p_order_id, p_product_id, p_quantity, v_price);

        -- Update stock
        UPDATE products
        SET stock_quantity = stock_quantity - p_quantity
        WHERE product_id = p_product_id;

        COMMIT;
        SET p_message = 'Order processed successfully';
    END IF;
END //

DELIMITER ;

-- Usage
CALL process_order(1, 5, 2, @order_id, @msg);
SELECT @order_id, @msg;
```

## Stored Functions

Return a single value, can be used in SELECT statements.

```sql
-- Create function
DELIMITER //

CREATE FUNCTION calculate_annual_salary(monthly_salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN monthly_salary * 12;
END //

DELIMITER ;

-- Use in query
SELECT
    first_name,
    salary,
    calculate_annual_salary(salary) AS annual_salary
FROM employees;

-- Function with logic
DELIMITER //

CREATE FUNCTION get_employee_grade(salary DECIMAL(10,2))
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    DECLARE grade VARCHAR(10);

    IF salary >= 80000 THEN
        SET grade = 'A';
    ELSEIF salary >= 60000 THEN
        SET grade = 'B';
    ELSEIF salary >= 40000 THEN
        SET grade = 'C';
    ELSE
        SET grade = 'D';
    END IF;

    RETURN grade;
END //

DELIMITER ;

SELECT first_name, salary, get_employee_grade(salary) AS grade
FROM employees;
```

## Triggers

Automatically execute in response to INSERT, UPDATE, or DELETE events.

### BEFORE Triggers

```sql
-- BEFORE INSERT: Validate data
DELIMITER //

CREATE TRIGGER validate_employee_salary
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be negative';
    END IF;

    IF NEW.salary > 500000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary exceeds maximum allowed';
    END IF;
END //

DELIMITER ;

-- BEFORE UPDATE: Audit changes
DELIMITER //

CREATE TRIGGER audit_salary_changes
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary != OLD.salary THEN
        INSERT INTO salary_audit_log (
            employee_id,
            old_salary,
            new_salary,
            changed_date,
            changed_by
        ) VALUES (
            OLD.employee_id,
            OLD.salary,
            NEW.salary,
            NOW(),
            USER()
        );
    END IF;
END //

DELIMITER ;
```

### AFTER Triggers

```sql
-- AFTER INSERT: Update related data
DELIMITER //

CREATE TRIGGER update_dept_count
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    UPDATE departments
    SET employee_count = employee_count + 1
    WHERE department_id = NEW.department_id;
END //

DELIMITER ;

-- AFTER DELETE: Archive data
DELIMITER //

CREATE TRIGGER archive_deleted_employee
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employees_archive
    SELECT *, NOW() AS archived_date
    FROM (SELECT OLD.*) AS old_record;
END //

DELIMITER ;

-- AFTER UPDATE: Update timestamp
DELIMITER //

CREATE TRIGGER update_modified_timestamp
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    UPDATE products
    SET updated_at = NOW()
    WHERE product_id = NEW.product_id;
END //

DELIMITER ;
```

### Practical Trigger Examples

```sql
-- Inventory management
DELIMITER //

CREATE TRIGGER check_stock_on_order
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    DECLARE available_stock INT;

    SELECT stock_quantity INTO available_stock
    FROM products
    WHERE product_id = NEW.product_id;

    IF available_stock < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock for order';
    END IF;
END //

DELIMITER ;

-- Auto-calculate order total
DELIMITER //

CREATE TRIGGER calculate_order_total
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END //

DELIMITER ;
```

## Managing Procedures, Functions, and Triggers

```sql
-- List stored procedures
SHOW PROCEDURE STATUS WHERE Db = 'your_database';

-- List functions
SHOW FUNCTION STATUS WHERE Db = 'your_database';

-- List triggers
SHOW TRIGGERS;

-- View procedure definition
SHOW CREATE PROCEDURE procedure_name;

-- Drop procedure
DROP PROCEDURE IF EXISTS procedure_name;

-- Drop function
DROP FUNCTION IF EXISTS function_name;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_name;
```

## Practice Exercises

### Exercise 1: Basic Procedures
```sql
-- 1. Procedure to get all products in category
-- 2. Procedure to count employees by department
-- 3. Procedure to get orders by customer
-- 4. Procedure with multiple parameters
-- 5. Call procedures and verify results
```

### Exercise 2: Procedures with OUT Parameters
```sql
-- 1. Get total revenue (OUT parameter)
-- 2. Get min/max/avg salary (multiple OUT)
-- 3. Check if email exists (boolean OUT)
-- 4. Get product count by category
-- 5. Return customer statistics
```

### Exercise 3: Business Logic Procedures
```sql
-- 1. Create new customer with validation
-- 2. Process product return
-- 3. Apply discount to category
-- 4. Transfer employee between departments
-- 5. Complete order workflow
```

### Exercise 4: Stored Functions
```sql
-- 1. Calculate discount based on quantity
-- 2. Get days since hire
-- 3. Format currency
-- 4. Calculate tax
-- 5. Get customer tier
```

### Exercise 5: BEFORE Triggers
```sql
-- 1. Validate email format before insert
-- 2. Prevent negative prices
-- 3. Auto-uppercase certain fields
-- 4. Check business rules
-- 5. Set default values
```

### Exercise 6: AFTER Triggers
```sql
-- 1. Update counts after insert
-- 2. Log changes to audit table
-- 3. Send notification (log entry)
-- 4. Cascade updates
-- 5. Maintain summary tables
```

### Exercise 7: Error Handling
```sql
-- 1. Handle constraint violations
-- 2. Rollback on error
-- 3. Custom error messages
-- 4. Try-catch equivalent
-- 5. Graceful degradation
```

### Exercise 8: Complex Workflows
```sql
-- 1. Multi-step order processing
-- 2. Employee onboarding workflow
-- 3. Inventory restock process
-- 4. Month-end closing procedure
-- 5. Data migration procedure
```

### Exercise 9: Maintenance Procedures
```sql
-- 1. Archive old records
-- 2. Clean up orphaned data
-- 3. Rebuild statistics
-- 4. Generate reports
-- 5. Data validation checks
```

### Exercise 10: Real-World Applications
```sql
-- 1. User authentication procedure
-- 2. Shopping cart management
-- 3. Inventory adjustment with audit
-- 4. Billing cycle processing
-- 5. Performance analytics
```

## Best Practices

### 1. Use Meaningful Names
```sql
-- ✅ Good
CREATE PROCEDURE calculate_employee_bonus(...)

-- ❌ Bad
CREATE PROCEDURE proc1(...)
```

### 2. Document Parameters
```sql
DELIMITER //

-- Get employees by department and salary range
-- Parameters:
--   IN dept_id: Department ID to filter
--   IN min_sal: Minimum salary threshold
--   OUT count: Number of employees found
CREATE PROCEDURE get_dept_employees(
    IN dept_id INT,
    IN min_sal DECIMAL(10,2),
    OUT count INT
)
BEGIN
    ...
END //

DELIMITER ;
```

### 3. Handle Errors
```sql
-- ✅ Use handlers
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    -- Log error
END;
```

### 4. Use Transactions
```sql
-- ✅ Wrap modifications in transactions
START TRANSACTION;
-- modifications
COMMIT;
```

### 5. Keep Logic Simple
```sql
-- ❌ Don't put entire application in stored procedure
-- ✅ Use procedures for database operations only
```

## Performance Tips

1. **Compile once, execute many** - Procedures are pre-compiled
2. **Reduce network traffic** - Multiple statements in one call
3. **Use appropriate parameter modes** - IN, OUT, INOUT
4. **Avoid cursors** - Use set-based operations instead
5. **Index appropriately** - Procedures still need good indexes

## Common Mistakes

1. **Overusing procedures** - Not everything needs a procedure
2. **Complex business logic** - Keep in application layer
3. **Poor error handling** - Always handle errors
4. **Not using transactions** - Data integrity issues
5. **Tight coupling** - Procedures depend on specific schema
6. **No documentation** - Purpose unclear
7. **Ignoring security** - SQL injection in dynamic SQL

## Next Steps

- **[04-Transactions](../04-Transactions/README.md)** - Ensure data consistency

## Summary

- Stored procedures are reusable SQL code blocks
- Functions return single values for use in queries
- Triggers automatically respond to table events
- Use parameters (IN, OUT, INOUT) for flexibility
- Handle errors with DECLARE HANDLER
- Wrap modifications in transactions
- Document procedure purpose and parameters
- Great for encapsulating business logic

---

**Use procedures wisely**: Excellent for data operations, not entire applications!
