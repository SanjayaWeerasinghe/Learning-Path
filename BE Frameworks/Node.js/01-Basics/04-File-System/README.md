# Node.js File System - Working with Files and Directories

## What You'll Learn
- How to read and write files
- Synchronous vs Asynchronous file operations
- Working with directories
- File paths and path module
- Watching files for changes
- Streams for large files
- File system best practices

## Concept Overview

The `fs` (File System) module provides an API for interacting with the file system in a manner similar to standard POSIX functions. Node.js offers both synchronous and asynchronous methods for file operations.

### Why File System Operations?
- **Data Persistence**: Store and retrieve data
- **Configuration**: Read config files
- **Logging**: Write application logs
- **File Processing**: Manipulate files (images, CSVs, etc.)
- **Static Assets**: Serve static files in web apps

### Sync vs Async vs Promises

```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;

// Synchronous (blocking) - stops execution
const dataSync = fs.readFileSync('file.txt', 'utf8');

// Asynchronous (callback) - non-blocking
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promises (modern) - non-blocking, cleaner
fsPromises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await (best) - non-blocking, cleanest
async function readMyFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## Reading Files

### Read File - Async/Await (Recommended)

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    // Read entire file
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);

    // Read as buffer (binary data)
    const buffer = await fs.readFile('image.png');
    console.log(buffer);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

readFile();
```

### Read File - Callback Style

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});
```

### Read File - Synchronous (Avoid in production)

```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('Error:', err);
}
```

## Writing Files

### Write File - Async/Await

```javascript
const fs = require('fs').promises;

async function writeFile() {
  try {
    // Write (overwrites existing file)
    await fs.writeFile('output.txt', 'Hello, World!');
    console.log('File written successfully');

    // Append to file
    await fs.appendFile('output.txt', '\nNew line added');
    console.log('Content appended');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

writeFile();
```

### Write JSON Data

```javascript
const fs = require('fs').promises;

async function writeJSON() {
  const data = {
    name: 'John',
    age: 30,
    city: 'New York'
  };

  try {
    // Convert to JSON string and write
    await fs.writeFile(
      'data.json',
      JSON.stringify(data, null, 2)  // Pretty print with 2 spaces
    );
    console.log('JSON written successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

writeJSON();
```

### Read JSON Data

```javascript
const fs = require('fs').promises;

async function readJSON() {
  try {
    const data = await fs.readFile('data.json', 'utf8');
    const parsed = JSON.parse(data);
    console.log(parsed);
  } catch (error) {
    console.error('Error:', error);
  }
}

readJSON();
```

## Working with Directories

### Check if File/Directory Exists

```javascript
const fs = require('fs').promises;

async function checkExists() {
  try {
    await fs.access('myfile.txt');
    console.log('File exists');
  } catch {
    console.log('File does not exist');
  }
}

// Alternative using stat
async function checkExistsStat() {
  try {
    const stats = await fs.stat('myfile.txt');
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
    console.log('Size:', stats.size);
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
  } catch (error) {
    console.log('Does not exist');
  }
}
```

### Create Directory

```javascript
const fs = require('fs').promises;

async function createDir() {
  try {
    // Create single directory
    await fs.mkdir('mydir');

    // Create nested directories
    await fs.mkdir('parent/child/grandchild', { recursive: true });

    console.log('Directories created');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Read Directory Contents

```javascript
const fs = require('fs').promises;
const path = require('path');

async function listFiles() {
  try {
    // Get file names
    const files = await fs.readdir('mydir');
    console.log('Files:', files);

    // Get file names with types
    const filesWithTypes = await fs.readdir('mydir', { withFileTypes: true });

    for (const file of filesWithTypes) {
      console.log(
        file.name,
        file.isDirectory() ? '[DIR]' : '[FILE]'
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Recursive directory listing
async function listFilesRecursive(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        console.log(`[DIR] ${fullPath}`);
        await listFilesRecursive(fullPath);  // Recurse
      } else {
        console.log(`[FILE] ${fullPath}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Delete Files and Directories

```javascript
const fs = require('fs').promises;

async function deleteStuff() {
  try {
    // Delete file
    await fs.unlink('file.txt');
    console.log('File deleted');

    // Delete empty directory
    await fs.rmdir('emptydir');

    // Delete directory with contents (Node 14.14+)
    await fs.rm('mydir', { recursive: true, force: true });
    console.log('Directory deleted');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Rename/Move Files

```javascript
const fs = require('fs').promises;

async function renameFile() {
  try {
    // Rename file
    await fs.rename('old-name.txt', 'new-name.txt');

    // Move file to different directory
    await fs.rename('file.txt', 'folder/file.txt');

    console.log('File renamed/moved');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Copy Files

```javascript
const fs = require('fs').promises;

async function copyFile() {
  try {
    // Copy file
    await fs.copyFile('source.txt', 'destination.txt');
    console.log('File copied');

    // Copy directory (recursive)
    await fs.cp('source-dir', 'dest-dir', { recursive: true });
    console.log('Directory copied');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Working with Paths

### Path Module

```javascript
const path = require('path');

// Join paths
const fullPath = path.join(__dirname, 'data', 'file.txt');
console.log(fullPath);

// Resolve absolute path
const absolutePath = path.resolve('file.txt');
console.log(absolutePath);

// Get file extension
console.log(path.extname('file.txt'));  // .txt

// Get filename
console.log(path.basename('/user/docs/file.txt'));  // file.txt

// Get directory
console.log(path.dirname('/user/docs/file.txt'));  // /user/docs

// Parse path
const parsed = path.parse('/user/docs/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/user/docs',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Format path
const formatted = path.format({
  dir: '/user/docs',
  base: 'file.txt'
});
console.log(formatted);  // /user/docs/file.txt
```

## File Streams

### Reading Large Files with Streams

```javascript
const fs = require('fs');

// Create read stream
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 16 * 1024  // 16 KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (error) => {
  console.error('Error:', error);
});
```

### Writing with Streams

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Line 1\n');
writeStream.write('Line 2\n');
writeStream.write('Line 3\n');

writeStream.end(() => {
  console.log('Finished writing');
});

writeStream.on('error', (error) => {
  console.error('Error:', error);
});
```

### Piping Streams (Copy Large Files)

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

// Pipe data from read to write
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File copied successfully');
});
```

## Watching Files

### Watch File for Changes

```javascript
const fs = require('fs');

// Watch file
const watcher = fs.watch('file.txt', (eventType, filename) => {
  console.log(`Event: ${eventType}`);
  console.log(`File: ${filename}`);
});

// Watch directory
const dirWatcher = fs.watch('mydir', { recursive: true }, (eventType, filename) => {
  console.log(`${filename} was ${eventType}`);
});

// Stop watching
setTimeout(() => {
  watcher.close();
  dirWatcher.close();
}, 60000);  // Stop after 1 minute
```

### Watch File with fs.watchFile

```javascript
const fs = require('fs');

fs.watchFile('file.txt', { interval: 1000 }, (curr, prev) => {
  console.log('Current modified time:', curr.mtime);
  console.log('Previous modified time:', prev.mtime);
});

// Stop watching
// fs.unwatchFile('file.txt');
```

## Your Tasks

### Task 1: Read and Write
Create a file `data.txt` with some content, then:
- Read the file and print its contents
- Modify the content
- Write it back to a new file `modified.txt`

### Task 2: JSON Configuration
Create a config file:
```javascript
const config = {
  appName: 'MyApp',
  version: '1.0.0',
  port: 3000,
  database: {
    host: 'localhost',
    port: 27017
  }
};
```
- Write to `config.json`
- Read it back and print the port number

### Task 3: Directory Operations
- Create a directory `myfiles`
- Create 3 text files inside it
- List all files in the directory
- Delete one file
- List again to verify

### Task 4: File Information
Create a script that:
- Gets file stats (size, created date, modified date)
- Checks if it's a file or directory
- Prints the information in a formatted way

### Task 5: Copy Files
- Create a function that copies a file
- Add error handling for missing files
- Test with multiple files

### Task 6: File Logger
Create a simple logger:
```javascript
async function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  // Append to logs.txt
}
```

### Task 7: Recursive Directory Tree
Create a function that:
- Lists all files and subdirectories
- Shows them in a tree structure
- Includes file sizes

### Task 8: File Search
Create a function that:
- Searches for files by extension (e.g., all .txt files)
- Searches recursively through subdirectories
- Returns an array of matching file paths

### Task 9: Bulk Rename
Create a script that:
- Reads all files in a directory
- Renames them with a prefix or suffix
- Example: `file.txt` → `backup-file.txt`

### Task 10: File Watcher
Create a file watcher that:
- Watches a directory for changes
- Logs when files are created, modified, or deleted
- Shows the timestamp of each event

## Common Pitfalls

### 1. Using Sync Methods in Production

```javascript
// ❌ Blocks event loop - avoid in servers
const data = fs.readFileSync('large-file.txt', 'utf8');

// ✅ Use async methods
const data = await fs.promises.readFile('large-file.txt', 'utf8');
```

### 2. Not Handling Errors

```javascript
// ❌ No error handling
await fs.readFile('file.txt', 'utf8');

// ✅ Always handle errors
try {
  const data = await fs.readFile('file.txt', 'utf8');
} catch (error) {
  console.error('Error reading file:', error);
}
```

### 3. Reading Large Files Entirely

```javascript
// ❌ Loads entire file into memory
const data = await fs.readFile('huge-file.txt', 'utf8');

// ✅ Use streams for large files
const stream = fs.createReadStream('huge-file.txt', 'utf8');
```

### 4. Not Using Path.join

```javascript
// ❌ Hardcoded paths - breaks on different OS
const filePath = __dirname + '/data/file.txt';  // Windows issues

// ✅ Use path.join
const filePath = path.join(__dirname, 'data', 'file.txt');
```

### 5. Race Conditions

```javascript
// ❌ Not checking if file exists before writing
await fs.writeFile('file.txt', 'data');

// ✅ Check first or use appropriate flags
try {
  await fs.access('file.txt');
  console.log('File exists, not overwriting');
} catch {
  await fs.writeFile('file.txt', 'data');
}
```

## Best Practices

### 1. Always Use Async Methods

```javascript
// ✅ Non-blocking, doesn't freeze app
const fs = require('fs').promises;

async function readFile() {
  const data = await fs.readFile('file.txt', 'utf8');
  return data;
}
```

### 2. Use Streams for Large Files

```javascript
// ✅ Memory efficient
const fs = require('fs');

const stream = fs.createReadStream('large-file.txt');
stream.pipe(destination);
```

### 3. Always Specify Encoding

```javascript
// ✅ Specify encoding for text files
await fs.readFile('file.txt', 'utf8');  // Returns string

// For binary files, omit encoding
await fs.readFile('image.png');  // Returns buffer
```

### 4. Use Path Module for Cross-Platform Compatibility

```javascript
const path = require('path');

// ✅ Works on Windows, Mac, Linux
const filePath = path.join(__dirname, 'data', 'file.txt');
```

### 5. Close File Descriptors

```javascript
// ✅ Close file handles when using lower-level APIs
const fd = await fs.open('file.txt', 'r');
try {
  // Use file
} finally {
  await fd.close();  // Always close
}
```

### 6. Use Appropriate File Flags

```javascript
// Writing flags
await fs.writeFile('file.txt', 'data', { flag: 'a' });  // Append
await fs.writeFile('file.txt', 'data', { flag: 'w' });  // Write (default)
await fs.writeFile('file.txt', 'data', { flag: 'wx' }); // Write, fail if exists
```

### 7. Handle ENOENT Errors Gracefully

```javascript
// ✅ Provide helpful error messages
try {
  await fs.readFile('file.txt', 'utf8');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('File not found');
  } else {
    console.error('Error:', error);
  }
}
```

### 8. Use mkdirp Pattern for Nested Directories

```javascript
// ✅ Create nested directories
await fs.mkdir('path/to/nested/dir', { recursive: true });
```

## Next Steps

Once you complete these tasks, move on to:
- `05-Events` - Learn Node.js event-driven architecture
- `02-Intermediate/01-HTTP-Server` - Build web servers
- `02-Intermediate/02-Express-Basics` - Learn Express framework

## Additional Resources

- [Node.js fs Documentation](https://nodejs.org/api/fs.html)
- [Node.js path Documentation](https://nodejs.org/api/path.html)
- [Stream Handbook](https://github.com/substack/stream-handbook)
- [File System Best Practices](https://github.com/goldbergyoni/nodebestpractices#file-system)
