/**
 * Task 35: String Immutability Demonstrator
 * Difficulty: Beginner
 */

function demonstrateImmutability() {
    const examples = [];

    // Example 1: Character access doesn't modify
    const str1 = "hello";
    str1[0] = "H"; // This doesn't work
    examples.push({
        original: "hello",
        attempted: "h",
        unchanged: str1
    });

    // Example 2: Methods return new strings
    const str2 = "WORLD";
    const lower = str2.toLowerCase();
    examples.push({
        original: "WORLD",
        lowercased: lower,
        unchanged: str2
    });

    // Example 3: Slice returns new string
    const str3 = "JavaScript";
    const sliced = str3.slice(0, 4);
    examples.push({
        original: "JavaScript",
        sliced: sliced,
        unchanged: str3
    });

    return examples;
}

console.log(demonstrateImmutability());
