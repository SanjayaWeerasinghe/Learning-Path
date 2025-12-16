# File I/O (Input/Output)

## What You'll Learn
- Reading and writing text files
- Reading and writing binary files
- Working with streams
- File and directory operations
- Path manipulation
- File system watching
- Async file operations
- Best practices and error handling

## Concept Overview

File I/O allows programs to read from and write to files. C# provides multiple ways to work with files through the System.IO namespace.

### Reading Text Files

```csharp
using System.IO;

// Read all text at once
string content = File.ReadAllText("file.txt");
Console.WriteLine(content);

// Read all lines into array
string[] lines = File.ReadAllLines("file.txt");
foreach (string line in lines)
{
    Console.WriteLine(line);
}

// Read lines with IEnumerable (memory efficient)
foreach (string line in File.ReadLines("file.txt"))
{
    Console.WriteLine(line);
    // Processes one line at a time
}

// Read with StreamReader
using (StreamReader reader = new StreamReader("file.txt"))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}

// Read entire file
using (StreamReader reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
}
```

### Writing Text Files

```csharp
// Write all text (overwrites file)
File.WriteAllText("output.txt", "Hello, World!");

// Write all lines
string[] lines = { "Line 1", "Line 2", "Line 3" };
File.WriteAllLines("output.txt", lines);

// Append text
File.AppendAllText("output.txt", "\nAppended text");

// Write with StreamWriter
using (StreamWriter writer = new StreamWriter("output.txt"))
{
    writer.WriteLine("First line");
    writer.WriteLine("Second line");
    writer.Write("Third line without newline");
}

// Append with StreamWriter
using (StreamWriter writer = new StreamWriter("output.txt", append: true))
{
    writer.WriteLine("Appended line");
}
```

### File Operations

```csharp
// Check if file exists
if (File.Exists("file.txt"))
{
    Console.WriteLine("File exists");
}

// Copy file
File.Copy("source.txt", "destination.txt");
File.Copy("source.txt", "destination.txt", overwrite: true);

// Move/Rename file
File.Move("old.txt", "new.txt");

// Delete file
File.Delete("file.txt");

// Get file info
FileInfo fileInfo = new FileInfo("file.txt");
Console.WriteLine($"Size: {fileInfo.Length} bytes");
Console.WriteLine($"Created: {fileInfo.CreationTime}");
Console.WriteLine($"Modified: {fileInfo.LastWriteTime}");
Console.WriteLine($"Read-only: {fileInfo.IsReadOnly}");

// Get file attributes
FileAttributes attributes = File.GetAttributes("file.txt");
if ((attributes & FileAttributes.Hidden) == FileAttributes.Hidden)
{
    Console.WriteLine("File is hidden");
}

// Set file attributes
File.SetAttributes("file.txt", FileAttributes.ReadOnly);
```

### Directory Operations

```csharp
// Check if directory exists
if (Directory.Exists("MyFolder"))
{
    Console.WriteLine("Directory exists");
}

// Create directory
Directory.CreateDirectory("MyFolder");
Directory.CreateDirectory("Parent/Child/GrandChild");  // Creates all levels

// Get files in directory
string[] files = Directory.GetFiles("MyFolder");
string[] txtFiles = Directory.GetFiles("MyFolder", "*.txt");
string[] allFiles = Directory.GetFiles("MyFolder", "*.*", SearchOption.AllDirectories);

// Get directories
string[] directories = Directory.GetDirectories("MyFolder");

// Get all entries (files and directories)
string[] entries = Directory.GetFileSystemEntries("MyFolder");

// Delete directory
Directory.Delete("MyFolder");  // Must be empty
Directory.Delete("MyFolder", recursive: true);  // Deletes all contents

// Move directory
Directory.Move("OldFolder", "NewFolder");

// Get directory info
DirectoryInfo dirInfo = new DirectoryInfo("MyFolder");
FileInfo[] files = dirInfo.GetFiles();
DirectoryInfo[] subdirs = dirInfo.GetDirectories();
```

### Path Manipulation

```csharp
// Combine paths (handles separators correctly)
string path = Path.Combine("folder", "subfolder", "file.txt");
// Result: folder\subfolder\file.txt (Windows)
// Result: folder/subfolder/file.txt (Linux/Mac)

// Get parts of path
string fullPath = @"C:\Users\Name\Documents\file.txt";
string directory = Path.GetDirectoryName(fullPath);  // C:\Users\Name\Documents
string filename = Path.GetFileName(fullPath);  // file.txt
string filenameNoExt = Path.GetFileNameWithoutExtension(fullPath);  // file
string extension = Path.GetExtension(fullPath);  // .txt

// Get absolute path
string absolutePath = Path.GetFullPath("file.txt");

// Get temp file path
string tempFile = Path.GetTempFileName();
string tempPath = Path.GetTempPath();

// Check if path is valid
bool isValid = Path.IsPathFullyQualified(path);

// Change extension
string newPath = Path.ChangeExtension("file.txt", ".dat");  // file.dat
```

### Binary Files

```csharp
// Write binary data
using (BinaryWriter writer = new BinaryWriter(File.Open("data.bin", FileMode.Create)))
{
    writer.Write(42);  // int
    writer.Write(3.14);  // double
    writer.Write("Hello");  // string
    writer.Write(true);  // bool
}

// Read binary data
using (BinaryReader reader = new BinaryReader(File.Open("data.bin", FileMode.Open)))
{
    int number = reader.ReadInt32();
    double pi = reader.ReadDouble();
    string text = reader.ReadString();
    bool flag = reader.ReadBoolean();
}

// Write bytes
byte[] data = { 1, 2, 3, 4, 5 };
File.WriteAllBytes("data.bin", data);

// Read bytes
byte[] readData = File.ReadAllBytes("data.bin");
```

### Streams

```csharp
// FileStream - low-level file access
using (FileStream fs = new FileStream("file.txt", FileMode.Create))
{
    byte[] data = Encoding.UTF8.GetBytes("Hello, World!");
    fs.Write(data, 0, data.Length);
}

// MemoryStream - in-memory stream
using (MemoryStream ms = new MemoryStream())
{
    byte[] data = Encoding.UTF8.GetBytes("Hello");
    ms.Write(data, 0, data.Length);

    byte[] result = ms.ToArray();
}

// BufferedStream - adds buffering to stream
using (FileStream fs = File.OpenRead("large-file.txt"))
using (BufferedStream bs = new BufferedStream(fs))
{
    // Buffered reading is faster for small reads
}
```

### Async File Operations

```csharp
// Async read
string content = await File.ReadAllTextAsync("file.txt");

// Async write
await File.WriteAllTextAsync("file.txt", "Hello, World!");

// Async with StreamReader
using (StreamReader reader = new StreamReader("file.txt"))
{
    string content = await reader.ReadToEndAsync();
}

// Async with StreamWriter
using (StreamWriter writer = new StreamWriter("file.txt"))
{
    await writer.WriteLineAsync("Hello, World!");
}
```

### File Watching

```csharp
FileSystemWatcher watcher = new FileSystemWatcher();
watcher.Path = @"C:\WatchFolder";
watcher.Filter = "*.txt";
watcher.NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite;

watcher.Created += (sender, e) =>
{
    Console.WriteLine($"File created: {e.FullPath}");
};

watcher.Changed += (sender, e) =>
{
    Console.WriteLine($"File changed: {e.FullPath}");
};

watcher.Deleted += (sender, e) =>
{
    Console.WriteLine($"File deleted: {e.FullPath}");
};

watcher.Renamed += (sender, e) =>
{
    Console.WriteLine($"File renamed: {e.OldFullPath} -> {e.FullPath}");
};

watcher.EnableRaisingEvents = true;

// Keep program running
Console.WriteLine("Watching for file changes. Press Enter to exit.");
Console.ReadLine();
```

### CSV File Operations

```csharp
// Write CSV
using (StreamWriter writer = new StreamWriter("data.csv"))
{
    writer.WriteLine("Name,Age,Email");
    writer.WriteLine("Alice,25,alice@example.com");
    writer.WriteLine("Bob,30,bob@example.com");
}

// Read CSV
List<Person> people = new List<Person>();
using (StreamReader reader = new StreamReader("data.csv"))
{
    string headerLine = reader.ReadLine();  // Skip header
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        string[] parts = line.Split(',');
        people.Add(new Person
        {
            Name = parts[0],
            Age = int.Parse(parts[1]),
            Email = parts[2]
        });
    }
}
```

## Your Tasks

### Task 1: Text File Reader/Writer
Create a program that:
- Writes user input to a text file
- Reads and displays the file content
- Appends new lines to existing file
- Counts words, lines, and characters
- Handles errors gracefully

### Task 2: Log File System
Create a logging system that:
- Writes log entries with timestamp
- Different log levels (INFO, WARNING, ERROR)
- Rotates log files when size exceeds limit
- Searches logs by date or keyword
- Displays recent logs

### Task 3: File Manager
Create a file manager with:
- List files in directory
- Copy, move, rename files
- Delete files with confirmation
- Display file properties
- Search files by name or extension
- Create and delete directories

### Task 4: CSV Data Processor
Create a CSV processor that:
- Reads CSV file into objects
- Adds, updates, deletes records
- Saves back to CSV
- Sorts and filters data
- Exports filtered results
Test with student or product data.

### Task 5: Configuration Manager
Create a configuration file manager:
- Read/write application settings to file
- Key-value pairs format
- Update specific settings
- Validate settings
- Default values for missing settings
Use both text and binary formats.

### Task 6: Binary File Handler
Create a program that:
- Saves custom objects to binary file
- Reads objects from binary file
- Handles different data types
- Implements serialization
- Compares file sizes (text vs binary)

### Task 7: Directory Statistics
Create a tool that analyzes a directory:
- Total size of all files
- Number of files by extension
- Largest files
- Oldest and newest files
- Directory tree visualization
- Export statistics to file

### Task 8: Text File Search
Create a file search tool:
- Search for text in files
- Support wildcards (*.txt)
- Case-sensitive/insensitive search
- Display matches with line numbers
- Search in subdirectories
- Export results

### Task 9: File Backup System
Create a backup utility:
- Copy files from source to destination
- Only backup modified files
- Create dated backup folders
- Compare source and backup
- Restore from backup
- Display backup statistics

### Task 10: Log Analyzer
Create a log file analyzer:
- Parse log files
- Count occurrences of each log level
- Find errors and warnings
- Generate summary report
- Filter by date range
- Export analysis results

### Task 11: File System Watcher
Create a file monitoring system:
- Watch directory for changes
- Log all file operations
- Alert on specific file types
- Track file creation/modification/deletion
- Display real-time statistics
- Save monitoring log

### Task 12: Document Processing System
Create a comprehensive document system:
- Read multiple file formats (txt, csv, dat)
- Process and transform data
- Generate reports
- Archive old documents
- Search across all documents
- Implement caching for performance
- Handle errors and logging
Test with various file types and sizes.

## Expected Output Examples

**Task 2:**
```
Log File System

[2025-10-02 10:30:15] INFO: Application started
[2025-10-02 10:30:20] INFO: User logged in: Alice
[2025-10-02 10:30:45] WARNING: Low disk space
[2025-10-02 10:31:00] ERROR: Database connection failed
[2025-10-02 10:31:15] INFO: Retrying connection...

Log Statistics:
Total entries: 5
INFO: 3
WARNING: 1
ERROR: 1
```

**Task 7:**
```
Directory Statistics: C:\Projects

Total Files: 1,234
Total Size: 45.6 MB

Files by Extension:
.cs: 456 files (15.2 MB)
.txt: 234 files (2.1 MB)
.json: 89 files (1.5 MB)

Largest Files:
1. data.db (12.5 MB)
2. application.log (5.3 MB)
3. backup.zip (3.2 MB)

Oldest File: readme.txt (2020-01-15)
Newest File: temp.dat (2025-10-02)
```

**Task 9:**
```
File Backup System

Source: C:\Documents
Destination: D:\Backup\2025-10-02

Scanning files...
Found 150 files (23.4 MB)

Comparing with last backup...
New files: 12
Modified files: 8
Unchanged files: 130

Backing up...
[====================] 100%

Backup completed!
Files copied: 20
Total size: 5.6 MB
Time: 3.2 seconds
```

**Task 11:**
```
File System Watcher

Watching: C:\WatchFolder
Monitoring: *.txt, *.log

[10:30:15] CREATED: document.txt
[10:30:45] MODIFIED: document.txt
[10:31:20] CREATED: log.txt
[10:32:00] DELETED: old-file.txt
[10:32:30] RENAMED: log.txt -> application.log

Statistics:
Created: 2
Modified: 1
Deleted: 1
Renamed: 1
```

## Tips
- Always use `using` statements for file operations
- Check if files/directories exist before operating
- Use Path.Combine for cross-platform compatibility
- Handle exceptions (FileNotFoundException, IOException)
- Use async methods for large files
- Close files properly to avoid locking
- Use StreamReader/Writer for text, BinaryReader/Writer for binary
- Consider memory usage with large files
- Use File.ReadLines for memory-efficient line reading
- Validate file paths before use

## Common Mistakes

```csharp
// ❌ Not using 'using' statement
StreamReader reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();
// File remains locked!

// ✅ Use 'using' for automatic disposal
using (StreamReader reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
}  // File automatically closed

// ❌ Not checking if file exists
string content = File.ReadAllText("missing.txt");  // FileNotFoundException!

// ✅ Check before reading
if (File.Exists("file.txt"))
{
    string content = File.ReadAllText("file.txt");
}

// ❌ Hardcoded path separators
string path = "folder\\subfolder\\file.txt";  // Breaks on Linux/Mac!

// ✅ Use Path.Combine
string path = Path.Combine("folder", "subfolder", "file.txt");

// ❌ Loading entire large file into memory
string content = File.ReadAllText("huge-file.txt");  // OutOfMemoryException!

// ✅ Process line by line
foreach (string line in File.ReadLines("huge-file.txt"))
{
    ProcessLine(line);
}

// ❌ Not handling exceptions
File.Delete("file.txt");  // May throw exception

// ✅ Handle exceptions
try
{
    File.Delete("file.txt");
}
catch (IOException ex)
{
    Console.WriteLine($"Error deleting file: {ex.Message}");
}

// ❌ Multiple small writes without buffering
for (int i = 0; i < 100000; i++)
{
    File.AppendAllText("file.txt", i.ToString());  // Very slow!
}

// ✅ Use StreamWriter with buffering
using (StreamWriter writer = new StreamWriter("file.txt"))
{
    for (int i = 0; i < 100000; i++)
    {
        writer.WriteLine(i);
    }
}
```

## Key Concepts
- **File I/O**: Reading from and writing to files
- **Stream**: Sequence of bytes for I/O operations
- **StreamReader/Writer**: For text files
- **BinaryReader/Writer**: For binary files
- **FileStream**: Low-level file access
- **Path**: Utilities for path manipulation
- **Directory**: Operations on directories
- **FileInfo**: Metadata about files
- **FileSystemWatcher**: Monitor file system changes
- **Async I/O**: Non-blocking file operations

## Next Steps
Move on to `07-Reflection` to learn about runtime type inspection!
