# Pipes - Transforming Data in Templates

## What You'll Learn
- Built-in pipes
- Pipe parameters
- Chaining pipes
- Custom pipes

## Built-in Pipes

```html
<!-- Uppercase/Lowercase -->
<p>{{ 'hello' | uppercase }}</p>  <!-- HELLO -->
<p>{{ 'WORLD' | lowercase }}</p>  <!-- world -->

<!-- Date -->
<p>{{ today | date }}</p>
<p>{{ today | date:'short' }}</p>
<p>{{ today | date:'fullDate' }}</p>

<!-- Currency -->
<p>{{ price | currency }}</p>
<p>{{ price | currency:'EUR' }}</p>

<!-- Decimal -->
<p>{{ 3.14159 | number:'1.2-2' }}</p>  <!-- 3.14 -->

<!-- Percent -->
<p>{{ 0.5 | percent }}</p>  <!-- 50% -->

<!-- JSON (debugging) -->
<pre>{{ user | json }}</pre>

<!-- Slice -->
<p>{{ 'Hello World' | slice:0:5 }}</p>  <!-- Hello -->
```

## Custom Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}

// Usage
<p>{{ 'Angular' | reverse }}</p>  <!-- ralugnA -->
```

## Pipe with Parameters

```typescript
@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent: number = 1): number {
    return Math.pow(value, exponent);
  }
}

// Usage
<p>{{ 2 | exponential:3 }}</p>  <!-- 8 -->
```

## Chaining Pipes

```html
<p>{{ birthday | date:'fullDate' | uppercase }}</p>
```

## Tasks
Use built-in pipes for formatting, create custom pipes for text transformation, build data transformation pipeline.
