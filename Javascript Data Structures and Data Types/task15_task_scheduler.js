/**
 * Task 15: Design Task Scheduler
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Implement a task scheduler using a queue. Tasks should be processed in FIFO order.
 * Include methods to add tasks, process the next task, and check remaining tasks.
 *
 * Expected Input/Output:
 * const scheduler = new TaskScheduler();
 * scheduler.addTask("Task 1");
 * scheduler.addTask("Task 2");
 * scheduler.processNext(); // "Processing: Task 1"
 * scheduler.getRemainingTasks(); // ["Task 2"]
 *
 * Hints/Approach:
 * - Use a queue to maintain task order
 * - addTask() enqueues a new task
 * - processNext() dequeues and executes/logs the task
 * - Consider adding priority levels (use priority queue)
 */

/**
 * Basic Task Scheduler using Queue
 */
class TaskScheduler {
    constructor() {
        this.queue = [];
        this.taskHistory = [];
        this.taskIdCounter = 0;
    }

    /**
     * Add a task to the scheduler
     * @param {string|Function} task - Task description or function
     * @param {object} options - Optional task configuration
     * @returns {number} - Task ID
     */
    addTask(task, options = {}) {
        const taskId = ++this.taskIdCounter;
        const taskObj = {
            id: taskId,
            task: task,
            addedAt: new Date(),
            status: 'pending',
            ...options
        };

        this.queue.push(taskObj);
        console.log(`✓ Added Task #${taskId}: ${typeof task === 'function' ? task.name || 'Anonymous Function' : task}`);
        return taskId;
    }

    /**
     * Process the next task in queue
     * @returns {object|null} - Processed task or null if queue empty
     */
    processNext() {
        if (this.queue.length === 0) {
            console.log("⚠ No tasks to process");
            return null;
        }

        const taskObj = this.queue.shift();
        taskObj.status = 'processing';
        taskObj.startedAt = new Date();

        console.log(`\n▶ Processing Task #${taskObj.id}...`);

        try {
            // If task is a function, execute it
            if (typeof taskObj.task === 'function') {
                const result = taskObj.task();
                taskObj.result = result;
            } else {
                console.log(`  ${taskObj.task}`);
            }

            taskObj.status = 'completed';
            taskObj.completedAt = new Date();
            console.log(`✓ Task #${taskObj.id} completed`);
        } catch (error) {
            taskObj.status = 'failed';
            taskObj.error = error.message;
            console.log(`✗ Task #${taskObj.id} failed: ${error.message}`);
        }

        this.taskHistory.push(taskObj);
        return taskObj;
    }

    /**
     * Process all remaining tasks
     * @returns {number} - Number of tasks processed
     */
    processAll() {
        let count = 0;
        while (this.queue.length > 0) {
            this.processNext();
            count++;
        }
        return count;
    }

    /**
     * Get remaining tasks
     * @returns {Array} - Array of pending tasks
     */
    getRemainingTasks() {
        return this.queue.map(t => ({
            id: t.id,
            task: typeof t.task === 'function' ? t.task.name || 'Function' : t.task,
            addedAt: t.addedAt
        }));
    }

    /**
     * Get task history
     * @returns {Array} - Array of completed/failed tasks
     */
    getHistory() {
        return this.taskHistory;
    }

    /**
     * Get statistics
     * @returns {object} - Scheduler statistics
     */
    getStats() {
        const completed = this.taskHistory.filter(t => t.status === 'completed').length;
        const failed = this.taskHistory.filter(t => t.status === 'failed').length;

        return {
            pending: this.queue.length,
            completed,
            failed,
            total: this.taskIdCounter
        };
    }

    /**
     * Clear all tasks
     */
    clear() {
        this.queue = [];
        console.log("✓ Queue cleared");
    }
}

/**
 * Priority Task Scheduler
 * Tasks with higher priority are processed first
 */
class PriorityTaskScheduler {
    constructor() {
        this.queue = [];
        this.taskHistory = [];
        this.taskIdCounter = 0;
    }

    /**
     * Add task with priority (lower number = higher priority)
     * @param {string|Function} task - Task to execute
     * @param {number} priority - Priority level (default: 5)
     * @returns {number} - Task ID
     */
    addTask(task, priority = 5) {
        const taskId = ++this.taskIdCounter;
        const taskObj = {
            id: taskId,
            task,
            priority,
            addedAt: new Date(),
            status: 'pending'
        };

        // Insert task in priority order
        let inserted = false;
        for (let i = 0; i < this.queue.length; i++) {
            if (priority < this.queue[i].priority) {
                this.queue.splice(i, 0, taskObj);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            this.queue.push(taskObj);
        }

        console.log(`✓ Added Task #${taskId} (Priority: ${priority})`);
        return taskId;
    }

    processNext() {
        if (this.queue.length === 0) {
            console.log("⚠ No tasks to process");
            return null;
        }

        const taskObj = this.queue.shift();
        console.log(`\n▶ Processing Task #${taskObj.id} (Priority: ${taskObj.priority})`);

        try {
            if (typeof taskObj.task === 'function') {
                taskObj.result = taskObj.task();
            } else {
                console.log(`  ${taskObj.task}`);
            }
            taskObj.status = 'completed';
            console.log(`✓ Task #${taskObj.id} completed`);
        } catch (error) {
            taskObj.status = 'failed';
            taskObj.error = error.message;
        }

        this.taskHistory.push(taskObj);
        return taskObj;
    }

    processAll() {
        let count = 0;
        while (this.queue.length > 0) {
            this.processNext();
            count++;
        }
        return count;
    }

    getRemainingTasks() {
        return this.queue.map(t => ({
            id: t.id,
            priority: t.priority,
            task: typeof t.task === 'function' ? 'Function' : t.task
        }));
    }
}

// Test cases
console.log("=== Test Case 1: Basic Task Scheduler ===");
const scheduler = new TaskScheduler();
scheduler.addTask("Initialize database");
scheduler.addTask("Load configuration");
scheduler.addTask("Start server");
console.log("\nRemaining tasks:", scheduler.getRemainingTasks().length);
scheduler.processNext();
console.log("\nRemaining tasks:", scheduler.getRemainingTasks());

console.log("\n=== Test Case 2: Process All Tasks ===");
const scheduler2 = new TaskScheduler();
scheduler2.addTask("Task 1");
scheduler2.addTask("Task 2");
scheduler2.addTask("Task 3");
const processed = scheduler2.processAll();
console.log(`\nProcessed ${processed} tasks`);
console.log("Stats:", scheduler2.getStats());

console.log("\n=== Test Case 3: Function Tasks ===");
const scheduler3 = new TaskScheduler();
scheduler3.addTask(() => {
    console.log("  Executing: Calculate sum");
    return 1 + 2 + 3;
});
scheduler3.addTask(() => {
    console.log("  Executing: Generate report");
    return { report: "Monthly Report", status: "Generated" };
});
scheduler3.processNext();
scheduler3.processNext();
console.log("\nHistory:", scheduler3.getHistory());

console.log("\n=== Test Case 4: Error Handling ===");
const scheduler4 = new TaskScheduler();
scheduler4.addTask(() => {
    throw new Error("Database connection failed");
});
scheduler4.addTask("This task should still run");
scheduler4.processAll();
console.log("\nStats:", scheduler4.getStats());

console.log("\n=== Test Case 5: Priority Task Scheduler ===");
const pScheduler = new PriorityTaskScheduler();
pScheduler.addTask("Low priority task", 10);
pScheduler.addTask("High priority task", 1);
pScheduler.addTask("Medium priority task", 5);
pScheduler.addTask("Another high priority", 1);
console.log("\nQueue order:", pScheduler.getRemainingTasks());
pScheduler.processAll();

console.log("\n=== Test Case 6: Real-world Example - Build System ===");
class BuildScheduler extends TaskScheduler {
    constructor() {
        super();
    }

    addBuildStep(name, fn) {
        return this.addTask(fn, { name, type: 'build' });
    }

    build() {
        console.log("\n🔨 Starting build process...\n");
        const start = Date.now();
        this.processAll();
        const duration = Date.now() - start;
        console.log(`\n✓ Build completed in ${duration}ms`);
        return this.getStats();
    }
}

const buildScheduler = new BuildScheduler();
buildScheduler.addBuildStep("Clean", () => {
    console.log("  Cleaning build directory...");
});
buildScheduler.addBuildStep("Compile", () => {
    console.log("  Compiling source files...");
});
buildScheduler.addBuildStep("Test", () => {
    console.log("  Running tests...");
});
buildScheduler.addBuildStep("Package", () => {
    console.log("  Creating distribution package...");
});
buildScheduler.build();

/**
 * Time Complexity Analysis:
 * - addTask: O(1) for basic scheduler, O(n) for priority scheduler
 * - processNext: O(1) for both
 * - processAll: O(n) where n is number of tasks
 * - getRemainingTasks: O(n)
 *
 * Space Complexity:
 * - O(n) where n is total number of tasks (queue + history)
 *
 * Real-world Applications:
 * - Task queues in web workers
 * - Job schedulers in backend systems
 * - Build systems (webpack, gulp)
 * - Message queues
 * - Operating system process scheduling
 * - Event loop implementations
 *
 * Enhancements:
 * - Add delay/timeout for tasks
 * - Add task dependencies
 * - Add task cancellation
 * - Add recurring tasks
 * - Add task groups/batches
 * - Add parallel execution limits
 */
