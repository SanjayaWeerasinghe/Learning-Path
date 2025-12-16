# Routing - Navigation in Angular

## What You'll Learn
- Setting up routes
- RouterLink and navigation
- Route parameters
- Child routes
- Route guards

## Setting Up Routes

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Navigation

```html
<!-- Template navigation -->
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>

<router-outlet></router-outlet>
```

```typescript
// Programmatic navigation
import { Router } from '@angular/router';

constructor(private router: Router) {}

goToAbout() {
  this.router.navigate(['/about']);
}
```

## Route Parameters

```typescript
import { ActivatedRoute } from '@angular/router';

export class UserDetailComponent {
  userId: string;

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];

    // Or subscribe to changes
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
}
```

## Tasks
Set up routing, create navigation menu, use route parameters, implement child routes.
