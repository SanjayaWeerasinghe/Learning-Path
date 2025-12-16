# CI/CD Introduction

## Overview
Continuous Integration and Continuous Deployment (CI/CD) automate the software delivery process, enabling faster and more reliable releases.

## Topics Covered

### 1. CI/CD Concepts
- What is Continuous Integration?
- What is Continuous Deployment vs Delivery?
- Benefits of CI/CD
- CI/CD pipeline stages
- DevOps culture and practices

### 2. CI/CD Pipeline Stages
```
Code → Build → Test → Deploy → Monitor
  ↑                                ↓
  └────────── Feedback ────────────┘
```

1. **Source/Code**: Version control (Git)
2. **Build**: Compile code, build artifacts
3. **Test**: Automated tests (unit, integration, e2e)
4. **Deploy**: Release to environments (dev, staging, prod)
5. **Monitor**: Track performance and errors

### 3. CI/CD Tools Overview
- **GitHub Actions**: Native GitHub CI/CD
- **Jenkins**: Self-hosted automation server
- **GitLab CI**: Integrated with GitLab
- **CircleCI**: Cloud-based CI/CD
- **Travis CI**: Simple CI for open source
- **Azure DevOps**: Microsoft's solution

### 4. GitHub Actions Basics
- Workflows and jobs
- Triggers (push, pull_request, schedule)
- Runners (GitHub-hosted vs self-hosted)
- Actions marketplace
- Secrets management

### 5. Pipeline as Code
- YAML syntax
- Defining steps and jobs
- Environment variables
- Conditional execution
- Caching and artifacts

## Hands-On Tasks

### Task 1: First GitHub Actions Workflow
Create `.github/workflows/hello.yml`:
```yaml
name: Hello World

on: [push]

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: echo "Hello, DevOps!"

      - name: Show date
        run: date
```

Tasks:
1. Create a GitHub repository
2. Add the workflow file
3. Push to GitHub
4. View the workflow run in Actions tab
5. Check the logs

### Task 2: Node.js CI Pipeline
Create `.github/workflows/node-ci.yml`:
```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

Create a simple Node.js project:

**package.json:**
```json
{
  "name": "ci-demo",
  "version": "1.0.0",
  "scripts": {
    "test": "jest",
    "build": "echo 'Building...'"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

**sum.js:**
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

**sum.test.js:**
```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Tasks:
1. Create the project files
2. Initialize npm and install jest
3. Add the workflow
4. Push to GitHub
5. Verify tests run automatically

### Task 3: Docker Build Pipeline
Create `.github/workflows/docker-build.yml`:
```yaml
name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: myapp:latest
```

Tasks:
1. Create a Dockerfile for your app
2. Add the workflow
3. Push to GitHub
4. Verify Docker image builds successfully

### Task 4: Environment Variables & Secrets
```yaml
name: Use Secrets

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
    steps:
      - uses: actions/checkout@v3

      - name: Use environment variable
        run: echo "Environment: $NODE_ENV"

      - name: Use secret
        env:
          API_KEY: ${{ secrets.API_KEY }}
        run: echo "API key is set"
```

Tasks:
1. Add a secret in GitHub repo settings
2. Create workflow that uses the secret
3. Run the workflow
4. Verify secret is not exposed in logs

### Task 5: Multi-Job Workflow
```yaml
name: Multi-Job Pipeline

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: echo "Building..."
      - run: npm install
      - run: npm run build

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: echo "Testing..."
      - run: npm install
      - run: npm test

  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: echo "Deploying to production..."
```

Tasks:
1. Create workflow with dependencies
2. Observe job execution order
3. Add conditional deployment
4. Test on different branches

### Task 6: Artifact Management
```yaml
name: Build and Upload Artifacts

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build project
        run: |
          mkdir -p dist
          echo "Build output" > dist/app.txt

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: dist/

  download:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: build-output

      - name: Display artifact
        run: cat app.txt
```

## CI/CD Best Practices

### 1. Pipeline Design
- Keep pipelines fast (<10 minutes)
- Fail fast on errors
- Run tests in parallel
- Cache dependencies
- Use matrix builds for multiple versions

### 2. Testing Strategy
- Unit tests (fast, isolated)
- Integration tests (moderate speed)
- End-to-end tests (slow, critical paths only)
- Code quality checks (linting, formatting)
- Security scanning

### 3. Deployment Strategy
- Blue-green deployments
- Canary releases
- Rolling updates
- Feature flags
- Rollback procedures

### 4. Security
- Never commit secrets
- Use secret management
- Scan for vulnerabilities
- Sign commits and images
- Audit pipeline access

## Common Pipeline Patterns

### Simple Web App Pipeline
```
1. Checkout code
2. Install dependencies
3. Run linter
4. Run unit tests
5. Build application
6. Run integration tests
7. Build Docker image
8. Push to registry
9. Deploy to staging
10. Run smoke tests
11. Deploy to production
```

### Library/Package Pipeline
```
1. Checkout code
2. Install dependencies
3. Run tests
4. Build package
5. Publish to npm/PyPI
6. Create GitHub release
7. Update documentation
```

## Learning Resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [CI/CD Best Practices](https://about.gitlab.com/topics/ci-cd/)
- [The DevOps Handbook](https://itrevolution.com/product/the-devops-handbook/)

## Verification Checklist
- [ ] Understand CI/CD concepts and benefits
- [ ] Can create basic GitHub Actions workflows
- [ ] Know how to run tests in CI
- [ ] Can build and push Docker images
- [ ] Understand secrets management
- [ ] Can create multi-stage pipelines
- [ ] Know deployment strategies

## Next Steps
Move to **05-Shell-Scripting** to learn automation scripting.

## Estimated Time: 1-2 weeks
