# Abstract Factory Pattern

## What You'll Learn
- Understanding Abstract Factory pattern
- Difference between Factory and Abstract Factory
- Creating families of related objects
- When to use Abstract Factory
- Platform-independent code design

## Concept Overview

Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a factory of factories.

### Key Concepts
- **Family of Products**: Related objects that work together
- **Multiple Factories**: Different factories create different product families
- **Consistency**: Ensures products from same family are used together

### When to Use
- System needs to be independent of how products are created
- System needs to work with multiple families of products
- Related products must be used together
- You want to provide a library of products without exposing implementation

## Structure

```java
// Abstract Products
interface Button {
    void render();
}

interface Checkbox {
    void render();
}

// Concrete Products - Windows Family
class WindowsButton implements Button {
    public void render() {
        System.out.println("Rendering Windows button");
    }
}

class WindowsCheckbox implements Checkbox {
    public void render() {
        System.out.println("Rendering Windows checkbox");
    }
}

// Concrete Products - Mac Family
class MacButton implements Button {
    public void render() {
        System.out.println("Rendering Mac button");
    }
}

class MacCheckbox implements Checkbox {
    public void render() {
        System.out.println("Rendering Mac checkbox");
    }
}

// Abstract Factory
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factories
class WindowsFactory implements GUIFactory {
    public Button createButton() {
        return new WindowsButton();
    }

    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }

    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

// Client code
class Application {
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void render() {
        button.render();
        checkbox.render();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        GUIFactory factory;
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("win")) {
            factory = new WindowsFactory();
        } else {
            factory = new MacFactory();
        }

        Application app = new Application(factory);
        app.render();
    }
}
```

## Your Tasks

### Task 1: Furniture Shop
Create an abstract factory for different furniture styles (Modern, Victorian).

```java
// Abstract Products
interface Chair {
    void sitOn();
}

interface Sofa {
    void lieOn();
}

interface CoffeeTable {
    void putCup();
}

// Modern Family
class ModernChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on modern chair");
    }
}

class ModernSofa implements Sofa {
    public void lieOn() {
        System.out.println("Lying on modern sofa");
    }
}

class ModernCoffeeTable implements CoffeeTable {
    public void putCup() {
        System.out.println("Putting cup on modern coffee table");
    }
}

// Victorian Family
class VictorianChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on Victorian chair");
    }
}

// Implement remaining Victorian furniture and factories
```

**Expected Output:**
```
Sitting on modern chair
Lying on modern sofa
Putting cup on modern coffee table
```

### Task 2: Vehicle Manufacturing
Create factories for different vehicle brands (Toyota, BMW).

```java
interface Car {
    void drive();
}

interface SUV {
    void offRoad();
}

interface Sedan {
    void cruise();
}

interface VehicleFactory {
    Car createCar();
    SUV createSUV();
    Sedan createSedan();
}

class ToyotaFactory implements VehicleFactory {
    // Implement Toyota vehicles
}

class BMWFactory implements VehicleFactory {
    // Implement BMW vehicles
}
```

### Task 3: Document Processor
Create factories for different document formats (PDF, HTML).

```java
interface DocumentReader {
    void read();
}

interface DocumentWriter {
    void write(String content);
}

interface DocumentConverter {
    void convert();
}

interface DocumentFactory {
    DocumentReader createReader();
    DocumentWriter createWriter();
    DocumentConverter createConverter();
}

class PDFDocumentFactory implements DocumentFactory {
    // Implement PDF document handlers
}

class HTMLDocumentFactory implements DocumentFactory {
    // Implement HTML document handlers
}

// Usage
public class DocumentProcessor {
    private DocumentReader reader;
    private DocumentWriter writer;

    public DocumentProcessor(DocumentFactory factory) {
        reader = factory.createReader();
        writer = factory.createWriter();
    }

    public void processDocument(String content) {
        reader.read();
        writer.write(content);
    }
}
```

### Task 4: Database Access Layer
Create factories for different database systems (MySQL, PostgreSQL).

```java
interface Connection {
    void connect();
    void disconnect();
}

interface Command {
    void execute(String sql);
}

interface Transaction {
    void begin();
    void commit();
    void rollback();
}

interface DatabaseFactory {
    Connection createConnection();
    Command createCommand();
    Transaction createTransaction();
}

class MySQLFactory implements DatabaseFactory {
    // Implement MySQL components
}

class PostgreSQLFactory implements DatabaseFactory {
    // Implement PostgreSQL components
}
```

### Task 5: Game Asset Factory
Create factories for different game themes (Fantasy, SciFi).

```java
interface Character {
    void attack();
}

interface Weapon {
    void use();
}

interface Environment {
    void render();
}

interface GameAssetFactory {
    Character createCharacter();
    Weapon createWeapon();
    Environment createEnvironment();
}

class FantasyFactory implements GameAssetFactory {
    // Knight, Sword, Castle
}

class SciFiFactory implements GameAssetFactory {
    // Astronaut, LaserGun, SpaceStation
}
```

### Task 6: UI Theme Factory
Create a complete UI theme system with different color schemes.

```java
interface Button {
    void render();
    String getColor();
}

interface TextField {
    void render();
    String getBorderColor();
}

interface Label {
    void render();
    String getTextColor();
}

interface ThemeFactory {
    Button createButton();
    TextField createTextField();
    Label createLabel();
}

class DarkThemeFactory implements ThemeFactory {
    // Dark theme components
}

class LightThemeFactory implements ThemeFactory {
    // Light theme components
}

class HighContrastFactory implements ThemeFactory {
    // High contrast components
}
```

### Task 7: Restaurant Order System
Create factories for different cuisine types.

```java
interface Appetizer {
    void serve();
}

interface MainCourse {
    void serve();
}

interface Dessert {
    void serve();
}

interface CuisineFactory {
    Appetizer createAppetizer();
    MainCourse createMainCourse();
    Dessert createDessert();
}

class ItalianFactory implements CuisineFactory {
    // Bruschetta, Pasta, Tiramisu
}

class ChineseFactory implements CuisineFactory {
    // Spring Rolls, Fried Rice, Fortune Cookie
}
```

### Task 8: Cloud Provider Factory
Create factories for different cloud providers (AWS, Azure, GCP).

```java
interface VirtualMachine {
    void start();
    void stop();
}

interface Storage {
    void upload(String file);
    void download(String file);
}

interface Database {
    void query(String sql);
}

interface CloudFactory {
    VirtualMachine createVM();
    Storage createStorage();
    Database createDatabase();
}

class AWSFactory implements CloudFactory {
    // EC2, S3, RDS
}

class AzureFactory implements CloudFactory {
    // VM, Blob Storage, SQL Database
}
```

## Factory vs Abstract Factory

### Factory Method
- Creates **one** type of object
- Single method
- Subclasses decide which class to instantiate

### Abstract Factory
- Creates **families** of related objects
- Multiple methods (one for each product type)
- Ensures product consistency

```java
// Factory Method
interface ShapeFactory {
    Shape createShape();  // Single product
}

// Abstract Factory
interface UIFactory {
    Button createButton();    // Multiple related products
    TextField createTextField();
    Label createLabel();
}
```

## Common Pitfalls

### 1. Adding New Products
```java
// ❌ Requires changing all factories
interface Factory {
    ProductA createA();
    ProductB createB();
    // Adding ProductC requires changing all implementations
}

// ✅ Use separate factories or consider Builder pattern
```

### 2. Too Many Products
If you have too many products, consider:
- Breaking into smaller factories
- Using Builder pattern
- Using Prototype pattern

## Best Practices

1. **Define clear product families**: Products should work together
2. **Use interfaces for products**: Not concrete classes
3. **Consider configuration**: Factory selection via config file
4. **Document relationships**: Explain why products belong together
5. **Keep factories simple**: Don't add business logic

## Real-World Examples

- GUI Toolkits (Swing, JavaFX) - Different look and feels
- Database drivers - Different DB vendors
- Document processors - Different formats
- Game engines - Different rendering engines
- Cloud SDKs - Different providers

## Benefits vs Drawbacks

### Benefits
- ✅ Ensures product compatibility
- ✅ Avoids tight coupling
- ✅ Single Responsibility Principle
- ✅ Open/Closed Principle

### Drawbacks
- ❌ Code complexity increases
- ❌ Adding new product types is difficult
- ❌ May be overkill for simple cases

## Next Steps

After mastering Abstract Factory, move on to `04-Builder` to learn about constructing complex objects step by step!

**Challenge**: Create a cross-platform application framework that supports Windows, Mac, and Linux, with complete UI component factories for each platform including buttons, text fields, menus, and dialogs.
