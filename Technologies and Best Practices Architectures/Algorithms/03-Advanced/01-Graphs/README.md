# Graphs

## What is a Graph?

A collection of **nodes (vertices)** connected by **edges**. Used to represent networks, relationships, maps, etc.

## Graph Representations

### 1. Adjacency Matrix
```csharp
// For n vertices
int[,] graph = new int[n, n];

// Add edge from u to v
graph[u, v] = 1;  // Unweighted
graph[u, v] = weight;  // Weighted

// Check if edge exists: O(1)
// Space: O(V²)
```

### 2. Adjacency List
```csharp
// Using Dictionary
Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();

// Add edge
if (!graph.ContainsKey(u)) graph[u] = new List<int>();
graph[u].Add(v);

// Check if edge exists: O(degree)
// Space: O(V + E)
```

### 3. Edge List
```csharp
class Edge {
    public int from;
    public int to;
    public int weight;
}

List<Edge> edges = new List<Edge>();
```

## Types of Graphs

- **Directed**: Edges have direction (A → B)
- **Undirected**: Edges are bidirectional (A — B)
- **Weighted**: Edges have weights/costs
- **Unweighted**: All edges equal weight
- **Cyclic**: Contains cycles
- **Acyclic**: No cycles (DAG - Directed Acyclic Graph)
- **Connected**: Path exists between all vertices
- **Disconnected**: Some vertices unreachable

## Graph Traversals

### 1. Depth-First Search (DFS)
```csharp
void DFS(Dictionary<int, List<int>> graph, int start) {
    HashSet<int> visited = new HashSet<int>();
    DFSHelper(graph, start, visited);
}

void DFSHelper(Dictionary<int, List<int>> graph, int node, HashSet<int> visited) {
    visited.Add(node);
    Console.Write(node + " ");

    if (graph.ContainsKey(node)) {
        foreach (int neighbor in graph[node]) {
            if (!visited.Contains(neighbor)) {
                DFSHelper(graph, neighbor, visited);
            }
        }
    }
}

// Time: O(V + E), Space: O(V)
```

### DFS (Iterative with Stack)
```csharp
void DFSIterative(Dictionary<int, List<int>> graph, int start) {
    HashSet<int> visited = new HashSet<int>();
    Stack<int> stack = new Stack<int>();

    stack.Push(start);

    while (stack.Count > 0) {
        int node = stack.Pop();

        if (!visited.Contains(node)) {
            visited.Add(node);
            Console.Write(node + " ");

            if (graph.ContainsKey(node)) {
                foreach (int neighbor in graph[node]) {
                    if (!visited.Contains(neighbor)) {
                        stack.Push(neighbor);
                    }
                }
            }
        }
    }
}
```

### 2. Breadth-First Search (BFS)
```csharp
void BFS(Dictionary<int, List<int>> graph, int start) {
    HashSet<int> visited = new HashSet<int>();
    Queue<int> queue = new Queue<int>();

    visited.Add(start);
    queue.Enqueue(start);

    while (queue.Count > 0) {
        int node = queue.Dequeue();
        Console.Write(node + " ");

        if (graph.ContainsKey(node)) {
            foreach (int neighbor in graph[node]) {
                if (!visited.Contains(neighbor)) {
                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
}

// Time: O(V + E), Space: O(V)
```

## Shortest Path Algorithms

### 1. Dijkstra's Algorithm (Single Source, Non-negative weights)
```csharp
Dictionary<int, int> Dijkstra(Dictionary<int, List<(int, int)>> graph, int start) {
    Dictionary<int, int> distances = new Dictionary<int, int>();
    PriorityQueue<(int node, int dist), int> pq = new PriorityQueue<(int, int), int>();

    // Initialize distances
    foreach (var node in graph.Keys) {
        distances[node] = int.MaxValue;
    }
    distances[start] = 0;

    pq.Enqueue((start, 0), 0);

    while (pq.Count > 0) {
        var (node, dist) = pq.Dequeue();

        if (dist > distances[node]) continue;

        if (graph.ContainsKey(node)) {
            foreach (var (neighbor, weight) in graph[node]) {
                int newDist = distances[node] + weight;

                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    pq.Enqueue((neighbor, newDist), newDist);
                }
            }
        }
    }

    return distances;
}

// Time: O((V + E) log V), Space: O(V)
```

### 2. Bellman-Ford (Single Source, Handles negative weights)
```csharp
Dictionary<int, int> BellmanFord(List<(int from, int to, int weight)> edges, int V, int start) {
    Dictionary<int, int> distances = new Dictionary<int, int>();

    for (int i = 0; i < V; i++) {
        distances[i] = int.MaxValue;
    }
    distances[start] = 0;

    // Relax edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        foreach (var (from, to, weight) in edges) {
            if (distances[from] != int.MaxValue &&
                distances[from] + weight < distances[to]) {
                distances[to] = distances[from] + weight;
            }
        }
    }

    // Check for negative cycles
    foreach (var (from, to, weight) in edges) {
        if (distances[from] != int.MaxValue &&
            distances[from] + weight < distances[to]) {
            throw new Exception("Negative cycle detected");
        }
    }

    return distances;
}

// Time: O(V * E), Space: O(V)
```

### 3. Floyd-Warshall (All Pairs Shortest Path)
```csharp
int[,] FloydWarshall(int[,] graph, int V) {
    int[,] dist = (int[,])graph.Clone();

    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i, k] != int.MaxValue &&
                    dist[k, j] != int.MaxValue &&
                    dist[i, k] + dist[k, j] < dist[i, j]) {
                    dist[i, j] = dist[i, k] + dist[k, j];
                }
            }
        }
    }

    return dist;
}

// Time: O(V³), Space: O(V²)
```

## Cycle Detection

### Undirected Graph (DFS)
```csharp
bool HasCycle(Dictionary<int, List<int>> graph) {
    HashSet<int> visited = new HashSet<int>();

    foreach (var node in graph.Keys) {
        if (!visited.Contains(node)) {
            if (DFSCycle(graph, node, -1, visited)) {
                return true;
            }
        }
    }
    return false;
}

bool DFSCycle(Dictionary<int, List<int>> graph, int node, int parent, HashSet<int> visited) {
    visited.Add(node);

    if (graph.ContainsKey(node)) {
        foreach (int neighbor in graph[node]) {
            if (!visited.Contains(neighbor)) {
                if (DFSCycle(graph, neighbor, node, visited)) {
                    return true;
                }
            }
            else if (neighbor != parent) {
                return true;  // Cycle found
            }
        }
    }
    return false;
}
```

### Directed Graph (DFS with Recursion Stack)
```csharp
bool HasCycleDirected(Dictionary<int, List<int>> graph) {
    HashSet<int> visited = new HashSet<int>();
    HashSet<int> recStack = new HashSet<int>();

    foreach (var node in graph.Keys) {
        if (DFSCycleDirected(graph, node, visited, recStack)) {
            return true;
        }
    }
    return false;
}

bool DFSCycleDirected(Dictionary<int, List<int>> graph, int node,
                      HashSet<int> visited, HashSet<int> recStack) {
    if (recStack.Contains(node)) return true;
    if (visited.Contains(node)) return false;

    visited.Add(node);
    recStack.Add(node);

    if (graph.ContainsKey(node)) {
        foreach (int neighbor in graph[node]) {
            if (DFSCycleDirected(graph, neighbor, visited, recStack)) {
                return true;
            }
        }
    }

    recStack.Remove(node);
    return false;
}
```

## Topological Sort (DAG)

### DFS-based
```csharp
List<int> TopologicalSort(Dictionary<int, List<int>> graph) {
    HashSet<int> visited = new HashSet<int>();
    Stack<int> stack = new Stack<int>();

    foreach (var node in graph.Keys) {
        if (!visited.Contains(node)) {
            TopSortDFS(graph, node, visited, stack);
        }
    }

    List<int> result = new List<int>();
    while (stack.Count > 0) {
        result.Add(stack.Pop());
    }
    return result;
}

void TopSortDFS(Dictionary<int, List<int>> graph, int node,
                HashSet<int> visited, Stack<int> stack) {
    visited.Add(node);

    if (graph.ContainsKey(node)) {
        foreach (int neighbor in graph[node]) {
            if (!visited.Contains(neighbor)) {
                TopSortDFS(graph, neighbor, visited, stack);
            }
        }
    }

    stack.Push(node);
}
```

### Kahn's Algorithm (BFS-based)
```csharp
List<int> TopologicalSortKahn(Dictionary<int, List<int>> graph, int V) {
    int[] inDegree = new int[V];
    List<int> result = new List<int>();

    // Calculate in-degrees
    foreach (var neighbors in graph.Values) {
        foreach (int neighbor in neighbors) {
            inDegree[neighbor]++;
        }
    }

    Queue<int> queue = new Queue<int>();
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            queue.Enqueue(i);
        }
    }

    while (queue.Count > 0) {
        int node = queue.Dequeue();
        result.Add(node);

        if (graph.ContainsKey(node)) {
            foreach (int neighbor in graph[node]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.Enqueue(neighbor);
                }
            }
        }
    }

    return result.Count == V ? result : new List<int>();  // Empty if cycle
}
```

## Minimum Spanning Tree

### Kruskal's Algorithm (Union-Find)
```csharp
class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    public int Find(int x) {
        if (parent[x] != x) {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    public bool Union(int x, int y) {
        int rootX = Find(x);
        int rootY = Find(y);

        if (rootX == rootY) return false;

        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        }
        else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        }
        else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}

List<(int, int, int)> Kruskal(List<(int from, int to, int weight)> edges, int V) {
    edges.Sort((a, b) => a.weight.CompareTo(b.weight));

    UnionFind uf = new UnionFind(V);
    List<(int, int, int)> mst = new List<(int, int, int)>();

    foreach (var (from, to, weight) in edges) {
        if (uf.Union(from, to)) {
            mst.Add((from, to, weight));
        }
    }

    return mst;
}
```

## Common Graph Problems

1. **Number of Islands** - DFS/BFS on grid
2. **Course Schedule** - Cycle detection, topological sort
3. **Clone Graph** - DFS/BFS with HashMap
4. **Word Ladder** - BFS shortest path
5. **Network Delay Time** - Dijkstra
6. **Cheapest Flights Within K Stops** - Modified Dijkstra/Bellman-Ford

## Interview Tips

- **Ask**: Directed or undirected? Weighted? Connected?
- **Representation**: Adjacency list for sparse, matrix for dense
- **DFS**: Recursion or stack, good for paths, cycles
- **BFS**: Queue, good for shortest path in unweighted
- **Visited set**: Essential to avoid infinite loops
- **Dijkstra**: Priority queue, non-negative weights
- **Topological sort**: DAG only, course scheduling

## Practice Problems

1. Clone Graph
2. Pacific Atlantic Water Flow
3. Reconstruct Itinerary
4. Minimum Height Trees
5. Alien Dictionary
6. Network Delay Time
7. Cheapest Flights Within K Stops
8. Critical Connections in a Network
