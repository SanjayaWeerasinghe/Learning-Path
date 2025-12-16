# Composite Pattern

## What You'll Learn
- Understanding the Composite design pattern
- Treating individual objects and compositions uniformly
- Building tree structures to represent hierarchies
- Working with part-whole hierarchies
- Implementing recursive operations on tree structures
- Simplifying client code with uniform interfaces

## Concept Overview

The Composite pattern lets you compose objects into tree structures to represent part-whole hierarchies. It allows clients to treat individual objects and compositions of objects uniformly.

Think of it like a file system - a folder can contain files or other folders. You can perform operations (copy, delete, move) on both individual files and entire folders the same way, even though folders contain other items.

### Key Characteristics
- **Tree Structure**: Organizes objects in hierarchical tree structures
- **Uniform Treatment**: Treats individual objects and compositions uniformly
- **Recursive Composition**: Components can contain other components
- **Common Interface**: All elements share the same interface
- **Transparency**: Client doesn't need to know if dealing with leaf or composite

### When to Use
- Representing part-whole hierarchies
- Treating individual objects and compositions uniformly
- Building tree structures (file systems, organization charts, UI components)
- When you want clients to ignore the difference between compositions and individual objects
- Implementing recursive algorithms over tree structures

### Structure

```
Component (Interface/Abstract)
    |
    |-- Leaf (individual object)
    |-- Composite (contains Components)
            |-- children: List<Component>
```

## Basic Implementation

```java
// Component interface
interface Graphic {
    void draw();
    void move(int x, int y);
}

// Leaf
class Circle implements Graphic {
    private String name;
    private int x, y;

    public Circle(String name) {
        this.name = name;
    }

    @Override
    public void draw() {
        System.out.println("Drawing Circle: " + name + " at (" + x + "," + y + ")");
    }

    @Override
    public void move(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("Moving Circle: " + name + " to (" + x + "," + y + ")");
    }
}

// Another Leaf
class Rectangle implements Graphic {
    private String name;
    private int x, y;

    public Rectangle(String name) {
        this.name = name;
    }

    @Override
    public void draw() {
        System.out.println("Drawing Rectangle: " + name + " at (" + x + "," + y + ")");
    }

    @Override
    public void move(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("Moving Rectangle: " + name + " to (" + x + "," + y + ")");
    }
}

// Composite
class CompositeGraphic implements Graphic {
    private String name;
    private List<Graphic> children = new ArrayList<>();

    public CompositeGraphic(String name) {
        this.name = name;
    }

    public void add(Graphic graphic) {
        children.add(graphic);
    }

    public void remove(Graphic graphic) {
        children.remove(graphic);
    }

    @Override
    public void draw() {
        System.out.println("Drawing Composite: " + name);
        for (Graphic graphic : children) {
            graphic.draw();
        }
    }

    @Override
    public void move(int x, int y) {
        System.out.println("Moving Composite: " + name + " to (" + x + "," + y + ")");
        for (Graphic graphic : children) {
            graphic.move(x, y);
        }
    }
}

// Client
public class GraphicsDemo {
    public static void main(String[] args) {
        // Create individual graphics
        Circle circle1 = new Circle("Circle1");
        Circle circle2 = new Circle("Circle2");
        Rectangle rect = new Rectangle("Rect1");

        // Create composite
        CompositeGraphic group1 = new CompositeGraphic("Group1");
        group1.add(circle1);
        group1.add(rect);

        // Create another composite
        CompositeGraphic group2 = new CompositeGraphic("Group2");
        group2.add(circle2);
        group2.add(group1);  // Nested composite

        // Treat all uniformly
        System.out.println("=== Drawing ===");
        group2.draw();

        System.out.println("\n=== Moving ===");
        group2.move(10, 20);
    }
}
```

**Output:**
```
=== Drawing ===
Drawing Composite: Group2
Drawing Circle: Circle2 at (0,0)
Drawing Composite: Group1
Drawing Circle: Circle1 at (0,0)
Drawing Rectangle: Rect1 at (0,0)

=== Moving ===
Moving Composite: Group2 to (10,20)
Moving Circle: Circle2 to (10,20)
Moving Composite: Group1 to (10,20)
Moving Circle: Circle1 to (10,20)
Moving Rectangle: Rect1 to (10,20)
```

## Your Tasks

### Task 1: File System
Create a file system with files and folders.

```java
// Component
interface FileSystemItem {
    String getName();
    int getSize();
    void display(String indent);
}

// Leaf
class File implements FileSystemItem {
    private String name;
    private int size;

    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "File: " + name + " (" + size + " KB)");
    }
}

// Composite
class Folder implements FileSystemItem {
    private String name;
    private List<FileSystemItem> items = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public void add(FileSystemItem item) {
        items.add(item);
    }

    public void remove(FileSystemItem item) {
        items.remove(item);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getSize() {
        int totalSize = 0;
        for (FileSystemItem item : items) {
            totalSize += item.getSize();
        }
        return totalSize;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Folder: " + name + " (" + getSize() + " KB)");
        for (FileSystemItem item : items) {
            item.display(indent + "  ");
        }
    }
}

// Test
public class FileSystemTest {
    public static void main(String[] args) {
        // Create files
        File file1 = new File("document.txt", 10);
        File file2 = new File("image.jpg", 50);
        File file3 = new File("video.mp4", 200);

        // Create folders
        Folder folder1 = new Folder("Documents");
        folder1.add(file1);

        Folder folder2 = new Folder("Media");
        folder2.add(file2);
        folder2.add(file3);

        Folder root = new Folder("Root");
        root.add(folder1);
        root.add(folder2);
        root.add(new File("readme.txt", 5));

        // Display structure
        root.display("");
        System.out.println("\nTotal size: " + root.getSize() + " KB");
    }
}
```

**Expected Output:**
```
Folder: Root (265 KB)
  Folder: Documents (10 KB)
    File: document.txt (10 KB)
  Folder: Media (250 KB)
    File: image.jpg (50 KB)
    File: video.mp4 (200 KB)
  File: readme.txt (5 KB)

Total size: 265 KB
```

### Task 2: Organization Chart
Create an organization structure with employees and departments.

```java
// Component
interface Employee {
    String getName();
    String getRole();
    double getSalary();
    void displayHierarchy(String indent);
}

// Leaf
class Developer implements Employee {
    private String name;
    private double salary;

    public Developer(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getRole() {
        return "Developer";
    }

    @Override
    public double getSalary() {
        return salary;
    }

    @Override
    public void displayHierarchy(String indent) {
        System.out.println(indent + "Developer: " + name + " ($" + salary + ")");
    }
}

class Designer implements Employee {
    private String name;
    private double salary;

    public Designer(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getRole() {
        return "Designer";
    }

    @Override
    public double getSalary() {
        return salary;
    }

    @Override
    public void displayHierarchy(String indent) {
        System.out.println(indent + "Designer: " + name + " ($" + salary + ")");
    }
}

// Composite
class Manager implements Employee {
    private String name;
    private double salary;
    private List<Employee> subordinates = new ArrayList<>();

    public Manager(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void addSubordinate(Employee employee) {
        subordinates.add(employee);
    }

    public void removeSubordinate(Employee employee) {
        subordinates.remove(employee);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getRole() {
        return "Manager";
    }

    @Override
    public double getSalary() {
        double total = salary;
        for (Employee emp : subordinates) {
            total += emp.getSalary();
        }
        return total;
    }

    @Override
    public void displayHierarchy(String indent) {
        System.out.println(indent + "Manager: " + name + " ($" + salary + ")");
        for (Employee emp : subordinates) {
            emp.displayHierarchy(indent + "  ");
        }
    }

    public double getTeamBudget() {
        return getSalary();
    }
}

// Test
public class OrganizationTest {
    public static void main(String[] args) {
        Developer dev1 = new Developer("Alice", 80000);
        Developer dev2 = new Developer("Bob", 85000);
        Designer designer1 = new Designer("Charlie", 75000);

        Manager techLead = new Manager("David", 100000);
        techLead.addSubordinate(dev1);
        techLead.addSubordinate(dev2);

        Manager cto = new Manager("Eve", 150000);
        cto.addSubordinate(techLead);
        cto.addSubordinate(designer1);

        System.out.println("=== Organization Chart ===");
        cto.displayHierarchy("");

        System.out.println("\n=== Budget Information ===");
        System.out.println("CTO Team Budget: $" + cto.getTeamBudget());
        System.out.println("Tech Lead Team Budget: $" + techLead.getTeamBudget());
    }
}
```

**Expected Output:**
```
=== Organization Chart ===
Manager: Eve ($150000.0)
  Manager: David ($100000.0)
    Developer: Alice ($80000.0)
    Developer: Bob ($85000.0)
  Designer: Charlie ($75000.0)

=== Budget Information ===
CTO Team Budget: $490000.0
Tech Lead Team Budget: $265000.0
```

### Task 3: Menu System
Create a restaurant menu with items and sub-menus.

```java
// Component
interface MenuComponent {
    String getName();
    double getPrice();
    void display(String indent);
    boolean isVegetarian();
}

// Leaf
class MenuItem implements MenuComponent {
    private String name;
    private String description;
    private double price;
    private boolean vegetarian;

    public MenuItem(String name, String description, double price, boolean vegetarian) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.vegetarian = vegetarian;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public boolean isVegetarian() {
        return vegetarian;
    }

    @Override
    public void display(String indent) {
        System.out.print(indent + name);
        if (vegetarian) {
            System.out.print(" (V)");
        }
        System.out.println(" - $" + price);
        System.out.println(indent + "  " + description);
    }
}

// Composite
class Menu implements MenuComponent {
    private String name;
    private String description;
    private List<MenuComponent> items = new ArrayList<>();

    public Menu(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void add(MenuComponent component) {
        items.add(component);
    }

    public void remove(MenuComponent component) {
        items.remove(component);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        double total = 0;
        for (MenuComponent item : items) {
            total += item.getPrice();
        }
        return total;
    }

    @Override
    public boolean isVegetarian() {
        for (MenuComponent item : items) {
            if (!item.isVegetarian()) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "--- " + name + " ---");
        System.out.println(indent + description);
        System.out.println();

        for (MenuComponent item : items) {
            item.display(indent + "  ");
        }
    }

    public void displayVegetarianItems() {
        System.out.println("Vegetarian items in " + name + ":");
        for (MenuComponent item : items) {
            if (item.isVegetarian()) {
                item.display("  ");
            }
        }
    }
}

// Test
public class MenuTest {
    public static void main(String[] args) {
        // Create breakfast menu
        Menu breakfastMenu = new Menu("Breakfast Menu", "Served until 11am");
        breakfastMenu.add(new MenuItem("Pancakes", "Fluffy pancakes with syrup", 8.99, true));
        breakfastMenu.add(new MenuItem("Bacon & Eggs", "Two eggs with bacon strips", 10.99, false));

        // Create lunch menu
        Menu lunchMenu = new Menu("Lunch Menu", "Served 11am - 3pm");
        lunchMenu.add(new MenuItem("Burger", "Beef burger with fries", 12.99, false));
        lunchMenu.add(new MenuItem("Veggie Wrap", "Grilled vegetables in tortilla", 9.99, true));

        // Create dessert submenu
        Menu dessertMenu = new Menu("Dessert Menu", "Sweet treats");
        dessertMenu.add(new MenuItem("Ice Cream", "Vanilla ice cream", 4.99, true));
        dessertMenu.add(new MenuItem("Chocolate Cake", "Rich chocolate cake", 6.99, true));

        // Create main menu
        Menu allMenus = new Menu("Restaurant Menu", "Full menu");
        allMenus.add(breakfastMenu);
        allMenus.add(lunchMenu);
        allMenus.add(dessertMenu);

        // Display all
        allMenus.display("");

        System.out.println("\n=== Vegetarian Options ===");
        allMenus.displayVegetarianItems();
    }
}
```

### Task 4: Product Catalog
Create a product catalog with categories and subcategories.

```java
// Component
interface CatalogComponent {
    String getName();
    double getTotalPrice();
    int getItemCount();
    void display(String indent);
}

// Leaf
class Product implements CatalogComponent {
    private String name;
    private double price;
    private String sku;

    public Product(String name, String sku, double price) {
        this.name = name;
        this.sku = sku;
        this.price = price;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getTotalPrice() {
        return price;
    }

    @Override
    public int getItemCount() {
        return 1;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Product: " + name + " [" + sku + "] - $" + price);
    }
}

// Composite
class Category implements CatalogComponent {
    private String name;
    private List<CatalogComponent> items = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    public void add(CatalogComponent component) {
        items.add(component);
    }

    public void remove(CatalogComponent component) {
        items.remove(component);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getTotalPrice() {
        double total = 0;
        for (CatalogComponent item : items) {
            total += item.getTotalPrice();
        }
        return total;
    }

    @Override
    public int getItemCount() {
        int count = 0;
        for (CatalogComponent item : items) {
            count += item.getItemCount();
        }
        return count;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Category: " + name +
            " (" + getItemCount() + " items, Total: $" + getTotalPrice() + ")");
        for (CatalogComponent item : items) {
            item.display(indent + "  ");
        }
    }
}

// Test
public class CatalogTest {
    public static void main(String[] args) {
        // Create products
        Product laptop = new Product("Laptop", "TECH-001", 999.99);
        Product mouse = new Product("Mouse", "TECH-002", 29.99);
        Product keyboard = new Product("Keyboard", "TECH-003", 79.99);

        Product tshirt = new Product("T-Shirt", "CLO-001", 19.99);
        Product jeans = new Product("Jeans", "CLO-002", 49.99);

        // Create categories
        Category computers = new Category("Computers");
        computers.add(laptop);

        Category accessories = new Category("Accessories");
        accessories.add(mouse);
        accessories.add(keyboard);

        Category electronics = new Category("Electronics");
        electronics.add(computers);
        electronics.add(accessories);

        Category clothing = new Category("Clothing");
        clothing.add(tshirt);
        clothing.add(jeans);

        Category mainCatalog = new Category("Main Catalog");
        mainCatalog.add(electronics);
        mainCatalog.add(clothing);

        // Display
        mainCatalog.display("");
    }
}
```

### Task 5: UI Component Hierarchy
Create a UI component system with panels and controls.

```java
// Component
interface UIComponent {
    void render();
    void setEnabled(boolean enabled);
    int getComponentCount();
}

// Leaf components
class Button implements UIComponent {
    private String label;
    private boolean enabled = true;

    public Button(String label) {
        this.label = label;
    }

    @Override
    public void render() {
        String status = enabled ? "enabled" : "disabled";
        System.out.println("  [Button: " + label + " - " + status + "]");
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public int getComponentCount() {
        return 1;
    }
}

class TextBox implements UIComponent {
    private String placeholder;
    private boolean enabled = true;

    public TextBox(String placeholder) {
        this.placeholder = placeholder;
    }

    @Override
    public void render() {
        String status = enabled ? "enabled" : "disabled";
        System.out.println("  [TextBox: \"" + placeholder + "\" - " + status + "]");
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public int getComponentCount() {
        return 1;
    }
}

class Label implements UIComponent {
    private String text;
    private boolean enabled = true;

    public Label(String text) {
        this.text = text;
    }

    @Override
    public void render() {
        System.out.println("  [Label: " + text + "]");
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public int getComponentCount() {
        return 1;
    }
}

// Composite
class Panel implements UIComponent {
    private String name;
    private List<UIComponent> components = new ArrayList<>();
    private boolean enabled = true;

    public Panel(String name) {
        this.name = name;
    }

    public void add(UIComponent component) {
        components.add(component);
    }

    public void remove(UIComponent component) {
        components.remove(component);
    }

    @Override
    public void render() {
        System.out.println("\n=== " + name + " ===");
        for (UIComponent component : components) {
            component.render();
        }
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
        for (UIComponent component : components) {
            component.setEnabled(enabled);
        }
    }

    @Override
    public int getComponentCount() {
        int count = 0;
        for (UIComponent component : components) {
            count += component.getComponentCount();
        }
        return count;
    }
}

// Test
public class UITest {
    public static void main(String[] args) {
        // Create login form
        Panel loginPanel = new Panel("Login Form");
        loginPanel.add(new Label("Username:"));
        loginPanel.add(new TextBox("Enter username"));
        loginPanel.add(new Label("Password:"));
        loginPanel.add(new TextBox("Enter password"));
        loginPanel.add(new Button("Login"));
        loginPanel.add(new Button("Cancel"));

        // Create registration form
        Panel regPanel = new Panel("Registration Form");
        regPanel.add(new Label("Email:"));
        regPanel.add(new TextBox("Enter email"));
        regPanel.add(new Button("Register"));

        // Create main window
        Panel mainWindow = new Panel("Main Window");
        mainWindow.add(loginPanel);
        mainWindow.add(regPanel);

        // Render all
        mainWindow.render();

        System.out.println("\nTotal components: " + mainWindow.getComponentCount());

        // Disable login panel
        System.out.println("\n=== After disabling login panel ===");
        loginPanel.setEnabled(false);
        loginPanel.render();
    }
}
```

### Task 6: Task Management System
Create a task management system with tasks and subtasks.

```java
// Component
interface Task {
    String getTitle();
    int getEstimatedHours();
    boolean isCompleted();
    void complete();
    void display(String indent);
}

// Leaf
class SimpleTask implements Task {
    private String title;
    private int estimatedHours;
    private boolean completed;

    public SimpleTask(String title, int estimatedHours) {
        this.title = title;
        this.estimatedHours = estimatedHours;
        this.completed = false;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public int getEstimatedHours() {
        return estimatedHours;
    }

    @Override
    public boolean isCompleted() {
        return completed;
    }

    @Override
    public void complete() {
        completed = true;
        System.out.println("Completed: " + title);
    }

    @Override
    public void display(String indent) {
        String status = completed ? "[X]" : "[ ]";
        System.out.println(indent + status + " " + title + " (" + estimatedHours + "h)");
    }
}

// Composite
class TaskList implements Task {
    private String title;
    private List<Task> subtasks = new ArrayList<>();

    public TaskList(String title) {
        this.title = title;
    }

    public void addTask(Task task) {
        subtasks.add(task);
    }

    public void removeTask(Task task) {
        subtasks.remove(task);
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public int getEstimatedHours() {
        int total = 0;
        for (Task task : subtasks) {
            total += task.getEstimatedHours();
        }
        return total;
    }

    @Override
    public boolean isCompleted() {
        for (Task task : subtasks) {
            if (!task.isCompleted()) {
                return false;
            }
        }
        return !subtasks.isEmpty();
    }

    @Override
    public void complete() {
        for (Task task : subtasks) {
            if (!task.isCompleted()) {
                task.complete();
            }
        }
        System.out.println("All subtasks in '" + title + "' completed!");
    }

    @Override
    public void display(String indent) {
        String status = isCompleted() ? "[X]" : "[ ]";
        System.out.println(indent + status + " " + title + " (" + getEstimatedHours() + "h total)");
        for (Task task : subtasks) {
            task.display(indent + "  ");
        }
    }

    public int getCompletionPercentage() {
        if (subtasks.isEmpty()) return 0;
        int completed = 0;
        for (Task task : subtasks) {
            if (task.isCompleted()) completed++;
        }
        return (completed * 100) / subtasks.size();
    }
}

// Test
public class TaskTest {
    public static void main(String[] args) {
        // Create project
        TaskList project = new TaskList("Website Development");

        // Frontend tasks
        TaskList frontend = new TaskList("Frontend Development");
        frontend.addTask(new SimpleTask("Design UI mockups", 8));
        frontend.addTask(new SimpleTask("Implement homepage", 12));
        frontend.addTask(new SimpleTask("Implement login page", 6));

        // Backend tasks
        TaskList backend = new TaskList("Backend Development");
        backend.addTask(new SimpleTask("Setup database", 4));
        backend.addTask(new SimpleTask("Create API endpoints", 16));
        backend.addTask(new SimpleTask("Implement authentication", 8));

        // Add to project
        project.addTask(frontend);
        project.addTask(backend);
        project.addTask(new SimpleTask("Deploy to production", 4));

        // Display initial state
        System.out.println("=== Project Tasks ===");
        project.display("");
        System.out.println("\nTotal estimated hours: " + project.getEstimatedHours());

        // Complete some tasks
        System.out.println("\n=== Completing tasks ===");
        SimpleTask designTask = new SimpleTask("Design UI mockups", 8);
        designTask.complete();

        // Complete entire frontend
        frontend.complete();

        // Display updated state
        System.out.println("\n=== Updated Project ===");
        project.display("");
        System.out.println("\nFrontend completion: " + frontend.getCompletionPercentage() + "%");
    }
}
```

### Task 7: Mathematical Expression Tree
Create an expression evaluator using composite pattern.

```java
// Component
interface Expression {
    int evaluate();
    String toString();
}

// Leaf - Number
class Number implements Expression {
    private int value;

    public Number(int value) {
        this.value = value;
    }

    @Override
    public int evaluate() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}

// Composite - Binary Operation
abstract class BinaryOperation implements Expression {
    protected Expression left;
    protected Expression right;

    public BinaryOperation(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }
}

class Add extends BinaryOperation {
    public Add(Expression left, Expression right) {
        super(left, right);
    }

    @Override
    public int evaluate() {
        return left.evaluate() + right.evaluate();
    }

    @Override
    public String toString() {
        return "(" + left + " + " + right + ")";
    }
}

class Subtract extends BinaryOperation {
    public Subtract(Expression left, Expression right) {
        super(left, right);
    }

    @Override
    public int evaluate() {
        return left.evaluate() - right.evaluate();
    }

    @Override
    public String toString() {
        return "(" + left + " - " + right + ")";
    }
}

class Multiply extends BinaryOperation {
    public Multiply(Expression left, Expression right) {
        super(left, right);
    }

    @Override
    public int evaluate() {
        return left.evaluate() * right.evaluate();
    }

    @Override
    public String toString() {
        return "(" + left + " * " + right + ")";
    }
}

class Divide extends BinaryOperation {
    public Divide(Expression left, Expression right) {
        super(left, right);
    }

    @Override
    public int evaluate() {
        return left.evaluate() / right.evaluate();
    }

    @Override
    public String toString() {
        return "(" + left + " / " + right + ")";
    }
}

// Test
public class ExpressionTest {
    public static void main(String[] args) {
        // Build expression: ((5 + 3) * (10 - 2)) / 4
        Expression expr = new Divide(
            new Multiply(
                new Add(new Number(5), new Number(3)),
                new Subtract(new Number(10), new Number(2))
            ),
            new Number(4)
        );

        System.out.println("Expression: " + expr);
        System.out.println("Result: " + expr.evaluate());

        // Build another: (20 + 10) - (5 * 2)
        Expression expr2 = new Subtract(
            new Add(new Number(20), new Number(10)),
            new Multiply(new Number(5), new Number(2))
        );

        System.out.println("\nExpression: " + expr2);
        System.out.println("Result: " + expr2.evaluate());
    }
}
```

**Expected Output:**
```
Expression: (((5 + 3) * (10 - 2)) / 4)
Result: 16

Expression: ((20 + 10) - (5 * 2))
Result: 20
```

### Task 8: Shopping Cart with Bundles
Create a shopping cart system with individual items and product bundles.

```java
// Component
interface CartItem {
    String getName();
    double getPrice();
    int getQuantity();
    void display(String indent);
}

// Leaf
class Product implements CartItem {
    private String name;
    private double price;
    private int quantity;

    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        return price * quantity;
    }

    @Override
    public int getQuantity() {
        return quantity;
    }

    @Override
    public void display(String indent) {
        System.out.printf("%s%s x%d @ $%.2f = $%.2f%n",
            indent, name, quantity, price, getPrice());
    }
}

// Composite
class Bundle implements CartItem {
    private String name;
    private List<CartItem> items = new ArrayList<>();
    private double discount;

    public Bundle(String name, double discount) {
        this.name = name;
        this.discount = discount;
    }

    public void add(CartItem item) {
        items.add(item);
    }

    public void remove(CartItem item) {
        items.remove(item);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        double total = 0;
        for (CartItem item : items) {
            total += item.getPrice();
        }
        return total * (1 - discount);
    }

    @Override
    public int getQuantity() {
        int total = 0;
        for (CartItem item : items) {
            total += item.getQuantity();
        }
        return total;
    }

    @Override
    public void display(String indent) {
        double originalPrice = 0;
        for (CartItem item : items) {
            originalPrice += item.getPrice();
        }

        System.out.printf("%sBundle: %s (%.0f%% off)%n",
            indent, name, discount * 100);
        for (CartItem item : items) {
            item.display(indent + "  ");
        }
        System.out.printf("%s  Original: $%.2f, Discounted: $%.2f (Save $%.2f)%n",
            indent, originalPrice, getPrice(), originalPrice - getPrice());
    }
}

// Test
public class ShoppingCartTest {
    public static void main(String[] args) {
        // Create office bundle
        Bundle officeBundle = new Bundle("Office Bundle", 0.15);
        officeBundle.add(new Product("Laptop", 999.99, 1));
        officeBundle.add(new Product("Mouse", 29.99, 1));
        officeBundle.add(new Product("Keyboard", 79.99, 1));

        // Create gaming bundle
        Bundle gamingBundle = new Bundle("Gaming Bundle", 0.20);
        gamingBundle.add(new Product("Gaming PC", 1499.99, 1));
        gamingBundle.add(new Product("Monitor", 399.99, 1));
        gamingBundle.add(new Product("Headset", 99.99, 1));

        // Create cart
        Bundle cart = new Bundle("Shopping Cart", 0.0);
        cart.add(officeBundle);
        cart.add(gamingBundle);
        cart.add(new Product("USB Cable", 9.99, 3));

        // Display
        System.out.println("=== Shopping Cart ===\n");
        cart.display("");
        System.out.printf("%n=== Total: $%.2f ===%n", cart.getPrice());
    }
}
```

## Common Pitfalls

### 1. Exposing Child Management to Clients
```java
// ❌ Leaf implementing add/remove
class Leaf implements Component {
    public void add(Component c) {
        throw new UnsupportedOperationException();
    }
}

// ✅ Only composite implements child management
class Composite implements Component {
    public void add(Component c) {
        children.add(c);
    }
}
```

### 2. Not Handling Null Children
```java
// ❌ No null check
public void operation() {
    for (Component child : children) {
        child.operation();  // NPE if null
    }
}

// ✅ Proper validation
public void operation() {
    if (children != null) {
        for (Component child : children) {
            if (child != null) {
                child.operation();
            }
        }
    }
}
```

### 3. Circular References
```java
// ❌ Can cause infinite loops
composite1.add(composite2);
composite2.add(composite1);  // Circular!

// ✅ Check before adding
public void add(Component c) {
    if (c == this || contains(c)) {
        throw new IllegalArgumentException("Circular reference");
    }
    children.add(c);
}
```

### 4. Type Safety Issues
```java
// ❌ Type casting everywhere
if (component instanceof Leaf) {
    ((Leaf) component).leafMethod();
}

// ✅ Use visitor pattern or double dispatch
component.accept(visitor);
```

## When NOT to Use Composite

- When objects don't form a natural hierarchy
- When treating leaves and composites differently is necessary
- When the tree structure is very deep (performance concerns)
- When you need different operations on different types

## Best Practices

1. **Use common interface**: All components share the same interface
2. **Handle edge cases**: Empty composites, single children, etc.
3. **Consider caching**: Cache calculated values for performance
4. **Implement equals/hashCode**: For proper comparison
5. **Use iterators**: For traversing the tree
6. **Prevent cycles**: Check for circular references
7. **Document clearly**: Explain the hierarchy
8. **Consider visitor pattern**: For complex operations

## Real-World Examples

### Java/UI Frameworks
- Swing/AWT components (`Container` and `Component`)
- JavaFX scene graph
- HTML DOM tree
- XML document structure

### Other Examples
- File systems (folders and files)
- Organization charts
- GUI component hierarchies
- Expression parsers
- Composite graphics in drawing applications

## Composite vs Similar Patterns

### Composite vs Decorator
- **Composite**: Multiple children (tree)
- **Decorator**: Single wrapped object (linear)

### Composite vs Chain of Responsibility
- **Composite**: All handle request
- **Chain**: First matching handler processes

### Composite vs Iterator
- **Often used together**: Iterator traverses composite structure

## Next Steps

Congratulations on completing all Structural design patterns! Now you can:
- Review and practice all structural patterns
- Move on to Behavioral patterns to learn about object collaboration
- Build a comprehensive project combining multiple patterns

**Challenge**: Create a comprehensive content management system (CMS) that uses the Composite pattern for organizing pages, sections, and content blocks. The system should support nested structures, permissions, versioning, and rendering. Implement operations like search, calculate total size, count elements, and export to different formats, all working uniformly across the hierarchy.
