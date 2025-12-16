# Strategy Pattern

## What You'll Learn
- Understanding the Strategy design pattern
- When and why to use Strategy pattern
- How to encapsulate algorithms
- Implementing runtime algorithm selection
- Avoiding conditional complexity
- Making algorithms interchangeable

## Concept Overview

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

### Key Characteristics
- **Algorithm Encapsulation**: Each algorithm is encapsulated in its own class
- **Runtime Selection**: Algorithms can be selected at runtime
- **Interchangeability**: Algorithms can be swapped without changing client code
- **Open/Closed Principle**: Easy to add new strategies without modifying existing code

### When to Use
- Multiple related classes differ only in their behavior
- You need different variants of an algorithm
- An algorithm uses data that clients shouldn't know about
- A class defines many behaviors with multiple conditional statements

### Real-World Analogy
Think of payment methods at checkout - you can choose credit card, PayPal, or cash. The checkout process (context) remains the same, but the payment strategy changes based on your choice.

## Basic Implementation

```java
// Strategy Interface
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete Strategies
class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    public CreditCardStrategy(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using Credit Card");
    }
}

class PayPalStrategy implements PaymentStrategy {
    private String email;

    public PayPalStrategy(String email) {
        this.email = email;
    }

    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using PayPal: " + email);
    }
}

class CashStrategy implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " in cash");
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout(double amount) {
        paymentStrategy.pay(amount);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        cart.setPaymentStrategy(new CreditCardStrategy("1234-5678", "123"));
        cart.checkout(100.0);

        cart.setPaymentStrategy(new PayPalStrategy("user@email.com"));
        cart.checkout(50.0);

        cart.setPaymentStrategy(new CashStrategy());
        cart.checkout(25.0);
    }
}
```

**Output:**
```
Paid $100.0 using Credit Card
Paid $50.0 using PayPal: user@email.com
Paid $25.0 in cash
```

## Advanced Example: Sorting Strategies

```java
interface SortStrategy {
    void sort(int[] array);
}

class BubbleSortStrategy implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("Sorting using Bubble Sort");
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
}

class QuickSortStrategy implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("Sorting using Quick Sort");
        quickSort(array, 0, array.length - 1);
    }

    private void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}

class Sorter {
    private SortStrategy strategy;

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sort(int[] array) {
        strategy.sort(array);
    }
}
```

## Your Tasks

### Task 1: Compression Strategies
Create different compression algorithms using Strategy pattern.

```java
interface CompressionStrategy {
    void compress(String fileName);
}

class ZipCompression implements CompressionStrategy {
    public void compress(String fileName) {
        System.out.println("Compressing " + fileName + " using ZIP");
    }
}

class RarCompression implements CompressionStrategy {
    public void compress(String fileName) {
        System.out.println("Compressing " + fileName + " using RAR");
    }
}

class SevenZipCompression implements CompressionStrategy {
    public void compress(String fileName) {
        System.out.println("Compressing " + fileName + " using 7-Zip");
    }
}

class CompressionContext {
    private CompressionStrategy strategy;

    public void setCompressionStrategy(CompressionStrategy strategy) {
        this.strategy = strategy;
    }

    public void compressFile(String fileName) {
        strategy.compress(fileName);
    }
}

// Test
public class CompressionTest {
    public static void main(String[] args) {
        CompressionContext context = new CompressionContext();

        context.setCompressionStrategy(new ZipCompression());
        context.compressFile("document.txt");

        context.setCompressionStrategy(new RarCompression());
        context.compressFile("document.txt");
    }
}
```

**Expected Output:**
```
Compressing document.txt using ZIP
Compressing document.txt using RAR
```

### Task 2: Discount Strategies
Implement different discount calculation strategies for an e-commerce system.

```java
interface DiscountStrategy {
    double applyDiscount(double price);
}

class NoDiscount implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price;
    }
}

class SeasonalDiscount implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price * 0.9; // 10% off
    }
}

class BlackFridayDiscount implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price * 0.5; // 50% off
    }
}

class LoyaltyDiscount implements DiscountStrategy {
    private int yearsAsMember;

    public LoyaltyDiscount(int yearsAsMember) {
        this.yearsAsMember = yearsAsMember;
    }

    public double applyDiscount(double price) {
        double discount = Math.min(yearsAsMember * 0.05, 0.30);
        return price * (1 - discount);
    }
}

class PriceCalculator {
    private DiscountStrategy discountStrategy;

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculatePrice(double originalPrice) {
        return discountStrategy.applyDiscount(originalPrice);
    }
}
```

**Expected Output:**
```
Original Price: $100.0
No Discount: $100.0
Seasonal Discount: $90.0
Black Friday: $50.0
Loyalty (3 years): $85.0
```

### Task 3: Validation Strategies
Create different validation strategies for user input.

```java
interface ValidationStrategy {
    boolean validate(String input);
    String getErrorMessage();
}

class EmailValidation implements ValidationStrategy {
    public boolean validate(String input) {
        return input.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    public String getErrorMessage() {
        return "Invalid email format";
    }
}

class PhoneValidation implements ValidationStrategy {
    public boolean validate(String input) {
        return input.matches("\\d{10}");
    }

    public String getErrorMessage() {
        return "Phone number must be 10 digits";
    }
}

class PasswordValidation implements ValidationStrategy {
    public boolean validate(String input) {
        return input.length() >= 8 &&
               input.matches(".*[A-Z].*") &&
               input.matches(".*[0-9].*");
    }

    public String getErrorMessage() {
        return "Password must be 8+ chars with uppercase and number";
    }
}

class Validator {
    private ValidationStrategy strategy;

    public void setStrategy(ValidationStrategy strategy) {
        this.strategy = strategy;
    }

    public boolean validate(String input) {
        if (!strategy.validate(input)) {
            System.out.println(strategy.getErrorMessage());
            return false;
        }
        return true;
    }
}
```

### Task 4: Route Calculation Strategies
Implement different route calculation strategies for a navigation system.

```java
interface RouteStrategy {
    void calculateRoute(String start, String end);
}

class ShortestRoute implements RouteStrategy {
    public void calculateRoute(String start, String end) {
        System.out.println("Calculating shortest route from " + start + " to " + end);
        System.out.println("Distance: 10 km, Time: 15 min");
    }
}

class FastestRoute implements RouteStrategy {
    public void calculateRoute(String start, String end) {
        System.out.println("Calculating fastest route from " + start + " to " + end);
        System.out.println("Distance: 15 km, Time: 10 min (via highway)");
    }
}

class ScenicRoute implements RouteStrategy {
    public void calculateRoute(String start, String end) {
        System.out.println("Calculating scenic route from " + start + " to " + end);
        System.out.println("Distance: 25 km, Time: 30 min (beautiful views)");
    }
}

class Navigator {
    private RouteStrategy strategy;

    public void setRouteStrategy(RouteStrategy strategy) {
        this.strategy = strategy;
    }

    public void navigate(String start, String end) {
        strategy.calculateRoute(start, end);
    }
}
```

### Task 5: Text Formatting Strategies
Create different text formatting strategies.

```java
interface TextFormatter {
    String format(String text);
}

class UpperCaseFormatter implements TextFormatter {
    public String format(String text) {
        return text.toUpperCase();
    }
}

class LowerCaseFormatter implements TextFormatter {
    public String format(String text) {
        return text.toLowerCase();
    }
}

class TitleCaseFormatter implements TextFormatter {
    public String format(String text) {
        String[] words = text.split(" ");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0)))
                      .append(word.substring(1).toLowerCase())
                      .append(" ");
            }
        }
        return result.toString().trim();
    }
}

class HtmlFormatter implements TextFormatter {
    public String format(String text) {
        return "<p>" + text + "</p>";
    }
}

class TextEditor {
    private TextFormatter formatter;

    public void setFormatter(TextFormatter formatter) {
        this.formatter = formatter;
    }

    public String formatText(String text) {
        return formatter.format(text);
    }
}
```

### Task 6: Encryption Strategies
Implement different encryption algorithms.

```java
interface EncryptionStrategy {
    String encrypt(String text);
    String decrypt(String text);
}

class CaesarCipher implements EncryptionStrategy {
    private int shift;

    public CaesarCipher(int shift) {
        this.shift = shift;
    }

    public String encrypt(String text) {
        StringBuilder result = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                result.append((char) ((c - base + shift) % 26 + base));
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

    public String decrypt(String text) {
        StringBuilder result = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                result.append((char) ((c - base - shift + 26) % 26 + base));
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }
}

class ReverseEncryption implements EncryptionStrategy {
    public String encrypt(String text) {
        return new StringBuilder(text).reverse().toString();
    }

    public String decrypt(String text) {
        return new StringBuilder(text).reverse().toString();
    }
}

class EncryptionContext {
    private EncryptionStrategy strategy;

    public void setStrategy(EncryptionStrategy strategy) {
        this.strategy = strategy;
    }

    public String encrypt(String text) {
        return strategy.encrypt(text);
    }

    public String decrypt(String text) {
        return strategy.decrypt(text);
    }
}
```

### Task 7: Tax Calculation Strategies
Create tax calculation strategies for different regions.

```java
interface TaxStrategy {
    double calculateTax(double amount);
    String getTaxName();
}

class USTax implements TaxStrategy {
    public double calculateTax(double amount) {
        return amount * 0.07; // 7% sales tax
    }

    public String getTaxName() {
        return "US Sales Tax (7%)";
    }
}

class EUTax implements TaxStrategy {
    public double calculateTax(double amount) {
        return amount * 0.20; // 20% VAT
    }

    public String getTaxName() {
        return "EU VAT (20%)";
    }
}

class IndiaTax implements TaxStrategy {
    public double calculateTax(double amount) {
        return amount * 0.18; // 18% GST
    }

    public String getTaxName() {
        return "India GST (18%)";
    }
}

class TaxCalculator {
    private TaxStrategy taxStrategy;

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public double calculateTotal(double amount) {
        double tax = taxStrategy.calculateTax(amount);
        System.out.println(taxStrategy.getTaxName() + ": $" + tax);
        return amount + tax;
    }
}
```

### Task 8: Export Strategies
Implement different data export formats.

```java
import java.util.List;

interface ExportStrategy {
    void export(List<String[]> data);
}

class CSVExport implements ExportStrategy {
    public void export(List<String[]> data) {
        System.out.println("Exporting to CSV:");
        for (String[] row : data) {
            System.out.println(String.join(",", row));
        }
    }
}

class JSONExport implements ExportStrategy {
    public void export(List<String[]> data) {
        System.out.println("Exporting to JSON:");
        System.out.println("[");
        for (int i = 0; i < data.size(); i++) {
            String[] row = data.get(i);
            System.out.print("  {\"name\": \"" + row[0] + "\", \"value\": \"" + row[1] + "\"}");
            if (i < data.size() - 1) System.out.print(",");
            System.out.println();
        }
        System.out.println("]");
    }
}

class XMLExport implements ExportStrategy {
    public void export(List<String[]> data) {
        System.out.println("Exporting to XML:");
        System.out.println("<data>");
        for (String[] row : data) {
            System.out.println("  <item name=\"" + row[0] + "\" value=\"" + row[1] + "\" />");
        }
        System.out.println("</data>");
    }
}

class DataExporter {
    private ExportStrategy strategy;

    public void setExportStrategy(ExportStrategy strategy) {
        this.strategy = strategy;
    }

    public void export(List<String[]> data) {
        strategy.export(data);
    }
}
```

## Common Pitfalls

### 1. Strategy Bloat
```java
// ❌ Too many similar strategies
class Strategy1 implements Strategy { }
class Strategy2 implements Strategy { }
class Strategy3 implements Strategy { }
// ... 50 more strategies

// ✅ Use parameterized strategy
class ConfigurableStrategy implements Strategy {
    private Config config;

    public ConfigurableStrategy(Config config) {
        this.config = config;
    }
}
```

### 2. Client Awareness
```java
// ❌ Client needs to know strategy details
if (complexCondition) {
    context.setStrategy(new StrategyA(param1, param2, param3));
} else {
    context.setStrategy(new StrategyB(param4, param5));
}

// ✅ Use factory to hide complexity
Strategy strategy = StrategyFactory.createStrategy(userPreference);
context.setStrategy(strategy);
```

### 3. Missing Null Check
```java
// ❌ No null check
class Context {
    private Strategy strategy;

    public void execute() {
        strategy.doSomething(); // NullPointerException
    }
}

// ✅ Proper null handling
class Context {
    private Strategy strategy;

    public void execute() {
        if (strategy == null) {
            throw new IllegalStateException("Strategy not set");
        }
        strategy.doSomething();
    }
}
```

### 4. Incorrect Context Sharing
```java
// ❌ Sharing mutable state
class Strategy1 implements Strategy {
    public void execute(Context ctx) {
        ctx.modifyState(); // Side effects
    }
}

// ✅ Strategies should be stateless or use immutable data
class Strategy1 implements Strategy {
    public Result execute(Data data) {
        return new Result(data); // No side effects
    }
}
```

## Best Practices

1. **Keep Strategies Stateless**: Strategies should ideally be stateless and reusable
2. **Use Dependency Injection**: Inject strategies rather than creating them in context
3. **Consider Default Strategy**: Provide a sensible default strategy
4. **Strategy Factory**: Use factory pattern to create appropriate strategies
5. **Combine with Other Patterns**: Strategy works well with Factory and Dependency Injection
6. **Interface Segregation**: Keep strategy interfaces focused and minimal

## Strategy vs State Pattern

| Aspect | Strategy | State |
|--------|----------|-------|
| Purpose | Algorithm selection | Object behavior based on state |
| Who decides | Client | Object itself |
| Change frequency | Less frequent | Can change frequently |
| Dependencies | Strategies are independent | States know about each other |

## Real-World Examples

### Java Library Examples
- `java.util.Comparator` - Different comparison strategies
- `javax.servlet.Filter` - Different filtering strategies
- `java.util.Arrays.sort()` - Accepts Comparator strategy

### Framework Examples
- Spring Security - Different authentication strategies
- Java Collections - Different sorting strategies
- Payment gateways - Different payment processing strategies

## Next Steps

After mastering Strategy, move on to `02-Observer` to learn about event-driven communication between objects!

**Challenge**: Create a complete pricing system for an e-commerce platform that supports:
- Multiple tax strategies (US, EU, Asia)
- Multiple discount strategies (seasonal, loyalty, bulk)
- Multiple shipping cost strategies (standard, express, international)
- Combine all strategies to calculate final price

The system should allow runtime strategy changes and support adding new strategies without modifying existing code.
