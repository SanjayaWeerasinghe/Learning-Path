/**
 * Task 6: Design Phone Directory
 * Difficulty: Beginner
 *
 * Problem Description:
 * Create a PhoneDirectory class that stores contacts with names and phone numbers.
 * Implement methods to:
 * - add(name, number): Add a contact
 * - find(name): Return phone number for a name
 * - delete(name): Remove a contact
 * - list(): Return all contacts
 *
 * Expected Input/Output:
 * const dir = new PhoneDirectory();
 * dir.add("Alice", "123-456-7890");
 * dir.add("Bob", "234-567-8901");
 * dir.find("Alice"); // "123-456-7890"
 * dir.delete("Alice");
 * dir.find("Alice"); // undefined or null
 * dir.list(); // [["Bob", "234-567-8901"]]
 *
 * Hints/Approach:
 * - Use a Map or plain object to store name-number pairs
 * - Handle edge cases: duplicate names, empty directory
 * - Consider making names case-insensitive
 * - All operations should be O(1) average case
 */

/**
 * Solution 1: Using JavaScript Map
 *
 * Advantages of Map:
 * - Maintains insertion order
 * - Better performance for frequent additions/deletions
 * - Can use any type as key (though we use strings here)
 * - Has built-in size property
 */
class PhoneDirectory {
    constructor() {
        // Map to store contacts: name → phone number
        this.contacts = new Map();
    }

    /**
     * Add a contact to the directory
     *
     * @param {string} name - Contact name
     * @param {string} number - Phone number
     * @returns {boolean} - True if added, false if updated existing
     */
    add(name, number) {
        // Normalize name to lowercase for case-insensitive storage
        const normalizedName = name.toLowerCase().trim();

        // Validate inputs
        if (!normalizedName || !number) {
            console.error("Error: Name and number are required");
            return false;
        }

        // Check if contact already exists
        const isUpdate = this.contacts.has(normalizedName);

        // Add or update contact
        this.contacts.set(normalizedName, number);

        // Return true for new addition, false for update
        return !isUpdate;
    }

    /**
     * Find phone number by name
     *
     * @param {string} name - Contact name to search for
     * @returns {string|null} - Phone number if found, null otherwise
     */
    find(name) {
        // Normalize name for searching
        const normalizedName = name.toLowerCase().trim();

        // Return phone number or null if not found
        return this.contacts.get(normalizedName) || null;
    }

    /**
     * Delete a contact from directory
     *
     * @param {string} name - Contact name to delete
     * @returns {boolean} - True if deleted, false if not found
     */
    delete(name) {
        // Normalize name
        const normalizedName = name.toLowerCase().trim();

        // Delete returns true if element existed, false otherwise
        return this.contacts.delete(normalizedName);
    }

    /**
     * List all contacts
     *
     * @returns {Array<Array<string>>} - Array of [name, number] pairs
     */
    list() {
        // Convert Map entries to array of arrays
        return Array.from(this.contacts.entries());
    }

    /**
     * Get total number of contacts
     *
     * @returns {number} - Number of contacts in directory
     */
    size() {
        return this.contacts.size;
    }

    /**
     * Check if directory is empty
     *
     * @returns {boolean} - True if empty, false otherwise
     */
    isEmpty() {
        return this.contacts.size === 0;
    }

    /**
     * Clear all contacts
     */
    clear() {
        this.contacts.clear();
    }

    /**
     * Search for contacts by partial name match
     *
     * @param {string} query - Search query
     * @returns {Array<Array<string>>} - Matching contacts
     */
    search(query) {
        const normalizedQuery = query.toLowerCase().trim();
        const results = [];

        // Iterate through all contacts
        for (const [name, number] of this.contacts.entries()) {
            // Check if name includes the query string
            if (name.includes(normalizedQuery)) {
                results.push([name, number]);
            }
        }

        return results;
    }

    /**
     * Update phone number for existing contact
     *
     * @param {string} name - Contact name
     * @param {string} newNumber - New phone number
     * @returns {boolean} - True if updated, false if contact not found
     */
    update(name, newNumber) {
        const normalizedName = name.toLowerCase().trim();

        // Check if contact exists
        if (this.contacts.has(normalizedName)) {
            this.contacts.set(normalizedName, newNumber);
            return true;
        }

        return false;
    }

    /**
     * Export contacts as JSON string
     *
     * @returns {string} - JSON representation of contacts
     */
    toJSON() {
        // Convert Map to object for JSON serialization
        const contactsObject = Object.fromEntries(this.contacts);
        return JSON.stringify(contactsObject, null, 2);
    }

    /**
     * Import contacts from JSON string
     *
     * @param {string} jsonString - JSON string of contacts
     * @returns {boolean} - True if successful, false on error
     */
    fromJSON(jsonString) {
        try {
            const contactsObject = JSON.parse(jsonString);

            // Clear existing contacts
            this.contacts.clear();

            // Add contacts from parsed object
            for (const [name, number] of Object.entries(contactsObject)) {
                this.contacts.set(name, number);
            }

            return true;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            return false;
        }
    }
}

/**
 * Solution 2: Using Plain JavaScript Object
 *
 * Simpler but with some limitations compared to Map
 */
class PhoneDirectoryObject {
    constructor() {
        // Plain object to store contacts
        this.contacts = {};
    }

    add(name, number) {
        const normalizedName = name.toLowerCase().trim();
        if (!normalizedName || !number) return false;

        const isNew = !this.contacts[normalizedName];
        this.contacts[normalizedName] = number;
        return isNew;
    }

    find(name) {
        const normalizedName = name.toLowerCase().trim();
        return this.contacts[normalizedName] || null;
    }

    delete(name) {
        const normalizedName = name.toLowerCase().trim();
        if (this.contacts[normalizedName]) {
            delete this.contacts[normalizedName];
            return true;
        }
        return false;
    }

    list() {
        // Convert object to array of [name, number] pairs
        return Object.entries(this.contacts);
    }

    size() {
        return Object.keys(this.contacts).length;
    }
}

// Test cases
console.log("=== Test Case 1: Basic operations ===");
const dir = new PhoneDirectory();
console.log("Add Alice:", dir.add("Alice", "123-456-7890"));  // true (new)
console.log("Add Bob:", dir.add("Bob", "234-567-8901"));      // true (new)
console.log("Find Alice:", dir.find("Alice"));                // "123-456-7890"
console.log("Find Bob:", dir.find("Bob"));                    // "234-567-8901"
console.log("Directory size:", dir.size());                   // 2
console.log("List all contacts:", dir.list());

console.log("\n=== Test Case 2: Delete operation ===");
console.log("Delete Alice:", dir.delete("Alice"));            // true
console.log("Find Alice after delete:", dir.find("Alice"));   // null
console.log("Directory size:", dir.size());                   // 1

console.log("\n=== Test Case 3: Case insensitive ===");
const dir2 = new PhoneDirectory();
dir2.add("John Doe", "555-1234");
console.log("Find 'john doe':", dir2.find("john doe"));       // "555-1234"
console.log("Find 'JOHN DOE':", dir2.find("JOHN DOE"));       // "555-1234"
console.log("Find 'JoHn DoE':", dir2.find("JoHn DoE"));       // "555-1234"

console.log("\n=== Test Case 4: Update existing contact ===");
const dir3 = new PhoneDirectory();
console.log("Add Charlie:", dir3.add("Charlie", "111-1111")); // true
console.log("Add Charlie again:", dir3.add("Charlie", "222-2222")); // false (update)
console.log("Find Charlie:", dir3.find("Charlie"));           // "222-2222"
console.log("Directory size:", dir3.size());                  // 1 (not 2)

console.log("\n=== Test Case 5: Search functionality ===");
const dir4 = new PhoneDirectory();
dir4.add("Alice Smith", "111-1111");
dir4.add("Alice Johnson", "222-2222");
dir4.add("Bob Smith", "333-3333");
console.log("Search for 'alice':", dir4.search("alice"));
console.log("Search for 'smith':", dir4.search("smith"));

console.log("\n=== Test Case 6: Update method ===");
const dir5 = new PhoneDirectory();
dir5.add("Dave", "444-4444");
console.log("Update Dave:", dir5.update("Dave", "555-5555")); // true
console.log("Find Dave:", dir5.find("Dave"));                 // "555-5555"
console.log("Update non-existent:", dir5.update("Eve", "666-6666")); // false

console.log("\n=== Test Case 7: Empty directory ===");
const dir6 = new PhoneDirectory();
console.log("Is empty:", dir6.isEmpty());                     // true
console.log("Find in empty:", dir6.find("Nobody"));           // null
console.log("Delete from empty:", dir6.delete("Nobody"));     // false

console.log("\n=== Test Case 8: JSON export/import ===");
const dir7 = new PhoneDirectory();
dir7.add("Frank", "777-7777");
dir7.add("Grace", "888-8888");
const jsonString = dir7.toJSON();
console.log("Exported JSON:", jsonString);

const dir8 = new PhoneDirectory();
dir8.fromJSON(jsonString);
console.log("Imported contacts:", dir8.list());

/**
 * Complexity Analysis:
 *
 * All operations (add, find, delete):
 * Time: O(1) average case
 * Space: O(n) where n is number of contacts
 *
 * list() operation:
 * Time: O(n) - must iterate through all contacts
 * Space: O(n) - creates new array
 *
 * search() operation:
 * Time: O(n) - must check all contacts
 * Space: O(k) where k is number of matches
 *
 * Key Features:
 * - Case-insensitive name handling
 * - Duplicate name prevention (update instead)
 * - Input validation
 * - Additional utility methods (search, update, import/export)
 * - Both Map and Object implementations provided
 */
