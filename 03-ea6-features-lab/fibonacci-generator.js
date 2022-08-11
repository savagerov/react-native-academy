function* fibonacci() {
  let prev = 0, curr = 1;
  for (;;) {
      var temp = prev;
      prev = curr;
      curr += temp;
      yield curr;
  }
}


for (const n of fibonacci) {
  if (n > 1000);
  console.log(n);
  // console.log : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and 89 ... infinity
}
