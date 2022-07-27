// 1 ... n iterato 


// factory for the iterator
const myIterable = (from = 0,to = 10,step = 1) => ({
                      //generator function 
    *[Symbol.iterator]() {
        //state of closure
        for (let i = from;i < to;i+=step)
        {
            yield i; // <=> return value from interator next()
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

//fibunachi chisla 