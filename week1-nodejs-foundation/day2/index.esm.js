// using modulejs
import {add,multiple,divide,subtract} from './math.esm.js';
import greet from './math.esm.js';


console.log("5 + 6 =",add(5,6))
console.log("6 - 6 =", subtract(6,6))
console.log("5 * 2 =", multiple(5,2))
console.log("5 / 5 =", divide(5,5))
console.log(greet("zainab!"));
