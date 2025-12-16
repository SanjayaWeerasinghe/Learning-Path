# Lazy Loading - Performance Optimization

## What You'll Learn
- Module-based lazy loading
- Preloading strategies
- Route-level code splitting

## Lazy Loading Setup

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];
```

## Feature Module

```typescript
// admin-routing.module.ts
const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

## Preloading Strategy

```typescript
import { PreloadAllModules } from '@angular/router';

RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
})
```

## Tasks
Convert app to lazy-loaded modules, implement preloading, measure bundle size reduction.
