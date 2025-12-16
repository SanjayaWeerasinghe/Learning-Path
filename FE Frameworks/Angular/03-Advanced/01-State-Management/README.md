# State Management - NgRx

## What You'll Learn
- NgRx Store
- Actions, Reducers, Selectors
- Effects for side effects
- DevTools

## Setup

```bash
ng add @ngrx/store
ng add @ngrx/effects
ng add @ngrx/store-devtools
```

## Actions

```typescript
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
```

## Reducer

```typescript
import { createReducer, on } from '@ngrx/store';

export interface State {
  users: User[];
  loading: boolean;
}

const initialState: State = {
  users: [],
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  }))
);
```

## Selector

```typescript
import { createSelector } from '@ngrx/store';

export const selectUserState = (state: any) => state.users;

export const selectAllUsers = createSelector(
  selectUserState,
  (state: State) => state.users
);
```

## Component Usage

```typescript
import { Store } from '@ngrx/store';

export class UsersComponent {
  users$ = this.store.select(selectAllUsers);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}
```

## Tasks
Implement NgRx store, create actions/reducers, use selectors, add effects for API calls.
