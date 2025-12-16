# RxJS & Observables - Reactive Programming

## What You'll Learn
- Observables basics
- Operators (map, filter, debounceTime)
- Subjects
- async pipe

## Observable Basics

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});

observable.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Complete')
});
```

## Common Operators

```typescript
import { of } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

// map
of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log);  // 2, 4, 6

// filter
of(1, 2, 3, 4).pipe(
  filter(x => x > 2)
).subscribe(console.log);  // 3, 4

// debounceTime (search example)
searchInput.valueChanges.pipe(
  debounceTime(300)
).subscribe(value => this.search(value));
```

## Subjects

```typescript
import { Subject } from 'rxjs';

const subject = new Subject();

subject.subscribe(value => console.log('A:', value));
subject.subscribe(value => console.log('B:', value));

subject.next(1);  // Both A and B receive 1
```

## Async Pipe

```typescript
users$: Observable<User[]>;

ngOnInit() {
  this.users$ = this.apiService.getUsers();
}
```

```html
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

## Tasks
Create observables, use operators for data transformation, implement search with debounceTime, use async pipe.
