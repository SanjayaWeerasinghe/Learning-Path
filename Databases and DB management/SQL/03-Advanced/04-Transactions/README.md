# Transactions

## What is a Transaction?

A transaction is a sequence of one or more SQL operations treated as a single unit of work. Either all operations succeed (commit) or all fail (rollback).

## ACID Properties

### 1. Atomicity
All operations in a transaction succeed or all fail.

```sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Either both updates happen or neither happens
COMMIT;
```

### 2. Consistency
Database remains in a valid state before and after transaction.

```sql
-- Ensures total money in system doesn't change
BEGIN TRANSACTION;

DECLARE @balance1 DECIMAL(10,2);
DECLARE @balance2 DECIMAL(10,2);

SELECT @balance1 = balance FROM accounts WHERE account_id = 1;
SELECT @balance2 = balance FROM accounts WHERE account_id = 2;

-- Transfer only if sufficient balance
IF @balance1 >= 100
BEGIN
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
    COMMIT;
END
ELSE
BEGIN
    ROLLBACK;
END
```

### 3. Isolation
Concurrent transactions don't interfere with each other.

### 4. Durability
Once committed, changes are permanent even if system crashes.

## Transaction Control Commands

### BEGIN TRANSACTION
```sql
BEGIN TRANSACTION;
-- or
START TRANSACTION; -- MySQL
```

### COMMIT
```sql
BEGIN TRANSACTION;

INSERT INTO orders (customer_id, order_date, total_amount)
VALUES (101, GETDATE(), 250.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (SCOPE_IDENTITY(), 5, 2, 125.00);

COMMIT; -- Make changes permanent
```

### ROLLBACK
```sql
BEGIN TRANSACTION;

UPDATE products SET stock_quantity = stock_quantity - 10
WHERE product_id = 5;

-- Something went wrong
IF @@ERROR <> 0
BEGIN
    ROLLBACK; -- Undo all changes
END
ELSE
BEGIN
    COMMIT;
END
```

### SAVEPOINT
```sql
BEGIN TRANSACTION;

UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;

SAVEPOINT after_dept1;

UPDATE employees SET salary = salary * 1.1 WHERE department_id = 2;

-- Rollback only department 2 changes
ROLLBACK TO SAVEPOINT after_dept1;

COMMIT; -- Only department 1 changes committed
```

## Isolation Levels

### 1. READ UNCOMMITTED
Lowest isolation, allows dirty reads.

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

BEGIN TRANSACTION;

SELECT balance FROM accounts WHERE account_id = 1;
-- Can see uncommitted changes from other transactions

COMMIT;
```

**Issues**: Dirty reads, non-repeatable reads, phantom reads

### 2. READ COMMITTED (Default)
Prevents dirty reads.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN TRANSACTION;

-- Only sees committed data
SELECT balance FROM accounts WHERE account_id = 1;

COMMIT;
```

**Issues**: Non-repeatable reads, phantom reads

### 3. REPEATABLE READ
Prevents dirty and non-repeatable reads.

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

BEGIN TRANSACTION;

SELECT balance FROM accounts WHERE account_id = 1;
-- Reading again gives same result even if other transactions committed

SELECT balance FROM accounts WHERE account_id = 1;

COMMIT;
```

**Issues**: Phantom reads

### 4. SERIALIZABLE
Highest isolation, prevents all concurrency issues.

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN TRANSACTION;

SELECT COUNT(*) FROM employees WHERE department_id = 1;
-- No new rows can be inserted by other transactions

SELECT COUNT(*) FROM employees WHERE department_id = 1;
-- Guaranteed same count

COMMIT;
```

**Issues**: Performance (locks more resources)

## Concurrency Problems

### Dirty Read
Transaction reads uncommitted data from another transaction.

```sql
-- Transaction 1
BEGIN TRANSACTION;
UPDATE accounts SET balance = 1000 WHERE account_id = 1;
-- Not committed yet

-- Transaction 2 (READ UNCOMMITTED)
SELECT balance FROM accounts WHERE account_id = 1; -- Sees 1000

-- Transaction 1
ROLLBACK; -- Balance reverts

-- Transaction 2 read dirty data (1000 instead of original)
```

### Non-Repeatable Read
Same query returns different results within a transaction.

```sql
-- Transaction 1
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1; -- Returns 500

-- Transaction 2
UPDATE accounts SET balance = 1000 WHERE account_id = 1;
COMMIT;

-- Transaction 1
SELECT balance FROM accounts WHERE account_id = 1; -- Returns 1000!
COMMIT;
```

### Phantom Read
Same query returns different number of rows.

```sql
-- Transaction 1
BEGIN TRANSACTION;
SELECT COUNT(*) FROM employees WHERE salary > 50000; -- Returns 10

-- Transaction 2
INSERT INTO employees (employee_id, salary) VALUES (999, 60000);
COMMIT;

-- Transaction 1
SELECT COUNT(*) FROM employees WHERE salary > 50000; -- Returns 11!
COMMIT;
```

## Locking

### Shared Lock (Read Lock)
Multiple transactions can read, but none can write.

```sql
SELECT * FROM products WITH (HOLDLOCK) WHERE product_id = 1;
```

### Exclusive Lock (Write Lock)
Only one transaction can access the resource.

```sql
UPDATE products SET price = 99.99 WHERE product_id = 1;
-- Exclusive lock held until transaction completes
```

### Deadlock
Two transactions waiting for each other's locks.

```sql
-- Transaction 1
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- Waiting for lock on account 2

-- Transaction 2
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- Waiting for lock on account 1

-- DEADLOCK! One transaction will be rolled back
```

**Prevention**:
- Access resources in same order
- Keep transactions short
- Use appropriate isolation level
- Set deadlock timeout

```sql
SET LOCK_TIMEOUT 5000; -- 5 seconds
```

## Practical Examples

### Bank Transfer
```sql
CREATE PROCEDURE TransferMoney
    @FromAccount INT,
    @ToAccount INT,
    @Amount DECIMAL(10,2)
AS
BEGIN
    BEGIN TRANSACTION;

    DECLARE @FromBalance DECIMAL(10,2);

    -- Check sufficient balance
    SELECT @FromBalance = balance
    FROM accounts WITH (UPDLOCK)
    WHERE account_id = @FromAccount;

    IF @FromBalance < @Amount
    BEGIN
        ROLLBACK;
        RAISERROR('Insufficient balance', 16, 1);
        RETURN;
    END

    -- Perform transfer
    UPDATE accounts SET balance = balance - @Amount
    WHERE account_id = @FromAccount;

    UPDATE accounts SET balance = balance + @Amount
    WHERE account_id = @ToAccount;

    -- Log transaction
    INSERT INTO transaction_log (from_account, to_account, amount, transaction_date)
    VALUES (@FromAccount, @ToAccount, @Amount, GETDATE());

    COMMIT;
END
```

### Order Processing
```sql
CREATE PROCEDURE ProcessOrder
    @CustomerId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @OrderId INT;
        DECLARE @UnitPrice DECIMAL(10,2);
        DECLARE @Stock INT;

        -- Check stock
        SELECT @Stock = stock_quantity, @UnitPrice = price
        FROM products WITH (UPDLOCK)
        WHERE product_id = @ProductId;

        IF @Stock < @Quantity
        BEGIN
            RAISERROR('Insufficient stock', 16, 1);
            RETURN;
        END

        -- Create order
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (@CustomerId, GETDATE(), @UnitPrice * @Quantity, 'Pending');

        SET @OrderId = SCOPE_IDENTITY();

        -- Add order items
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES (@OrderId, @ProductId, @Quantity, @UnitPrice);

        -- Update stock
        UPDATE products SET stock_quantity = stock_quantity - @Quantity
        WHERE product_id = @ProductId;

        COMMIT;

        SELECT @OrderId AS OrderId;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
```

### Batch Processing with Savepoints
```sql
BEGIN TRANSACTION;

DECLARE @ErrorCount INT = 0;

-- Process batch 1
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;
IF @@ERROR <> 0 SET @ErrorCount = @ErrorCount + 1;

SAVEPOINT batch1;

-- Process batch 2
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 2;
IF @@ERROR <> 0
BEGIN
    ROLLBACK TO SAVEPOINT batch1;
    SET @ErrorCount = @ErrorCount + 1;
END

SAVEPOINT batch2;

-- Process batch 3
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 3;
IF @@ERROR <> 0
BEGIN
    ROLLBACK TO SAVEPOINT batch2;
    SET @ErrorCount = @ErrorCount + 1;
END

IF @ErrorCount = 0
    COMMIT;
ELSE
    ROLLBACK;
```

## Transaction Best Practices

1. **Keep transactions short**
```sql
-- Bad: Long transaction
BEGIN TRANSACTION;
SELECT * FROM large_table; -- Expensive query
UPDATE accounts SET balance = balance + 1;
COMMIT;

-- Good: Minimal transaction
SELECT * FROM large_table; -- Outside transaction

BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 1;
COMMIT;
```

2. **Avoid user interaction in transactions**
```sql
-- Bad
BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1;
-- Waiting for user confirmation...
COMMIT;

-- Good
-- Get user confirmation first
BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1;
COMMIT;
```

3. **Handle errors properly**
```sql
BEGIN TRY
    BEGIN TRANSACTION;

    -- Operations
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK;

    -- Log error
    INSERT INTO error_log (error_message, error_date)
    VALUES (ERROR_MESSAGE(), GETDATE());

    THROW;
END CATCH
```

4. **Use appropriate isolation level**
```sql
-- Don't always use SERIALIZABLE
-- Use minimum isolation needed

-- For reporting (stale data acceptable)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- For financial transactions
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## Monitoring Transactions

```sql
-- Active transactions
SELECT * FROM sys.dm_tran_active_transactions;

-- Transaction locks
SELECT * FROM sys.dm_tran_locks;

-- Blocking transactions
SELECT blocking_session_id, wait_type, wait_time, wait_resource
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;

-- Kill blocking session
KILL 52; -- session_id
```

## Interview Tips

- Explain ACID properties clearly
- Know isolation levels and their issues
- Understand difference between COMMIT and ROLLBACK
- Discuss deadlock prevention strategies
- Know when to use transactions
- Understand locking mechanisms
- Explain transaction log role

## Common Mistakes

1. Not handling errors in transactions
2. Keeping transactions open too long
3. Using wrong isolation level
4. Not using BEGIN/COMMIT explicitly
5. Deadlock-prone resource access patterns
6. Reading uncommitted data unintentionally

## Key Takeaways

1. Transactions ensure data integrity (ACID)
2. Always handle errors with TRY/CATCH
3. Keep transactions short to reduce locking
4. Choose appropriate isolation level
5. Savepoints allow partial rollback
6. Monitor for deadlocks and blocking
7. Test transaction logic thoroughly
