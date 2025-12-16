# Setup & Hello World - Your First Angular App

## What You'll Learn
- Install Angular CLI
- Create Angular project
- Project structure understanding
- Run development server
- Create first component

## Setup

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Verify installation
ng version

# Create new project
ng new my-first-app

# Navigate to project
cd my-first-app

# Start development server
ng serve

# Open browser: http://localhost:4200
```

## Project Structure

```
my-first-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # Main component
│   │   ├── app.component.html  # Template
│   │   ├── app.component.css   # Styles
│   │   └── app.module.ts       # Main module
│   ├── index.html              # Main HTML
│   └── main.ts                 # Entry point
├── angular.json                # Angular config
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript config
```

## Your First Component

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App';
  name = 'John Doe';
}
```

```html
<!-- app.component.html -->
<h1>{{ title }}</h1>
<p>Welcome, {{ name }}!</p>
```

## Tasks
Build Hello World app, create custom component, understand project structure.
