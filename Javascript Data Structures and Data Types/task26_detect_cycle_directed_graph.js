/**
 * Task 26: Detect Cycle in Directed Graph
 * Difficulty: Advanced
 */

function hasCycle(edges, n) {
    const graph = Array.from({ length: n }, () => []);
    for (const [from, to] of edges) {
        graph[from].push(to);
    }

    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = Array(n).fill(WHITE);

    function dfs(node) {
        color[node] = GRAY;

        for (const neighbor of graph[node]) {
            if (color[neighbor] === GRAY) return true; // Cycle detected
            if (color[neighbor] === WHITE && dfs(neighbor)) return true;
        }

        color[node] = BLACK;
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (color[i] === WHITE && dfs(i)) return true;
    }

    return false;
}

// Tests
console.log(hasCycle([[0, 1], [1, 2], [2, 0]], 3)); // true
console.log(hasCycle([[0, 1], [1, 2]], 3)); // false
