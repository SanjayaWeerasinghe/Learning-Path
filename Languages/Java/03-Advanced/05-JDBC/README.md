# JDBC - Java Database Connectivity

## What You'll Learn
- Understanding JDBC and database connections
- Connecting to databases
- Executing SQL queries
- CRUD operations (Create, Read, Update, Delete)
- PreparedStatement vs Statement
- ResultSet processing
- Exception handling in JDBC
- Connection pooling basics

## Concept Overview

JDBC (Java Database Connectivity) is an API that allows Java applications to interact with databases.

### 1. JDBC Connection Steps

```java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        // 1. Load driver (optional in newer versions)
        // Class.forName("com.mysql.cj.jdbc.Driver");

        // 2. Establish connection
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connected to database!");

            // 3. Create statement
            Statement stmt = conn.createStatement();

            // 4. Execute query
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            // 5. Process results
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Name: " + rs.getString("name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### 2. Creating Tables

```java
String createTableSQL = "CREATE TABLE IF NOT EXISTS students (" +
                       "id INT PRIMARY KEY AUTO_INCREMENT, " +
                       "name VARCHAR(100), " +
                       "age INT, " +
                       "grade DOUBLE)";

try (Connection conn = DriverManager.getConnection(url, user, password);
     Statement stmt = conn.createStatement()) {

    stmt.executeUpdate(createTableSQL);
    System.out.println("Table created successfully!");

} catch (SQLException e) {
    e.printStackTrace();
}
```

### 3. Insert Data

```java
// Using Statement (not recommended - SQL injection risk)
String insertSQL = "INSERT INTO students (name, age, grade) " +
                  "VALUES ('John Doe', 20, 85.5)";
stmt.executeUpdate(insertSQL);

// Using PreparedStatement (recommended)
String insertSQL = "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {

    pstmt.setString(1, "John Doe");
    pstmt.setInt(2, 20);
    pstmt.setDouble(3, 85.5);

    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) inserted");

} catch (SQLException e) {
    e.printStackTrace();
}
```

### 4. Select Data

```java
String selectSQL = "SELECT * FROM students WHERE age > ?";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement pstmt = conn.prepareStatement(selectSQL)) {

    pstmt.setInt(1, 18);
    ResultSet rs = pstmt.executeQuery();

    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        int age = rs.getInt("age");
        double grade = rs.getDouble("grade");

        System.out.println("ID: " + id + ", Name: " + name +
                          ", Age: " + age + ", Grade: " + grade);
    }

} catch (SQLException e) {
    e.printStackTrace();
}
```

### 5. Update Data

```java
String updateSQL = "UPDATE students SET grade = ? WHERE id = ?";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement pstmt = conn.prepareStatement(updateSQL)) {

    pstmt.setDouble(1, 90.0);
    pstmt.setInt(2, 1);

    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) updated");

} catch (SQLException e) {
    e.printStackTrace();
}
```

### 6. Delete Data

```java
String deleteSQL = "DELETE FROM students WHERE id = ?";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {

    pstmt.setInt(1, 1);

    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) deleted");

} catch (SQLException e) {
    e.printStackTrace();
}
```

### 7. Transaction Management

```java
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    conn.setAutoCommit(false);  // Start transaction

    try {
        // Execute multiple queries
        Statement stmt = conn.createStatement();
        stmt.executeUpdate("INSERT INTO accounts VALUES (1, 1000)");
        stmt.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");

        conn.commit();  // Commit transaction
        System.out.println("Transaction committed");

    } catch (SQLException e) {
        conn.rollback();  // Rollback on error
        System.out.println("Transaction rolled back");
        e.printStackTrace();
    }

} catch (SQLException e) {
    e.printStackTrace();
}
```

## Your Tasks

### Task 1: Database Connection
Create a file named `DatabaseConnection.java`.

**Example code:**
```java
import java.sql.*;

public class DatabaseConnection {
    public static void main(String[] args) {
        // SQLite example (no server needed)
        String url = "jdbc:sqlite:test.db";

        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                System.out.println("Connection to SQLite established!");

                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("Driver name: " + meta.getDriverName());
                System.out.println("Driver version: " + meta.getDriverVersion());
            }
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}
```

**Note**: For this example, you need SQLite JDBC driver. Add to your project:
```
sqlite-jdbc-3.x.x.jar
```

### Task 2-12: JDBC Operations

Practice with:
- **Task 2**: Create table
- **Task 3**: Insert multiple records
- **Task 4**: Select and display all records
- **Task 5**: Update specific records
- **Task 6**: Delete records with condition
- **Task 7**: Count records
- **Task 8**: Search with LIKE operator
- **Task 9**: Transaction example
- **Task 10**: Batch insert operations
- **Task 11**: Student management system (CRUD)
- **Task 12**: Connection pooling basics

## Setup Instructions

### For MySQL:
1. Install MySQL server
2. Add MySQL JDBC driver to project:
```xml
<!-- Maven dependency -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

3. Connection URL:
```java
String url = "jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC";
```

### For SQLite (Easier for learning):
1. Add SQLite JDBC driver
2. Connection URL:
```java
String url = "jdbc:sqlite:mydb.db";
```

## Tips and Common Mistakes

### Tips:
- **Always use PreparedStatement**: Prevents SQL injection
- **Use try-with-resources**: Auto-closes connections
- **Handle SQLException**: Properly catch and handle errors
- **Close resources**: Connection, Statement, ResultSet
- **Use connection pooling**: For production applications
- **Parameterize queries**: Never concatenate user input into SQL

### Common Mistakes:

1. **SQL Injection vulnerability**
   ```java
   // ❌ Vulnerable to SQL injection
   String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";

   // ✅ Safe with PreparedStatement
   String sql = "SELECT * FROM users WHERE name = ?";
   pstmt.setString(1, userInput);
   ```

2. **Not closing connections**
   ```java
   Connection conn = DriverManager.getConnection(url);
   // ... use connection
   // ❌ Connection not closed

   try (Connection conn = DriverManager.getConnection(url)) {
       // ... use connection
   }  // ✅ Auto-closed
   ```

3. **Wrong ResultSet column access**
   ```java
   rs.getString(0);  // ❌ Columns start from 1, not 0
   rs.getString(1);  // ✅ Correct
   rs.getString("name");  // ✅ Also correct (by column name)
   ```

4. **Not checking ResultSet before reading**
   ```java
   ResultSet rs = stmt.executeQuery(sql);
   rs.getString("name");  // ❌ Must call rs.next() first

   if (rs.next()) {
       rs.getString("name");  // ✅ Correct
   }
   ```

5. **Forgetting to commit transactions**
   ```java
   conn.setAutoCommit(false);
   stmt.executeUpdate(sql);
   // ❌ Missing commit
   conn.commit();  // ✅ Must commit
   ```

## Best Practices

1. **Use Connection Pooling**
```java
// HikariCP example
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
config.setUsername("user");
config.setPassword("password");

HikariDataSource ds = new HikariDataSource(config);
Connection conn = ds.getConnection();
```

2. **Separate Database Logic**
```java
public class StudentDAO {
    public void insertStudent(Student student) {
        String sql = "INSERT INTO students (name, age) VALUES (?, ?)";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, student.getName());
            pstmt.setInt(2, student.getAge());
            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## Next Steps

Congratulations! You've completed the Java learning path from basics to advanced topics. You're now ready to:

- Build complete Java applications
- Work with databases using JDBC
- Develop web applications with Spring Boot
- Explore frameworks like Hibernate for ORM
- Build RESTful APIs
- Contribute to Java projects

## Additional Learning Resources

- **Spring Framework**: For enterprise Java applications
- **Hibernate/JPA**: Object-Relational Mapping
- **Maven/Gradle**: Build tools
- **JUnit**: Unit testing
- **Design Patterns**: Improve code architecture

Keep practicing and building projects! 🚀
