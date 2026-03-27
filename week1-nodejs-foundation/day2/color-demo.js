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

