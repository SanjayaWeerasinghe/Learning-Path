# File I/O - Reading and Writing Files

## What You'll Learn
- Reading from files
- Writing to files
- File and Path classes
- BufferedReader and BufferedWriter
- Scanner for file reading
- Try-with-resources for file operations
- Working with directories

## Concept Overview

Java provides multiple ways to read from and write to files, from simple to advanced approaches.

### 1. Writing to a File

```java
import java.io.*;

// Using FileWriter
try (FileWriter writer = new FileWriter("output.txt")) {
    writer.write("Hello, World!\n");
    writer.write("This is a file.");
} catch (IOException e) {
    e.printStackTrace();
}

// Using BufferedWriter (more efficient)
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Line 1");
    writer.newLine();
    writer.write("Line 2");
} catch (IOException e) {
    e.printStackTrace();
}
```

### 2. Reading from a File

```java
import java.io.*;
import java.util.Scanner;

// Using Scanner
try (Scanner scanner = new Scanner(new File("input.txt"))) {
    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
}

// Using BufferedReader
try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### 3. Files Class (Java 7+)

```java
import java.nio.file.*;
import java.util.List;

// Write all lines
List<String> lines = Arrays.asList("Line 1", "Line 2", "Line 3");
Files.write(Paths.get("output.txt"), lines);

// Read all lines
List<String> readLines = Files.readAllLines(Paths.get("input.txt"));

// Read as String
String content = new String(Files.readAllBytes(Paths.get("input.txt")));
```

### 4. File Operations

```java
import java.io.File;

File file = new File("example.txt");

// File information
boolean exists = file.exists();
boolean isFile = file.isFile();
boolean isDirectory = file.isDirectory();
long size = file.length();
String name = file.getName();
String path = file.getAbsolutePath();

// File operations
boolean created = file.createNewFile();
boolean deleted = file.delete();
boolean renamed = file.renameTo(new File("new_name.txt"));
```

### 5. Working with Directories

```java
import java.io.File;

// Create directory
File dir = new File("myFolder");
dir.mkdir();  // Create single directory
dir.mkdirs();  // Create nested directories

// List files in directory
File folder = new File(".");
File[] files = folder.listFiles();
for (File f : files) {
    System.out.println(f.getName());
}
```

## Your Tasks

### Task 1: Write to File
Create a file named `WriteFile.java`.

**Example code:**
```java
import java.io.*;

public class WriteFile {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("Hello, File I/O!");
            writer.newLine();
            writer.write("This is line 2");
            writer.newLine();
            writer.write("This is line 3");
            System.out.println("File written successfully!");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
}
```

**Expected Output:**
```
File written successfully!
```

### Task 2: Read from File
Create a file named `ReadFile.java`.

**Example code:**
```java
import java.io.*;

public class ReadFile {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
            System.out.println("File contents:");
            String line;
            int lineNumber = 1;
            while ((line = reader.readLine()) != null) {
                System.out.println(lineNumber + ": " + line);
                lineNumber++;
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

**Expected Output:**
```
File contents:
1: Hello, File I/O!
2: This is line 2
3: This is line 3
```

### Task 3-12: Additional File I/O Tasks

Practice with:
- **Task 3**: Copy file contents to another file
- **Task 4**: Append to existing file
- **Task 5**: Count words and lines in a file
- **Task 6**: Read and write numbers to file
- **Task 7**: Student data management (save/load)
- **Task 8**: File exists check before operations
- **Task 9**: List all files in directory
- **Task 10**: Search for text in file
- **Task 11**: CSV file reading and writing
- **Task 12**: Log file writer

## Tips and Common Mistakes

### Tips:
- **Always use try-with-resources**: Ensures files are closed
- **Handle exceptions properly**: FileNotFoundException, IOException
- **Use BufferedReader/Writer**: More efficient than FileReader/Writer
- **Check if file exists**: Before reading
- **Use Path and Files**: Modern approach (Java 7+)

### Common Mistakes:

1. **Not closing files**
   ```java
   FileWriter writer = new FileWriter("file.txt");
   writer.write("data");
   // ❌ File not closed

   try (FileWriter writer = new FileWriter("file.txt")) {
       writer.write("data");
   }  // ✅ Auto-closed
   ```

2. **Wrong file path**
   ```java
   new File("C:\Users\file.txt");  // ❌ Escape sequences
   new File("C:\\Users\\file.txt");  // ✅ Escaped backslashes
   new File("C:/Users/file.txt");   // ✅ Forward slashes
   ```

3. **Not handling exceptions**
   ```java
   BufferedReader reader = new BufferedReader(new FileReader("file.txt"));  // ❌ Must handle exception
   ```

## Next Steps

Move on to `04-Multithreading` to learn about concurrent programming!
