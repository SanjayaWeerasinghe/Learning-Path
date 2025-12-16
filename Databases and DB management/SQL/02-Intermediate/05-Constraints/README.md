# SQL Constraints

## Overview

Constraints enforce rules on data in tables. They ensure data accuracy, integrity, and reliability.

## Types of Constraints

1. **PRIMARY KEY** - Unique identifier for rows
2. **FOREIGN KEY** - Enforces relationship between tables
3. **UNIQUE** - Ensures all values are different
4. **NOT NULL** - Prevents NULL values
5. **CHECK** - Validates data based on condition
6. **DEFAULT** - Sets default value when none provided

## PRIMARY KEY Constraint

Uniquely identifies each row. Cannot be NULL. Table can have only one PRIMARY KEY.

### Creating PRIMARY KEY

```sql
-- During table creation (single column)
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- Alternative syntax
CREATE TABLE employees (
    employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    PRIMARY KEY (employee_id)
);

-- Composite primary key (multiple columns)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- With AUTO_INCREMENT
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10, 2)
);
```

### Adding/Dropping PRIMARY KEY

```sql
-- Add PRIMARY KEY to existing table
ALTER TABLE employees
ADD PRIMARY KEY (employee_id);

-- Drop PRIMARY KEY
ALTER TABLE employees
DROP PRIMARY KEY;

-- Drop and recreate
ALTER TABLE employees
DROP PRIMARY KEY,
ADD PRIMARY KEY (employee_id);
```

## FOREIGN KEY Constraint

Enforces referential integrity. Links two tables together.

### Creating FOREIGN KEY

```sql
-- During table creation
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Named constraint
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

-- Multiple foreign keys
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- With referential actions
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### Referential Actions

```sql
-- CASCADE: Delete/update child rows automatically
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- SET NULL: Set child column to NULL
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
        ON DELETE SET NULL
);

-- RESTRICT/NO ACTION: Prevent delete/update if children exist
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON DELETE RESTRICT
);

-- SET DEFAULT: Set to default value (not widely supported)
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    category_id INT DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE SET DEFAULT
);
```

### Adding/Dropping FOREIGN KEY

```sql
-- Add FOREIGN KEY to existing table
ALTER TABLE orders
ADD CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id);

-- Drop FOREIGN KEY
ALTER TABLE orders
DROP FOREIGN KEY fk_customer;

-- Drop and recreate
ALTER TABLE orders
DROP FOREIGN KEY fk_customer,
ADD CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
    ON DELETE CASCADE;
```

## UNIQUE Constraint

Ensures all values in column are different. Allows one NULL (unlike PRIMARY KEY).

### Creating UNIQUE

```sql
-- During table creation
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

-- Named constraint
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    email VARCHAR(100),
    CONSTRAINT uq_email UNIQUE (email)
);

-- Multiple columns (combination must be unique)
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    UNIQUE (first_name, last_name)
);

-- Multiple UNIQUE constraints
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_code VARCHAR(20) UNIQUE,
    barcode VARCHAR(50) UNIQUE,
    product_name VARCHAR(100)
);
```

### Adding/Dropping UNIQUE

```sql
-- Add UNIQUE to existing table
ALTER TABLE customers
ADD UNIQUE (email);

-- Add named UNIQUE constraint
ALTER TABLE customers
ADD CONSTRAINT uq_email UNIQUE (email);

-- Drop UNIQUE
ALTER TABLE customers
DROP INDEX uq_email;

-- MySQL specific
ALTER TABLE customers
DROP INDEX email;
```

## NOT NULL Constraint

Prevents NULL values in column.

### Creating NOT NULL

```sql
-- During table creation
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20)  -- Allows NULL
);

-- All columns NOT NULL
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    budget DECIMAL(15, 2) NOT NULL
);
```

### Adding/Dropping NOT NULL

```sql
-- Add NOT NULL to existing table
ALTER TABLE employees
MODIFY COLUMN phone VARCHAR(20) NOT NULL;

-- Remove NOT NULL
ALTER TABLE employees
MODIFY COLUMN phone VARCHAR(20) NULL;

-- MySQL: Change to NOT NULL (ensure no NULLs first)
UPDATE employees SET phone = 'Unknown' WHERE phone IS NULL;
ALTER TABLE employees
MODIFY COLUMN phone VARCHAR(20) NOT NULL;
```

## CHECK Constraint

Validates data based on boolean condition.

### Creating CHECK

```sql
-- During table creation
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 18),
    salary DECIMAL(10, 2) CHECK (salary > 0)
);

-- Named CHECK constraint
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INT,
    CONSTRAINT chk_price CHECK (price >= 0),
    CONSTRAINT chk_stock CHECK (stock_quantity >= 0)
);

-- Multiple conditions
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    delivery_date DATE,
    total_amount DECIMAL(10, 2),
    CHECK (delivery_date >= order_date),
    CHECK (total_amount > 0)
);

-- Complex CHECK constraint
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    job_title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT,
    CHECK (
        (job_title = 'Manager' AND salary >= 60000) OR
        (job_title != 'Manager' AND salary >= 30000)
    )
);

-- CHECK with IN
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    status VARCHAR(20),
    CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'))
);
```

### Adding/Dropping CHECK

```sql
-- Add CHECK to existing table
ALTER TABLE employees
ADD CONSTRAINT chk_age CHECK (age >= 18);

-- Drop CHECK constraint
ALTER TABLE employees
DROP CHECK chk_age;

-- MySQL: Drop constraint
ALTER TABLE employees
DROP CONSTRAINT chk_age;
```

## DEFAULT Constraint

Sets default value when no value is provided.

### Creating DEFAULT

```sql
-- During table creation
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE DEFAULT (CURRENT_DATE),
    status VARCHAR(20) DEFAULT 'Pending',
    total_amount DECIMAL(10, 2) DEFAULT 0
);

-- Multiple DEFAULT values
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DEFAULT with functions
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    hire_date DATE DEFAULT (CURRENT_DATE),
    country VARCHAR(50) DEFAULT 'USA',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Adding/Dropping DEFAULT

```sql
-- Add DEFAULT to existing column
ALTER TABLE products
ALTER COLUMN stock_quantity SET DEFAULT 0;

-- Remove DEFAULT
ALTER TABLE products
ALTER COLUMN stock_quantity DROP DEFAULT;

-- MySQL syntax
ALTER TABLE products
MODIFY COLUMN stock_quantity INT DEFAULT 0;
```

## Combining Multiple Constraints

```sql
-- Comprehensive table with all constraint types
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    hire_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    manager_id INT,
    is_active BOOLEAN DEFAULT TRUE,

    -- PRIMARY KEY
    PRIMARY KEY (employee_id),

    -- UNIQUE constraints
    UNIQUE (email),

    -- FOREIGN KEY constraints
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (manager_id)
        REFERENCES employees(employee_id)
        ON DELETE SET NULL,

    -- CHECK constraints
    CONSTRAINT chk_salary CHECK (salary > 0),
    CONSTRAINT chk_hire_date CHECK (hire_date <= CURRENT_DATE)
);

-- Complete product table example
CREATE TABLE products (
    product_id INT AUTO_INCREMENT,
    product_code VARCHAR(20) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    reorder_level INT DEFAULT 10,
    supplier_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (product_id),
    UNIQUE (product_code),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),

    CHECK (price > cost),
    CHECK (price > 0),
    CHECK (cost >= 0),
    CHECK (stock_quantity >= 0),
    CHECK (reorder_level >= 0),
    CHECK (category IN ('Electronics', 'Furniture', 'Clothing', 'Books'))
);
```

## Practical Examples

### Example 1: E-commerce System
```sql
-- Customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (email LIKE '%@%'),
    CHECK (LENGTH(password_hash) >= 8)
);

-- Orders with constraints
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ship_date DATE,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Pending',

    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE RESTRICT,

    CHECK (total_amount >= 0),
    CHECK (ship_date IS NULL OR ship_date >= DATE(order_date)),
    CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'))
);
```

### Example 2: HR System
```sql
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(10) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    hire_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    termination_date DATE,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    manager_id INT,

    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
        ON DELETE SET NULL,

    CHECK (salary > 0),
    CHECK (salary <= 500000),
    CHECK (birth_date < hire_date),
    CHECK (termination_date IS NULL OR termination_date >= hire_date),
    CHECK (TIMESTAMPDIFF(YEAR, birth_date, hire_date) >= 18)
);
```

## Practice Exercises

### Exercise 1: PRIMARY KEY
```sql
-- 1. Create table with single-column PK
-- 2. Create table with composite PK
-- 3. Add PK to existing table
-- 4. Create table with AUTO_INCREMENT PK
-- 5. Drop and recreate PK
```

### Exercise 2: FOREIGN KEY
```sql
-- 1. Create FK relationship between two tables
-- 2. Create FK with ON DELETE CASCADE
-- 3. Create FK with ON DELETE SET NULL
-- 4. Create table with multiple FKs
-- 5. Add FK to existing table
```

### Exercise 3: UNIQUE Constraint
```sql
-- 1. Create table with UNIQUE email
-- 2. Create composite UNIQUE constraint
-- 3. Add UNIQUE to existing column
-- 4. Create table with multiple UNIQUE constraints
-- 5. Test UNIQUE with NULL values
```

### Exercise 4: NOT NULL
```sql
-- 1. Create table with NOT NULL columns
-- 2. Add NOT NULL to existing column
-- 3. Remove NOT NULL from column
-- 4. Handle existing NULLs before adding NOT NULL
-- 5. Combine NOT NULL with other constraints
```

### Exercise 5: CHECK Constraints
```sql
-- 1. Create CHECK for positive numbers
-- 2. Create CHECK for date range
-- 3. Create CHECK with IN clause
-- 4. Create complex CHECK with OR/AND
-- 5. Add CHECK to existing table
```

### Exercise 6: DEFAULT Values
```sql
-- 1. Set DEFAULT for timestamp
-- 2. Set DEFAULT for status field
-- 3. Set DEFAULT for numeric field
-- 4. Use CURRENT_DATE as DEFAULT
-- 5. Modify DEFAULT on existing column
```

### Exercise 7: Combined Constraints
```sql
-- 1. Create table with PK, FK, UNIQUE, NOT NULL
-- 2. Create table with all constraint types
-- 3. Add multiple constraints to existing table
-- 4. Create self-referencing FK (employee-manager)
-- 5. Create order system with full constraints
```

### Exercise 8: Referential Actions
```sql
-- 1. Test CASCADE delete
-- 2. Test SET NULL on delete
-- 3. Test RESTRICT behavior
-- 4. Test CASCADE update
-- 5. Compare different referential actions
```

### Exercise 9: Constraint Validation
```sql
-- 1. Test CHECK constraint violations
-- 2. Test UNIQUE constraint violations
-- 3. Test FK constraint violations
-- 4. Test NOT NULL violations
-- 5. Handle constraint errors gracefully
```

### Exercise 10: Real-World Schemas
```sql
-- 1. Design complete e-commerce schema with constraints
-- 2. Design HR system with all constraints
-- 3. Design library system with constraints
-- 4. Design inventory system with validation
-- 5. Design booking system with business rules
```

## Best Practices

### 1. Always Use PRIMARY KEY
```sql
-- ✅ Every table should have a PK
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100)
);
```

### 2. Use FOREIGN KEY for Relationships
```sql
-- ✅ Enforce referential integrity
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 3. Name Your Constraints
```sql
-- ✅ Named constraints are easier to manage
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id);
```

### 4. Use CHECK for Business Rules
```sql
-- ✅ Enforce business logic at database level
CREATE TABLE products (
    price DECIMAL(10, 2),
    cost DECIMAL(10, 2),
    CHECK (price > cost)
);
```

### 5. Document Constraints
```sql
-- ✅ Comment complex constraints
-- Ensures employees are at least 18 at hire date
ALTER TABLE employees
ADD CONSTRAINT chk_min_age
    CHECK (TIMESTAMPDIFF(YEAR, birth_date, hire_date) >= 18);
```

## Performance Tips

1. **Index foreign keys** - Improves JOIN performance
2. **Don't over-constrain** - Balance integrity with flexibility
3. **Use CHECK sparingly** - Can slow INSERT/UPDATE
4. **Consider triggers** - For complex validation
5. **Test constraint impact** - Measure performance with constraints

## Common Mistakes

1. **No PRIMARY KEY** - Every table needs one
2. **Missing FOREIGN KEYs** - Lost referential integrity
3. **Not naming constraints** - Hard to modify later
4. **Overly restrictive CHECKs** - Blocks valid data
5. **Forgetting NULLs** - UNIQUE allows NULLs
6. **Wrong referential action** - CASCADE can delete too much

## Next Steps

You've completed Intermediate SQL! Proceed to Advanced:
- **[Advanced/01-Indexes](../../Advanced/01-Indexes/README.md)** - Optimize query performance

## Summary

- Constraints enforce data integrity
- PRIMARY KEY uniquely identifies rows
- FOREIGN KEY enforces relationships
- UNIQUE prevents duplicates
- NOT NULL prevents missing data
- CHECK validates business rules
- DEFAULT provides fallback values

---

**Use constraints wisely**: They protect data quality but can impact performance!
