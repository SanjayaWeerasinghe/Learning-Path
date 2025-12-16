# Git Version Control - Interview Questions & Answers

## Table of Contents
1. [Git Basics](#git-basics)
2. [Branching and Merging](#branching-and-merging)
3. [Git Workflow](#git-workflow)
4. [Collaboration](#collaboration)
5. [Advanced Git](#advanced-git)
6. [Best Practices](#best-practices)

---

## Git Basics

### Question
**What is Git and why is it important?**

### Answer
Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to work together on the same project.

**Key Concepts:**
- **Repository (Repo)**: Project folder tracked by Git
- **Commit**: Snapshot of your code at a specific point
- **Branch**: Parallel version of your repository
- **Remote**: Hosted version of your repository (GitHub, GitLab, Bitbucket)

### Better Explanation

**Basic Git Commands:**
```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone https://github.com/username/repo.git

# Check status of files
git status

# Add files to staging area
git add file.txt              # Add specific file
git add .                     # Add all files
git add *.js                  # Add all .js files

# Commit changes
git commit -m "Add user authentication"

# View commit history
git log
git log --oneline             # Compact view
git log --graph --oneline     # Visual graph

# Show changes
git diff                      # Changes not staged
git diff --staged             # Changes staged for commit
git diff commit1 commit2      # Difference between commits
```

**Git Workflow Stages:**
```
Working Directory → Staging Area → Local Repository → Remote Repository
     (add)              (commit)           (push)
```

**Example Workflow:**
```bash
# 1. Make changes to files
echo "console.log('Hello');" > app.js

# 2. Check what changed
git status
# Output: Modified: app.js

# 3. Stage changes
git add app.js

# 4. Commit with message
git commit -m "Add hello world to app.js"

# 5. Push to remote
git push origin main
```

---

## Branching and Merging

### Question
**Explain Git branching and merging strategies.**

### Answer

Branches allow you to develop features isolated from the main codebase.

### Better Explanation

**Branch Commands:**
```bash
# List branches
git branch                    # Local branches
git branch -r                 # Remote branches
git branch -a                 # All branches

# Create new branch
git branch feature/user-auth

# Switch to branch
git checkout feature/user-auth

# Create and switch in one command
git checkout -b feature/user-auth

# Modern alternative (Git 2.23+)
git switch feature/user-auth
git switch -c feature/user-auth  # Create and switch

# Delete branch
git branch -d feature/user-auth  # Safe delete (only if merged)
git branch -D feature/user-auth  # Force delete

# Rename branch
git branch -m old-name new-name
```

**Merging:**
```bash
# Merge feature branch into main
git checkout main
git merge feature/user-auth

# If there are conflicts, resolve them and commit
git add resolved-file.js
git commit -m "Merge feature/user-auth"

# Abort merge if needed
git merge --abort
```

**Merge Strategies:**

**1. Fast-Forward Merge (No Conflicts):**
```bash
# When main hasn't changed since branch was created
#
#      A---B---C (feature)
#     /
# ---1---2 (main)
#
# After merge:
# ---1---2---A---B---C (main)

git checkout main
git merge feature  # Fast-forward merge
```

**2. Three-Way Merge (Creates Merge Commit):**
```bash
# When both branches have new commits
#
#      A---B---C (feature)
#     /
# ---1---2---3 (main)
#
# After merge:
#      A---B---C
#     /         \
# ---1---2---3---M (main)

git checkout main
git merge feature  # Creates merge commit M
```

**3. Rebase (Linear History):**
```bash
# Rewrite history to be linear
#
#      A---B---C (feature)
#     /
# ---1---2---3 (main)
#
# After rebase:
#
# ---1---2---3---A'---B'---C' (feature)

git checkout feature
git rebase main

# Then merge (fast-forward)
git checkout main
git merge feature
```

**When to Use Each:**
- **Merge**: Team collaboration, preserves history
- **Rebase**: Clean linear history, working on feature branch alone
- **Never rebase** shared/public branches!

---

## Git Workflow

### Question
**What are common Git workflows?**

### Answer

**Git Flow (Traditional):**
```
main (production)
  ↓
develop (integration)
  ↓
feature/* (new features)
release/* (release preparation)
hotfix/* (urgent fixes)
```

**Workflow:**
```bash
# Start new feature
git checkout develop
git checkout -b feature/user-profile

# ... make changes ...
git add .
git commit -m "Add user profile page"

# Finish feature
git checkout develop
git merge feature/user-profile
git branch -d feature/user-profile

# Create release
git checkout -b release/1.0.0 develop
# ... final testing, version bumps ...
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"

# Hotfix
git checkout -b hotfix/critical-bug main
# ... fix bug ...
git checkout main
git merge hotfix/critical-bug
git checkout develop
git merge hotfix/critical-bug
```

**GitHub Flow (Simpler):**
```
main (always deployable)
  ↓
feature-branch → Pull Request → Code Review → Merge to main
```

**Workflow:**
```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b add-login-page

# 2. Make changes and commit
git add .
git commit -m "Add login page"

# 3. Push to remote
git push origin add-login-page

# 4. Open Pull Request on GitHub
# 5. Code review
# 6. Merge PR
# 7. Delete branch
git checkout main
git pull origin main
git branch -d add-login-page
```

**Trunk-Based Development:**
```
main (trunk)
  ↓
short-lived feature branches (< 1 day)
```

---

## Collaboration

### Question
**How do you collaborate with Git?**

### Answer

**Remote Repository Commands:**
```bash
# Add remote
git remote add origin https://github.com/username/repo.git

# View remotes
git remote -v

# Fetch changes from remote (doesn't merge)
git fetch origin

# Pull changes from remote (fetch + merge)
git pull origin main

# Push changes to remote
git push origin main

# Push new branch
git push -u origin feature/new-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

**Pull Requests / Merge Requests:**

**Creating a PR:**
```bash
# 1. Create feature branch
git checkout -b feature/add-comments

# 2. Make changes
git add .
git commit -m "Add comment functionality"

# 3. Push to remote
git push -u origin feature/add-comments

# 4. Go to GitHub/GitLab and create PR
# - Add title and description
# - Request reviewers
# - Link issues

# 5. Address review comments
git add .
git commit -m "Address review comments"
git push

# 6. After approval, merge PR
```

**Code Review Best Practices:**
- Small, focused PRs
- Clear description and context
- Link to related issues
- Add screenshots for UI changes
- Respond to all comments
- Keep PR up-to-date with main

**Handling Conflicts:**
```bash
# When pulling or merging causes conflicts
git pull origin main

# Git shows conflict markers in files:
# <<<<<<< HEAD
# Your changes
# =======
# Incoming changes
# >>>>>>> branch-name

# 1. Open conflicted files
# 2. Resolve conflicts manually
# 3. Remove conflict markers
# 4. Stage resolved files
git add conflicted-file.js

# 5. Complete the merge
git commit -m "Resolve merge conflicts"

# If you want to abort
git merge --abort
```

---

## Advanced Git

### Question
**What are some advanced Git commands and concepts?**

### Answer

**Stashing Changes:**
```bash
# Save work-in-progress without committing
git stash
git stash save "WIP: working on feature"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove from stash list
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

**Resetting and Reverting:**
```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes) ⚠️ DANGEROUS
git reset --hard HEAD~1

# Undo specific commit (creates new commit)
git revert abc123

# Unstage file
git restore --staged file.txt

# Discard changes in working directory
git restore file.txt
```

**Cherry-picking:**
```bash
# Apply specific commit to current branch
git cherry-pick abc123

# Cherry-pick multiple commits
git cherry-pick abc123 def456

# Cherry-pick without committing
git cherry-pick --no-commit abc123
```

**Interactive Rebase:**
```bash
# Rewrite last 3 commits
git rebase -i HEAD~3

# Opens editor with commits:
# pick abc123 Add feature
# pick def456 Fix bug
# pick ghi789 Update docs

# Can change to:
# pick abc123 Add feature
# squash def456 Fix bug    # Combine with previous
# reword ghi789 Update docs # Change commit message
# drop ghi789 Update docs   # Remove commit
```

**Tags:**
```bash
# Create tag
git tag v1.0.0

# Annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag v1.0.0 abc123

# Push tags to remote
git push origin v1.0.0
git push origin --tags  # Push all tags

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

**Git Bisect (Find Bug):**
```bash
# Start bisect
git bisect start

# Mark current as bad
git bisect bad

# Mark old commit as good
git bisect good abc123

# Git checks out commit in between
# Test if bug exists
git bisect good  # or git bisect bad

# Repeat until bug is found
# Git identifies the commit that introduced the bug

# End bisect
git bisect reset
```

---

## Best Practices

### Question
**What are Git best practices?**

### Answer

**1. Commit Messages:**
```bash
# Good commit messages:
git commit -m "Add user authentication with JWT"
git commit -m "Fix: Resolve null pointer exception in UserService"
git commit -m "Refactor: Extract payment logic to separate service"

# Conventional Commits format:
# <type>: <description>
#
# Types: feat, fix, docs, style, refactor, test, chore

git commit -m "feat: Add user registration endpoint"
git commit -m "fix: Resolve memory leak in image processing"
git commit -m "docs: Update API documentation"
git commit -m "refactor: Simplify authentication logic"
```

**2. Commit Frequency:**
- Commit often (small, logical changes)
- Each commit should be a working state
- Don't commit broken code

```bash
# ✅ Good - small, focused commits
git commit -m "Add User model"
git commit -m "Add User repository"
git commit -m "Add User service"
git commit -m "Add User controller"

# ❌ Bad - one huge commit
git commit -m "Add entire user management system"
```

**3. Branch Naming:**
```bash
# Good branch names:
feature/user-authentication
bugfix/login-error
hotfix/critical-security-issue
refactor/database-layer
docs/api-documentation

# Include ticket number:
feature/JIRA-123-user-profile
bugfix/ISSUE-456-payment-error
```

**4. .gitignore:**
```gitignore
# Node.js
node_modules/
npm-debug.log
.env

# IDE
.vscode/
.idea/
*.swp

# Build
dist/
build/
*.log

# OS
.DS_Store
Thumbs.db

# Credentials
*.key
*.pem
config/secrets.yml
```

**5. Never Commit:**
- Passwords, API keys, secrets
- node_modules, build artifacts
- IDE-specific files
- Large binary files
- Personal configuration

**6. Keep History Clean:**
```bash
# Before pushing, clean up commits
git rebase -i HEAD~3

# Squash "fix typo" commits into feature commits
# Reword unclear commit messages

# ⚠️ Never rewrite history that's been pushed!
# Only rebase/squash on local branches
```

**7. Regular Pulls:**
```bash
# Stay up-to-date with main branch
git checkout main
git pull origin main

# Update feature branch with main changes
git checkout feature/my-feature
git rebase main  # or git merge main
```

---

## Common Git Scenarios

**Scenario 1: Made commits on wrong branch**
```bash
# Currently on main, should be on feature branch
git checkout -b feature/correct-branch
git checkout main
git reset --hard HEAD~2  # Remove last 2 commits from main
```

**Scenario 2: Need to undo last commit**
```bash
# Keep changes
git reset HEAD~1

# Discard changes
git reset --hard HEAD~1

# Already pushed? Use revert instead
git revert HEAD
git push
```

**Scenario 3: Feature branch out of date**
```bash
# Update feature branch with latest main
git checkout feature/my-feature
git fetch origin
git rebase origin/main

# Resolve any conflicts
git add .
git rebase --continue

# Force push (your feature branch only!)
git push --force-with-lease
```

**Scenario 4: Accidentally committed sensitive file**
```bash
# Remove from repo but keep locally
git rm --cached secrets.env
git commit -m "Remove secrets file"

# Add to .gitignore
echo "secrets.env" >> .gitignore
git add .gitignore
git commit -m "Add secrets to gitignore"

# If already pushed, consider file compromised!
# Rotate all secrets immediately
```

---

## Key Takeaways for Jeneva Interview

### Git Priorities:
1. **Basic commands**: add, commit, push, pull, branch, merge
2. **Branching strategy**: Understand Git Flow or GitHub Flow
3. **Collaboration**: Pull requests, code review process
4. **Conflict resolution**: How to handle merge conflicts
5. **Best practices**: Commit messages, .gitignore, clean history

### Common Interview Questions:
- Explain your Git workflow
- What's the difference between merge and rebase?
- How do you resolve merge conflicts?
- What's your branching strategy?
- Explain pull requests and code review process
- What goes in .gitignore?

### Demonstrate:
- Proficiency with Git commands
- Understanding of collaboration workflows
- Experience with PRs and code review
- Knowledge of best practices
- Ability to troubleshoot common issues
