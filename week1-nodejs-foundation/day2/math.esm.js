// using modulejs
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