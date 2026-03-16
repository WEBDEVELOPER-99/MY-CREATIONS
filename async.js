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

// function promiseFunction(resolve, reject) {
//     resolve("I will buy a Classic Hunter 350 from Royal Enfield!!!😁😀");
    // let Mypercentage = 69.38
    // if (Mypercentage >= 97) {
    //     resolve("YES!!!!, I CAN NOW GET A PS5!!!😁😀");
    // } else {
    //     reject("I think my marks were not good enough to get that PS5, but.... no worries, i'll do better next time😊.");
    // }
// }
// function handleFulfilled(result) {
//  console.log(result);
// }
//  function handleRejected(error) {
//     console.log(error);
// }
// function handleFinally() {
//     console.log("This is the end of the promise.");
// }

// let MyPromise = new Promise(promiseFunction);

// MyPromise.then((res) => console.log(res)).then((data) => console.log(data));


fetch("https://fakestoreapi.com/products")
.then((response) => response.json())
.then((data) => console.log(data));
