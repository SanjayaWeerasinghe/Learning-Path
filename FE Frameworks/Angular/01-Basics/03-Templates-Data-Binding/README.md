# Templates & Data Binding - Connecting Data to UI

## What You'll Learn
- Interpolation {{ }}
- Property binding []
- Event binding ()
- Two-way binding [()]
- Template expressions

## Data Binding Types

### Interpolation
```html
<h1>{{ title }}</h1>
<p>{{ 1 + 1 }}</p>
<p>{{ getName() }}</p>
```

### Property Binding
```html
<img [src]="imageUrl">
<button [disabled]="isDisabled">Click</button>
<div [class.active]="isActive"></div>
<div [style.color]="textColor"></div>
```

### Event Binding
```html
<button (click)="handleClick()">Click Me</button>
<input (input)="onInput($event)">
<input (keyup.enter)="onEnter()">
```

### Two-Way Binding
```typescript
import { FormsModule } from '@angular/forms';

// In module imports
imports: [FormsModule]
```

```html
<input [(ngModel)]="name">
<p>Hello, {{ name }}!</p>
```

## Complete Example

```typescript
export class AppComponent {
  title = 'Data Binding Demo';
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  isDisabled = false;
  name = '';

  handleClick() {
    alert('Button clicked!');
  }

  onInput(event: any) {
    console.log(event.target.value);
  }
}
```

## Tasks
Practice all binding types, build form with two-way binding, create interactive components.
