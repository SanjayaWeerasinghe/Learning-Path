# Docker Compose

## Overview
Docker Compose simplifies managing multi-container applications. Define and run multiple containers with a single configuration file.

## Topics Covered

### 1. Docker Compose Basics
- What is Docker Compose?
- docker-compose.yml syntax
- Services, networks, volumes
- Compose CLI commands
- Version compatibility

### 2. Compose File Structure
```yaml
version: '3.8'

services:
  service-name:
    image: image:tag
    # OR
    build: ./path
    ports:
      - "host:container"
    volumes:
      - ./local:/container
    environment:
      - KEY=value
    depends_on:
      - other-service

networks:
  custom-network:
    driver: bridge

volumes:
  data-volume:
```

### 3. Essential Commands
```bash
docker-compose up          # Start services
docker-compose up -d       # Start in background
docker-compose down        # Stop and remove
docker-compose ps          # List services
docker-compose logs        # View logs
docker-compose exec        # Execute command
docker-compose build       # Build images
docker-compose restart     # Restart services
docker-compose stop        # Stop services
```

### 4. Service Configuration
- Building from Dockerfile
- Using existing images
- Environment variables
- Port mapping
- Volume mounts
- Network configuration
- Restart policies
- Resource limits

## Hands-On Tasks

### Task 1: Simple Web Application
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

Create `html/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Docker Compose Demo</title>
</head>
<body>
    <h1>Hello from Docker Compose!</h1>
</body>
</html>
```

Tasks:
1. Create the files
2. Run `docker-compose up`
3. Access localhost:8080
4. Make changes to HTML (hot reload)
5. View logs with `docker-compose logs`

### Task 2: Full-Stack Application
Create a Node.js + MongoDB application:

**app.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**package.json:**
```json
{
  "name": "docker-compose-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  },
  "scripts": {
    "start": "node app.js"
  }
}
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - mongo
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=myapp
    restart: unless-stopped

volumes:
  mongo-data:
```

Tasks:
1. Create all files
2. Run `docker-compose up --build`
3. Test the API at localhost:3000
4. Connect to MongoDB with mongo shell
5. Add an endpoint to store data

### Task 3: WordPress with MySQL
**docker-compose.yml:**
```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8000:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress-data:/var/www/html
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    volumes:
      - db-data:/var/lib/mysql

volumes:
  wordpress-data:
  db-data:
```

Tasks:
1. Create docker-compose.yml
2. Start services
3. Complete WordPress setup at localhost:8000
4. Create a post
5. Stop and start - verify data persists

### Task 4: Environment Variables
Create `.env` file:
```env
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret123
POSTGRES_DB=mydb

# Application
APP_PORT=3000
NODE_ENV=development
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "${APP_PORT}:3000"
    environment:
      - NODE_ENV=${NODE_ENV}
      - DB_HOST=postgres
      - DB_USER=${POSTGRES_USER}
      - DB_PASSWORD=${POSTGRES_PASSWORD}
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Tasks:
1. Create .env file
2. Add .env to .gitignore
3. Test with different environments
4. Create .env.example for documentation

### Task 5: Multi-Service Application
Complete microservices setup:

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api

  api:
    build: ./api
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - api

volumes:
  postgres-data:

networks:
  default:
    name: microservices-network
```

### Task 6: Health Checks
```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## Advanced Configuration

### Resource Limits
```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Profiles
```yaml
services:
  app:
    image: myapp

  debug:
    image: myapp-debug
    profiles: ["debug"]

# Run with: docker-compose --profile debug up
```

### Extension Fields
```yaml
x-common-variables: &common-env
  NODE_ENV: production
  LOG_LEVEL: info

services:
  api:
    environment:
      <<: *common-env
      SERVICE_NAME: api

  worker:
    environment:
      <<: *common-env
      SERVICE_NAME: worker
```

## Best Practices

1. **Use specific image tags** (not `latest`)
2. **Keep .env out of version control**
3. **Use named volumes** for data
4. **Implement health checks**
5. **Set restart policies**
6. **Use networks** to isolate services
7. **Limit resources** for production
8. **Use build args** for flexibility
9. **Document environment variables**
10. **Test with `docker-compose config`**

## Common Patterns

### Development vs Production
**docker-compose.yml** (base):
```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
```

**docker-compose.override.yml** (dev):
```yaml
version: '3.8'
services:
  app:
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
```

**docker-compose.prod.yml**:
```yaml
version: '3.8'
services:
  app:
    restart: always
    deploy:
      replicas: 3
```

Run dev: `docker-compose up`
Run prod: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

## Learning Resources
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Awesome Compose](https://github.com/docker/awesome-compose)

## Verification Checklist
- [ ] Can create docker-compose.yml files
- [ ] Understand service dependencies
- [ ] Can manage multi-container applications
- [ ] Know how to use volumes and networks
- [ ] Can work with environment variables
- [ ] Understand health checks
- [ ] Can separate dev/prod configurations

## Next Steps
Move to **02-Kubernetes-Basics** to learn container orchestration at scale.

## Estimated Time: 1 week
