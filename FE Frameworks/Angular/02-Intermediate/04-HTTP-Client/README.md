# HTTP Client - API Communication

## What You'll Learn
- HttpClient module
- GET, POST, PUT, DELETE requests
- Error handling
- Interceptors

## Setup

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]
})
```

## HTTP Service

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
```

## Using in Component

```typescript
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }
}
```

## Error Handling

```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users`)
    .pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => error);
      })
    );
}
```

## Tasks
Create API service, implement CRUD operations, handle errors, use interceptors for auth.
