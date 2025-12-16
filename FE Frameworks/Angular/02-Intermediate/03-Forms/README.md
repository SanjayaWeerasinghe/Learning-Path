# Forms - Handling User Input

## What You'll Learn
- Template-driven forms
- Reactive forms
- Form validation
- Custom validators

## Template-Driven Forms

```typescript
import { FormsModule } from '@angular/forms';
```

```html
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <input name="name" [(ngModel)]="user.name" required>
  <input name="email" [(ngModel)]="user.email" email required>
  <button [disabled]="!userForm.valid">Submit</button>
</form>
```

## Reactive Forms

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

export class UserFormComponent {
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18)]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <input formControlName="name">
  <div *ngIf="userForm.get('name')?.errors?.['required']">
    Name is required
  </div>

  <input formControlName="email">
  <button [disabled]="!userForm.valid">Submit</button>
</form>
```

## Custom Validator

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ageValidator(control: AbstractControl): ValidationErrors | null {
  const age = control.value;
  if (age && (age < 18 || age > 100)) {
    return { invalidAge: true };
  }
  return null;
}

// Usage
age: ['', [Validators.required, ageValidator]]
```

## Tasks
Build template-driven forms, create reactive forms with validation, implement custom validators.
