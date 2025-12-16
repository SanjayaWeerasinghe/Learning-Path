# Design Patterns

Reusable solutions to commonly occurring problems in software design. These patterns provide templates for writing code that is maintainable, scalable, and easy to understand.

## Why Design Patterns?

- **Proven Solutions**: Battle-tested approaches to common problems
- **Common Vocabulary**: Communicate design decisions clearly
- **Best Practices**: Industry-standard solutions
- **Maintainability**: Easier to understand and modify code
- **Scalability**: Better architecture for growth

## Pattern Categories

### 1. Creational Patterns
Deal with object creation mechanisms.

- **Singleton**: Ensure only one instance exists
- **Factory Method**: Create objects without specifying exact class
- **Abstract Factory**: Create families of related objects
- **Builder**: Construct complex objects step by step
- **Prototype**: Clone existing objects

### 2. Structural Patterns
Deal with object composition and relationships.

- **Adapter**: Make incompatible interfaces work together
- **Decorator**: Add behavior to objects dynamically
- **Facade**: Provide simplified interface to complex subsystem
- **Proxy**: Control access to objects
- **Composite**: Treat individual and composed objects uniformly

### 3. Behavioral Patterns
Deal with object collaboration and responsibilities.

- **Strategy**: Encapsulate algorithms, make them interchangeable
- **Observer**: Notify dependents of state changes
- **Command**: Encapsulate requests as objects
- **Template Method**: Define algorithm skeleton, let subclasses override steps
- **State**: Change behavior when internal state changes

## Learning Path

```
1. Basics
   └─ Introduction to patterns
   └─ SOLID Principles

2. Creational Patterns
   └─ Singleton (most commonly used)
   └─ Factory Method
   └─ Abstract Factory
   └─ Builder
   └─ Prototype

3. Structural Patterns
   └─ Adapter
   └─ Decorator
   └─ Facade
   └─ Proxy
   └─ Composite

4. Behavioral Patterns
   └─ Strategy
   └─ Observer
   └─ Command
   └─ Template Method
   └─ State
```

## When to Use Each Pattern

| Pattern | Use When | Example |
|---------|----------|---------|
| Singleton | Need exactly one instance | Logger, Configuration |
| Factory | Don't know exact type at compile time | Document creator, UI controls |
| Builder | Complex object with many parameters | Query builder, HTTP request |
| Adapter | Integrate incompatible interfaces | Third-party library wrapper |
| Decorator | Add responsibilities dynamically | Logging, caching, validation |
| Facade | Simplify complex subsystem | Payment gateway, notification service |
| Strategy | Algorithm varies independently | Sorting, compression, pricing |
| Observer | Objects need notification of changes | Event handling, data binding |
| Command | Queue operations, undo/redo | Transaction management, macro recording |

## Interview Focus

### Most Commonly Asked
1. Singleton (implementation, thread safety)
2. Factory vs Abstract Factory
3. Decorator vs Inheritance
4. Strategy Pattern
5. Observer Pattern
6. Dependency Injection (related to patterns)

### Key Questions
- "Explain Singleton and its thread-safe implementation"
- "Difference between Factory Method and Abstract Factory?"
- "How would you implement Observer pattern?"
- "When to use Decorator over inheritance?"
- "Explain Strategy pattern with real example"
- "What are SOLID principles?"

## Technology Stack

All examples use:
- **C# (.NET 8)**: Primary language
- **ASP.NET Core**: Web applications
- **Entity Framework Core**: Data access
- **xUnit**: Unit testing
- **Real-world scenarios**: Practical examples

## Quick Reference

### SOLID Principles
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### Pattern Selection Guide

**Need to create objects?** → Creational Patterns
- One instance? → Singleton
- Family of objects? → Abstract Factory
- Complex construction? → Builder
- Unknown type? → Factory Method

**Need to structure objects?** → Structural Patterns
- Incompatible interface? → Adapter
- Add behavior? → Decorator
- Simplify interface? → Facade
- Control access? → Proxy

**Need object behavior?** → Behavioral Patterns
- Interchangeable algorithms? → Strategy
- Notify changes? → Observer
- Encapsulate request? → Command
- Algorithm skeleton? → Template Method

## Best Practices

1. **Don't force patterns**: Use when they solve a problem
2. **KISS principle**: Simple solutions over complex patterns
3. **Understand trade-offs**: Every pattern has costs
4. **Combine patterns**: Many real-world solutions use multiple patterns
5. **Refactor to patterns**: Don't prematurely apply
6. **Test patterns**: Ensure they're easier to test
7. **Document usage**: Explain why pattern was chosen

## Anti-Patterns to Avoid

- **Golden Hammer**: Using same pattern for every problem
- **Over-Engineering**: Applying patterns when not needed
- **Pattern Abuse**: Forcing patterns into simple problems
- **Premature Optimization**: Applying patterns "just in case"

## Resources

- Gang of Four (GoF) Book: Original design patterns
- Head First Design Patterns: Beginner-friendly
- Refactoring Guru: Visual explanations
- Microsoft Documentation: C# specific patterns

## Next Steps

1. Start with **SOLID Principles** (foundation)
2. Learn **Creational Patterns** (most practical)
3. Move to **Structural Patterns** (common in enterprise)
4. Master **Behavioral Patterns** (advanced)
5. Practice with **real projects**
6. Review **interview questions**

---

Remember: Patterns are tools, not rules. Use them when they make your code better, not just because they exist.
