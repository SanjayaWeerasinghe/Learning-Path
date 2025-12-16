/**
 * Task 5: Group Anagrams
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given an array of strings, group anagrams together. Anagrams are words formed by
 * rearranging letters of another word.
 *
 * Expected Input/Output:
 * Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
 *
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Hints/Approach:
 * - Use a hash map where the key is a sorted version of the word
 * - Or use character frequency as the key (e.g., "a1b1c1")
 * - Group words that produce the same key
 * - Time complexity: O(n * k log k) where k is max string length
 */

/**
 * Solution 1: Using sorted string as key
 *
 * Algorithm:
 * 1. For each word, sort its characters to create a key
 * 2. Use this key to group anagrams in a hash map
 * 3. Words with same sorted form are anagrams
 *
 * Example: "eat", "tea", "ate" all become "aet" when sorted
 *
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Grouped anagrams
 */
function groupAnagrams(strs) {
    // Map to store: sortedWord → [original words]
    const anagramGroups = new Map();

    for (const word of strs) {
        // Sort the characters of the word to create a key
        // Convert string to array, sort, join back to string
        const sortedWord = word.split('').sort().join('');

        // If this sorted form exists, add word to its group
        // Otherwise, create new group
        if (anagramGroups.has(sortedWord)) {
            anagramGroups.get(sortedWord).push(word);
        } else {
            anagramGroups.set(sortedWord, [word]);
        }
    }

    // Convert Map values to array
    return Array.from(anagramGroups.values());
}

/**
 * Solution 2: Using character frequency as key
 *
 * This approach avoids sorting by creating a frequency signature
 * More efficient for very long strings
 *
 * Algorithm:
 * 1. For each word, create a character frequency count
 * 2. Convert frequency count to a unique string key
 * 3. Group words with same frequency signature
 *
 * Example: "eat" → "a1e1t1", "tea" → "a1e1t1" (same signature)
 *
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Grouped anagrams
 */
function groupAnagramsFrequency(strs) {
    const anagramGroups = new Map();

    for (const word of strs) {
        // Create character frequency signature
        const signature = getCharacterSignature(word);

        // Group by signature
        if (anagramGroups.has(signature)) {
            anagramGroups.get(signature).push(word);
        } else {
            anagramGroups.set(signature, [word]);
        }
    }

    return Array.from(anagramGroups.values());
}

/**
 * Helper function: Create character frequency signature
 *
 * Uses an array of 26 elements for lowercase letters a-z
 * Example: "aab" → "2,1,0,0,0,...,0" (2 a's, 1 b, rest 0)
 *
 * @param {string} word - Input word
 * @returns {string} - Frequency signature
 */
function getCharacterSignature(word) {
    // Create array for 26 letters (a-z)
    const freq = new Array(26).fill(0);

    // Count frequency of each character
    for (const char of word) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        freq[index]++;
    }

    // Convert frequency array to string (use as Map key)
    // Join with delimiter to avoid collisions
    return freq.join(',');
}

/**
 * Solution 3: Using object instead of Map
 * This is similar to Solution 1 but uses plain JavaScript object
 *
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Grouped anagrams
 */
function groupAnagramsObject(strs) {
    const anagramGroups = {};

    for (const word of strs) {
        // Sort characters to create key
        const sortedWord = word.split('').sort().join('');

        // Group by sorted key
        if (anagramGroups[sortedWord]) {
            anagramGroups[sortedWord].push(word);
        } else {
            anagramGroups[sortedWord] = [word];
        }
    }

    // Extract all groups as array
    return Object.values(anagramGroups);
}

/**
 * Solution 4: Using prime number multiplication (Mathematical approach)
 *
 * Assign each letter a prime number, multiply them together
 * Anagrams will have same product (commutative property)
 *
 * Note: Can overflow for very long strings
 *
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Grouped anagrams
 */
function groupAnagramsPrime(strs) {
    // Assign prime numbers to each letter a-z
    const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
        43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101
    ];

    const anagramGroups = new Map();

    for (const word of strs) {
        // Calculate product of prime numbers for each character
        let product = 1;
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            product *= primes[index];
        }

        // Group by product (same product = anagrams)
        if (anagramGroups.has(product)) {
            anagramGroups.get(product).push(word);
        } else {
            anagramGroups.set(product, [word]);
        }
    }

    return Array.from(anagramGroups.values());
}

// Test cases
console.log("=== Test Case 1: Basic anagram grouping ===");
const test1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log("Input:", test1);
console.log("Output (sorted):", groupAnagrams(test1));
console.log("Output (frequency):", groupAnagramsFrequency(test1));
console.log("Output (object):", groupAnagramsObject(test1));
console.log("Output (prime):", groupAnagramsPrime(test1));
// Expected: [["eat","tea","ate"], ["tan","nat"], ["bat"]] (order may vary)

console.log("\n=== Test Case 2: Empty string ===");
const test2 = [""];
console.log("Input:", test2);
console.log("Output:", groupAnagrams(test2));
// Expected: [[""]]

console.log("\n=== Test Case 3: Single character strings ===");
const test3 = ["a", "b", "a"];
console.log("Input:", test3);
console.log("Output:", groupAnagrams(test3));
// Expected: [["a","a"], ["b"]]

console.log("\n=== Test Case 4: All same anagrams ===");
const test4 = ["abc", "bca", "cab", "acb"];
console.log("Input:", test4);
console.log("Output:", groupAnagrams(test4));
// Expected: [["abc","bca","cab","acb"]]

console.log("\n=== Test Case 5: No anagrams ===");
const test5 = ["a", "b", "c"];
console.log("Input:", test5);
console.log("Output:", groupAnagrams(test5));
// Expected: [["a"], ["b"], ["c"]]

console.log("\n=== Test Case 6: Case sensitivity (lowercase only) ===");
const test6 = ["listen", "silent", "enlist", "hello"];
console.log("Input:", test6);
console.log("Output:", groupAnagrams(test6));
// Expected: [["listen","silent","enlist"], ["hello"]]

/**
 * Complexity Analysis:
 *
 * Solution 1 (Sorting):
 * Time: O(n * k log k) where n = number of strings, k = max string length
 *   - For each string: sort takes O(k log k)
 *   - n strings total
 * Space: O(n * k) for storing all strings in hash map
 *
 * Solution 2 (Character Frequency):
 * Time: O(n * k) where n = number of strings, k = max string length
 *   - For each string: count frequency takes O(k)
 *   - n strings total
 * Space: O(n * k) for hash map
 *
 * Solution 3 (Object):
 * Same as Solution 1, just different data structure
 *
 * Solution 4 (Prime Multiplication):
 * Time: O(n * k)
 * Space: O(n * k)
 * Limitation: Can overflow for long strings (product becomes very large)
 *
 * Best Approach:
 * - For short strings: Sorting (Solution 1) is simple and efficient
 * - For very long strings: Frequency counting (Solution 2) is better
 * - In practice: Sorting is most commonly used for its simplicity
 */
