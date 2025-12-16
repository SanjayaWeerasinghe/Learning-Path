# Linux Fundamentals

## Overview
Understanding Linux is essential for DevOps as most servers run on Linux. This section covers the fundamental commands and concepts you need.

## Topics Covered

### 1. Linux File System
- Directory structure (/, /home, /etc, /var, /usr)
- Navigating the file system
- Understanding paths (absolute vs relative)

### 2. Essential Commands
```bash
# Navigation
pwd, cd, ls, tree

# File Operations
touch, mkdir, cp, mv, rm, cat, less, head, tail

# File Permissions
chmod, chown, ls -la

# Text Processing
grep, sed, awk, cut, sort, uniq

# System Information
uname, top, htop, df, du, free
```

### 3. File Permissions
- Understanding rwx (read, write, execute)
- Numeric notation (755, 644, etc.)
- User, group, and others
- Special permissions (setuid, setgid, sticky bit)

### 4. Process Management
- Viewing processes (ps, top, htop)
- Killing processes (kill, pkill, killall)
- Background processes (&, bg, fg)
- Process priority (nice, renice)

### 5. Package Management
- apt (Ubuntu/Debian)
- yum/dnf (RHEL/CentOS)
- Installing, updating, removing packages

## Hands-On Tasks

### Task 1: File System Navigation
1. Navigate to /var/log and list all files
2. Create a directory structure: ~/devops/projects/app1
3. Create 5 files in app1 directory
4. Copy all files to a backup directory
5. Remove original files

### Task 2: File Permissions
1. Create a script file hello.sh
2. Give it execute permissions (755)
3. Check permissions with ls -la
4. Change ownership to current user
5. Create a file only you can read (600)

### Task 3: Process Management
1. List all running processes
2. Find processes using the most CPU
3. Start a long-running process in background
4. Bring it to foreground
5. Kill a specific process

### Task 4: Text Processing
1. Create a log file with sample data
2. Search for specific patterns with grep
3. Count unique lines with sort and uniq
4. Extract specific columns with cut
5. Replace text with sed

### Task 5: System Monitoring
1. Check disk usage with df
2. Find largest directories with du
3. Monitor system resources with top
4. Check memory usage with free
5. Display system information with uname

## Learning Resources
- [Linux Journey](https://linuxjourney.com/)
- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/)
- [Linux Command Line Basics (YouTube)](https://www.youtube.com/)

## Verification Checklist
- [ ] Can navigate Linux file system confidently
- [ ] Understand and can modify file permissions
- [ ] Can manage processes and system resources
- [ ] Comfortable with basic text processing
- [ ] Can use package managers to install software

## Next Steps
After mastering Linux fundamentals, move to **02-Git-Version-Control** to learn source code management.

## Estimated Time: 1 week
