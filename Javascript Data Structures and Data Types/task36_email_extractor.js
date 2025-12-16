/**
 * Task 36: Regex-Based Email Extractor
 * Difficulty: Intermediate
 */

function extractEmails(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex) || [];

    // Remove duplicates and convert to lowercase
    const uniqueEmails = [...new Set(matches.map(email => email.toLowerCase()))];

    return uniqueEmails;
}

// Tests
console.log(extractEmails("Contact us at support@example.com or Sales@example.com"));
// ["support@example.com", "sales@example.com"]

console.log(extractEmails("No emails here!"));
// []

console.log(extractEmails("Email me at test@test.com or test@test.com"));
// ["test@test.com"]
