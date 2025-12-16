# Shell Scripting

## Overview
Shell scripting automates repetitive tasks and is essential for DevOps. Learn to write powerful automation scripts for Linux/Unix systems.

## Topics Covered

### 1. Shell Basics
- What is a shell? (bash, zsh, sh)
- Shell vs terminal
- Interactive vs non-interactive shells
- Login vs non-login shells
- Shebang (#!)

### 2. Variables and Data Types
```bash
# Variables
NAME="DevOps"
AGE=25
readonly CONSTANT="unchangeable"

# Arrays
FRUITS=("apple" "banana" "orange")

# Special Variables
$0  # Script name
$1, $2  # Arguments
$#  # Number of arguments
$@  # All arguments
$?  # Exit status of last command
$$  # Current process ID
```

### 3. Input/Output
```bash
# Output
echo "Hello"
printf "%s\n" "Formatted output"

# Input
read -p "Enter name: " NAME
read -sp "Enter password: " PASSWORD

# Redirection
command > file   # Redirect stdout to file
command >> file  # Append to file
command 2> file  # Redirect stderr
command &> file  # Redirect both
command < file   # Read input from file
```

### 4. Conditional Statements
```bash
# If-else
if [ condition ]; then
    # commands
elif [ condition ]; then
    # commands
else
    # commands
fi

# File tests
[ -f file ]  # File exists
[ -d dir ]   # Directory exists
[ -r file ]  # Readable
[ -w file ]  # Writable
[ -x file ]  # Executable

# String comparisons
[ "$a" = "$b" ]   # Equal
[ "$a" != "$b" ]  # Not equal
[ -z "$a" ]       # Empty
[ -n "$a" ]       # Not empty

# Numeric comparisons
[ $a -eq $b ]  # Equal
[ $a -ne $b ]  # Not equal
[ $a -gt $b ]  # Greater than
[ $a -lt $b ]  # Less than
```

### 5. Loops
```bash
# For loop
for i in 1 2 3 4 5; do
    echo $i
done

for file in *.txt; do
    echo "Processing $file"
done

# While loop
while [ condition ]; do
    # commands
done

# Until loop
until [ condition ]; do
    # commands
done
```

### 6. Functions
```bash
# Function definition
function greet() {
    echo "Hello, $1!"
}

# Calling function
greet "DevOps"

# Return values
function add() {
    local result=$(($1 + $2))
    echo $result
}

sum=$(add 5 3)
echo $sum
```

## Hands-On Tasks

### Task 1: First Shell Script
Create `hello.sh`:
```bash
#!/bin/bash

echo "Hello, DevOps!"
echo "Today is $(date)"
echo "Current directory: $(pwd)"
echo "Running as user: $(whoami)"
```

Tasks:
1. Create the script
2. Make it executable: `chmod +x hello.sh`
3. Run it: `./hello.sh`
4. Add more system information commands

### Task 2: Variables and User Input
Create `user-info.sh`:
```bash
#!/bin/bash

# Get user input
read -p "Enter your name: " NAME
read -p "Enter your age: " AGE
read -p "Enter your city: " CITY

# Display information
echo "===== User Information ====="
echo "Name: $NAME"
echo "Age: $AGE"
echo "City: $CITY"
echo "Script executed on: $(date)"
```

Tasks:
1. Create and run the script
2. Add validation for age (must be number)
3. Save output to a file
4. Add more fields (email, phone)

### Task 3: File Operations Script
Create `file-manager.sh`:
```bash
#!/bin/bash

FILE=$1

if [ -z "$FILE" ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

if [ -f "$FILE" ]; then
    echo "File: $FILE"
    echo "Size: $(du -h $FILE | cut -f1)"
    echo "Lines: $(wc -l < $FILE)"
    echo "Modified: $(date -r $FILE)"
else
    echo "File not found: $FILE"
    exit 1
fi
```

Tasks:
1. Create the script
2. Test with different files
3. Add check for directory
4. Add file permissions info
5. Handle multiple files

### Task 4: System Monitoring Script
Create `system-monitor.sh`:
```bash
#!/bin/bash

echo "===== System Monitor ====="
echo "Hostname: $(hostname)"
echo "Uptime: $(uptime -p)"
echo ""

echo "===== CPU Usage ====="
top -bn1 | grep "Cpu(s)" | awk '{print "CPU Usage: " $2 "%"}'
echo ""

echo "===== Memory Usage ====="
free -h | grep Mem | awk '{print "Used: " $3 " / Total: " $2}'
echo ""

echo "===== Disk Usage ====="
df -h / | tail -1 | awk '{print "Used: " $3 " / Total: " $2 " (" $5 " full)"}'
echo ""

echo "===== Top 5 Processes by Memory ====="
ps aux --sort=-%mem | head -6
```

Tasks:
1. Create and run the script
2. Save output to a log file with timestamp
3. Add network information
4. Add alert if disk usage > 80%
5. Schedule with cron to run hourly

### Task 5: Backup Script
Create `backup.sh`:
```bash
#!/bin/bash

# Configuration
SOURCE_DIR="/path/to/source"
BACKUP_DIR="/path/to/backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.tar.gz"

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

# Create backup
echo "Creating backup..."
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" "$SOURCE_DIR"

# Check if successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
    echo "Size: $(du -h ${BACKUP_DIR}/${BACKUP_FILE} | cut -f1)"
else
    echo "Backup failed!"
    exit 1
fi

# Delete backups older than 7 days
echo "Cleaning old backups..."
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "Backup complete!"
```

Tasks:
1. Create the script
2. Test with a sample directory
3. Add email notification (optional)
4. Add rotation (keep last N backups)
5. Schedule with cron

### Task 6: Service Health Check
Create `health-check.sh`:
```bash
#!/bin/bash

# Services to check
SERVICES=("nginx" "mysql" "docker")

echo "===== Service Health Check ====="
echo "Time: $(date)"
echo ""

for service in "${SERVICES[@]}"; do
    if systemctl is-active --quiet "$service"; then
        echo "✓ $service is running"
    else
        echo "✗ $service is NOT running"
        # Attempt to restart
        echo "  Attempting to restart $service..."
        sudo systemctl restart "$service"

        if systemctl is-active --quiet "$service"; then
            echo "  ✓ $service restarted successfully"
        else
            echo "  ✗ Failed to restart $service"
        fi
    fi
done
```

Tasks:
1. Create the script
2. Modify for your services
3. Add logging to file
4. Add email alerts
5. Schedule with cron

### Task 7: Log Analyzer
Create `log-analyzer.sh`:
```bash
#!/bin/bash

LOG_FILE="/var/log/syslog"

if [ ! -f "$LOG_FILE" ]; then
    echo "Log file not found: $LOG_FILE"
    exit 1
fi

echo "===== Log Analysis ====="
echo "File: $LOG_FILE"
echo "Total lines: $(wc -l < $LOG_FILE)"
echo ""

echo "===== Error Summary ====="
grep -i "error" "$LOG_FILE" | wc -l | xargs echo "Errors:"
echo ""

echo "===== Recent Errors ====="
grep -i "error" "$LOG_FILE" | tail -5
echo ""

echo "===== Top 10 Most Common Messages ====="
awk '{$1=$2=$3=""; print $0}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -10
```

## Advanced Topics

### Error Handling
```bash
#!/bin/bash

set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

# Custom error handler
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

# Usage
[ -f "file.txt" ] || error_exit "file.txt not found"
```

### Debugging
```bash
#!/bin/bash

set -x  # Print commands and arguments
# Your script
set +x  # Disable debug mode

# Or run with: bash -x script.sh
```

### Command Substitution
```bash
# Modern syntax
CURRENT_DATE=$(date +%Y-%m-%d)
FILE_COUNT=$(ls -1 | wc -l)

# Old syntax (still works)
CURRENT_DATE=`date +%Y-%m-%d`
```

## Best Practices

1. **Always use shebang**: `#!/bin/bash`
2. **Quote variables**: `"$VAR"` not `$VAR`
3. **Check exit codes**: `[ $? -eq 0 ]`
4. **Use functions** for reusable code
5. **Add comments** to explain logic
6. **Validate input** before using
7. **Use meaningful variable names**
8. **Handle errors** gracefully
9. **Test scripts** thoroughly
10. **Use shellcheck** for linting

## Common Patterns

### Template Script
```bash
#!/bin/bash

# Script: script-name.sh
# Description: What this script does
# Author: Your name
# Date: 2024-01-01

set -euo pipefail

# Configuration
VAR1="value"
VAR2="value"

# Functions
function main() {
    # Main logic here
    echo "Script running..."
}

# Run main function
main "$@"
```

### Menu Script
```bash
#!/bin/bash

while true; do
    echo "===== Menu ====="
    echo "1. Option 1"
    echo "2. Option 2"
    echo "3. Exit"
    read -p "Choose: " choice

    case $choice in
        1) echo "Option 1 selected";;
        2) echo "Option 2 selected";;
        3) exit 0;;
        *) echo "Invalid choice";;
    esac
done
```

## Learning Resources
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [ShellCheck](https://www.shellcheck.net/)
- [Linux Command Line Book](http://linuxcommand.org/tlcl.php)
- [Advanced Bash Scripting Guide](https://tldp.org/LDP/abs/html/)

## Verification Checklist
- [ ] Can write basic shell scripts
- [ ] Understand variables and data types
- [ ] Can use conditional statements
- [ ] Comfortable with loops
- [ ] Can create and use functions
- [ ] Know how to handle errors
- [ ] Can process command-line arguments
- [ ] Understand I/O redirection

## Next Steps
You've completed DevOps Basics! Move to **02-Intermediate/01-Docker-Compose** to learn multi-container orchestration.

## Estimated Time: 1 week
