/**
 * Task 30: Implement Trie (Prefix Tree)
 * Difficulty: Advanced
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

    delete(word) {
        this._delete(this.root, word, 0);
    }

    _delete(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }

        const char = word[index];
        if (!node.children[char]) return false;

        const shouldDelete = this._delete(node.children[char], word, index + 1);

        if (shouldDelete) {
            delete node.children[char];
            return Object.keys(node.children).length === 0 && !node.isEndOfWord;
        }

        return false;
    }

    autoComplete(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }

        const words = [];
        this._findWords(node, prefix, words);
        return words;
    }

    _findWords(node, current, words) {
        if (node.isEndOfWord) {
            words.push(current);
        }

        for (const char in node.children) {
            this._findWords(node.children[char], current + char, words);
        }
    }
}

// Tests
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true
console.log(trie.autoComplete("app")); // ["app", "apple"]
