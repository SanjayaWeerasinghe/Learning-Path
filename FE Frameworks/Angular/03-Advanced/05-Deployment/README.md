# Deployment - Production Build & Deployment

## What You'll Learn
- Production builds
- Environment configuration
- Deployment to hosting platforms
- Performance optimization

## Production Build

```bash
# Build for production
ng build --configuration production

# Output in dist/ folder
```

## Environment Configuration

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};

// Usage in code
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;
```

## Deployment Platforms

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages

```bash
ng add angular-cli-ghpages
ng deploy --base-href=/repo-name/
```

## Performance Optimization

- Enable Ahead-of-Time (AOT) compilation
- Tree shaking
- Lazy loading modules
- Optimize images
- Enable gzip compression
- Use CDN for assets

## Tasks
Build production app, configure environments, deploy to Firebase/Netlify, optimize bundle size.

## Congratulations!

You've completed Angular! Build production-ready enterprise applications now!
