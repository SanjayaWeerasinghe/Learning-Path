/**
 * Task 24: Implement Graph with Adjacency List
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Create a Graph class using adjacency list representation. Implement:
 * - addVertex(vertex): Add a vertex
 * - addEdge(v1, v2): Add an edge between vertices
 * - removeEdge(v1, v2): Remove an edge
 * - removeVertex(vertex): Remove a vertex and all its edges
 * - depthFirstSearch(start): DFS traversal
 * - breadthFirstSearch(start): BFS traversal
 */

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(v1, v2) {
        if (!this.adjacencyList[v1]) this.addVertex(v1);
        if (!this.adjacencyList[v2]) this.addVertex(v2);

        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1); // Undirected graph
    }

    removeEdge(v1, v2) {
        if (this.adjacencyList[v1]) {
            this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        }
        if (this.adjacencyList[v2]) {
            this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
        }
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) return;

        // Remove all edges to this vertex
        for (let neighbor of this.adjacencyList[vertex]) {
            this.removeEdge(vertex, neighbor);
        }

        delete this.adjacencyList[vertex];
    }

    dfs(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfsHelper(vertex) {
            if (!vertex) return;
            visited[vertex] = true;
            result.push(vertex);

            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    dfsHelper(neighbor);
                }
            });
        })(start);

        return result;
    }

    bfs(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

        while (queue.length) {
            const vertex = queue.shift();
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

// Test cases
console.log("=== Test Case 1: Build Graph ===");
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "C");
console.log("Graph:", g.adjacencyList);

console.log("\n=== Test Case 2: DFS ===");
console.log("DFS from A:", g.dfs("A"));

console.log("\n=== Test Case 3: BFS ===");
console.log("BFS from A:", g.bfs("A"));

console.log("\n=== Test Case 4: Remove Edge ===");
g.removeEdge("A", "B");
console.log("After removing A-B:", g.adjacencyList);

console.log("\n=== Test Case 5: Remove Vertex ===");
g.removeVertex("C");
console.log("After removing C:", g.adjacencyList);

/**
 * Time Complexity:
 * - addVertex: O(1)
 * - addEdge: O(1)
 * - removeVertex: O(V + E) where V is vertices, E is edges
 * - DFS/BFS: O(V + E)
 *
 * Space Complexity: O(V + E)
 */
