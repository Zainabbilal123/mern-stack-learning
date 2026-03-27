# Day 2: Modules & npm Basics

## What I Did
-  Created modules with CommonJS
- Created modules with ES Modules
- Installed and used npm packages
-  Understood package.json and node_module

### CommonJS Module (math.js)
```javascript
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiple(a,b) {
    return a*b;
}
function divide(a,b) {
    if (b === 0) {
        throw new Error("can not be divided by zero");   
    }
    return a/b;
}

module.exports = {
    add,
    subtract,
    divide,
    multiple,
}

// ### ES Module (math-esm.js)
````javascript
export function add(a,b) {
    return a+b;
}
export function subtract(a,b) {
    return a-b;
}
export function multiple(a,b) {
    return a*b;
}
export function divide(a,b) {
    if (b === 0) {
        throw new Error("can not be divided by zero");   
    }
    return a/b;
}
export default function greet(name){
    return `hello,${name}`
}

// ### Using Chalk Package
import chalk from "chalk";

console.log(chalk.blue("Blue text"));
console.log(chalk.red.bold("Bold red text"));
console.log(chalk.green.underline("Underlined green text"));
console.log(chalk.yellow.bgBlue("Yellow text on blue background"));

const name = "Node.js";
console.log(chalk.cyan(`Welcome to ${name}!`));


console.log(chalk.bgRed.white.bold(" ERROR: Something went wrong "));
// conditional style
const success = true;
if (success) {
    console.log(chalk.green("success"))
} else {
    console.log(chalk.red("failed"))
}


// ### Modules
// - Modules help organize code into reusable pieces
// - CommonJS uses `require()` and `module.exports`
// - ES Modules use `import` and `export`
// - Both are important to know




