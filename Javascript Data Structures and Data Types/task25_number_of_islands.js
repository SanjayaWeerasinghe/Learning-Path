/**
 * Task 25: Number of Islands
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and formed by connecting adjacent lands
 * horizontally or vertically.
 */

function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(i, j) {
        // Check bounds and if it's land
        if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') {
            return;
        }

        // Mark as visited
        grid[i][j] = '0';

        // Explore all 4 directions
        dfs(i + 1, j); // down
        dfs(i - 1, j); // up
        dfs(i, j + 1); // right
        dfs(i, j - 1); // left
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j); // Mark entire island
            }
        }
    }

    return count;
}

function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function bfs(i, j) {
        const queue = [[i, j]];
        grid[i][j] = '0';

        while (queue.length > 0) {
            const [row, col] = queue.shift();
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;

                if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] === '1') {
                    grid[newRow][newCol] = '0';
                    queue.push([newRow, newCol]);
                }
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
}

// Test cases
console.log("=== Test Case 1: Multiple Islands ===");
const grid1 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];
console.log("Number of islands:", numIslands(grid1.map(row => [...row]))); // 3

console.log("\n=== Test Case 2: Single Island ===");
const grid2 = [
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["1", "1", "1"]
];
console.log("Number of islands:", numIslands(grid2.map(row => [...row]))); // 1

console.log("\n=== Test Case 3: BFS Approach ===");
const grid3 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];
console.log("Number of islands (BFS):", numIslandsBFS(grid3)); // 3

/**
 * Time Complexity: O(m * n) where m is rows, n is cols
 * Space Complexity: O(m * n) worst case for recursion stack
 */
