# Deployment - Going to Production

## What You'll Learn

- Environment variables
- Production best practices
- Deploying to cloud platforms
- Process management with PM2
- HTTPS and SSL
- Monitoring and logging

## Environment Variables

```javascript
// .env file
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
NODE_ENV=production

// Using dotenv
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
```

## Production Setup

```javascript
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();

// Security
app.use(helmet());

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// CORS
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
```

## PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start app.js

# Start with name
pm2 start app.js --name "my-app"

# Monitor
pm2 monit

# Logs
pm2 logs

# Restart
pm2 restart my-app

# Stop
pm2 stop my-app

# Startup script
pm2 startup
pm2 save
```

## Deployment Platforms

### Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create my-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### AWS / DigitalOcean / VPS

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd your-repo

# Install dependencies
npm install --production

# Start with PM2
pm2 start app.js
```

## Your Tasks

### Task 1: Environment Setup
Configure environment variables for development and production.

### Task 2: Security
Add helmet, rate limiting, and CORS.

### Task 3: PM2 Setup
Configure PM2 for process management.

### Task 4: Deploy to Heroku
Deploy your app to Heroku.

### Task 5: SSL Certificate
Set up HTTPS with Let's Encrypt.

### Task 6: Monitoring
Implement logging and monitoring.

### Task 7: CI/CD
Set up automated deployment with GitHub Actions.

## Production Checklist

- [ ] Use environment variables
- [ ] Enable HTTPS/SSL
- [ ] Add security headers (helmet)
- [ ] Implement rate limiting
- [ ] Configure CORS properly
- [ ] Set up error logging
- [ ] Use process manager (PM2)
- [ ] Enable compression
- [ ] Set NODE_ENV=production
- [ ] Monitor application health
- [ ] Set up automated backups
- [ ] Implement logging

## Congratulations!

You've completed the Node.js curriculum. You can now build production-ready backend applications!
