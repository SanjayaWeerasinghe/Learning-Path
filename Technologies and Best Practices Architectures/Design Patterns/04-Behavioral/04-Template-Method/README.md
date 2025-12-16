# Template Method Pattern

## What You'll Learn
- Understanding the Template Method design pattern
- Defining algorithm skeletons in base classes
- Implementing invariant vs variant parts of algorithms
- Using hooks for optional steps
- The Hollywood Principle: "Don't call us, we'll call you"
- Avoiding code duplication through inheritance

## Concept Overview

The Template Method pattern defines the skeleton of an algorithm in a base class, allowing subclasses to override specific steps of the algorithm without changing its structure.

### Key Characteristics
- **Algorithm Structure**: Defines the overall algorithm structure in base class
- **Step Customization**: Subclasses implement specific steps
- **Invariant Behavior**: Common code stays in base class
- **Variant Behavior**: Subclasses provide specific implementations
- **Hooks**: Optional steps that can be overridden

### When to Use
- Multiple classes have similar algorithms with minor differences
- Want to control the order of algorithm steps
- Need to avoid code duplication across similar classes
- Want to let subclasses extend only certain parts
- Implementing frameworks where users extend specific points

### Real-World Analogy
Think of a recipe - the steps are fixed (mix ingredients, bake, cool, serve), but specific ingredients and timing vary for different dishes. The recipe template stays the same, but the details differ.

## Basic Implementation

```java
// Abstract Template
abstract class DataProcessor {
    // Template method - defines the algorithm structure
    public final void process() {
        readData();
        processData();
        saveData();
    }

    // Abstract methods - must be implemented by subclasses
    protected abstract void readData();
    protected abstract void processData();

    // Concrete method - same for all subclasses
    protected void saveData() {
        System.out.println("Saving processed data");
    }
}

// Concrete Implementation 1
class CSVDataProcessor extends DataProcessor {
    protected void readData() {
        System.out.println("Reading data from CSV file");
    }

    protected void processData() {
        System.out.println("Processing CSV data");
    }
}

// Concrete Implementation 2
class XMLDataProcessor extends DataProcessor {
    protected void readData() {
        System.out.println("Reading data from XML file");
    }

    protected void processData() {
        System.out.println("Processing XML data");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        DataProcessor csvProcessor = new CSVDataProcessor();
        csvProcessor.process();

        System.out.println();

        DataProcessor xmlProcessor = new XMLDataProcessor();
        xmlProcessor.process();
    }
}
```

**Output:**
```
Reading data from CSV file
Processing CSV data
Saving processed data

Reading data from XML file
Processing XML data
Saving processed data
```

## Template Method with Hooks

```java
abstract class Beverage {
    // Template method
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) {  // Hook
            addCondiments();
        }
    }

    protected abstract void brew();
    protected abstract void addCondiments();

    private void boilWater() {
        System.out.println("Boiling water");
    }

    private void pourInCup() {
        System.out.println("Pouring into cup");
    }

    // Hook method - default implementation
    protected boolean customerWantsCondiments() {
        return true;
    }
}

class Coffee extends Beverage {
    protected void brew() {
        System.out.println("Dripping coffee through filter");
    }

    protected void addCondiments() {
        System.out.println("Adding sugar and milk");
    }
}

class Tea extends Beverage {
    protected void brew() {
        System.out.println("Steeping the tea");
    }

    protected void addCondiments() {
        System.out.println("Adding lemon");
    }

    protected boolean customerWantsCondiments() {
        return false; // Override hook
    }
}
```

**Output:**
```
Boiling water
Dripping coffee through filter
Pouring into cup
Adding sugar and milk

Boiling water
Steeping the tea
Pouring into cup
```

## Your Tasks

### Task 1: Game Template
Create a game template with standard game flow.

```java
abstract class Game {
    // Template method
    public final void play() {
        initialize();
        startPlay();
        while (!isGameOver()) {
            makeMove();
            updateGameState();
        }
        endPlay();
        printWinner();
    }

    // Abstract methods
    protected abstract void initialize();
    protected abstract void startPlay();
    protected abstract void makeMove();
    protected abstract boolean isGameOver();
    protected abstract void endPlay();
    protected abstract void printWinner();

    // Hook
    protected void updateGameState() {
        System.out.println("Updating game state...");
    }
}

class Chess extends Game {
    private int moves = 0;

    protected void initialize() {
        System.out.println("Chess Game Initialized. Setup the board.");
    }

    protected void startPlay() {
        System.out.println("Game Started. White plays first.");
    }

    protected void makeMove() {
        moves++;
        System.out.println("Move " + moves + " played.");
    }

    protected boolean isGameOver() {
        return moves >= 5; // Simplified
    }

    protected void endPlay() {
        System.out.println("Chess Game Finished!");
    }

    protected void printWinner() {
        System.out.println("Winner: Player with Checkmate");
    }
}

class TicTacToe extends Game {
    private int turns = 0;

    protected void initialize() {
        System.out.println("Tic-Tac-Toe Initialized. 3x3 board created.");
    }

    protected void startPlay() {
        System.out.println("Game Started. X plays first.");
    }

    protected void makeMove() {
        turns++;
        System.out.println("Turn " + turns + ": Mark placed.");
    }

    protected boolean isGameOver() {
        return turns >= 3; // Simplified
    }

    protected void endPlay() {
        System.out.println("Tic-Tac-Toe Game Finished!");
    }

    protected void printWinner() {
        System.out.println("Winner: Player with 3 in a row");
    }
}

// Test
public class GameTest {
    public static void main(String[] args) {
        Game chess = new Chess();
        chess.play();

        System.out.println("\n---\n");

        Game ttt = new TicTacToe();
        ttt.play();
    }
}
```

**Expected Output:**
```
Chess Game Initialized. Setup the board.
Game Started. White plays first.
Move 1 played.
Updating game state...
Move 2 played.
Updating game state...
Move 3 played.
Updating game state...
Move 4 played.
Updating game state...
Move 5 played.
Updating game state...
Chess Game Finished!
Winner: Player with Checkmate

---

Tic-Tac-Toe Initialized. 3x3 board created.
Game Started. X plays first.
Turn 1: Mark placed.
Updating game state...
Turn 2: Mark placed.
Updating game state...
Turn 3: Mark placed.
Updating game state...
Tic-Tac-Toe Game Finished!
Winner: Player with 3 in a row
```

### Task 2: Build Process Template
Create a build system with template method.

```java
abstract class BuildTool {
    // Template method
    public final void build() {
        checkDependencies();
        compile();
        if (runTests()) {
            test();
        }
        package_();
        deploy();
        sendNotification();
    }

    protected abstract void checkDependencies();
    protected abstract void compile();
    protected abstract void test();
    protected abstract void package_();
    protected abstract void deploy();

    // Hook - can be overridden
    protected boolean runTests() {
        return true;
    }

    // Common method
    protected void sendNotification() {
        System.out.println("Build notification sent");
    }
}

class MavenBuild extends BuildTool {
    protected void checkDependencies() {
        System.out.println("Maven: Checking dependencies in pom.xml");
    }

    protected void compile() {
        System.out.println("Maven: Compiling with mvn compile");
    }

    protected void test() {
        System.out.println("Maven: Running tests with mvn test");
    }

    protected void package_() {
        System.out.println("Maven: Creating JAR with mvn package");
    }

    protected void deploy() {
        System.out.println("Maven: Deploying with mvn deploy");
    }
}

class GradleBuild extends BuildTool {
    protected void checkDependencies() {
        System.out.println("Gradle: Resolving dependencies from build.gradle");
    }

    protected void compile() {
        System.out.println("Gradle: Compiling with gradle build");
    }

    protected void test() {
        System.out.println("Gradle: Running tests with gradle test");
    }

    protected void package_() {
        System.out.println("Gradle: Creating JAR with gradle jar");
    }

    protected void deploy() {
        System.out.println("Gradle: Publishing with gradle publish");
    }
}

class QuickBuild extends BuildTool {
    protected void checkDependencies() {
        System.out.println("Quick Build: Skipping dependency check");
    }

    protected void compile() {
        System.out.println("Quick Build: Fast compilation");
    }

    protected void test() {
        System.out.println("Quick Build: Running smoke tests only");
    }

    protected void package_() {
        System.out.println("Quick Build: Creating package");
    }

    protected void deploy() {
        System.out.println("Quick Build: Local deployment");
    }

    protected boolean runTests() {
        return false; // Skip tests in quick build
    }
}
```

### Task 3: Report Generator
Create different report formats with common generation flow.

```java
abstract class ReportGenerator {
    // Template method
    public final void generateReport(String data) {
        openDocument();
        writeHeader();
        writeBody(data);
        writeFooter();
        if (shouldAddSignature()) {
            addSignature();
        }
        closeDocument();
    }

    protected abstract void openDocument();
    protected abstract void writeHeader();
    protected abstract void writeBody(String data);
    protected abstract void writeFooter();
    protected abstract void closeDocument();

    // Hook
    protected boolean shouldAddSignature() {
        return false;
    }

    protected void addSignature() {
        System.out.println("Adding signature");
    }
}

class PDFReport extends ReportGenerator {
    protected void openDocument() {
        System.out.println("Opening PDF document");
    }

    protected void writeHeader() {
        System.out.println("PDF Header: Company Logo and Title");
    }

    protected void writeBody(String data) {
        System.out.println("PDF Body: " + data);
    }

    protected void writeFooter() {
        System.out.println("PDF Footer: Page number and date");
    }

    protected void closeDocument() {
        System.out.println("Saving and closing PDF");
    }

    protected boolean shouldAddSignature() {
        return true;
    }
}

class HTMLReport extends ReportGenerator {
    protected void openDocument() {
        System.out.println("Creating HTML document");
        System.out.println("<html><body>");
    }

    protected void writeHeader() {
        System.out.println("<h1>Report Title</h1>");
    }

    protected void writeBody(String data) {
        System.out.println("<div>" + data + "</div>");
    }

    protected void writeFooter() {
        System.out.println("<footer>Generated on " +
                         java.time.LocalDate.now() + "</footer>");
    }

    protected void closeDocument() {
        System.out.println("</body></html>");
        System.out.println("HTML report generated");
    }
}

class MarkdownReport extends ReportGenerator {
    protected void openDocument() {
        System.out.println("Creating Markdown document");
    }

    protected void writeHeader() {
        System.out.println("# Report Title\n");
    }

    protected void writeBody(String data) {
        System.out.println(data + "\n");
    }

    protected void writeFooter() {
        System.out.println("---");
        System.out.println("*Generated: " +
                         java.time.LocalDate.now() + "*");
    }

    protected void closeDocument() {
        System.out.println("Markdown file saved");
    }
}
```

### Task 4: Data Import Template
Create a data import system with validation and transformation.

```java
abstract class DataImporter {
    // Template method
    public final void importData(String source) {
        validateSource(source);
        extractData(source);
        if (shouldTransform()) {
            transformData();
        }
        validateData();
        if (isValid()) {
            saveToDatabase();
            logSuccess();
        } else {
            logErrors();
        }
    }

    protected abstract void validateSource(String source);
    protected abstract void extractData(String source);
    protected abstract void transformData();
    protected abstract void validateData();
    protected abstract void saveToDatabase();

    private boolean valid = true;

    protected boolean isValid() {
        return valid;
    }

    protected void setValid(boolean valid) {
        this.valid = valid;
    }

    // Hook
    protected boolean shouldTransform() {
        return true;
    }

    protected void logSuccess() {
        System.out.println("Import completed successfully");
    }

    protected void logErrors() {
        System.out.println("Import failed - check error log");
    }
}

class CSVImporter extends DataImporter {
    protected void validateSource(String source) {
        System.out.println("Validating CSV file: " + source);
    }

    protected void extractData(String source) {
        System.out.println("Extracting CSV data");
    }

    protected void transformData() {
        System.out.println("Transforming CSV columns to database fields");
    }

    protected void validateData() {
        System.out.println("Validating CSV data types");
        setValid(true);
    }

    protected void saveToDatabase() {
        System.out.println("Inserting CSV records into database");
    }
}

class JSONImporter extends DataImporter {
    protected void validateSource(String source) {
        System.out.println("Validating JSON structure: " + source);
    }

    protected void extractData(String source) {
        System.out.println("Parsing JSON data");
    }

    protected void transformData() {
        System.out.println("Mapping JSON objects to entities");
    }

    protected void validateData() {
        System.out.println("Validating JSON schema");
        setValid(true);
    }

    protected void saveToDatabase() {
        System.out.println("Persisting JSON data");
    }
}
```

### Task 5: Test Execution Framework
Create a test framework with setup, execution, and teardown.

```java
abstract class TestCase {
    // Template method
    public final void runTest() {
        if (setup()) {
            try {
                runTestLogic();
                if (verify()) {
                    reportSuccess();
                } else {
                    reportFailure();
                }
            } catch (Exception e) {
                handleException(e);
            } finally {
                tearDown();
            }
        }
    }

    protected abstract void runTestLogic();
    protected abstract boolean verify();

    // Hooks with default implementation
    protected boolean setup() {
        System.out.println("Default setup");
        return true;
    }

    protected void tearDown() {
        System.out.println("Default teardown");
    }

    protected void reportSuccess() {
        System.out.println("TEST PASSED");
    }

    protected void reportFailure() {
        System.out.println("TEST FAILED");
    }

    protected void handleException(Exception e) {
        System.out.println("TEST ERROR: " + e.getMessage());
    }
}

class LoginTest extends TestCase {
    private boolean loginSuccessful = false;

    protected boolean setup() {
        System.out.println("Setting up login test environment");
        System.out.println("Creating test user");
        return true;
    }

    protected void runTestLogic() {
        System.out.println("Attempting login with test credentials");
        loginSuccessful = true; // Simulate successful login
    }

    protected boolean verify() {
        return loginSuccessful;
    }

    protected void tearDown() {
        System.out.println("Cleaning up test user");
        System.out.println("Closing browser");
    }
}

class DatabaseTest extends TestCase {
    private boolean querySuccessful = false;

    protected boolean setup() {
        System.out.println("Connecting to test database");
        System.out.println("Creating test tables");
        return true;
    }

    protected void runTestLogic() {
        System.out.println("Inserting test data");
        System.out.println("Running SELECT query");
        querySuccessful = true;
    }

    protected boolean verify() {
        System.out.println("Verifying query results");
        return querySuccessful;
    }

    protected void tearDown() {
        System.out.println("Dropping test tables");
        System.out.println("Closing database connection");
    }
}
```

### Task 6: Order Processing Template
E-commerce order processing with different payment methods.

```java
abstract class OrderProcessor {
    // Template method
    public final void processOrder(double amount) {
        validateOrder();
        if (checkInventory()) {
            if (processPayment(amount)) {
                reserveItems();
                if (shouldApplyDiscount()) {
                    applyDiscount();
                }
                calculateShipping();
                generateInvoice();
                sendConfirmation();
            } else {
                handlePaymentFailure();
            }
        } else {
            handleOutOfStock();
        }
    }

    protected abstract boolean processPayment(double amount);

    protected void validateOrder() {
        System.out.println("Validating order details");
    }

    protected boolean checkInventory() {
        System.out.println("Checking inventory");
        return true;
    }

    protected void reserveItems() {
        System.out.println("Reserving items");
    }

    protected void calculateShipping() {
        System.out.println("Calculating shipping cost");
    }

    protected void generateInvoice() {
        System.out.println("Generating invoice");
    }

    protected void sendConfirmation() {
        System.out.println("Sending order confirmation email");
    }

    // Hooks
    protected boolean shouldApplyDiscount() {
        return false;
    }

    protected void applyDiscount() {
        System.out.println("Applying discount");
    }

    protected void handlePaymentFailure() {
        System.out.println("Payment failed - order cancelled");
    }

    protected void handleOutOfStock() {
        System.out.println("Items out of stock - order on hold");
    }
}

class CreditCardOrder extends OrderProcessor {
    protected boolean processPayment(double amount) {
        System.out.println("Processing credit card payment: $" + amount);
        System.out.println("Authorizing card...");
        System.out.println("Payment approved");
        return true;
    }

    protected boolean shouldApplyDiscount() {
        return true; // Credit card users get discount
    }
}

class PayPalOrder extends OrderProcessor {
    protected boolean processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
        System.out.println("Redirecting to PayPal...");
        System.out.println("Payment confirmed");
        return true;
    }
}

class CashOnDeliveryOrder extends OrderProcessor {
    protected boolean processPayment(double amount) {
        System.out.println("Cash on delivery: $" + amount);
        System.out.println("Payment to be collected on delivery");
        return true;
    }

    protected void sendConfirmation() {
        System.out.println("Sending COD confirmation with delivery details");
    }
}
```

### Task 7: Document Converter
Convert documents through standard steps.

```java
abstract class DocumentConverter {
    // Template method
    public final void convert(String inputFile, String outputFile) {
        openInputFile(inputFile);
        validateFormat();
        readContent();
        transformContent();
        if (shouldOptimize()) {
            optimizeOutput();
        }
        writeOutput(outputFile);
        closeFiles();
        logConversion(inputFile, outputFile);
    }

    protected abstract void openInputFile(String file);
    protected abstract void validateFormat();
    protected abstract void readContent();
    protected abstract void transformContent();
    protected abstract void writeOutput(String file);

    // Hook
    protected boolean shouldOptimize() {
        return false;
    }

    protected void optimizeOutput() {
        System.out.println("Optimizing output");
    }

    protected void closeFiles() {
        System.out.println("Closing all file handles");
    }

    protected void logConversion(String input, String output) {
        System.out.println("Converted " + input + " to " + output);
    }
}

class WordToPDFConverter extends DocumentConverter {
    protected void openInputFile(String file) {
        System.out.println("Opening Word document: " + file);
    }

    protected void validateFormat() {
        System.out.println("Validating .docx format");
    }

    protected void readContent() {
        System.out.println("Reading Word content");
    }

    protected void transformContent() {
        System.out.println("Converting Word formatting to PDF");
    }

    protected void writeOutput(String file) {
        System.out.println("Writing PDF file: " + file);
    }

    protected boolean shouldOptimize() {
        return true;
    }
}

class ImageToThumbnailConverter extends DocumentConverter {
    protected void openInputFile(String file) {
        System.out.println("Loading image: " + file);
    }

    protected void validateFormat() {
        System.out.println("Checking image format");
    }

    protected void readContent() {
        System.out.println("Reading image data");
    }

    protected void transformContent() {
        System.out.println("Resizing to thumbnail");
    }

    protected void writeOutput(String file) {
        System.out.println("Saving thumbnail: " + file);
    }
}
```

### Task 8: Email Template System
Send different types of emails with common structure.

```java
abstract class EmailTemplate {
    // Template method
    public final void sendEmail(String recipient) {
        validateRecipient(recipient);
        composeEmail();
        if (shouldAttachFiles()) {
            attachFiles();
        }
        if (shouldEncrypt()) {
            encryptContent();
        }
        send(recipient);
        logEmail(recipient);
    }

    protected abstract void composeEmail();

    protected void validateRecipient(String recipient) {
        System.out.println("Validating email: " + recipient);
    }

    protected void send(String recipient) {
        System.out.println("Sending email to: " + recipient);
    }

    protected void logEmail(String recipient) {
        System.out.println("Email logged for: " + recipient);
    }

    // Hooks
    protected boolean shouldAttachFiles() {
        return false;
    }

    protected void attachFiles() {
        System.out.println("Attaching files");
    }

    protected boolean shouldEncrypt() {
        return false;
    }

    protected void encryptContent() {
        System.out.println("Encrypting email content");
    }
}

class WelcomeEmail extends EmailTemplate {
    protected void composeEmail() {
        System.out.println("Subject: Welcome to our service!");
        System.out.println("Body: Thank you for signing up...");
    }
}

class InvoiceEmail extends EmailTemplate {
    protected void composeEmail() {
        System.out.println("Subject: Your Invoice");
        System.out.println("Body: Please find attached invoice...");
    }

    protected boolean shouldAttachFiles() {
        return true;
    }

    protected void attachFiles() {
        System.out.println("Attaching invoice.pdf");
    }
}

class SecureEmail extends EmailTemplate {
    protected void composeEmail() {
        System.out.println("Subject: Confidential Information");
        System.out.println("Body: Secure content...");
    }

    protected boolean shouldEncrypt() {
        return true;
    }
}
```

## Common Pitfalls

### 1. Template Method Not Final
```java
// ❌ Template method can be overridden
public void process() {
    step1();
    step2();
}

// ✅ Make template method final
public final void process() {
    step1();
    step2();
}
```

### 2. Too Many Abstract Methods
```java
// ❌ Too granular
abstract class Bad {
    protected abstract void step1a();
    protected abstract void step1b();
    protected abstract void step2a();
    // ... 20 more methods
}

// ✅ Group related steps
abstract class Good {
    protected abstract void initializeStep();
    protected abstract void processStep();
    protected abstract void finalizeStep();
}
```

### 3. Tight Coupling
```java
// ❌ Template knows too much
abstract class Template {
    public final void process() {
        ConcreteClass concrete = (ConcreteClass) this;
        concrete.specificMethod(); // Bad!
    }
}

// ✅ Use abstract methods
abstract class Template {
    public final void process() {
        doSpecificWork(); // Polymorphism
    }
    protected abstract void doSpecificWork();
}
```

### 4. Missing Hooks
```java
// ❌ No flexibility
public final void process() {
    step1();
    step2(); // Always executes
    step3();
}

// ✅ Provide hooks
public final void process() {
    step1();
    if (shouldExecuteStep2()) {
        step2();
    }
    step3();
}

protected boolean shouldExecuteStep2() {
    return true; // Default, can override
}
```

## Best Practices

1. **Make Template Method Final**: Prevent subclasses from changing algorithm structure
2. **Minimize Required Methods**: Only abstract methods that truly vary
3. **Provide Hooks**: For optional variations
4. **Document Contract**: Clearly specify what each method should do
5. **Use Meaningful Names**: Method names should describe their purpose
6. **Keep Template Simple**: Complex logic in helper methods, not template
7. **Consider Access Modifiers**: Use protected for methods meant to be overridden
8. **Avoid Deep Hierarchies**: Limit to 2-3 levels

## Template Method vs Strategy

| Aspect | Template Method | Strategy |
|--------|----------------|----------|
| Mechanism | Inheritance | Composition |
| Flexibility | Compile-time | Runtime |
| Algorithm | Partial variation | Complete variation |
| Coupling | Tighter (inheritance) | Looser (interfaces) |
| Use Case | Related algorithms | Interchangeable algorithms |

## Hollywood Principle

"Don't call us, we'll call you"

The template method (superclass) calls methods in subclasses, not vice versa. This inverts the typical control flow and is key to the pattern.

```java
abstract class Framework {
    public final void templateMethod() {
        // Framework calls subclass methods
        step1();
        step2();
    }

    protected abstract void step1(); // Subclass implements
    protected abstract void step2(); // Subclass implements
}
```

## Real-World Examples

### Java Library Examples
- `java.io.InputStream` - read() template method
- `java.io.OutputStream` - write() template method
- `java.util.AbstractList` - Collection operations
- `javax.servlet.http.HttpServlet` - doGet(), doPost()

### Framework Examples
- Spring Framework - JdbcTemplate, RestTemplate
- JUnit - setUp(), tearDown(), runTest()
- Servlet lifecycle methods
- Android Activity lifecycle

## Next Steps

After mastering Template Method, move on to `05-State` to learn about objects changing behavior based on state!

**Challenge**: Create a comprehensive data pipeline framework that:
- Supports ETL (Extract, Transform, Load) operations
- Allows custom extraction from various sources
- Provides hooks for data validation and enrichment
- Implements error handling and retry logic
- Includes progress tracking and logging
- Supports both synchronous and asynchronous processing
- Allows pipeline composition and chaining
