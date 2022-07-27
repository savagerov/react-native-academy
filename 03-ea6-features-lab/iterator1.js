// 1 ... n iterato 


// factory for the iterator
const myIterable = (from = 0,to = 10,step = 1) => ({
    [Symbol.iterator] () {
        //state of closure
        let i = from;
        //iterator
        return {
            next() {
                i += step; 
                return {
                    value: i,
                    done: i >= to
                }
            }
        }
    }
} )
//forof
for (const e of myIterable()) {
    console.log(e);
}
for (const e of myIterable(10,100,10)) {
    console.log(e);
}