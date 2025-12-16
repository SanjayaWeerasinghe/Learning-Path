/**
 * Task 59: Property Descriptor Analyzer
 * Difficulty: Advanced
 */

function analyzeDescriptors(obj) {
    const descriptors = {};

    // Get regular property descriptors
    const regularDescriptors = Object.getOwnPropertyDescriptors(obj);

    // Merge with regular properties
    Object.assign(descriptors, regularDescriptors);

    // Get symbol properties
    const symbols = Object.getOwnPropertySymbols(obj);
    symbols.forEach(sym => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        descriptors[sym.toString()] = descriptor;
    });

    return descriptors;
}

// Tests
const obj = {};
Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
Object.defineProperty(obj, 'visible', { value: 100, enumerable: true, writable: true });

console.log(analyzeDescriptors(obj));
// {
//   hidden: { value: 42, writable: false, enumerable: false, configurable: false },
//   visible: { value: 100, writable: true, enumerable: true, configurable: false }
// }

const sym = Symbol('test');
const obj2 = { [sym]: 'symbol value' };
console.log(analyzeDescriptors(obj2));
