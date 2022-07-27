function* fibonacci() {
  let [prev, curr] = [0, 1];
  yield prev;
  yield curr;
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

let i = 0;
for (const n of fibonacci()) {
  if (n > i++);
  console.log(n);
  // console.log : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and 89 ... 
}
