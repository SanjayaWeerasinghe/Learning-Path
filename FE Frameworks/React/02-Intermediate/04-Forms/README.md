# Forms in React

## Introduction

Forms are essential for user input in web applications. React handles forms differently from traditional HTML forms by using controlled components where form data is managed by React state. Understanding form handling in React is crucial for building interactive applications that collect and validate user input.

## Key Concepts

### 1. Form Fundamentals
- **Controlled Components**: Form inputs controlled by React state
- **Uncontrolled Components**: Form inputs managed by the DOM
- **Form State**: Managing form data in component state
- **Event Handling**: Responding to user input

### 2. Input Types
- **Text Inputs**: text, email, password, number
- **Checkboxes**: Single and multiple checkboxes
- **Radio Buttons**: Mutually exclusive options
- **Select Dropdowns**: Single and multiple select
- **Textareas**: Multi-line text input
- **File Inputs**: File upload handling

### 3. Form Patterns
- **Validation**: Client-side form validation
- **Submission**: Handling form submit events
- **Reset**: Clearing form data
- **Dynamic Forms**: Adding/removing fields

## Controlled Components

### Basic Text Input

```jsx
import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter text..."
      />
      <button type="submit">Submit</button>
      <p>You typed: {value}</p>
    </form>
  );
}
```

### Multiple Inputs

```jsx
import { useState } from 'react';

function MultipleInputs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Different Input Types

### Checkbox Inputs

```jsx
import { useState } from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  const [skills, setSkills] = useState({
    javascript: false,
    react: false,
    nodejs: false
  });

  const handleSingleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const handleMultipleCheckboxes = (e) => {
    const { name, checked } = e.target;
    setSkills({
      ...skills,
      [name]: checked
    });
  };

  return (
    <div>
      {/* Single Checkbox */}
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleSingleCheckbox}
        />
        I agree to terms and conditions
      </label>

      {/* Multiple Checkboxes */}
      <h3>Select your skills:</h3>
      <label>
        <input
          type="checkbox"
          name="javascript"
          checked={skills.javascript}
          onChange={handleMultipleCheckboxes}
        />
        JavaScript
      </label>

      <label>
        <input
          type="checkbox"
          name="react"
          checked={skills.react}
          onChange={handleMultipleCheckboxes}
        />
        React
      </label>

      <label>
        <input
          type="checkbox"
          name="nodejs"
          checked={skills.nodejs}
          onChange={handleMultipleCheckboxes}
        />
        Node.js
      </label>

      <p>Selected: {Object.keys(skills).filter(key => skills[key]).join(', ')}</p>
    </div>
  );
}
```

### Radio Buttons

```jsx
import { useState } from 'react';

function RadioExample() {
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <div>
      <h3>Gender:</h3>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="other"
          checked={gender === 'other'}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
      </label>

      <h3>Experience Level:</h3>
      {['beginner', 'intermediate', 'advanced'].map(level => (
        <label key={level}>
          <input
            type="radio"
            name="experience"
            value={level}
            checked={experience === level}
            onChange={(e) => setExperience(e.target.value)}
          />
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </label>
      ))}
    </div>
  );
}
```

### Select Dropdown

```jsx
import { useState } from 'react';

function SelectExample() {
  const [country, setCountry] = useState('');
  const [languages, setLanguages] = useState([]);

  const handleMultipleSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setLanguages(selected);
  };

  return (
    <div>
      {/* Single Select */}
      <label>
        Country:
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
          <option value="australia">Australia</option>
        </select>
      </label>

      {/* Multiple Select */}
      <label>
        Languages (hold Ctrl/Cmd to select multiple):
        <select
          multiple
          value={languages}
          onChange={handleMultipleSelect}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </label>

      <p>Selected: {languages.join(', ')}</p>
    </div>
  );
}
```

### Textarea

```jsx
import { useState } from 'react';

function TextareaExample() {
  const [bio, setBio] = useState('');

  return (
    <div>
      <label>
        Bio:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          rows="5"
          cols="50"
        />
      </label>
      <p>Character count: {bio.length}</p>
    </div>
  );
}
```

### File Input

```jsx
import { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create preview for images
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />

      {file && (
        <div>
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File type: {file.type}</p>
        </div>
      )}

      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />
      )}
    </div>
  );
}
```

## Form Validation

### Basic Validation

```jsx
import { useState } from 'react';

function ValidationExample() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form is valid:', formData);
      // Submit form
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

### Real-time Validation

```jsx
import { useState, useEffect } from 'react';

function RealtimeValidation() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValid(emailRegex.test(email));
  }, [email]);

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        className={touched && !isValid ? 'invalid' : ''}
      />
      {touched && !isValid && email.length > 0 && (
        <span className="error">Please enter a valid email</span>
      )}
      {touched && isValid && (
        <span className="success">✓ Valid email</span>
      )}
    </div>
  );
}
```

## Practical Tasks

### Task 1: Build a Registration Form

```jsx
import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.age < 18) {
      newErrors.age = 'You must be at least 18 years old';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Registration successful:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>Welcome, {formData.username}!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Register</h2>

      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          I accept the terms and conditions
        </label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

### Task 2: Create a Survey Form

```jsx
import { useState } from 'react';

function SurveyForm() {
  const [survey, setSurvey] = useState({
    name: '',
    rating: '',
    feedback: '',
    recommend: '',
    improvements: []
  });

  const improvements = [
    'UI/UX',
    'Performance',
    'Features',
    'Documentation',
    'Support'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSurvey({ ...survey, improvements: [...survey.improvements, value] });
    } else {
      setSurvey({
        ...survey,
        improvements: survey.improvements.filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Survey submitted:', survey);
    alert('Thank you for your feedback!');
  };

  return (
    <form onSubmit={handleSubmit} className="survey-form">
      <h2>Customer Satisfaction Survey</h2>

      <div className="form-group">
        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={survey.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>How would you rate our service?</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num}>
              <input
                type="radio"
                name="rating"
                value={num}
                checked={survey.rating === String(num)}
                onChange={handleChange}
              />
              {num} Star{num > 1 ? 's' : ''}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Would you recommend us to others?</label>
        <label>
          <input
            type="radio"
            name="recommend"
            value="yes"
            checked={survey.recommend === 'yes'}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="recommend"
            value="no"
            checked={survey.recommend === 'no'}
            onChange={handleChange}
          />
          No
        </label>
      </div>

      <div className="form-group">
        <label>What areas need improvement? (Select all that apply)</label>
        {improvements.map(item => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={survey.improvements.includes(item)}
              onChange={handleCheckboxChange}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Additional Feedback:</label>
        <textarea
          name="feedback"
          value={survey.feedback}
          onChange={handleChange}
          rows="4"
          placeholder="Tell us more..."
        />
      </div>

      <button type="submit">Submit Survey</button>
    </form>
  );
}
```

### Task 3: Build a Dynamic Form Builder

```jsx
import { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([
    { id: 1, label: '', value: '' }
  ]);

  const addField = () => {
    setFields([...fields, { id: Date.now(), label: '', value: '' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', fields);
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <h2>Dynamic Form Builder</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="field-group">
          <input
            type="text"
            placeholder="Field Label"
            value={field.label}
            onChange={(e) => updateField(field.id, 'label', e.target.value)}
          />
          <input
            type="text"
            placeholder="Field Value"
            value={field.value}
            onChange={(e) => updateField(field.id, 'value', e.target.value)}
          />
          {fields.length > 1 && (
            <button type="button" onClick={() => removeField(field.id)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addField}>Add Field</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Best Practices

1. **Controlled Components**: Use controlled components for form inputs
2. **Validation**: Validate both on submit and in real-time
3. **Clear Errors**: Clear field errors when user starts typing
4. **Disable Submit**: Disable submit button while processing
5. **Accessibility**: Use proper labels and ARIA attributes
6. **Form Reset**: Provide a way to reset the form
7. **Error Messages**: Show clear, helpful error messages
8. **Loading States**: Show loading indicators during submission

## Common Pitfalls

1. **Uncontrolled Inputs**: Mixing controlled and uncontrolled components
2. **Missing preventDefault**: Form submits and page reloads
3. **Not Handling All Input Types**: Forgetting checkbox `checked` vs `value`
4. **Direct State Mutation**: Mutating form state directly
5. **Poor Validation**: Client-side only, no server validation
6. **No Error Handling**: Not handling submission errors
7. **Missing Labels**: Accessibility issues with unlabeled inputs
8. **Stale Closures**: Event handlers with stale state values

## Interview Questions

### Question 1: What are controlled components in React?
**Answer**: Controlled components are form inputs whose values are controlled by React state. The input's value is set by state, and updates happen through onChange handlers that update that state. This makes React the "single source of truth" for the form data. Example: `<input value={state} onChange={e => setState(e.target.value)} />`. This pattern gives you full control over the input, enabling validation, formatting, and conditional logic.

### Question 2: What's the difference between controlled and uncontrolled components?
**Answer**: Controlled components have their value controlled by React state, while uncontrolled components store their own state in the DOM. Controlled: `<input value={state} onChange={handler} />`. Uncontrolled: `<input defaultValue="initial" ref={inputRef} />`. Controlled components are recommended because they provide better control, validation, and React-driven updates. Uncontrolled components are simpler for basic cases and can use refs to access values.

### Question 3: How do you handle multiple form inputs efficiently?
**Answer**: Use a single state object and a generic handler: `const [form, setForm] = useState({name: '', email: ''})`. Handler: `const handleChange = (e) => { const {name, value} = e.target; setForm({...form, [name]: value}) }`. Use the input's `name` attribute to identify which field changed. This pattern scales well and reduces code duplication. For complex forms, consider form libraries like Formik or React Hook Form.

### Question 4: How do you validate forms in React?
**Answer**: Multiple approaches: (1) Validation on submit: check all fields when form submits, (2) Real-time validation: validate as user types using useEffect or onChange, (3) On blur: validate when field loses focus. Create a validate function that returns errors object. Display errors conditionally. Use regex for patterns, check required fields, compare values (password confirmation). Always validate on server too, client-side validation is for UX only.

### Question 5: Why is preventDefault() important in form handling?
**Answer**: `e.preventDefault()` in the submit handler prevents the default form submission behavior, which would reload the page. Without it, the browser submits the form traditionally, causing a page refresh and losing all React state. We want to handle submission with JavaScript, make API calls, update state, and stay on the same page. This is essential for Single Page Applications (SPAs).

### Question 6: How do you handle file uploads in React?
**Answer**: File inputs are always uncontrolled. Access files via event: `const handleChange = (e) => { const file = e.target.files[0]; setFile(file) }`. For preview, use FileReader API. For upload, use FormData: `const formData = new FormData(); formData.append('file', file); fetch('/upload', {method: 'POST', body: formData})`. Can't set file input value programmatically for security. Use `accept` attribute to filter file types.

### Question 7: How do you reset a form in React?
**Answer**: Reset state to initial values: `setFormData(initialFormData)`. Can also use form's native reset: `formRef.current.reset()` with uncontrolled components. For controlled components, resetting state is cleaner. Can create a reset function: `const resetForm = () => setFormData({name: '', email: ''})`. Call it after successful submission or on reset button click. Clear errors too when resetting.

### Question 8: What are form libraries and when should you use them?
**Answer**: Libraries like Formik, React Hook Form, and Final Form handle form state, validation, and submission. Use them for: (1) Complex forms with many fields, (2) Advanced validation requirements, (3) Form arrays/dynamic fields, (4) Performance optimization in large forms. They reduce boilerplate, provide validation schemas (Yup, Zod), handle errors, and optimize re-renders. For simple forms, vanilla React is sufficient.

## Resources

- [Forms in React](https://react.dev/reference/react-dom/components/input)
- [Controlled Components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [Formik Library](https://formik.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
