# Services & Dependency Injection - Sharing Logic

## What You'll Learn
- Creating services
- Dependency Injection pattern
- Service scope (@Injectable)
- Sharing data between components

## Creating a Service

```bash
ng generate service data
```

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Available app-wide
})
export class DataService {
  private data: any[] = [];

  getData() {
    return this.data;
  }

  addData(item: any) {
    this.data.push(item);
  }
}
```

## Using Service in Component

```typescript
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-list',
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class ListComponent {
  items: any[];

  constructor(private dataService: DataService) {
    this.items = dataService.getData();
  }
}
```

## Service Scopes

```typescript
// Root level (singleton)
@Injectable({ providedIn: 'root' })

// Module level
@NgModule({
  providers: [DataService]
})

// Component level (new instance)
@Component({
  providers: [DataService]
})
```

## Tasks
Create data service, share state between components, implement CRUD operations in service.
