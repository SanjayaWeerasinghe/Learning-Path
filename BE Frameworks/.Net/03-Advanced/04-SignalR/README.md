# SignalR in ASP.NET Core

## Introduction

SignalR is a library for ASP.NET Core that enables real-time web functionality. It allows server-side code to push content to clients instantly.

## Use Cases

- Chat applications
- Real-time dashboards
- Live notifications
- Collaborative tools
- Live sports updates
- Stock tickers

## Setup SignalR

### Install Package (if needed)
```bash
dotnet add package Microsoft.AspNetCore.SignalR
```

### Configure Services
```csharp
builder.Services.AddSignalR();

app.MapHub<ChatHub>("/chatHub");
```

## Creating a Hub

### Chat Hub
```csharp
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task SendToUser(string userId, string message)
    {
        await Clients.User(userId).SendAsync("ReceiveMessage", message);
    }

    public async Task SendToGroup(string groupName, string message)
    {
        await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
}
```

## Client-Side (JavaScript)

### Install SignalR Client
```bash
npm install @microsoft/signalr
```

### Connect to Hub
```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

// Receive messages
connection.on("ReceiveMessage", (user, message) => {
    console.log(`${user}: ${message}`);
});

// Start connection
connection.start()
    .then(() => console.log("Connected"))
    .catch(err => console.error(err));

// Send message
document.getElementById("sendButton").addEventListener("click", () => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message)
        .catch(err => console.error(err));
});
```

## Hub Methods

### Calling Client Methods
```csharp
// All connected clients
await Clients.All.SendAsync("ReceiveMessage", message);

// Specific client
await Clients.Client(connectionId).SendAsync("ReceiveMessage", message);

// All except caller
await Clients.Others.SendAsync("ReceiveMessage", message);

// Caller only
await Clients.Caller.SendAsync("ReceiveMessage", message);

// Specific user
await Clients.User(userId).SendAsync("ReceiveMessage", message);

// Group
await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
```

## Connection Lifecycle

```csharp
public class ChatHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}
```

## Groups

```csharp
public class ChatHub : Hub
{
    public async Task JoinRoom(string roomName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("UserJoined",
            Context.User.Identity.Name);
    }

    public async Task LeaveRoom(string roomName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("UserLeft",
            Context.User.Identity.Name);
    }

    public async Task SendToRoom(string roomName, string message)
    {
        await Clients.Group(roomName).SendAsync("ReceiveMessage",
            Context.User.Identity.Name, message);
    }
}
```

## Authentication

### Configure
```csharp
builder.Services.AddSignalR();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");
```

### Authorize Hub
```csharp
[Authorize]
public class ChatHub : Hub
{
    public async Task SendMessage(string message)
    {
        var user = Context.User.Identity.Name;
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

### Client Authentication
```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub", {
        accessTokenFactory: () => yourAccessToken
    })
    .build();
```

## Strongly-Typed Hubs

### Define Interface
```csharp
public interface IChatClient
{
    Task ReceiveMessage(string user, string message);
    Task UserJoined(string user);
    Task UserLeft(string user);
}
```

### Implement Hub
```csharp
public class ChatHub : Hub<IChatClient>
{
    public async Task SendMessage(string message)
    {
        await Clients.All.ReceiveMessage(
            Context.User.Identity.Name, message);
    }
}
```

## Complete Chat Example

### Hub
```csharp
public class ChatHub : Hub
{
    private static Dictionary<string, string> Users = new();

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }

    public async Task SetUsername(string username)
    {
        Users[Context.ConnectionId] = username;
        await Clients.All.SendAsync("UserConnected", username);
    }

    public async Task SendMessage(string message)
    {
        var username = Users.GetValueOrDefault(Context.ConnectionId, "Anonymous");
        await Clients.All.SendAsync("ReceiveMessage", username, message);
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        if (Users.TryGetValue(Context.ConnectionId, out var username))
        {
            Users.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("UserDisconnected", username);
        }
        await base.OnDisconnectedAsync(exception);
    }
}
```

### Client
```html
<input type="text" id="usernameInput" placeholder="Username" />
<input type="text" id="messageInput" placeholder="Message" />
<button id="sendButton">Send</button>
<ul id="messagesList"></ul>

<script>
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("UserConnected", (user) => {
    console.log(`${user} connected`);
});

connection.start();

document.getElementById("sendButton").addEventListener("click", () => {
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", message);
});
</script>
```

## Practical Tasks

### Task 1: Basic Chat
- Create SignalR hub
- Implement send/receive messages
- Create simple chat UI
- Test real-time messaging

### Task 2: Group Chat
- Implement chat rooms
- Join/leave functionality
- Send messages to specific rooms
- Display room members

### Task 3: Notifications
- Create notification hub
- Send notifications to specific users
- Implement notification UI
- Mark notifications as read

### Task 4: Real-Time Dashboard
- Create dashboard hub
- Push live data updates
- Update charts in real-time
- Handle connection errors

## Best Practices

1. Handle connection failures
2. Implement reconnection logic
3. Use strongly-typed hubs
4. Secure hubs with authorization
5. Use groups for scalability
6. Keep messages small
7. Handle disconnections gracefully

## Interview Questions

1. What is SignalR?
2. How does SignalR work?
3. What are SignalR transports?
4. How do you implement authentication in SignalR?
5. What are SignalR groups?
6. Explain strongly-typed hubs
7. How do you scale SignalR?

## Next Steps

- Learn SignalR scaling with Redis
- Explore Azure SignalR Service
- Study performance optimization
- Implement advanced features
