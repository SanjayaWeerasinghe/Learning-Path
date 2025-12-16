# Facade Pattern

## What You'll Learn
- Understanding the Facade design pattern
- Simplifying complex subsystems with unified interfaces
- Hiding system complexity from clients
- Creating higher-level interfaces for easier usage
- Reducing coupling between clients and subsystems
- Implementing the principle of least knowledge

## Concept Overview

The Facade pattern provides a simplified interface to a complex subsystem. It defines a higher-level interface that makes the subsystem easier to use by wrapping a complicated system with a simpler API.

Think of it like a universal TV remote - instead of having separate remotes for TV, DVD player, sound system, and cable box, you have one simple remote that handles all the complexity behind the scenes.

### Key Characteristics
- **Simplified Interface**: Provides easy-to-use interface to complex system
- **Decoupling**: Reduces dependencies between clients and subsystems
- **Subsystem Independence**: Subsystems can be used directly if needed
- **Layering**: Often used to define entry points to subsystem layers
- **Facade is Optional**: Clients can still access subsystem directly

### When to Use
- Simplifying a complex system
- Reducing dependencies on subsystems
- Layering your system (entry point to each layer)
- Working with poorly designed APIs
- Providing simple default behavior while allowing advanced usage
- Decoupling client code from subsystem implementation

### Structure

```
Client ---> Facade ---> [Subsystem Classes]
                        - ClassA
                        - ClassB
                        - ClassC
```

## Basic Implementation

```java
// Complex subsystem classes
class CPU {
    public void freeze() {
        System.out.println("CPU: Freezing processor");
    }

    public void jump(long position) {
        System.out.println("CPU: Jumping to position " + position);
    }

    public void execute() {
        System.out.println("CPU: Executing instructions");
    }
}

class Memory {
    public void load(long position, byte[] data) {
        System.out.println("Memory: Loading data at position " + position);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive: Reading " + size + " bytes from sector " + lba);
        return new byte[size];
    }
}

// Facade
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    public void start() {
        System.out.println("Computer: Starting...");
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
        System.out.println("Computer: Started successfully!\n");
    }
}

// Client
public class ComputerDemo {
    public static void main(String[] args) {
        // Without facade - complex
        CPU cpu = new CPU();
        Memory memory = new Memory();
        HardDrive hd = new HardDrive();
        cpu.freeze();
        memory.load(0, hd.read(0, 1024));
        cpu.jump(0);
        cpu.execute();

        System.out.println("\n--- With Facade ---\n");

        // With facade - simple
        ComputerFacade computer = new ComputerFacade();
        computer.start();
    }
}
```

**Output:**
```
CPU: Freezing processor
Memory: Loading data at position 0
HardDrive: Reading 1024 bytes from sector 0
CPU: Jumping to position 0
CPU: Executing instructions

--- With Facade ---

Computer: Starting...
CPU: Freezing processor
Memory: Loading data at position 0
HardDrive: Reading 1024 bytes from sector 0
CPU: Jumping to position 0
CPU: Executing instructions
Computer: Started successfully!
```

## Your Tasks

### Task 1: Home Theater Facade
Create a facade for a home theater system.

```java
// Subsystem classes
class DVDPlayer {
    public void on() {
        System.out.println("DVD Player: Turning on");
    }

    public void play(String movie) {
        System.out.println("DVD Player: Playing '" + movie + "'");
    }

    public void stop() {
        System.out.println("DVD Player: Stopping");
    }

    public void off() {
        System.out.println("DVD Player: Turning off");
    }
}

class Projector {
    public void on() {
        System.out.println("Projector: Turning on");
    }

    public void wideScreenMode() {
        System.out.println("Projector: Setting widescreen mode");
    }

    public void off() {
        System.out.println("Projector: Turning off");
    }
}

class SoundSystem {
    public void on() {
        System.out.println("Sound System: Turning on");
    }

    public void setVolume(int level) {
        System.out.println("Sound System: Setting volume to " + level);
    }

    public void setSurroundSound() {
        System.out.println("Sound System: Setting surround sound mode");
    }

    public void off() {
        System.out.println("Sound System: Turning off");
    }
}

class Lights {
    public void dim(int level) {
        System.out.println("Lights: Dimming to " + level + "%");
    }

    public void on() {
        System.out.println("Lights: Turning on");
    }
}

// Facade
class HomeTheaterFacade {
    private DVDPlayer dvd;
    private Projector projector;
    private SoundSystem sound;
    private Lights lights;

    public HomeTheaterFacade(DVDPlayer dvd, Projector projector,
                             SoundSystem sound, Lights lights) {
        this.dvd = dvd;
        this.projector = projector;
        this.sound = sound;
        this.lights = lights;
    }

    public void watchMovie(String movie) {
        System.out.println("Get ready to watch a movie...\n");
        lights.dim(10);
        projector.on();
        projector.wideScreenMode();
        sound.on();
        sound.setVolume(5);
        sound.setSurroundSound();
        dvd.on();
        dvd.play(movie);
        System.out.println("\nEnjoy your movie!");
    }

    public void endMovie() {
        System.out.println("\nShutting down movie theater...\n");
        dvd.stop();
        dvd.off();
        sound.off();
        projector.off();
        lights.on();
        System.out.println("\nMovie theater shut down complete!");
    }
}

// Test
public class HomeTheaterTest {
    public static void main(String[] args) {
        DVDPlayer dvd = new DVDPlayer();
        Projector projector = new Projector();
        SoundSystem sound = new SoundSystem();
        Lights lights = new Lights();

        HomeTheaterFacade homeTheater = new HomeTheaterFacade(dvd, projector, sound, lights);

        homeTheater.watchMovie("The Matrix");
        homeTheater.endMovie();
    }
}
```

**Expected Output:**
```
Get ready to watch a movie...

Lights: Dimming to 10%
Projector: Turning on
Projector: Setting widescreen mode
Sound System: Turning on
Sound System: Setting volume to 5
Sound System: Setting surround sound mode
DVD Player: Turning on
DVD Player: Playing 'The Matrix'

Enjoy your movie!

Shutting down movie theater...

DVD Player: Stopping
DVD Player: Turning off
Sound System: Turning off
Projector: Turning off
Lights: Turning on

Movie theater shut down complete!
```

### Task 2: Banking System Facade
Create a facade for various banking operations.

```java
// Subsystem classes
class AccountService {
    public boolean accountExists(String accountNumber) {
        System.out.println("AccountService: Checking if account " + accountNumber + " exists");
        return true;
    }

    public double getBalance(String accountNumber) {
        System.out.println("AccountService: Getting balance for account " + accountNumber);
        return 1000.0;
    }

    public void debit(String accountNumber, double amount) {
        System.out.println("AccountService: Debiting $" + amount + " from account " + accountNumber);
    }

    public void credit(String accountNumber, double amount) {
        System.out.println("AccountService: Crediting $" + amount + " to account " + accountNumber);
    }
}

class SecurityService {
    public boolean authenticate(String accountNumber, String pin) {
        System.out.println("SecurityService: Authenticating account " + accountNumber);
        return pin.equals("1234");
    }
}

class NotificationService {
    public void sendTransactionNotification(String accountNumber, String message) {
        System.out.println("NotificationService: Sending notification to " + accountNumber + ": " + message);
    }
}

class LedgerService {
    public void recordTransaction(String accountNumber, String type, double amount) {
        System.out.println("LedgerService: Recording " + type + " of $" + amount + " for account " + accountNumber);
    }
}

// Facade
class BankingFacade {
    private AccountService accountService;
    private SecurityService securityService;
    private NotificationService notificationService;
    private LedgerService ledgerService;

    public BankingFacade() {
        this.accountService = new AccountService();
        this.securityService = new SecurityService();
        this.notificationService = new NotificationService();
        this.ledgerService = new LedgerService();
    }

    public boolean withdraw(String accountNumber, String pin, double amount) {
        System.out.println("\n=== Processing Withdrawal ===");

        if (!securityService.authenticate(accountNumber, pin)) {
            System.out.println("ERROR: Authentication failed");
            return false;
        }

        if (!accountService.accountExists(accountNumber)) {
            System.out.println("ERROR: Account does not exist");
            return false;
        }

        double balance = accountService.getBalance(accountNumber);
        if (balance < amount) {
            System.out.println("ERROR: Insufficient funds");
            return false;
        }

        accountService.debit(accountNumber, amount);
        ledgerService.recordTransaction(accountNumber, "WITHDRAWAL", amount);
        notificationService.sendTransactionNotification(accountNumber,
            "Withdrawal of $" + amount + " completed");

        System.out.println("SUCCESS: Withdrawal completed\n");
        return true;
    }

    public boolean deposit(String accountNumber, String pin, double amount) {
        System.out.println("\n=== Processing Deposit ===");

        if (!securityService.authenticate(accountNumber, pin)) {
            System.out.println("ERROR: Authentication failed");
            return false;
        }

        if (!accountService.accountExists(accountNumber)) {
            System.out.println("ERROR: Account does not exist");
            return false;
        }

        accountService.credit(accountNumber, amount);
        ledgerService.recordTransaction(accountNumber, "DEPOSIT", amount);
        notificationService.sendTransactionNotification(accountNumber,
            "Deposit of $" + amount + " completed");

        System.out.println("SUCCESS: Deposit completed\n");
        return true;
    }

    public double checkBalance(String accountNumber, String pin) {
        System.out.println("\n=== Checking Balance ===");

        if (!securityService.authenticate(accountNumber, pin)) {
            System.out.println("ERROR: Authentication failed");
            return -1;
        }

        double balance = accountService.getBalance(accountNumber);
        System.out.println("Current balance: $" + balance + "\n");
        return balance;
    }
}

// Test
public class BankingTest {
    public static void main(String[] args) {
        BankingFacade banking = new BankingFacade();

        banking.checkBalance("123456", "1234");
        banking.deposit("123456", "1234", 500.0);
        banking.withdraw("123456", "1234", 200.0);
    }
}
```

### Task 3: Order Processing Facade
Create a facade for an e-commerce order processing system.

```java
// Subsystem classes
class InventoryService {
    public boolean checkStock(String productId, int quantity) {
        System.out.println("InventoryService: Checking stock for product " + productId);
        return true;
    }

    public void reserveItem(String productId, int quantity) {
        System.out.println("InventoryService: Reserving " + quantity + " units of " + productId);
    }
}

class PaymentService {
    public boolean processPayment(String cardNumber, double amount) {
        System.out.println("PaymentService: Processing payment of $" + amount);
        return true;
    }
}

class ShippingService {
    public String scheduleShipping(String address, String productId) {
        System.out.println("ShippingService: Scheduling shipping to " + address);
        return "SHIP123456";
    }
}

class EmailService {
    public void sendConfirmation(String email, String orderId) {
        System.out.println("EmailService: Sending confirmation to " + email + " for order " + orderId);
    }
}

class OrderService {
    public String createOrder(String customerId, String productId, int quantity) {
        String orderId = "ORD" + System.currentTimeMillis();
        System.out.println("OrderService: Creating order " + orderId);
        return orderId;
    }
}

// Facade
class OrderProcessingFacade {
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private EmailService email;
    private OrderService order;

    public OrderProcessingFacade() {
        this.inventory = new InventoryService();
        this.payment = new PaymentService();
        this.shipping = new ShippingService();
        this.email = new EmailService();
        this.order = new OrderService();
    }

    public boolean placeOrder(String customerId, String productId, int quantity,
                             String cardNumber, double amount,
                             String shippingAddress, String customerEmail) {
        System.out.println("\n=== Processing Order ===\n");

        // Check inventory
        if (!inventory.checkStock(productId, quantity)) {
            System.out.println("ERROR: Product out of stock");
            return false;
        }

        // Process payment
        if (!payment.processPayment(cardNumber, amount)) {
            System.out.println("ERROR: Payment failed");
            return false;
        }

        // Reserve items
        inventory.reserveItem(productId, quantity);

        // Create order
        String orderId = order.createOrder(customerId, productId, quantity);

        // Schedule shipping
        String trackingNumber = shipping.scheduleShipping(shippingAddress, productId);
        System.out.println("Tracking number: " + trackingNumber);

        // Send confirmation
        email.sendConfirmation(customerEmail, orderId);

        System.out.println("\nSUCCESS: Order " + orderId + " placed successfully!\n");
        return true;
    }
}

// Test
public class OrderTest {
    public static void main(String[] args) {
        OrderProcessingFacade orderFacade = new OrderProcessingFacade();

        orderFacade.placeOrder(
            "CUST001",
            "PROD123",
            2,
            "1234-5678-9012-3456",
            99.99,
            "123 Main St, City, State",
            "customer@email.com"
        );
    }
}
```

### Task 4: Hotel Booking Facade
Create a facade for a hotel booking system.

```java
// Subsystem classes
class RoomService {
    public boolean isRoomAvailable(String roomType, String date) {
        System.out.println("RoomService: Checking availability for " + roomType + " on " + date);
        return true;
    }

    public void bookRoom(String roomType, String date, String customerName) {
        System.out.println("RoomService: Booking " + roomType + " for " + customerName);
    }
}

class RestaurantService {
    public void reserveTable(int numberOfPeople, String time) {
        System.out.println("RestaurantService: Reserving table for " + numberOfPeople + " at " + time);
    }
}

class SpaService {
    public void bookTreatment(String treatment, String time) {
        System.out.println("SpaService: Booking " + treatment + " at " + time);
    }
}

class TransportService {
    public void arrangePickup(String location, String time) {
        System.out.println("TransportService: Arranging pickup from " + location + " at " + time);
    }
}

class BillingService {
    public double calculateTotal(String roomType, int nights, List<String> services) {
        System.out.println("BillingService: Calculating total cost");
        return 500.0 * nights;
    }

    public void processPayment(double amount) {
        System.out.println("BillingService: Processing payment of $" + amount);
    }
}

// Facade
class HotelBookingFacade {
    private RoomService roomService;
    private RestaurantService restaurant;
    private SpaService spa;
    private TransportService transport;
    private BillingService billing;

    public HotelBookingFacade() {
        this.roomService = new RoomService();
        this.restaurant = new RestaurantService();
        this.spa = new SpaService();
        this.transport = new TransportService();
        this.billing = new BillingService();
    }

    public void bookLuxuryPackage(String customerName, String checkInDate,
                                  int nights, String pickupLocation) {
        System.out.println("\n=== Booking Luxury Package ===\n");

        // Check and book room
        if (!roomService.isRoomAvailable("Luxury Suite", checkInDate)) {
            System.out.println("ERROR: Room not available");
            return;
        }

        roomService.bookRoom("Luxury Suite", checkInDate, customerName);

        // Add complementary services
        restaurant.reserveTable(2, "19:00");
        spa.bookTreatment("Full Body Massage", "14:00");
        transport.arrangePickup(pickupLocation, "12:00");

        // Calculate and process payment
        double total = billing.calculateTotal("Luxury Suite", nights, List.of("Restaurant", "Spa", "Transport"));
        billing.processPayment(total);

        System.out.println("\nSUCCESS: Luxury package booked for " + customerName + "!\n");
    }

    public void bookBasicRoom(String customerName, String checkInDate, int nights) {
        System.out.println("\n=== Booking Basic Room ===\n");

        if (!roomService.isRoomAvailable("Standard Room", checkInDate)) {
            System.out.println("ERROR: Room not available");
            return;
        }

        roomService.bookRoom("Standard Room", checkInDate, customerName);

        double total = billing.calculateTotal("Standard Room", nights, List.of());
        billing.processPayment(total);

        System.out.println("\nSUCCESS: Basic room booked for " + customerName + "!\n");
    }
}

// Test
public class HotelTest {
    public static void main(String[] args) {
        HotelBookingFacade hotel = new HotelBookingFacade();

        hotel.bookLuxuryPackage("John Doe", "2025-10-15", 3, "Airport");
    }
}
```

### Task 5: Smart Home Facade
Create a facade for a smart home automation system.

```java
// Subsystem classes
class LightingSystem {
    public void turnOnLights(String room) {
        System.out.println("Lighting: Turning on lights in " + room);
    }

    public void turnOffLights(String room) {
        System.out.println("Lighting: Turning off lights in " + room);
    }

    public void dimLights(String room, int level) {
        System.out.println("Lighting: Dimming " + room + " lights to " + level + "%");
    }
}

class ThermostatSystem {
    public void setTemperature(int temperature) {
        System.out.println("Thermostat: Setting temperature to " + temperature + "°F");
    }

    public void turnOff() {
        System.out.println("Thermostat: Turning off");
    }
}

class SecuritySystem {
    public void armSystem() {
        System.out.println("Security: Arming security system");
    }

    public void disarmSystem() {
        System.out.println("Security: Disarming security system");
    }
}

class MusicSystem {
    public void playMusic(String playlist) {
        System.out.println("Music: Playing playlist '" + playlist + "'");
    }

    public void stopMusic() {
        System.out.println("Music: Stopping music");
    }
}

class DoorLockSystem {
    public void lockDoors() {
        System.out.println("Doors: Locking all doors");
    }

    public void unlockDoors() {
        System.out.println("Doors: Unlocking all doors");
    }
}

// Facade
class SmartHomeFacade {
    private LightingSystem lights;
    private ThermostatSystem thermostat;
    private SecuritySystem security;
    private MusicSystem music;
    private DoorLockSystem doors;

    public SmartHomeFacade() {
        this.lights = new LightingSystem();
        this.thermostat = new ThermostatSystem();
        this.security = new SecuritySystem();
        this.music = new MusicSystem();
        this.doors = new DoorLockSystem();
    }

    public void leaveHome() {
        System.out.println("\n=== Leaving Home Mode ===\n");
        lights.turnOffLights("all rooms");
        thermostat.setTemperature(65);
        music.stopMusic();
        doors.lockDoors();
        security.armSystem();
        System.out.println("\nHome secured. Have a nice day!\n");
    }

    public void arriveHome() {
        System.out.println("\n=== Arriving Home Mode ===\n");
        security.disarmSystem();
        doors.unlockDoors();
        lights.turnOnLights("living room");
        lights.turnOnLights("hallway");
        thermostat.setTemperature(72);
        music.playMusic("Welcome Home");
        System.out.println("\nWelcome home!\n");
    }

    public void movieMode() {
        System.out.println("\n=== Movie Mode ===\n");
        lights.dimLights("living room", 20);
        lights.turnOffLights("kitchen");
        thermostat.setTemperature(70);
        System.out.println("\nEnjoy your movie!\n");
    }

    public void sleepMode() {
        System.out.println("\n=== Sleep Mode ===\n");
        lights.turnOffLights("all rooms");
        thermostat.setTemperature(68);
        music.stopMusic();
        doors.lockDoors();
        security.armSystem();
        System.out.println("\nGood night!\n");
    }
}

// Test
public class SmartHomeTest {
    public static void main(String[] args) {
        SmartHomeFacade smartHome = new SmartHomeFacade();

        smartHome.arriveHome();
        smartHome.movieMode();
        smartHome.sleepMode();
    }
}
```

### Task 6: Report Generation Facade
Create a facade for a complex report generation system.

```java
// Subsystem classes
class DataCollector {
    public Map<String, Object> collectData(String source) {
        System.out.println("DataCollector: Collecting data from " + source);
        Map<String, Object> data = new HashMap<>();
        data.put("revenue", 100000);
        data.put("expenses", 60000);
        return data;
    }
}

class DataAnalyzer {
    public Map<String, Object> analyzeData(Map<String, Object> data) {
        System.out.println("DataAnalyzer: Analyzing collected data");
        Map<String, Object> analysis = new HashMap<>();
        int revenue = (int) data.get("revenue");
        int expenses = (int) data.get("expenses");
        analysis.put("profit", revenue - expenses);
        analysis.put("profitMargin", ((revenue - expenses) * 100.0 / revenue));
        return analysis;
    }
}

class ChartGenerator {
    public String generateChart(Map<String, Object> data, String chartType) {
        System.out.println("ChartGenerator: Generating " + chartType + " chart");
        return "[Chart: " + chartType + " with data]";
    }
}

class ReportFormatter {
    public String formatReport(Map<String, Object> data, String format) {
        System.out.println("ReportFormatter: Formatting report as " + format);
        return "Formatted report in " + format;
    }
}

class ReportDistributor {
    public void distribute(String report, List<String> recipients) {
        System.out.println("ReportDistributor: Distributing report to " + recipients.size() + " recipients");
    }
}

// Facade
class ReportGenerationFacade {
    private DataCollector collector;
    private DataAnalyzer analyzer;
    private ChartGenerator chartGen;
    private ReportFormatter formatter;
    private ReportDistributor distributor;

    public ReportGenerationFacade() {
        this.collector = new DataCollector();
        this.analyzer = new DataAnalyzer();
        this.chartGen = new ChartGenerator();
        this.formatter = new ReportFormatter();
        this.distributor = new ReportDistributor();
    }

    public void generateFinancialReport(String dataSource, List<String> recipients) {
        System.out.println("\n=== Generating Financial Report ===\n");

        // Collect data
        Map<String, Object> data = collector.collectData(dataSource);

        // Analyze
        Map<String, Object> analysis = analyzer.analyzeData(data);

        // Generate charts
        String revenueChart = chartGen.generateChart(data, "bar");
        String profitChart = chartGen.generateChart(analysis, "line");

        // Format report
        String report = formatter.formatReport(analysis, "PDF");

        // Distribute
        distributor.distribute(report, recipients);

        System.out.println("\nSUCCESS: Financial report generated and distributed!\n");
    }

    public void generateQuickSummary(String dataSource) {
        System.out.println("\n=== Generating Quick Summary ===\n");

        Map<String, Object> data = collector.collectData(dataSource);
        Map<String, Object> analysis = analyzer.analyzeData(data);

        System.out.println("Revenue: $" + data.get("revenue"));
        System.out.println("Expenses: $" + data.get("expenses"));
        System.out.println("Profit: $" + analysis.get("profit"));
        System.out.println("Profit Margin: " + analysis.get("profitMargin") + "%");

        System.out.println("\nQuick summary complete!\n");
    }
}

// Test
public class ReportTest {
    public static void main(String[] args) {
        ReportGenerationFacade reportGen = new ReportGenerationFacade();

        reportGen.generateQuickSummary("sales_database");
        reportGen.generateFinancialReport("sales_database",
            List.of("ceo@company.com", "cfo@company.com"));
    }
}
```

### Task 7: Travel Booking Facade
Create a facade for booking a complete travel package.

```java
// Subsystem classes
class FlightBookingService {
    public String bookFlight(String from, String to, String date) {
        System.out.println("Flight: Booking flight from " + from + " to " + to + " on " + date);
        return "FL123";
    }
}

class HotelBookingService {
    public String bookHotel(String city, String checkIn, int nights) {
        System.out.println("Hotel: Booking hotel in " + city + " for " + nights + " nights");
        return "HTL456";
    }
}

class CarRentalService {
    public String rentCar(String location, String date, int days) {
        System.out.println("Car Rental: Renting car at " + location + " for " + days + " days");
        return "CAR789";
    }
}

class InsuranceService {
    public String buyInsurance(String type) {
        System.out.println("Insurance: Purchasing " + type + " insurance");
        return "INS999";
    }
}

class PaymentProcessor {
    public boolean processPayment(double amount, String cardNumber) {
        System.out.println("Payment: Processing $" + amount);
        return true;
    }
}

class ItineraryService {
    public void createItinerary(Map<String, String> bookingDetails) {
        System.out.println("Itinerary: Creating travel itinerary");
        System.out.println("Booking details: " + bookingDetails);
    }
}

// Facade
class TravelBookingFacade {
    private FlightBookingService flight;
    private HotelBookingService hotel;
    private CarRentalService carRental;
    private InsuranceService insurance;
    private PaymentProcessor payment;
    private ItineraryService itinerary;

    public TravelBookingFacade() {
        this.flight = new FlightBookingService();
        this.hotel = new HotelBookingService();
        this.carRental = new CarRentalService();
        this.insurance = new InsuranceService();
        this.payment = new PaymentProcessor();
        this.itinerary = new ItineraryService();
    }

    public boolean bookCompleteTrip(String from, String to, String departDate,
                                    int nights, String cardNumber) {
        System.out.println("\n=== Booking Complete Trip ===\n");

        Map<String, String> bookingDetails = new HashMap<>();

        // Book flight
        String flightRef = flight.bookFlight(from, to, departDate);
        bookingDetails.put("flight", flightRef);

        // Book hotel
        String hotelRef = hotel.bookHotel(to, departDate, nights);
        bookingDetails.put("hotel", hotelRef);

        // Rent car
        String carRef = carRental.rentCar(to, departDate, nights);
        bookingDetails.put("car", carRef);

        // Buy insurance
        String insuranceRef = insurance.buyInsurance("Travel");
        bookingDetails.put("insurance", insuranceRef);

        // Calculate total (simplified)
        double total = 500 + (nights * 150) + (nights * 50) + 100;

        // Process payment
        if (!payment.processPayment(total, cardNumber)) {
            System.out.println("ERROR: Payment failed");
            return false;
        }

        // Create itinerary
        itinerary.createItinerary(bookingDetails);

        System.out.println("\nSUCCESS: Trip booked successfully!");
        System.out.println("Total cost: $" + total + "\n");
        return true;
    }
}

// Test
public class TravelTest {
    public static void main(String[] args) {
        TravelBookingFacade travel = new TravelBookingFacade();

        travel.bookCompleteTrip("New York", "Paris", "2025-10-20", 5, "1234-5678");
    }
}
```

### Task 8: Database Backup Facade
Create a facade for a complex database backup and restore system.

```java
// Subsystem classes
class DatabaseConnection {
    public void connect(String connectionString) {
        System.out.println("DB: Connecting to database");
    }

    public void disconnect() {
        System.out.println("DB: Disconnecting from database");
    }
}

class BackupValidator {
    public boolean validateDatabase() {
        System.out.println("Validator: Validating database integrity");
        return true;
    }

    public boolean validateBackupFile(String file) {
        System.out.println("Validator: Validating backup file");
        return true;
    }
}

class CompressionService {
    public String compress(String data) {
        System.out.println("Compression: Compressing backup data");
        return data + ".gz";
    }

    public String decompress(String file) {
        System.out.println("Compression: Decompressing backup file");
        return file.replace(".gz", "");
    }
}

class EncryptionService {
    public String encrypt(String data) {
        System.out.println("Encryption: Encrypting backup");
        return data + ".enc";
    }

    public String decrypt(String file) {
        System.out.println("Encryption: Decrypting backup");
        return file.replace(".enc", "");
    }
}

class StorageService {
    public void uploadToCloud(String file) {
        System.out.println("Storage: Uploading to cloud storage");
    }

    public String downloadFromCloud(String file) {
        System.out.println("Storage: Downloading from cloud storage");
        return file;
    }
}

class NotificationSystem {
    public void notifyAdmins(String message) {
        System.out.println("Notification: " + message);
    }
}

// Facade
class DatabaseBackupFacade {
    private DatabaseConnection db;
    private BackupValidator validator;
    private CompressionService compression;
    private EncryptionService encryption;
    private StorageService storage;
    private NotificationSystem notification;

    public DatabaseBackupFacade() {
        this.db = new DatabaseConnection();
        this.validator = new BackupValidator();
        this.compression = new CompressionService();
        this.encryption = new EncryptionService();
        this.storage = new StorageService();
        this.notification = new NotificationSystem();
    }

    public boolean createBackup(String dbConnectionString) {
        System.out.println("\n=== Creating Database Backup ===\n");

        try {
            // Connect to database
            db.connect(dbConnectionString);

            // Validate database
            if (!validator.validateDatabase()) {
                throw new Exception("Database validation failed");
            }

            // Create backup (simplified)
            String backupData = "database_backup_" + System.currentTimeMillis();
            System.out.println("Creating backup: " + backupData);

            // Compress
            String compressed = compression.compress(backupData);

            // Encrypt
            String encrypted = encryption.encrypt(compressed);

            // Upload to cloud
            storage.uploadToCloud(encrypted);

            // Disconnect
            db.disconnect();

            // Notify
            notification.notifyAdmins("Backup completed successfully: " + encrypted);

            System.out.println("\nSUCCESS: Backup created!\n");
            return true;

        } catch (Exception e) {
            notification.notifyAdmins("Backup failed: " + e.getMessage());
            System.out.println("\nERROR: Backup failed - " + e.getMessage() + "\n");
            return false;
        }
    }

    public boolean restoreBackup(String backupFile, String dbConnectionString) {
        System.out.println("\n=== Restoring Database Backup ===\n");

        try {
            // Validate backup file
            if (!validator.validateBackupFile(backupFile)) {
                throw new Exception("Backup file validation failed");
            }

            // Download from cloud
            String downloaded = storage.downloadFromCloud(backupFile);

            // Decrypt
            String decrypted = encryption.decrypt(downloaded);

            // Decompress
            String decompressed = compression.decompress(decrypted);

            // Connect to database
            db.connect(dbConnectionString);

            // Restore (simplified)
            System.out.println("Restoring data: " + decompressed);

            // Disconnect
            db.disconnect();

            // Notify
            notification.notifyAdmins("Restore completed successfully");

            System.out.println("\nSUCCESS: Database restored!\n");
            return true;

        } catch (Exception e) {
            notification.notifyAdmins("Restore failed: " + e.getMessage());
            System.out.println("\nERROR: Restore failed - " + e.getMessage() + "\n");
            return false;
        }
    }
}

// Test
public class BackupTest {
    public static void main(String[] args) {
        DatabaseBackupFacade backupSystem = new DatabaseBackupFacade();

        backupSystem.createBackup("mysql://localhost:3306/mydb");
        backupSystem.restoreBackup("database_backup_12345.gz.enc", "mysql://localhost:3306/mydb");
    }
}
```

## Common Pitfalls

### 1. Facade Becomes Too Complex
```java
// ❌ Facade doing too much
class MegaFacade {
    public void doEverything() {
        // 100 lines of complex logic
    }
}

// ✅ Keep facade methods focused
class GoodFacade {
    public void doSpecificTask1() { }
    public void doSpecificTask2() { }
}
```

### 2. Exposing Subsystem Implementation
```java
// ❌ Leaking subsystem details
class BadFacade {
    public SubsystemClass getSubsystem() {
        return subsystem;  // Exposes internal structure
    }
}

// ✅ Hide subsystem completely
class GoodFacade {
    private SubsystemClass subsystem;
    // No getters for subsystem
}
```

### 3. Creating God Object
```java
// ❌ Single facade for everything
class ApplicationFacade {
    // Handles DB, UI, Network, File System, etc.
}

// ✅ Multiple focused facades
class DatabaseFacade { }
class NetworkFacade { }
class UIFacade { }
```

### 4. Tight Coupling
```java
// ❌ Facade tightly coupled to concrete classes
class BadFacade {
    private ConcreteClass1 c1 = new ConcreteClass1();
}

// ✅ Use dependency injection
class GoodFacade {
    private Interface1 c1;
    public GoodFacade(Interface1 c1) {
        this.c1 = c1;
    }
}
```

## When NOT to Use Facade

- When subsystem is already simple
- When clients need fine-grained control
- When facade would hide necessary complexity
- When it creates unnecessary indirection

## Best Practices

1. **Keep it simple**: Facade should simplify, not complicate
2. **Don't hide everything**: Allow advanced users to access subsystems
3. **Single responsibility**: Each facade method should have one clear purpose
4. **Use dependency injection**: Make facade testable and flexible
5. **Document well**: Explain what the facade simplifies
6. **Layer appropriately**: Use facades to define layer entry points
7. **Don't make it a God object**: Create multiple facades if needed
8. **Handle errors gracefully**: Centralize error handling

## Real-World Examples

### Java Standard Library
- `javax.faces.context.FacesContext` - JSF facade
- `java.net.URL` - Facade for network operations
- JDBC `DriverManager` - Facade for database drivers

### Frameworks
- Spring's `JdbcTemplate` - Simplifies JDBC operations
- Hibernate's `Session` - Facade for database operations
- SLF4J - Facade for logging frameworks

### Other Examples
- Compiler facades (javac)
- Build tool facades (Maven, Gradle)
- API Gateway patterns
- Service layer in web applications

## Facade vs Similar Patterns

### Facade vs Adapter
- **Facade**: Simplifies interface
- **Adapter**: Converts interface

### Facade vs Mediator
- **Facade**: Unidirectional (client to subsystem)
- **Mediator**: Bidirectional communication

### Facade vs Proxy
- **Facade**: Simplifies complex subsystem
- **Proxy**: Controls access to single object

## Next Steps

After mastering Facade, move on to `04-Proxy` to learn about controlling access to objects!

**Challenge**: Create a comprehensive video streaming platform facade that handles user authentication, video encoding, content delivery network (CDN) management, recommendation engine, analytics, payment processing, and notification services. The facade should provide simple methods like `playVideo()`, `uploadVideo()`, and `subscribe()` while orchestrating all the complex subsystems behind the scenes.
