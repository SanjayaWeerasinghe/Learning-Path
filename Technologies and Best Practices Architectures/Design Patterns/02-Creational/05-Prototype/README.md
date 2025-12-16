# Prototype Pattern

## What You'll Learn
- Understanding the Prototype design pattern
- Cloning objects instead of creating new ones
- Shallow vs Deep copying
- When to use Prototype pattern
- Implementing Cloneable interface

## Concept Overview

The Prototype pattern creates new objects by copying existing objects (prototypes), rather than creating new instances from scratch. This is useful when object creation is expensive.

### Key Benefits
- **Performance**: Avoid expensive initialization
- **Flexibility**: Create objects at runtime
- **Reduced Subclasses**: Clone instead of creating many subclasses
- **Hide Complexity**: Clone complex objects easily

### When to Use
- Object creation is expensive (database calls, network requests)
- Similar objects with small differences
- Avoid subclass explosion
- Runtime object creation needed
- Objects are configured in complex ways

## Basic Implementation

```java
// Using Cloneable interface
public class Shape implements Cloneable {
    private String type;
    private String color;
    private int x;
    private int y;

    public Shape(String type) {
        this.type = type;
    }

    // Copy constructor (alternative approach)
    public Shape(Shape source) {
        this.type = source.type;
        this.color = source.color;
        this.x = source.x;
        this.y = source.y;
    }

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();  // Shallow copy
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // Can't happen
        }
    }

    // Getters and setters
    public void setColor(String color) { this.color = color; }
    public void setPosition(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return type + " at (" + x + "," + y + ") color: " + color;
    }
}

// Usage
Shape circle = new Shape("Circle");
circle.setColor("Red");
circle.setPosition(10, 20);

Shape clone = circle.clone();
clone.setColor("Blue");

System.out.println(circle);  // Circle at (10,20) color: Red
System.out.println(clone);   // Circle at (10,20) color: Blue
```

## Shallow vs Deep Copy

### Shallow Copy
```java
public class Person implements Cloneable {
    private String name;
    private Address address;  // Reference type

    @Override
    public Person clone() {
        try {
            return (Person) super.clone();  // Shallow copy
            // name is copied (String is immutable)
            // address reference is copied (same object!)
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
```

### Deep Copy
```java
public class Person implements Cloneable {
    private String name;
    private Address address;

    @Override
    public Person clone() {
        try {
            Person cloned = (Person) super.clone();
            // Deep copy the address
            cloned.address = address.clone();  // Address must also be Cloneable
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Address implements Cloneable {
    private String street;
    private String city;

    @Override
    public Address clone() {
        try {
            return (Address) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
```

## Your Tasks

### Task 1: Document Cloning
Create a document prototype system.

```java
public class Document implements Cloneable {
    private String title;
    private String content;
    private String author;
    private Date createdDate;
    private List<String> tags;

    public Document(String title, String author) {
        this.title = title;
        this.author = author;
        this.createdDate = new Date();
        this.tags = new ArrayList<>();
    }

    @Override
    public Document clone() {
        try {
            Document cloned = (Document) super.clone();
            // Deep copy the date and list
            cloned.createdDate = (Date) this.createdDate.clone();
            cloned.tags = new ArrayList<>(this.tags);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    public void addTag(String tag) {
        tags.add(tag);
    }

    // Getters and setters
}

// Test
public class DocumentTest {
    public static void main(String[] args) {
        Document original = new Document("Report", "John");
        original.setContent("Original content");
        original.addTag("important");

        Document copy = original.clone();
        copy.setTitle("Report Copy");
        copy.addTag("draft");

        System.out.println("Original: " + original.getTitle() +
                         ", Tags: " + original.getTags());
        System.out.println("Copy: " + copy.getTitle() +
                         ", Tags: " + copy.getTags());
    }
}
```

**Expected Output:**
```
Original: Report, Tags: [important]
Copy: Report Copy, Tags: [important, draft]
```

### Task 2: Game Character Prototype
Create game characters using prototypes.

```java
public abstract class GameCharacter implements Cloneable {
    protected String name;
    protected int health;
    protected int attackPower;
    protected List<String> abilities;

    @Override
    public GameCharacter clone() {
        try {
            GameCharacter cloned = (GameCharacter) super.clone();
            cloned.abilities = new ArrayList<>(this.abilities);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    public abstract void attack();
}

class Warrior extends GameCharacter {
    public Warrior() {
        this.health = 100;
        this.attackPower = 20;
        this.abilities = new ArrayList<>();
        abilities.add("Sword Strike");
        abilities.add("Shield Block");
    }

    @Override
    public void attack() {
        System.out.println("Warrior attacks with sword!");
    }
}

class Mage extends GameCharacter {
    public Mage() {
        this.health = 70;
        this.attackPower = 30;
        this.abilities = new ArrayList<>();
        abilities.add("Fireball");
        abilities.add("Ice Shield");
    }

    @Override
    public void attack() {
        System.out.println("Mage casts fireball!");
    }
}

// Prototype Registry
class CharacterRegistry {
    private Map<String, GameCharacter> prototypes = new HashMap<>();

    public CharacterRegistry() {
        prototypes.put("warrior", new Warrior());
        prototypes.put("mage", new Mage());
    }

    public GameCharacter createCharacter(String type, String name) {
        GameCharacter character = prototypes.get(type).clone();
        character.name = name;
        return character;
    }
}

// Usage
CharacterRegistry registry = new CharacterRegistry();
GameCharacter warrior1 = registry.createCharacter("warrior", "Conan");
GameCharacter warrior2 = registry.createCharacter("warrior", "Aragorn");
```

### Task 3: Email Template System
Create reusable email templates.

```java
public class EmailTemplate implements Cloneable {
    private String subject;
    private String body;
    private String footer;
    private List<String> attachments;

    @Override
    public EmailTemplate clone() {
        try {
            EmailTemplate cloned = (EmailTemplate) super.clone();
            cloned.attachments = new ArrayList<>(this.attachments);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    // Implement getters, setters, and placeholder replacement
    public void setRecipientName(String name) {
        this.body = this.body.replace("{{name}}", name);
    }
}

class TemplateManager {
    private Map<String, EmailTemplate> templates = new HashMap<>();

    public void addTemplate(String name, EmailTemplate template) {
        templates.put(name, template);
    }

    public EmailTemplate getTemplate(String name) {
        return templates.get(name).clone();
    }
}

// Usage
TemplateManager manager = new TemplateManager();

EmailTemplate welcome = new EmailTemplate();
welcome.setSubject("Welcome to our service!");
welcome.setBody("Hello {{name}}, welcome aboard!");
manager.addTemplate("welcome", welcome);

EmailTemplate email1 = manager.getTemplate("welcome");
email1.setRecipientName("John");

EmailTemplate email2 = manager.getTemplate("welcome");
email2.setRecipientName("Jane");
```

### Task 4: Graphics Editor Shapes
Create a shape prototype registry for a graphics editor.

```java
public abstract class Shape implements Cloneable {
    protected int x, y;
    protected String color;

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    public abstract void draw();
}

class Circle extends Shape {
    private int radius;

    public Circle(int radius) {
        this.radius = radius;
        this.color = "Black";
    }

    @Override
    public void draw() {
        System.out.println("Circle: radius=" + radius +
                         " at (" + x + "," + y + ") color=" + color);
    }

    // Getters and setters
}

class Rectangle extends Shape {
    private int width, height;

    // Implement similarly
}

class ShapeCache {
    private static Map<String, Shape> shapeMap = new HashMap<>();

    public static void loadCache() {
        Circle circle = new Circle(5);
        shapeMap.put("circle", circle);

        Rectangle rectangle = new Rectangle(10, 20);
        shapeMap.put("rectangle", rectangle);
    }

    public static Shape getShape(String type) {
        Shape cached = shapeMap.get(type);
        return cached.clone();
    }
}
```

### Task 5: Database Record Prototype
Clone database records for testing.

```java
public class DatabaseRecord implements Cloneable {
    private Long id;
    private String name;
    private Map<String, Object> fields;
    private Date lastModified;

    public DatabaseRecord() {
        this.fields = new HashMap<>();
        this.lastModified = new Date();
    }

    @Override
    public DatabaseRecord clone() {
        try {
            DatabaseRecord cloned = (DatabaseRecord) super.clone();
            // Deep copy mutable fields
            cloned.fields = new HashMap<>(this.fields);
            cloned.lastModified = (Date) this.lastModified.clone();
            // Don't copy ID (new record should get new ID)
            cloned.id = null;
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    public void setField(String key, Object value) {
        fields.put(key, value);
    }

    public Object getField(String key) {
        return fields.get(key);
    }

    // Other methods
}
```

### Task 6: Product Catalog
Create product variants using prototypes.

```java
public class Product implements Cloneable {
    private String id;
    private String name;
    private double basePrice;
    private Map<String, String> specifications;
    private List<String> images;

    @Override
    public Product clone() {
        try {
            Product cloned = (Product) super.clone();
            cloned.specifications = new HashMap<>(this.specifications);
            cloned.images = new ArrayList<>(this.images);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    // Create variant
    public Product createVariant(String variantId, double priceDelta) {
        Product variant = this.clone();
        variant.id = variantId;
        variant.basePrice += priceDelta;
        return variant;
    }
}

// Usage
Product basePhone = new Product();
basePhone.setName("SmartPhone");
basePhone.setBasePrice(500.0);
basePhone.addSpecification("RAM", "4GB");

Product premiumPhone = basePhone.createVariant("SP-001", 200.0);
premiumPhone.setSpecification("RAM", "8GB");
```

### Task 7: Configuration Prototype
Clone configuration objects.

```java
public class Configuration implements Cloneable {
    private Map<String, String> settings;
    private List<String> plugins;
    private Properties properties;

    public Configuration() {
        settings = new HashMap<>();
        plugins = new ArrayList<>();
        properties = new Properties();
    }

    @Override
    public Configuration clone() {
        try {
            Configuration cloned = (Configuration) super.clone();
            cloned.settings = new HashMap<>(this.settings);
            cloned.plugins = new ArrayList<>(this.plugins);
            cloned.properties = (Properties) this.properties.clone();
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    // Configuration methods
}

class ConfigurationManager {
    private Configuration defaultConfig;

    public ConfigurationManager() {
        defaultConfig = new Configuration();
        // Load default settings
        defaultConfig.setSetting("theme", "light");
        defaultConfig.setSetting("language", "en");
    }

    public Configuration createCustomConfig() {
        return defaultConfig.clone();
    }
}
```

### Task 8: Tree Structure Cloning
Clone complex tree structures.

```java
public class TreeNode implements Cloneable {
    private String value;
    private List<TreeNode> children;

    public TreeNode(String value) {
        this.value = value;
        this.children = new ArrayList<>();
    }

    @Override
    public TreeNode clone() {
        try {
            TreeNode cloned = (TreeNode) super.clone();
            // Deep copy children
            cloned.children = new ArrayList<>();
            for (TreeNode child : this.children) {
                cloned.children.add(child.clone());
            }
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    public void addChild(TreeNode child) {
        children.add(child);
    }

    public void print(int level) {
        System.out.println("  ".repeat(level) + value);
        for (TreeNode child : children) {
            child.print(level + 1);
        }
    }
}
```

## Common Pitfalls

### 1. Shallow Copy When Deep Copy Needed
```java
// ❌ Wrong - references are shared
@Override
public MyClass clone() {
    return (MyClass) super.clone();  // Shallow copy of List!
}

// ✅ Correct - deep copy
@Override
public MyClass clone() {
    MyClass cloned = (MyClass) super.clone();
    cloned.list = new ArrayList<>(this.list);
    return cloned;
}
```

### 2. Forgetting to Clone Nested Objects
```java
// ✅ Clone all levels
@Override
public Person clone() {
    Person cloned = (Person) super.clone();
    cloned.address = address.clone();  // Don't forget!
    cloned.contacts = new ArrayList<>();
    for (Contact c : contacts) {
        cloned.contacts.add(c.clone());  // Clone each element
    }
    return cloned;
}
```

## Alternative: Copy Constructor

```java
public class Person {
    private String name;
    private int age;

    // Copy constructor
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
    }

    // More explicit than clone()
}

// Usage
Person original = new Person("John", 30);
Person copy = new Person(original);
```

## Best Practices

1. **Override clone() properly**: Call super.clone() first
2. **Deep copy mutable objects**: Don't share references
3. **Consider copy constructor**: Often clearer than clone()
4. **Document copy semantics**: Shallow vs deep
5. **Use prototype registry**: Centralize prototype management

## Real-World Examples

- `Object.clone()` in Java
- Prototype-based languages (JavaScript)
- Graphics editors (shape cloning)
- Document templates
- Game object spawning

## Next Steps

Congratulations on completing all Creational Patterns! Move on to `03-Structural` patterns to learn about organizing classes and objects!

**Challenge**: Create a complex form builder where forms can be cloned with all their fields, validation rules, and event handlers, supporting both shallow and deep cloning modes.
