// 1. Check if a number is within a range between 10 and 20.
function isNumberInRange(num) {
    return num >= 10 && num <= 20;
}
console.log('Number between 10 and 20:', isNumberInRange(15)); 
console.log('Number between 10 and 20:', isNumberInRange(20)); 
console.log('Number between 10 and 20:', isNumberInRange(5)); 

// 1. Check if a number is within a given range (e.g., Between 10 and 20).
function withinRange(num, min, max) {   
    return num >= min && num <= max; 
}
console.log(withinRange(15, 10, 20));
console.log(withinRange(20, 10, 20));
console.log(withinRange(5, 10, 20));
console.log(withinRange(90, 101, 12));

// 2. Check if a string starts with a specific character.
function startsWith(str, char) {
    return str.startsWith(char);
}
console.log(startsWith('hello', 'h')); // true
console.log(startsWith('world', 'w')); // true
console.log(startsWith('world', 'h')); // false


// 3. Count the number of words in a string.
function wordCount(str) {
    return str.split(' ').length;
}
console.log(wordCount('Hello world')); // 2
console.log(wordCount('This is a test')); // 4


// 4. Find the length of a string.
function getLength(str) {
    return str.length;
}
console.log(getLength('hello')); // 5
console.log(getLength('world')); // 5


// // 5. Convert a string to uppercase.
// function toUpperCase(str) {
//     return str.toUpperCase();
// }

// // Example usage:
// console.log(toUpperCase('hello')); // HELLO
// console.log(toUpperCase('world')); // WORLD


// // 6. Convert a string to lowercase.
// function toLowerCase(str) {
//     return str.toLowerCase();
// }

// // Example usage:
// console.log(toLowerCase('HELLO')); // hello
// console.log(toLowerCase('WORLD')); // world
