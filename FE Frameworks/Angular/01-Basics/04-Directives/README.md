# Directives - Manipulating the DOM

## What You'll Learn
- Structural directives (*ngIf, *ngFor, *ngSwitch)
- Attribute directives (ngClass, ngStyle)
- Creating custom directives

## Structural Directives

### *ngIf
```html
<div *ngIf="isVisible">This is visible</div>
<div *ngIf="isLoggedIn; else loginTemplate">Welcome back!</div>

<ng-template #loginTemplate>
  <div>Please login</div>
</ng-template>
```

### *ngFor
```html
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item }}
  </li>
</ul>
```

### *ngSwitch
```html
<div [ngSwitch]="color">
  <p *ngSwitchCase="'red'">Red color</p>
  <p *ngSwitchCase="'blue'">Blue color</p>
  <p *ngSwitchDefault>Other color</p>
</div>
```

## Attribute Directives

### ngClass
```html
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}"></div>
<div [ngClass]="myClasses"></div>
```

### ngStyle
```html
<div [ngStyle]="{'color': textColor, 'font-size': fontSize}"></div>
<div [ngStyle]="myStyles"></div>
```

## Custom Directive

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}

// Usage
<p appHighlight>This text is highlighted</p>
```

## Tasks
Use *ngIf/*ngFor for dynamic lists, create custom attribute directive, build dynamic UI with directives.
