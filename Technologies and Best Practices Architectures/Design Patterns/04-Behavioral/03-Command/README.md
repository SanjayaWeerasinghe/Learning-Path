# Command Pattern

## What You'll Learn
- Understanding the Command design pattern
- Encapsulating requests as objects
- Implementing undo/redo functionality
- Queuing and logging operations
- Decoupling sender from receiver
- Creating macro commands

## Concept Overview

The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

### Key Characteristics
- **Encapsulation**: Encapsulates a request as an object
- **Decoupling**: Separates the object making the request from the object that executes it
- **Flexibility**: Commands can be stored, passed, and executed at different times
- **Undo/Redo**: Easy to implement reversible operations
- **Macro Commands**: Combine multiple commands

### When to Use
- Need to parameterize objects with operations
- Queue operations for later execution
- Support undo/redo functionality
- Log changes for crash recovery
- Structure system around high-level operations built on primitive operations
- Support transactional behavior

### Real-World Analogy
Think of a restaurant - you (client) give an order (command) to a waiter (invoker), who gives it to the chef (receiver). The written order is the command object that can be queued, tracked, or canceled.

## Basic Implementation

```java
// Command Interface
interface Command {
    void execute();
    void undo();
}

// Receiver
class Light {
    private String location;

    public Light(String location) {
        this.location = location;
    }

    public void on() {
        System.out.println(location + " light is ON");
    }

    public void off() {
        System.out.println(location + " light is OFF");
    }
}

// Concrete Commands
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.on();
    }

    public void undo() {
        light.off();
    }
}

class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.off();
    }

    public void undo() {
        light.on();
    }
}

// Invoker
class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }

    public void pressUndo() {
        command.undo();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Light livingRoomLight = new Light("Living Room");

        Command lightOn = new LightOnCommand(livingRoomLight);
        Command lightOff = new LightOffCommand(livingRoomLight);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();

        remote.pressUndo();
    }
}
```

**Output:**
```
Living Room light is ON
Living Room light is OFF
Living Room light is ON
```

## Advanced Example: Text Editor with Undo

```java
import java.util.*;

interface Command {
    void execute();
    void undo();
}

class TextEditor {
    private StringBuilder text = new StringBuilder();

    public void insertText(String newText) {
        text.append(newText);
        System.out.println("Text: " + text);
    }

    public void deleteText(int length) {
        int start = text.length() - length;
        if (start >= 0) {
            text.delete(start, text.length());
            System.out.println("Text: " + text);
        }
    }

    public String getText() {
        return text.toString();
    }
}

class InsertTextCommand implements Command {
    private TextEditor editor;
    private String textToInsert;

    public InsertTextCommand(TextEditor editor, String text) {
        this.editor = editor;
        this.textToInsert = text;
    }

    public void execute() {
        editor.insertText(textToInsert);
    }

    public void undo() {
        editor.deleteText(textToInsert.length());
    }
}

class DeleteTextCommand implements Command {
    private TextEditor editor;
    private String deletedText;
    private int length;

    public DeleteTextCommand(TextEditor editor, int length) {
        this.editor = editor;
        this.length = length;
    }

    public void execute() {
        String currentText = editor.getText();
        int start = Math.max(0, currentText.length() - length);
        deletedText = currentText.substring(start);
        editor.deleteText(length);
    }

    public void undo() {
        editor.insertText(deletedText);
    }
}

class CommandManager {
    private Stack<Command> undoStack = new Stack<>();
    private Stack<Command> redoStack = new Stack<>();

    public void executeCommand(Command command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            Command command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        }
    }
}
```

## Your Tasks

### Task 1: Smart Home Controller
Create a smart home system with various devices and commands.

```java
interface Command {
    void execute();
    void undo();
}

// Receivers
class Thermostat {
    private int temperature;

    public void setTemperature(int temp) {
        this.temperature = temp;
        System.out.println("Thermostat set to " + temp + "°F");
    }

    public int getTemperature() {
        return temperature;
    }
}

class Fan {
    private int speed; // 0-3

    public void setSpeed(int speed) {
        this.speed = speed;
        System.out.println("Fan speed set to " + speed);
    }

    public int getSpeed() {
        return speed;
    }
}

class GarageDoor {
    public void open() {
        System.out.println("Garage door is opening");
    }

    public void close() {
        System.out.println("Garage door is closing");
    }
}

// Commands
class ThermostatCommand implements Command {
    private Thermostat thermostat;
    private int newTemp;
    private int previousTemp;

    public ThermostatCommand(Thermostat thermostat, int temperature) {
        this.thermostat = thermostat;
        this.newTemp = temperature;
    }

    public void execute() {
        previousTemp = thermostat.getTemperature();
        thermostat.setTemperature(newTemp);
    }

    public void undo() {
        thermostat.setTemperature(previousTemp);
    }
}

class FanSpeedCommand implements Command {
    private Fan fan;
    private int newSpeed;
    private int previousSpeed;

    public FanSpeedCommand(Fan fan, int speed) {
        this.fan = fan;
        this.newSpeed = speed;
    }

    public void execute() {
        previousSpeed = fan.getSpeed();
        fan.setSpeed(newSpeed);
    }

    public void undo() {
        fan.setSpeed(previousSpeed);
    }
}

// Invoker
class SmartHomeController {
    private Map<String, Command> commands = new HashMap<>();
    private Stack<Command> history = new Stack<>();

    public void setCommand(String button, Command command) {
        commands.put(button, command);
    }

    public void pressButton(String button) {
        Command command = commands.get(button);
        if (command != null) {
            command.execute();
            history.push(command);
        }
    }

    public void undoLastCommand() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            command.undo();
        }
    }
}

// Test
public class SmartHomeTest {
    public static void main(String[] args) {
        Thermostat thermostat = new Thermostat();
        Fan fan = new Fan();

        SmartHomeController controller = new SmartHomeController();

        controller.setCommand("TEMP_UP", new ThermostatCommand(thermostat, 75));
        controller.setCommand("FAN_HIGH", new FanSpeedCommand(fan, 3));

        controller.pressButton("TEMP_UP");
        controller.pressButton("FAN_HIGH");
        controller.undoLastCommand();
    }
}
```

**Expected Output:**
```
Thermostat set to 75°F
Fan speed set to 3
Fan speed set to 0
```

### Task 2: Stock Trading System
Implement buy/sell stock commands with transaction history.

```java
interface Command {
    void execute();
    void undo();
    String getDescription();
}

class Stock {
    private String symbol;
    private int quantity;

    public Stock(String symbol) {
        this.symbol = symbol;
        this.quantity = 0;
    }

    public void buy(int quantity) {
        this.quantity += quantity;
        System.out.println("Bought " + quantity + " shares of " + symbol +
                         ". Total: " + this.quantity);
    }

    public void sell(int quantity) {
        this.quantity -= quantity;
        System.out.println("Sold " + quantity + " shares of " + symbol +
                         ". Total: " + this.quantity);
    }

    public String getSymbol() {
        return symbol;
    }

    public int getQuantity() {
        return quantity;
    }
}

class BuyStockCommand implements Command {
    private Stock stock;
    private int quantity;

    public BuyStockCommand(Stock stock, int quantity) {
        this.stock = stock;
        this.quantity = quantity;
    }

    public void execute() {
        stock.buy(quantity);
    }

    public void undo() {
        stock.sell(quantity);
    }

    public String getDescription() {
        return "Buy " + quantity + " shares of " + stock.getSymbol();
    }
}

class SellStockCommand implements Command {
    private Stock stock;
    private int quantity;

    public SellStockCommand(Stock stock, int quantity) {
        this.stock = stock;
        this.quantity = quantity;
    }

    public void execute() {
        stock.sell(quantity);
    }

    public void undo() {
        stock.buy(quantity);
    }

    public String getDescription() {
        return "Sell " + quantity + " shares of " + stock.getSymbol();
    }
}

class Broker {
    private List<Command> orders = new ArrayList<>();

    public void takeOrder(Command command) {
        orders.add(command);
    }

    public void executeOrders() {
        for (Command command : orders) {
            command.execute();
        }
        orders.clear();
    }
}
```

### Task 3: Graphics Editor with Undo/Redo
Create a drawing application with shape commands.

```java
interface Command {
    void execute();
    void undo();
}

class Canvas {
    private List<String> shapes = new ArrayList<>();

    public void addShape(String shape) {
        shapes.add(shape);
        System.out.println("Added: " + shape);
        display();
    }

    public void removeShape(String shape) {
        shapes.remove(shape);
        System.out.println("Removed: " + shape);
        display();
    }

    public void display() {
        System.out.println("Canvas: " + shapes);
    }
}

class DrawCircleCommand implements Command {
    private Canvas canvas;
    private String circle;

    public DrawCircleCommand(Canvas canvas, int x, int y, int radius) {
        this.canvas = canvas;
        this.circle = "Circle(" + x + "," + y + ",r=" + radius + ")";
    }

    public void execute() {
        canvas.addShape(circle);
    }

    public void undo() {
        canvas.removeShape(circle);
    }
}

class DrawRectangleCommand implements Command {
    private Canvas canvas;
    private String rectangle;

    public DrawRectangleCommand(Canvas canvas, int x, int y, int w, int h) {
        this.canvas = canvas;
        this.rectangle = "Rectangle(" + x + "," + y + "," + w + "x" + h + ")";
    }

    public void execute() {
        canvas.addShape(rectangle);
    }

    public void undo() {
        canvas.removeShape(rectangle);
    }
}

class DrawingEditor {
    private Stack<Command> undoStack = new Stack<>();
    private Stack<Command> redoStack = new Stack<>();

    public void executeCommand(Command command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        } else {
            System.out.println("Nothing to undo");
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            Command command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        } else {
            System.out.println("Nothing to redo");
        }
    }
}
```

### Task 4: File System Operations
Implement file operation commands with rollback capability.

```java
interface FileCommand {
    void execute();
    void undo();
    String getLog();
}

class FileSystem {
    private Map<String, String> files = new HashMap<>();

    public void createFile(String name, String content) {
        files.put(name, content);
        System.out.println("Created file: " + name);
    }

    public void deleteFile(String name) {
        files.remove(name);
        System.out.println("Deleted file: " + name);
    }

    public void writeFile(String name, String content) {
        files.put(name, content);
        System.out.println("Updated file: " + name);
    }

    public String readFile(String name) {
        return files.get(name);
    }

    public boolean fileExists(String name) {
        return files.containsKey(name);
    }
}

class CreateFileCommand implements FileCommand {
    private FileSystem fs;
    private String filename;
    private String content;

    public CreateFileCommand(FileSystem fs, String filename, String content) {
        this.fs = fs;
        this.filename = filename;
        this.content = content;
    }

    public void execute() {
        fs.createFile(filename, content);
    }

    public void undo() {
        fs.deleteFile(filename);
    }

    public String getLog() {
        return "CREATE " + filename;
    }
}

class DeleteFileCommand implements FileCommand {
    private FileSystem fs;
    private String filename;
    private String previousContent;

    public DeleteFileCommand(FileSystem fs, String filename) {
        this.fs = fs;
        this.filename = filename;
    }

    public void execute() {
        previousContent = fs.readFile(filename);
        fs.deleteFile(filename);
    }

    public void undo() {
        fs.createFile(filename, previousContent);
    }

    public String getLog() {
        return "DELETE " + filename;
    }
}
```

### Task 5: Database Transaction Commands
Create database operation commands with commit/rollback.

```java
interface DatabaseCommand {
    void execute();
    void rollback();
    String getQuery();
}

class Database {
    private Map<Integer, String> records = new HashMap<>();

    public void insert(int id, String data) {
        records.put(id, data);
        System.out.println("Inserted: ID=" + id + ", Data=" + data);
    }

    public void update(int id, String data) {
        records.put(id, data);
        System.out.println("Updated: ID=" + id + ", Data=" + data);
    }

    public void delete(int id) {
        records.remove(id);
        System.out.println("Deleted: ID=" + id);
    }

    public String select(int id) {
        return records.get(id);
    }
}

class InsertCommand implements DatabaseCommand {
    private Database db;
    private int id;
    private String data;

    public InsertCommand(Database db, int id, String data) {
        this.db = db;
        this.id = id;
        this.data = data;
    }

    public void execute() {
        db.insert(id, data);
    }

    public void rollback() {
        db.delete(id);
    }

    public String getQuery() {
        return "INSERT INTO table VALUES (" + id + ", '" + data + "')";
    }
}

class Transaction {
    private List<DatabaseCommand> commands = new ArrayList<>();

    public void addCommand(DatabaseCommand command) {
        commands.add(command);
    }

    public void commit() {
        System.out.println("Committing transaction...");
        for (DatabaseCommand cmd : commands) {
            cmd.execute();
        }
        System.out.println("Transaction committed");
    }

    public void rollback() {
        System.out.println("Rolling back transaction...");
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).rollback();
        }
        System.out.println("Transaction rolled back");
    }
}
```

### Task 6: Macro Commands
Combine multiple commands into a single macro command.

```java
interface Command {
    void execute();
    void undo();
}

class MacroCommand implements Command {
    private List<Command> commands = new ArrayList<>();

    public void addCommand(Command command) {
        commands.add(command);
    }

    public void execute() {
        System.out.println("Executing macro command:");
        for (Command command : commands) {
            command.execute();
        }
    }

    public void undo() {
        System.out.println("Undoing macro command:");
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).undo();
        }
    }
}

// Example: Morning Routine Macro
class CoffeeMaker {
    public void brew() {
        System.out.println("Brewing coffee");
    }

    public void stop() {
        System.out.println("Stopping coffee maker");
    }
}

class Lights {
    public void turnOn() {
        System.out.println("Lights turned on");
    }

    public void turnOff() {
        System.out.println("Lights turned off");
    }
}

class Music {
    public void play() {
        System.out.println("Playing music");
    }

    public void stop() {
        System.out.println("Music stopped");
    }
}

// Create specific commands and combine them in a macro
```

### Task 7: Game Command System
Implement a game with command pattern for player actions.

```java
interface GameCommand {
    void execute();
    void undo();
}

class Player {
    private int x, y;
    private int health;

    public Player(int x, int y, int health) {
        this.x = x;
        this.y = y;
        this.health = health;
    }

    public void move(int dx, int dy) {
        x += dx;
        y += dy;
        System.out.println("Player moved to (" + x + ", " + y + ")");
    }

    public void takeDamage(int damage) {
        health -= damage;
        System.out.println("Player took " + damage + " damage. Health: " + health);
    }

    public void heal(int amount) {
        health += amount;
        System.out.println("Player healed " + amount + ". Health: " + health);
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public int getHealth() { return health; }
}

class MoveCommand implements GameCommand {
    private Player player;
    private int dx, dy;

    public MoveCommand(Player player, int dx, int dy) {
        this.player = player;
        this.dx = dx;
        this.dy = dy;
    }

    public void execute() {
        player.move(dx, dy);
    }

    public void undo() {
        player.move(-dx, -dy);
    }
}

class AttackCommand implements GameCommand {
    private Player player;
    private int damage;

    public AttackCommand(Player player, int damage) {
        this.player = player;
        this.damage = damage;
    }

    public void execute() {
        player.takeDamage(damage);
    }

    public void undo() {
        player.heal(damage);
    }
}

class GameEngine {
    private Stack<GameCommand> commandHistory = new Stack<>();

    public void executeCommand(GameCommand command) {
        command.execute();
        commandHistory.push(command);
    }

    public void undoLastMove() {
        if (!commandHistory.isEmpty()) {
            GameCommand command = commandHistory.pop();
            command.undo();
        }
    }
}
```

### Task 8: Remote Control with Command Queue
Advanced remote control with scheduled commands.

```java
import java.util.*;

interface Command {
    void execute();
    void undo();
    String getName();
}

class TV {
    private boolean on = false;
    private int channel = 1;
    private int volume = 10;

    public void turnOn() {
        on = true;
        System.out.println("TV is ON");
    }

    public void turnOff() {
        on = false;
        System.out.println("TV is OFF");
    }

    public void setChannel(int channel) {
        this.channel = channel;
        System.out.println("Channel: " + channel);
    }

    public void setVolume(int volume) {
        this.volume = volume;
        System.out.println("Volume: " + volume);
    }

    public boolean isOn() { return on; }
    public int getChannel() { return channel; }
    public int getVolume() { return volume; }
}

class AdvancedRemoteControl {
    private Queue<Command> commandQueue = new LinkedList<>();
    private Stack<Command> history = new Stack<>();

    public void queueCommand(Command command) {
        commandQueue.add(command);
        System.out.println("Queued: " + command.getName());
    }

    public void executeQueue() {
        System.out.println("\nExecuting queued commands:");
        while (!commandQueue.isEmpty()) {
            Command command = commandQueue.poll();
            command.execute();
            history.push(command);
        }
    }

    public void undoLast() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            command.undo();
        }
    }

    public void clearQueue() {
        commandQueue.clear();
        System.out.println("Queue cleared");
    }
}
```

## Common Pitfalls

### 1. Not Storing State for Undo
```java
// ❌ Can't undo without previous state
class BadCommand implements Command {
    public void execute() {
        receiver.setValue(10);
    }

    public void undo() {
        receiver.setValue(?); // What was the previous value?
    }
}

// ✅ Store previous state
class GoodCommand implements Command {
    private int previousValue;

    public void execute() {
        previousValue = receiver.getValue();
        receiver.setValue(10);
    }

    public void undo() {
        receiver.setValue(previousValue);
    }
}
```

### 2. Memory Leaks with Large History
```java
// ❌ Unbounded history
class Invoker {
    private Stack<Command> history = new Stack<>(); // Grows forever
}

// ✅ Limit history size
class Invoker {
    private static final int MAX_HISTORY = 100;
    private LinkedList<Command> history = new LinkedList<>();

    public void execute(Command cmd) {
        cmd.execute();
        history.addFirst(cmd);
        if (history.size() > MAX_HISTORY) {
            history.removeLast();
        }
    }
}
```

### 3. Ignoring Command Failure
```java
// ❌ No error handling
public void execute() {
    receiver.doSomething(); // What if this fails?
}

// ✅ Handle failures
public boolean execute() {
    try {
        receiver.doSomething();
        return true;
    } catch (Exception e) {
        return false;
    }
}
```

## Best Practices

1. **Immutable Commands**: Commands should be immutable after creation
2. **Command Validation**: Validate before execution when possible
3. **Logging**: Log command execution for debugging and auditing
4. **Null Object Pattern**: Use null command for default behavior
5. **Command Factory**: Create commands through factory for consistency
6. **Transactional Commands**: Support all-or-nothing execution
7. **Asynchronous Execution**: Consider async execution for long operations
8. **Command Serialization**: Make commands serializable for persistence

## Command Pattern Variants

### 1. Null Command
```java
class NoCommand implements Command {
    public void execute() { }
    public void undo() { }
}
```

### 2. Composite Command (Macro)
```java
class MacroCommand implements Command {
    private List<Command> commands;

    public void execute() {
        for (Command cmd : commands) {
            cmd.execute();
        }
    }
}
```

### 3. Queued Commands
```java
class CommandQueue {
    private Queue<Command> queue = new LinkedList<>();

    public void enqueue(Command cmd) {
        queue.add(cmd);
    }

    public void processQueue() {
        while (!queue.isEmpty()) {
            queue.poll().execute();
        }
    }
}
```

## Real-World Examples

### Java Library Examples
- `java.lang.Runnable` - Encapsulates executable code
- `javax.swing.Action` - GUI action commands
- `java.util.concurrent.Executor` - Command execution

### Framework Examples
- Database transactions - Commit/Rollback
- Text editors - Undo/Redo functionality
- Job schedulers - Queued command execution
- Workflow engines - Command chain execution

## Next Steps

After mastering Command, move on to `04-Template-Method` to learn about defining algorithm skeletons!

**Challenge**: Create a comprehensive workflow automation system that:
- Supports complex multi-step workflows
- Implements full undo/redo with branching history
- Allows conditional command execution
- Supports command scheduling and delayed execution
- Includes command validation and rollback on failure
- Persists command history to disk for crash recovery
- Implements command patterns for API rate limiting
