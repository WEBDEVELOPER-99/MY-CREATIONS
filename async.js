// function orderFroṁa () {
//     return "I will order a pair of shoes from Froṁa.";
// }

// function orderLenskart() {
// return "I will buy a pair of glasses from Lenskart.";
// }

// function orderDominos(callback) {
//     console.log("I will have a pizza and a veg meal deal.");
//     return callback(orderFroṁa);
// }

// // callback function !!!
// let result = orderDominos(orderLenskart);
// console.log(result);

// maintains the sequence

// callback - hell !!!


// Promises (future) 

// 1. pending
// 2. fulfilled
// 3. rejected

function promiseFunction(resolve, reject) {
    let Mypercentage = 69.38
    if (Mypercentage >= 97) {
        resolve("YES!!!!, I CAN NOW GET A PS5!!!😁😀");
    } else {
        reject("I think my marks were not good enough, but.... no worries, i'll do better next time😊.");
    }
}
function handleFulfilled(resolve) {
 console.log(resolve);
}
 function handleRejected(reject) {
    console.log(reject);
}


let MyPromise = new Promise(promiseFunction);

MyPromise.then(handleFulfilled, handleRejected);