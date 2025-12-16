# Docker Basics

## Overview
Docker revolutionized software deployment through containerization. Learn to package applications with all dependencies into portable containers.

## Topics Covered

### 1. Container Concepts
- What are containers?
- Containers vs Virtual Machines
- Benefits of containerization
- Docker architecture (daemon, client, registry)

### 2. Docker Installation
- Installing Docker Desktop (Windows/Mac)
- Installing Docker Engine (Linux)
- Docker daemon and CLI
- Verifying installation

### 3. Essential Docker Commands
```bash
# Images
docker pull <image>
docker images
docker rmi <image>
docker build -t <name> .

# Containers
docker run <image>
docker ps
docker ps -a
docker stop <container>
docker start <container>
docker rm <container>

# Interaction
docker exec -it <container> bash
docker logs <container>
docker inspect <container>

# Cleanup
docker system prune
docker volume prune
docker network prune
```

### 4. Dockerfile Basics
- FROM, RUN, COPY, ADD
- WORKDIR, ENV, EXPOSE
- CMD vs ENTRYPOINT
- Multi-stage builds
- Layer caching

### 5. Docker Images
- Base images
- Official images
- Image tags and versioning
- Image layers
- Building custom images

### 6. Container Management
- Running containers
- Port mapping
- Volume mounting
- Environment variables
- Container networking

## Hands-On Tasks

### Task 1: Docker Installation & Setup
1. Install Docker Desktop or Docker Engine
2. Verify installation with `docker --version`
3. Run hello-world container
4. Pull nginx image from Docker Hub
5. List all downloaded images

### Task 2: Running Containers
1. Run nginx container with port mapping
   ```bash
   docker run -d -p 8080:80 nginx
   ```
2. Access nginx in browser at localhost:8080
3. View running containers
4. View container logs
5. Stop and remove the container

### Task 3: First Dockerfile
Create a simple Node.js application:

**app.js:**
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Docker!');
});
server.listen(3000);
console.log('Server running on port 3000');
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
```

Tasks:
1. Create the files above
2. Build the image: `docker build -t my-node-app .`
3. Run the container: `docker run -p 3000:3000 my-node-app`
4. Test in browser
5. View logs

### Task 4: Working with Volumes
1. Create a volume: `docker volume create my-data`
2. Run container with volume mounted
   ```bash
   docker run -d -v my-data:/data ubuntu sleep 3600
   ```
3. Write data to the volume
4. Stop container and start a new one with same volume
5. Verify data persists

### Task 5: Environment Variables
1. Create a Dockerfile that uses ENV variables
   ```dockerfile
   FROM alpine
   ENV NAME=World
   CMD echo "Hello $NAME"
   ```
2. Build and run with default ENV
3. Override ENV at runtime:
   ```bash
   docker run -e NAME=DevOps my-image
   ```

### Task 6: Multi-Container Application
1. Run a MySQL container
   ```bash
   docker run -d \
     --name mysql-db \
     -e MYSQL_ROOT_PASSWORD=password \
     -p 3306:3306 \
     mysql:8
   ```
2. Run phpMyAdmin to connect to MySQL
   ```bash
   docker run -d \
     --name phpmyadmin \
     --link mysql-db:db \
     -p 8080:80 \
     phpmyadmin
   ```
3. Access phpMyAdmin at localhost:8080

### Task 7: Building a Complete Web App
Create a Python Flask application:

**app.py:**
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello from Flask in Docker!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

**requirements.txt:**
```
flask==2.3.0
```

**Dockerfile:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
EXPOSE 5000
CMD ["python", "app.py"]
```

Tasks:
1. Create all files
2. Build the image
3. Run the container
4. Test the application
5. Publish to Docker Hub (optional)

## Dockerfile Best Practices
1. Use specific image tags (not 'latest')
2. Minimize layers
3. Use .dockerignore
4. Don't run as root user
5. Use multi-stage builds
6. Keep images small
7. One process per container

## Common Docker Patterns

### Development Environment
```bash
docker run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node:18 \
  npm start
```

### Production Image
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Learning Resources
- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker Curriculum](https://docker-curriculum.com/)

## Verification Checklist
- [ ] Understand container concepts
- [ ] Can build custom Docker images
- [ ] Comfortable with Dockerfile syntax
- [ ] Can run and manage containers
- [ ] Understand volumes and networking
- [ ] Can use environment variables
- [ ] Know how to debug containers

## Next Steps
Move to **04-CI-CD-Introduction** to learn continuous integration and deployment.

## Estimated Time: 1-2 weeks
