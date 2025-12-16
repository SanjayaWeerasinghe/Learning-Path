/**
 * Task 49: Global Symbol Registry
 * Difficulty: Advanced
 */

function manageSymbols() {
    const localSymbol = Symbol('test');
    const globalSymbol = Symbol.for('test');

    const areEqual = localSymbol === globalSymbol;
    const globalKey = Symbol.keyFor(globalSymbol);
    const localKey = Symbol.keyFor(localSymbol);

    // Test global symbol retrieval
    const sameGlobalSymbol = Symbol.for('test');
    const globalSymbolsEqual = globalSymbol === sameGlobalSymbol;

    return {
        localSymbol,
        globalSymbol,
        areEqual,
        globalKey,
        localKey,
        globalSymbolsEqual
    };
}

// Tests
const result = manageSymbols();
console.log("Are local and global equal?", result.areEqual); // false
console.log("Global key:", result.globalKey); // "test"
console.log("Local key:", result.localKey); // undefined
console.log("Global symbols equal?", result.globalSymbolsEqual); // true
