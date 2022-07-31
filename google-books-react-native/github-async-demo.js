const getBookElement = function (book) {
  const bookElem = document.createElement("div");
  if (book.volumeInfo.subtitle === undefined) {
    book.volumeInfo.subtitle = " ";
  }
  bookElem.innerHTML = `
    <h1 id="londonEye">${book.volumeInfo.title}</h1>
    <img class="image" src="${
      book.volumeInfo.imageLinks.thumbnail
    }" width="352" height="182">
    <figcaption>${book.volumeInfo.authors}</figcaption>
    <p>${(book.volumeInfo.description === undefined) ? "No description" : book.volumeInfo.description.slice(0, 500)}</p>
    `;
  return bookElem;
};
// console.log(`?x=${encodeURIComponent("test?")}`);

function submitEvent(event) {
  event.preventDefault();
  console.log(event);
  const input = document.querySelector("input");
  console.log(input.value);
  const search = encodeURIComponent(input.value);
  input.value = "";
  init(search);
}

const form = document.querySelector(".navContainer");
form.addEventListener("submit", submitEvent);

async function init(input = "java") {
  // try {
    const search = input;
    const resultsElem = document.getElementById("results");
    const usersResp = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );
    const users = await usersResp.json();
    console.log(users);
    resultsElem.innerHTML = "";
    users.items.forEach((book) => {
      resultsElem.appendChild(getBookElement(book));
    });
  // } catch (err) {
  //   console.log("Error", err);
  // } finally {
  //   console.log("Demo finished");

// }
}

init();
