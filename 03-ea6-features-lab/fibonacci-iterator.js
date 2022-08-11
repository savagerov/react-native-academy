// const fibonacci = (number = 0) => ({
//   [Symbol.iterator](){
//     let i = number;
//     let prev = 0, curr = 1;
//     return {
//       next() {
//         i++;
//         [prev, curr] = [curr, prev + curr];
//         return {value:i};
//       }
//     }
//   }
// })
   
// for (let n of fibonacci(11)) {
//   if (n > 100); 
//   console.log(n);
//   // console.log : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and 89 ... infinity
// }

const fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (const n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 10000)
    break;
  console.log(n);
}