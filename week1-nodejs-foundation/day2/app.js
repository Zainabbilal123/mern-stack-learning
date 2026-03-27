// app.js
const userModule = require("./user-module.js")

// Add some users
userModule.adduser("Alice", 25);
userModule.adduser("Bob", 30);
userModule.adduser("Charlie", 35);

// Get all users
console.log("All Users:");
console.log(userModule.getAllUsers());

// Find a user
console.log("\nFind user with id 2:");
console.log(userModule.finduserbyid(2));

// Delete a user
console.log("\nDelete user with id 1:");
console.log(userModule.deleteuser(1));

console.log("\nRemaining Users:");
console.log(userModule.getAllUsers());