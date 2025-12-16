# Components - Building Blocks of Angular

## What You'll Learn
- Component architecture
- Creating components with CLI
- Component lifecycle hooks
- Component communication (@Input, @Output)
- Component composition

## Creating Components

```bash
# Generate component with CLI
ng generate component user
# or shorthand
ng g c user
```

## Component Structure

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name: string = 'John Doe';
  age: number = 30;

  constructor() { }

  ngOnInit(): void {
    console.log('Component initialized');
  }

  greet(): void {
    alert(`Hello, ${this.name}!`);
  }
}
```

## Parent-Child Communication

```typescript
// Child component
@Component({
  selector: 'app-child',
  template: `
    <h3>{{ childData }}</h3>
    <button (click)="sendData()">Send to Parent</button>
  `
})
export class ChildComponent {
  @Input() childData: string;
  @Output() dataEvent = new EventEmitter<string>();

  sendData() {
    this.dataEvent.emit('Data from child');
  }
}

// Parent template
<app-child [childData]="parentData" (dataEvent)="receiveData($event)"></app-child>
```

## Lifecycle Hooks
- ngOnInit - Initialization
- ngOnChanges - Input changes
- ngOnDestroy - Cleanup

## Tasks
Create components, implement parent-child communication, use lifecycle hooks.
