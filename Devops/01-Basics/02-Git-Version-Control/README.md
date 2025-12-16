# Git & Version Control

## Overview
Git is the industry-standard version control system. Understanding Git is crucial for collaboration, code management, and CI/CD pipelines.

## Topics Covered

### 1. Git Basics
- What is version control?
- Git vs GitHub/GitLab/Bitbucket
- Installing and configuring Git
- Git workflow concepts

### 2. Core Git Commands
```bash
# Configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Repository Management
git init
git clone <url>
git status

# Staging and Committing
git add <file>
git add .
git commit -m "message"
git commit -am "message"

# Viewing History
git log
git log --oneline --graph
git diff
git show <commit>

# Undoing Changes
git restore <file>
git reset HEAD~1
git revert <commit>
```

### 3. Branching & Merging
- Creating and switching branches
- Merging strategies
- Resolving merge conflicts
- Branch naming conventions

### 4. Remote Repositories
- Adding remotes
- Pushing and pulling
- Fetch vs Pull
- Tracking branches

### 5. Collaboration Workflow
- Fork and pull request workflow
- Feature branch workflow
- Gitflow workflow
- Trunk-based development

## Hands-On Tasks

### Task 1: Git Setup
1. Install Git on your system
2. Configure your name and email
3. Set up SSH keys for GitHub/GitLab
4. Create a GitHub account (if you don't have one)
5. Configure default branch name to 'main'

### Task 2: First Repository
1. Create a new directory for a project
2. Initialize a Git repository
3. Create a README.md file
4. Add and commit the file
5. View the commit history

### Task 3: Branching
1. Create a new branch called 'feature/add-login'
2. Switch to the new branch
3. Make changes and commit
4. Switch back to main
5. Merge the feature branch

### Task 4: Working with Remotes
1. Create a new repository on GitHub
2. Add it as a remote to your local repo
3. Push your code to GitHub
4. Clone the repository to a different location
5. Make changes, commit, and push

### Task 5: Handling Conflicts
1. Create two branches from main
2. Modify the same file in both branches
3. Merge one branch into main
4. Try to merge the second branch (conflict!)
5. Resolve the conflict manually

### Task 6: Git History
1. View detailed commit history with git log
2. Use git log --oneline --graph --all
3. Check differences between commits
4. Use git blame to see who changed what
5. Create annotated tags for releases

## Common Git Workflows

### Feature Branch Workflow
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request on GitHub
# After review, merge to main
```

### Fixing a Bug
```bash
git checkout -b bugfix/fix-login
# Fix the bug
git add .
git commit -m "Fix login issue"
git push origin bugfix/fix-login
```

### Updating Your Branch
```bash
git checkout main
git pull origin main
git checkout feature/my-feature
git merge main
# Resolve conflicts if any
```

## Best Practices
1. Write meaningful commit messages
2. Commit small, logical changes
3. Pull before you push
4. Never commit sensitive data
5. Use .gitignore properly
6. Create branches for features/fixes
7. Review code before merging

## Learning Resources
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Learning Lab](https://lab.github.com/)
- [Visualizing Git](http://git-school.github.io/visualizing-git/)

## Verification Checklist
- [ ] Can create and manage Git repositories
- [ ] Understand branching and merging
- [ ] Can resolve merge conflicts
- [ ] Comfortable with remote repositories
- [ ] Know how to collaborate using Git
- [ ] Understand common Git workflows

## Next Steps
Move to **03-Docker-Basics** to learn containerization.

## Estimated Time: 1 week
