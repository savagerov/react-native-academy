const fibonacci = {
  [Symbol.iterator]() {
    let prev = 0, curr = 1, value;
    return {
      next() {
        [value, prev, curr] = [prev, curr, prev + curr];

        return {value};
      }
    };
  }
};
   
for (const n of fibonacci) {
  if (n > 100);
  console.log(n);
  // console.log : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and 89 ... 
}
