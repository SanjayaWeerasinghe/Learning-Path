# Validation - Input Data Validation

## What You'll Learn

- Bean Validation (JSR-380)
- Built-in validation annotations
- Custom validators
- Validation in DTOs
- Error handling for validation

## Setup

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

## Common Validation Annotations

```java
public class UserDTO {
    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must be less than 100")
    private Integer age;

    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotNull
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @DecimalMin(value = "0.0", message = "Price must be positive")
    private Double price;

    // Getters and setters
}
```

## Controller Validation

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
        // If validation fails, exception is thrown automatically
        User user = userService.createUser(userDTO);
        return ResponseEntity.ok(user);
    }
}
```

## Custom Validator

```java
// Custom annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AgeValidator.class)
public @interface ValidAge {
    String message() default "Invalid age";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
public class AgeValidator implements ConstraintValidator<ValidAge, Integer> {
    @Override
    public boolean isValid(Integer age, ConstraintValidatorContext context) {
        return age != null && age >= 18 && age <= 100;
    }
}

// Usage
@ValidAge(message = "Age must be between 18 and 100")
private Integer age;
```

## Global Exception Handler

```java
@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.badRequest().body(errors);
    }
}
```

## Your Tasks

### Task 1: Basic Validation
Add validation to a User DTO with @NotNull, @Email, @Size.

### Task 2: Complex Validation
Validate a Product DTO with price, quantity, and date constraints.

### Task 3: Custom Validator
Create a custom validator for password strength.

### Task 4: Error Handling
Implement global exception handler for validation errors.

### Task 5: Nested Validation
Validate nested objects in DTOs.

## Validation Annotations

- `@NotNull` - Value cannot be null
- `@NotBlank` - String cannot be null or empty
- `@Size` - String/Collection size constraints
- `@Email` - Valid email format
- `@Min/@Max` - Number range
- `@Pattern` - Regex pattern match
- `@Past/@Future` - Date in past/future
- `@Positive/@Negative` - Number sign

## Next Steps

Move to `05-Exception-Handling` for comprehensive error management!
