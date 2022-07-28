const getBookElement = function (book) {
  const bookElem = document.createElement("div");
  bookElem.innerHTML = 
    `
    <h1 id="londonEye">${book.volumeInfo.title}</h1>
    <img class="image" src="${book.volumeInfo.imageLinks.thumbnail}" width="352" height="182">
    <figcaption>${book.volumeInfo.authors}</figcaption>
    <p>${book.volumeInfo.description.slice(0,600)}...</p>
    `;
    return bookElem;
};
console.log(`?x=${encodeURIComponent('test?')}`);
  async function init() {
    try {
      const resultsElem = document.getElementById("results");
      const usersResp = await fetch("books.json");
      const users = await usersResp.json();
      console.log(users);

      users.items.forEach(book => {
        resultsElem.appendChild(
          getBookElement (book)      
        )
      });
    } catch (err) {
      console.log("Error", err);
    } finally {
      console.log("Demo finished");
    }
  }

  init();
