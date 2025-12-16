# State Pattern

## What You'll Learn
- Understanding the State design pattern
- Managing object behavior based on state
- Eliminating complex conditional logic
- State transitions and state machines
- Encapsulating state-specific behavior
- Creating cleaner, more maintainable state management

## Concept Overview

The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

### Key Characteristics
- **State Encapsulation**: Each state is encapsulated in a separate class
- **Behavior Variation**: Object behavior changes based on current state
- **State Transitions**: States can transition to other states
- **Polymorphism**: States implement common interface
- **Open/Closed Principle**: Easy to add new states

### When to Use
- Object behavior depends on its state
- Operations have large conditional statements based on state
- State transitions are complex
- Want to avoid duplicate state-checking code
- State-specific behavior needs to be extended independently

### Real-World Analogy
Think of a vending machine - it behaves differently based on its state (no coin, has coin, dispensing, out of stock). The same button press has different effects depending on the current state.

## Basic Implementation

```java
// State Interface
interface State {
    void insertCoin();
    void ejectCoin();
    void pressButton();
    void dispense();
}

// Context
class VendingMachine {
    private State noCoinState;
    private State hasCoinState;
    private State soldState;
    private State soldOutState;

    private State currentState;
    private int count;

    public VendingMachine(int count) {
        noCoinState = new NoCoinState(this);
        hasCoinState = new HasCoinState(this);
        soldState = new SoldState(this);
        soldOutState = new SoldOutState(this);

        this.count = count;
        if (count > 0) {
            currentState = noCoinState;
        } else {
            currentState = soldOutState;
        }
    }

    public void insertCoin() {
        currentState.insertCoin();
    }

    public void ejectCoin() {
        currentState.ejectCoin();
    }

    public void pressButton() {
        currentState.pressButton();
        currentState.dispense();
    }

    public void setState(State state) {
        this.currentState = state;
    }

    public void releaseProduct() {
        if (count > 0) {
            count--;
        }
    }

    public int getCount() {
        return count;
    }

    public State getNoCoinState() { return noCoinState; }
    public State getHasCoinState() { return hasCoinState; }
    public State getSoldState() { return soldState; }
    public State getSoldOutState() { return soldOutState; }
}

// Concrete States
class NoCoinState implements State {
    private VendingMachine machine;

    public NoCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    public void insertCoin() {
        System.out.println("Coin inserted");
        machine.setState(machine.getHasCoinState());
    }

    public void ejectCoin() {
        System.out.println("No coin to eject");
    }

    public void pressButton() {
        System.out.println("Insert coin first");
    }

    public void dispense() {
        System.out.println("Insert coin first");
    }
}

class HasCoinState implements State {
    private VendingMachine machine;

    public HasCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    public void insertCoin() {
        System.out.println("Coin already inserted");
    }

    public void ejectCoin() {
        System.out.println("Coin ejected");
        machine.setState(machine.getNoCoinState());
    }

    public void pressButton() {
        System.out.println("Button pressed");
        machine.setState(machine.getSoldState());
    }

    public void dispense() {
        System.out.println("Press button first");
    }
}

class SoldState implements State {
    private VendingMachine machine;

    public SoldState(VendingMachine machine) {
        this.machine = machine;
    }

    public void insertCoin() {
        System.out.println("Please wait, dispensing product");
    }

    public void ejectCoin() {
        System.out.println("Too late, already dispensing");
    }

    public void pressButton() {
        System.out.println("Already dispensing");
    }

    public void dispense() {
        machine.releaseProduct();
        System.out.println("Product dispensed");
        if (machine.getCount() > 0) {
            machine.setState(machine.getNoCoinState());
        } else {
            System.out.println("Out of stock");
            machine.setState(machine.getSoldOutState());
        }
    }
}

class SoldOutState implements State {
    private VendingMachine machine;

    public SoldOutState(VendingMachine machine) {
        this.machine = machine;
    }

    public void insertCoin() {
        System.out.println("Machine sold out");
    }

    public void ejectCoin() {
        System.out.println("No coin inserted");
    }

    public void pressButton() {
        System.out.println("Machine sold out");
    }

    public void dispense() {
        System.out.println("No product available");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine(2);

        machine.insertCoin();
        machine.pressButton();

        machine.insertCoin();
        machine.pressButton();
    }
}
```

**Output:**
```
Coin inserted
Button pressed
Product dispensed
Coin inserted
Button pressed
Product dispensed
Out of stock
```

## Advanced Example: Document Workflow

```java
interface DocumentState {
    void edit(Document doc);
    void submit(Document doc);
    void approve(Document doc);
    void reject(Document doc);
    void publish(Document doc);
    String getStateName();
}

class Document {
    private DocumentState state;
    private String content;
    private String author;

    public Document(String author) {
        this.author = author;
        this.state = new DraftState();
    }

    public void setState(DocumentState state) {
        this.state = state;
        System.out.println("State changed to: " + state.getStateName());
    }

    public void edit() { state.edit(this); }
    public void submit() { state.submit(this); }
    public void approve() { state.approve(this); }
    public void reject() { state.reject(this); }
    public void publish() { state.publish(this); }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() { return content; }
    public String getAuthor() { return author; }
}

class DraftState implements DocumentState {
    public void edit(Document doc) {
        System.out.println("Editing document...");
        doc.setContent("Updated content");
    }

    public void submit(Document doc) {
        System.out.println("Document submitted for review");
        doc.setState(new UnderReviewState());
    }

    public void approve(Document doc) {
        System.out.println("Cannot approve - document not submitted");
    }

    public void reject(Document doc) {
        System.out.println("Cannot reject - document not submitted");
    }

    public void publish(Document doc) {
        System.out.println("Cannot publish - document not approved");
    }

    public String getStateName() {
        return "Draft";
    }
}

class UnderReviewState implements DocumentState {
    public void edit(Document doc) {
        System.out.println("Cannot edit - under review");
    }

    public void submit(Document doc) {
        System.out.println("Already submitted");
    }

    public void approve(Document doc) {
        System.out.println("Document approved!");
        doc.setState(new ApprovedState());
    }

    public void reject(Document doc) {
        System.out.println("Document rejected - back to draft");
        doc.setState(new DraftState());
    }

    public void publish(Document doc) {
        System.out.println("Cannot publish - not yet approved");
    }

    public String getStateName() {
        return "Under Review";
    }
}

class ApprovedState implements DocumentState {
    public void edit(Document doc) {
        System.out.println("Cannot edit - already approved");
    }

    public void submit(Document doc) {
        System.out.println("Already approved");
    }

    public void approve(Document doc) {
        System.out.println("Already approved");
    }

    public void reject(Document doc) {
        System.out.println("Sending back to draft");
        doc.setState(new DraftState());
    }

    public void publish(Document doc) {
        System.out.println("Publishing document!");
        doc.setState(new PublishedState());
    }

    public String getStateName() {
        return "Approved";
    }
}

class PublishedState implements DocumentState {
    public void edit(Document doc) {
        System.out.println("Cannot edit - document is published");
    }

    public void submit(Document doc) {
        System.out.println("Already published");
    }

    public void approve(Document doc) {
        System.out.println("Already published");
    }

    public void reject(Document doc) {
        System.out.println("Cannot reject published document");
    }

    public void publish(Document doc) {
        System.out.println("Already published");
    }

    public String getStateName() {
        return "Published";
    }
}
```

## Your Tasks

### Task 1: ATM Machine States
Create an ATM with different states (idle, has card, pin entered, etc.).

```java
interface ATMState {
    void insertCard();
    void ejectCard();
    void enterPin(int pin);
    void withdrawCash(int amount);
}

class ATM {
    private ATMState idleState;
    private ATMState hasCardState;
    private ATMState pinEnteredState;
    private ATMState noCashState;

    private ATMState currentState;
    private int cashInMachine;
    private int correctPin = 1234;

    public ATM(int cash) {
        idleState = new IdleState(this);
        hasCardState = new HasCardState(this);
        pinEnteredState = new PinEnteredState(this);
        noCashState = new NoCashState(this);

        this.cashInMachine = cash;
        currentState = idleState;
    }

    public void insertCard() {
        currentState.insertCard();
    }

    public void ejectCard() {
        currentState.ejectCard();
    }

    public void enterPin(int pin) {
        currentState.enterPin(pin);
    }

    public void withdrawCash(int amount) {
        currentState.withdrawCash(amount);
    }

    public void setState(ATMState state) {
        this.currentState = state;
    }

    public boolean verifyPin(int pin) {
        return pin == correctPin;
    }

    public boolean hasSufficientCash(int amount) {
        return cashInMachine >= amount;
    }

    public void dispenseCash(int amount) {
        cashInMachine -= amount;
        System.out.println("Dispensing $" + amount);
        System.out.println("Remaining cash in ATM: $" + cashInMachine);
    }

    public ATMState getIdleState() { return idleState; }
    public ATMState getHasCardState() { return hasCardState; }
    public ATMState getPinEnteredState() { return pinEnteredState; }
    public ATMState getNoCashState() { return noCashState; }
}

class IdleState implements ATMState {
    private ATM atm;

    public IdleState(ATM atm) {
        this.atm = atm;
    }

    public void insertCard() {
        System.out.println("Card inserted");
        atm.setState(atm.getHasCardState());
    }

    public void ejectCard() {
        System.out.println("No card to eject");
    }

    public void enterPin(int pin) {
        System.out.println("Insert card first");
    }

    public void withdrawCash(int amount) {
        System.out.println("Insert card first");
    }
}

class HasCardState implements ATMState {
    private ATM atm;

    public HasCardState(ATM atm) {
        this.atm = atm;
    }

    public void insertCard() {
        System.out.println("Card already inserted");
    }

    public void ejectCard() {
        System.out.println("Card ejected");
        atm.setState(atm.getIdleState());
    }

    public void enterPin(int pin) {
        if (atm.verifyPin(pin)) {
            System.out.println("PIN correct");
            atm.setState(atm.getPinEnteredState());
        } else {
            System.out.println("Incorrect PIN");
        }
    }

    public void withdrawCash(int amount) {
        System.out.println("Enter PIN first");
    }
}

class PinEnteredState implements ATMState {
    private ATM atm;

    public PinEnteredState(ATM atm) {
        this.atm = atm;
    }

    public void insertCard() {
        System.out.println("Card already inserted");
    }

    public void ejectCard() {
        System.out.println("Card ejected");
        atm.setState(atm.getIdleState());
    }

    public void enterPin(int pin) {
        System.out.println("PIN already entered");
    }

    public void withdrawCash(int amount) {
        if (atm.hasSufficientCash(amount)) {
            atm.dispenseCash(amount);
            System.out.println("Transaction complete");
            atm.setState(atm.getIdleState());
        } else {
            System.out.println("Insufficient cash in ATM");
            atm.setState(atm.getNoCashState());
        }
    }
}

class NoCashState implements ATMState {
    private ATM atm;

    public NoCashState(ATM atm) {
        this.atm = atm;
    }

    public void insertCard() {
        System.out.println("ATM out of service");
    }

    public void ejectCard() {
        System.out.println("ATM out of service");
    }

    public void enterPin(int pin) {
        System.out.println("ATM out of service");
    }

    public void withdrawCash(int amount) {
        System.out.println("ATM out of service - no cash available");
    }
}

// Test
public class ATMTest {
    public static void main(String[] args) {
        ATM atm = new ATM(500);

        atm.insertCard();
        atm.enterPin(1234);
        atm.withdrawCash(200);

        System.out.println("\n--- Second Transaction ---");
        atm.insertCard();
        atm.enterPin(1234);
        atm.withdrawCash(400);
    }
}
```

**Expected Output:**
```
Card inserted
PIN correct
Dispensing $200
Remaining cash in ATM: $300
Transaction complete

--- Second Transaction ---
Card inserted
PIN correct
Insufficient cash in ATM
ATM out of service
```

### Task 2: Order Status Management
E-commerce order with different states.

```java
interface OrderState {
    void payOrder(Order order);
    void shipOrder(Order order);
    void deliverOrder(Order order);
    void cancelOrder(Order order);
    String getStatus();
}

class Order {
    private OrderState state;
    private String orderId;
    private double amount;

    public Order(String orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.state = new NewOrderState();
    }

    public void setState(OrderState state) {
        this.state = state;
        System.out.println("Order " + orderId + " status: " + state.getStatus());
    }

    public void pay() { state.payOrder(this); }
    public void ship() { state.shipOrder(this); }
    public void deliver() { state.deliverOrder(this); }
    public void cancel() { state.cancelOrder(this); }

    public String getOrderId() { return orderId; }
    public double getAmount() { return amount; }
}

class NewOrderState implements OrderState {
    public void payOrder(Order order) {
        System.out.println("Payment processed for $" + order.getAmount());
        order.setState(new PaidOrderState());
    }

    public void shipOrder(Order order) {
        System.out.println("Cannot ship - order not paid");
    }

    public void deliverOrder(Order order) {
        System.out.println("Cannot deliver - order not shipped");
    }

    public void cancelOrder(Order order) {
        System.out.println("Order cancelled");
        order.setState(new CancelledOrderState());
    }

    public String getStatus() {
        return "New Order";
    }
}

class PaidOrderState implements OrderState {
    public void payOrder(Order order) {
        System.out.println("Order already paid");
    }

    public void shipOrder(Order order) {
        System.out.println("Order shipped");
        order.setState(new ShippedOrderState());
    }

    public void deliverOrder(Order order) {
        System.out.println("Cannot deliver - not yet shipped");
    }

    public void cancelOrder(Order order) {
        System.out.println("Refunding payment...");
        System.out.println("Order cancelled");
        order.setState(new CancelledOrderState());
    }

    public String getStatus() {
        return "Paid";
    }
}

class ShippedOrderState implements OrderState {
    public void payOrder(Order order) {
        System.out.println("Order already paid");
    }

    public void shipOrder(Order order) {
        System.out.println("Order already shipped");
    }

    public void deliverOrder(Order order) {
        System.out.println("Order delivered successfully!");
        order.setState(new DeliveredOrderState());
    }

    public void cancelOrder(Order order) {
        System.out.println("Cannot cancel - already shipped");
    }

    public String getStatus() {
        return "Shipped";
    }
}

class DeliveredOrderState implements OrderState {
    public void payOrder(Order order) {
        System.out.println("Order already completed");
    }

    public void shipOrder(Order order) {
        System.out.println("Order already delivered");
    }

    public void deliverOrder(Order order) {
        System.out.println("Order already delivered");
    }

    public void cancelOrder(Order order) {
        System.out.println("Cannot cancel - order delivered");
    }

    public String getStatus() {
        return "Delivered";
    }
}

class CancelledOrderState implements OrderState {
    public void payOrder(Order order) {
        System.out.println("Order is cancelled");
    }

    public void shipOrder(Order order) {
        System.out.println("Order is cancelled");
    }

    public void deliverOrder(Order order) {
        System.out.println("Order is cancelled");
    }

    public void cancelOrder(Order order) {
        System.out.println("Order already cancelled");
    }

    public String getStatus() {
        return "Cancelled";
    }
}
```

### Task 3: Traffic Light Controller
Traffic light with timed state transitions.

```java
interface TrafficLightState {
    void change(TrafficLight light);
    String getColor();
    int getDuration(); // seconds
}

class TrafficLight {
    private TrafficLightState state;

    public TrafficLight() {
        state = new RedLightState();
    }

    public void change() {
        System.out.println("Current: " + state.getColor() +
                         " (" + state.getDuration() + "s)");
        state.change(this);
    }

    public void setState(TrafficLightState state) {
        this.state = state;
    }
}

class RedLightState implements TrafficLightState {
    public void change(TrafficLight light) {
        System.out.println("Red -> Green");
        light.setState(new GreenLightState());
    }

    public String getColor() {
        return "RED";
    }

    public int getDuration() {
        return 60;
    }
}

class GreenLightState implements TrafficLightState {
    public void change(TrafficLight light) {
        System.out.println("Green -> Yellow");
        light.setState(new YellowLightState());
    }

    public String getColor() {
        return "GREEN";
    }

    public int getDuration() {
        return 45;
    }
}

class YellowLightState implements TrafficLightState {
    public void change(TrafficLight light) {
        System.out.println("Yellow -> Red");
        light.setState(new RedLightState());
    }

    public String getColor() {
        return "YELLOW";
    }

    public int getDuration() {
        return 5;
    }
}
```

### Task 4: Connection States
Network connection with different states.

```java
interface ConnectionState {
    void connect(Connection conn);
    void disconnect(Connection conn);
    void send(Connection conn, String data);
    void receive(Connection conn);
    String getState();
}

class Connection {
    private ConnectionState state;
    private String address;

    public Connection(String address) {
        this.address = address;
        this.state = new DisconnectedState();
    }

    public void connect() { state.connect(this); }
    public void disconnect() { state.disconnect(this); }
    public void send(String data) { state.send(this, data); }
    public void receive() { state.receive(this); }

    public void setState(ConnectionState state) {
        this.state = state;
        System.out.println("Connection state: " + state.getState());
    }

    public String getAddress() { return address; }
}

class DisconnectedState implements ConnectionState {
    public void connect(Connection conn) {
        System.out.println("Connecting to " + conn.getAddress() + "...");
        conn.setState(new ConnectingState());
    }

    public void disconnect(Connection conn) {
        System.out.println("Already disconnected");
    }

    public void send(Connection conn, String data) {
        System.out.println("Cannot send - not connected");
    }

    public void receive(Connection conn) {
        System.out.println("Cannot receive - not connected");
    }

    public String getState() {
        return "Disconnected";
    }
}

class ConnectingState implements ConnectionState {
    public void connect(Connection conn) {
        System.out.println("Already connecting");
    }

    public void disconnect(Connection conn) {
        System.out.println("Connection cancelled");
        conn.setState(new DisconnectedState());
    }

    public void send(Connection conn, String data) {
        System.out.println("Wait for connection to establish");
    }

    public void receive(Connection conn) {
        System.out.println("Wait for connection to establish");
    }

    public String getState() {
        return "Connecting";
    }

    // Simulated successful connection
    public void connectionEstablished(Connection conn) {
        System.out.println("Connection established!");
        conn.setState(new ConnectedState());
    }
}

class ConnectedState implements ConnectionState {
    public void connect(Connection conn) {
        System.out.println("Already connected");
    }

    public void disconnect(Connection conn) {
        System.out.println("Disconnecting...");
        conn.setState(new DisconnectedState());
    }

    public void send(Connection conn, String data) {
        System.out.println("Sending: " + data);
    }

    public void receive(Connection conn) {
        System.out.println("Receiving data...");
    }

    public String getState() {
        return "Connected";
    }
}
```

### Task 5: Player States in Game
Game character with different states (idle, running, jumping, etc.).

```java
interface PlayerState {
    void pressUp(Player player);
    void pressDown(Player player);
    void pressSpace(Player player);
    String getStateName();
}

class Player {
    private PlayerState state;
    private int x, y;
    private int health;

    public Player() {
        this.state = new IdlePlayerState();
        this.x = 0;
        this.y = 0;
        this.health = 100;
    }

    public void pressUp() { state.pressUp(this); }
    public void pressDown() { state.pressDown(this); }
    public void pressSpace() { state.pressSpace(this); }

    public void setState(PlayerState state) {
        this.state = state;
        System.out.println("Player state: " + state.getStateName());
    }

    public void move(int dx, int dy) {
        x += dx;
        y += dy;
        System.out.println("Player position: (" + x + ", " + y + ")");
    }

    public int getY() { return y; }
}

class IdlePlayerState implements PlayerState {
    public void pressUp() {
        System.out.println("No action");
    }

    public void pressDown(Player player) {
        System.out.println("Crouching...");
        player.setState(new CrouchingState());
    }

    public void pressSpace(Player player) {
        System.out.println("Jumping!");
        player.setState(new JumpingState());
    }

    public String getStateName() {
        return "Idle";
    }
}

class RunningState implements PlayerState {
    public void pressUp(Player player) {
        System.out.println("Running forward");
        player.move(1, 0);
    }

    public void pressDown(Player player) {
        System.out.println("Stopping");
        player.setState(new IdlePlayerState());
    }

    public void pressSpace(Player player) {
        System.out.println("Jump while running!");
        player.setState(new JumpingState());
    }

    public String getStateName() {
        return "Running";
    }
}

class JumpingState implements PlayerState {
    public void pressUp(Player player) {
        System.out.println("Already jumping");
    }

    public void pressDown(Player player) {
        System.out.println("Cannot crouch while jumping");
    }

    public void pressSpace(Player player) {
        System.out.println("Double jump!");
    }

    public void land(Player player) {
        System.out.println("Landed");
        player.setState(new IdlePlayerState());
    }

    public String getStateName() {
        return "Jumping";
    }
}

class CrouchingState implements PlayerState {
    public void pressUp(Player player) {
        System.out.println("Standing up");
        player.setState(new IdlePlayerState());
    }

    public void pressDown(Player player) {
        System.out.println("Already crouching");
    }

    public void pressSpace(Player player) {
        System.out.println("Cannot jump while crouching");
    }

    public String getStateName() {
        return "Crouching";
    }
}
```

### Task 6: Audio Player States
Media player with play, pause, stop states.

```java
interface AudioState {
    void play(AudioPlayer player);
    void pause(AudioPlayer player);
    void stop(AudioPlayer player);
    void next(AudioPlayer player);
    String getStatus();
}

class AudioPlayer {
    private AudioState state;
    private String currentTrack;
    private int position;

    public AudioPlayer() {
        this.state = new StoppedState();
        this.currentTrack = "Track 1";
        this.position = 0;
    }

    public void play() { state.play(this); }
    public void pause() { state.pause(this); }
    public void stop() { state.stop(this); }
    public void next() { state.next(this); }

    public void setState(AudioState state) {
        this.state = state;
    }

    public void startPlayback() {
        System.out.println("Playing: " + currentTrack +
                         " at position " + position + "s");
    }

    public void pausePlayback() {
        System.out.println("Paused at " + position + "s");
    }

    public void stopPlayback() {
        position = 0;
        System.out.println("Stopped");
    }

    public void nextTrack() {
        currentTrack = "Next Track";
        position = 0;
        System.out.println("Loaded: " + currentTrack);
    }

    public String getCurrentStatus() {
        return state.getStatus();
    }
}

class StoppedState implements AudioState {
    public void play(AudioPlayer player) {
        player.startPlayback();
        player.setState(new PlayingState());
    }

    public void pause(AudioPlayer player) {
        System.out.println("Nothing to pause");
    }

    public void stop(AudioPlayer player) {
        System.out.println("Already stopped");
    }

    public void next(AudioPlayer player) {
        player.nextTrack();
    }

    public String getStatus() {
        return "Stopped";
    }
}

class PlayingState implements AudioState {
    public void play(AudioPlayer player) {
        System.out.println("Already playing");
    }

    public void pause(AudioPlayer player) {
        player.pausePlayback();
        player.setState(new PausedState());
    }

    public void stop(AudioPlayer player) {
        player.stopPlayback();
        player.setState(new StoppedState());
    }

    public void next(AudioPlayer player) {
        player.nextTrack();
        player.startPlayback();
    }

    public String getStatus() {
        return "Playing";
    }
}

class PausedState implements AudioState {
    public void play(AudioPlayer player) {
        player.startPlayback();
        player.setState(new PlayingState());
    }

    public void pause(AudioPlayer player) {
        System.out.println("Already paused");
    }

    public void stop(AudioPlayer player) {
        player.stopPlayback();
        player.setState(new StoppedState());
    }

    public void next(AudioPlayer player) {
        player.nextTrack();
    }

    public String getStatus() {
        return "Paused";
    }
}
```

### Task 7: Fan Controller
Fan with off, low, medium, high states.

```java
interface FanState {
    void pullChain(Fan fan);
    int getSpeed();
    String getStateName();
}

class Fan {
    private FanState offState;
    private FanState lowState;
    private FanState mediumState;
    private FanState highState;

    private FanState currentState;

    public Fan() {
        offState = new OffState(this);
        lowState = new LowState(this);
        mediumState = new MediumState(this);
        highState = new HighState(this);

        currentState = offState;
    }

    public void pullChain() {
        currentState.pullChain(this);
    }

    public void setState(FanState state) {
        currentState = state;
        System.out.println("Fan: " + state.getStateName() +
                         " (Speed: " + state.getSpeed() + ")");
    }

    public FanState getOffState() { return offState; }
    public FanState getLowState() { return lowState; }
    public FanState getMediumState() { return mediumState; }
    public FanState getHighState() { return highState; }
}

class OffState implements FanState {
    private Fan fan;

    public OffState(Fan fan) {
        this.fan = fan;
    }

    public void pullChain(Fan fan) {
        fan.setState(fan.getLowState());
    }

    public int getSpeed() {
        return 0;
    }

    public String getStateName() {
        return "OFF";
    }
}

class LowState implements FanState {
    private Fan fan;

    public LowState(Fan fan) {
        this.fan = fan;
    }

    public void pullChain(Fan fan) {
        fan.setState(fan.getMediumState());
    }

    public int getSpeed() {
        return 1;
    }

    public String getStateName() {
        return "LOW";
    }
}

class MediumState implements FanState {
    private Fan fan;

    public MediumState(Fan fan) {
        this.fan = fan;
    }

    public void pullChain(Fan fan) {
        fan.setState(fan.getHighState());
    }

    public int getSpeed() {
        return 2;
    }

    public String getStateName() {
        return "MEDIUM";
    }
}

class HighState implements FanState {
    private Fan fan;

    public HighState(Fan fan) {
        this.fan = fan;
    }

    public void pullChain(Fan fan) {
        fan.setState(fan.getOffState());
    }

    public int getSpeed() {
        return 3;
    }

    public String getStateName() {
        return "HIGH";
    }
}
```

### Task 8: Account States
Bank account with active, frozen, closed states.

```java
interface AccountState {
    void deposit(Account account, double amount);
    void withdraw(Account account, double amount);
    void freeze(Account account);
    void activate(Account account);
    void close(Account account);
    String getStateName();
}

class Account {
    private AccountState state;
    private double balance;
    private String accountNumber;

    public Account(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.state = new ActiveState();
    }

    public void deposit(double amount) { state.deposit(this, amount); }
    public void withdraw(double amount) { state.withdraw(this, amount); }
    public void freeze() { state.freeze(this); }
    public void activate() { state.activate(this); }
    public void close() { state.close(this); }

    public void setState(AccountState state) {
        this.state = state;
        System.out.println("Account state: " + state.getStateName());
    }

    public void addToBalance(double amount) {
        balance += amount;
        System.out.println("Deposited $" + amount +
                         ". Balance: $" + balance);
    }

    public boolean deductFromBalance(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println("Withdrew $" + amount +
                             ". Balance: $" + balance);
            return true;
        } else {
            System.out.println("Insufficient funds");
            return false;
        }
    }

    public double getBalance() { return balance; }
}

class ActiveState implements AccountState {
    public void deposit(Account account, double amount) {
        account.addToBalance(amount);
    }

    public void withdraw(Account account, double amount) {
        account.deductFromBalance(amount);
    }

    public void freeze(Account account) {
        System.out.println("Account frozen");
        account.setState(new FrozenState());
    }

    public void activate(Account account) {
        System.out.println("Account already active");
    }

    public void close(Account account) {
        if (account.getBalance() == 0) {
            System.out.println("Account closed");
            account.setState(new ClosedState());
        } else {
            System.out.println("Cannot close - balance must be zero");
        }
    }

    public String getStateName() {
        return "Active";
    }
}

class FrozenState implements AccountState {
    public void deposit(Account account, double amount) {
        System.out.println("Account frozen - cannot deposit");
    }

    public void withdraw(Account account, double amount) {
        System.out.println("Account frozen - cannot withdraw");
    }

    public void freeze(Account account) {
        System.out.println("Account already frozen");
    }

    public void activate(Account account) {
        System.out.println("Account activated");
        account.setState(new ActiveState());
    }

    public void close(Account account) {
        System.out.println("Cannot close frozen account");
    }

    public String getStateName() {
        return "Frozen";
    }
}

class ClosedState implements AccountState {
    public void deposit(Account account, double amount) {
        System.out.println("Account closed");
    }

    public void withdraw(Account account, double amount) {
        System.out.println("Account closed");
    }

    public void freeze(Account account) {
        System.out.println("Account closed");
    }

    public void activate(Account account) {
        System.out.println("Cannot reactivate closed account");
    }

    public void close(Account account) {
        System.out.println("Account already closed");
    }

    public String getStateName() {
        return "Closed";
    }
}
```

## Common Pitfalls

### 1. State Explosion
```java
// ❌ Too many states
class State1 implements State { }
class State2 implements State { }
// ... 50 more states

// ✅ Combine similar states or use substates
class ParentState implements State {
    private SubState substate;
}
```

### 2. Circular Dependencies
```java
// ❌ States reference each other directly
class StateA {
    void transition() {
        context.setState(new StateB()); // Creates new instance each time
    }
}

// ✅ Context holds all states
class Context {
    private StateA stateA = new StateA(this);
    private StateB stateB = new StateB(this);

    StateA getStateA() { return stateA; }
    StateB getStateB() { return stateB; }
}
```

### 3. Shared State Modification
```java
// ❌ States modify shared state directly
class StateA implements State {
    void handle() {
        context.sharedData = newValue; // Direct modification
    }
}

// ✅ Use context methods
class StateA implements State {
    void handle() {
        context.updateSharedData(newValue);
    }
}
```

### 4. Missing State Validation
```java
// ❌ No validation of state transitions
public void setState(State state) {
    this.state = state; // Any state can be set
}

// ✅ Validate transitions
public void setState(State state) {
    if (currentState.isValidTransition(state)) {
        this.state = state;
    } else {
        throw new IllegalStateException("Invalid transition");
    }
}
```

## Best Practices

1. **Centralize State Creation**: Create all states in context, not in state transitions
2. **Make States Stateless**: States should not hold data, only behavior
3. **Use Enum for Simple Cases**: For simple state machines, enum might suffice
4. **Document State Diagram**: Create visual representation of states and transitions
5. **Validate Transitions**: Check if transition is valid before changing state
6. **Thread Safety**: Synchronize state changes in multi-threaded environment
7. **State History**: Keep track of previous states for undo functionality
8. **Default Behavior**: Provide default implementations for common operations

## State vs Strategy

| Aspect | State | Strategy |
|--------|-------|----------|
| Purpose | Change behavior based on state | Select algorithm at runtime |
| Transitions | States transition to each other | Strategies are independent |
| Context Awareness | States know about context | Strategies are context-independent |
| Number of Classes | Many states | Few strategies |
| Behavior Change | Automatic based on state | Manually selected by client |

## State Pattern Variations

### 1. State with Enum
```java
enum State {
    IDLE {
        public void handle() { /* ... */ }
    },
    ACTIVE {
        public void handle() { /* ... */ }
    };

    public abstract void handle();
}
```

### 2. Hierarchical States
```java
abstract class ParentState implements State {
    // Common behavior for child states
}

class ChildState1 extends ParentState {
    // Specific behavior
}
```

### 3. State Machine with Transitions
```java
class StateMachine {
    private Map<State, Map<Event, State>> transitions;

    public void handleEvent(Event event) {
        State nextState = transitions.get(currentState).get(event);
        if (nextState != null) {
            currentState = nextState;
        }
    }
}
```

## Real-World Examples

### Java Library Examples
- TCP Connection - established, listening, closed
- Thread States - new, runnable, blocked, waiting, terminated
- `javax.faces.lifecycle.Lifecycle` - JSF lifecycle states

### Framework Examples
- Workflow engines - Document approval workflows
- Game engines - Character state machines
- Spring State Machine - Complex state management
- Order processing systems - Order lifecycle

## Next Steps

Congratulations! You've completed all the Behavioral patterns in this section.

**Next**: Explore Structural patterns to learn about object composition and relationships!

**Challenge**: Create a comprehensive workflow engine that:
- Supports complex multi-state workflows with conditional transitions
- Implements parallel states (multiple states active simultaneously)
- Provides state history and undo capability
- Supports timed transitions (auto-transition after delay)
- Includes state persistence and recovery
- Implements guards on transitions (conditions that must be met)
- Supports nested/hierarchical state machines
- Provides visualization of state diagram and current state
