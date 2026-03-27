// commonjs module
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