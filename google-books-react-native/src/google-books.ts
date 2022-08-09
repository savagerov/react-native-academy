import { Books } from "./books.js";
import { BlogsAPI } from "./glogs-api.js";

const DB_BASE_URL = 'http://localhost:3000/books';

export interface Book{
  id:string;
  volumeInfo: {
    subtitle: string | undefined;
    title: any;
    imageLinks: { thumbnail: any };
    authors: any;
    description: string | any[] | undefined;
  }
}

const getBookElement = function (book: Book) {
  const bookElem = document.createElement("div");
  if (book.volumeInfo.subtitle === undefined) {
    book.volumeInfo.subtitle = " ";
  }
  bookElem.innerHTML = `
    <h1 id="londonEye">${book.volumeInfo.title}</h1>
    <label class="add-fav">
      <input type="checkbox" />
      <i class="icon-heart">
        <button class="scp" id="add-${book.id}">Add to favorite</button>
        <i class="icon-plus-sign"></i>
      </i>
    </label>
    <img class="image" src="${
      book.volumeInfo.imageLinks.thumbnail
    }" width="352" height="182">
    <figcaption>${book.volumeInfo.authors}</figcaption>
    <p>${
      book.volumeInfo.description === undefined
        ? "No description"
        : book.volumeInfo.description.slice(0, 500)
    }</p>
    `;
  return bookElem;
};
// console.log(`?x=${encodeURIComponent("test?")}`);

function submitEvent(event: { preventDefault: () => void }) {
  event.preventDefault();
  console.log(event);
  const input = document.querySelector("input");
  console.log(input!.value);
  const search = encodeURIComponent(input!.value);
  input!.value = "";
  init(search);
}



const form = document.querySelector(".navContainer");
form!.addEventListener("submit", submitEvent);

async function init(input = "java") {
  // try {
  const search = input;
  const resultsElem = document.getElementById("results");
  const usersResp = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}`
  );
  const users = await usersResp.json();
  console.log(users);
  resultsElem!.innerHTML = "";
  users.items.forEach(
    (book: Book) => {
      resultsElem!.appendChild(getBookElement(book));
      const favForm = document.getElementById(`add-${book.id}`) as HTMLButtonElement;
      favForm.addEventListener('click' , () => addFavBook(book) );


    }

  )
  // } catch (err) {
  //   console.log("Error", err);
  // } finally {
  //   console.log("Demo finished");

  // }

}

async function addFavBook(book: Book) {
  console.log(book);
  const newBook = new Books(book.id,book.volumeInfo.title,"","","");
  await BlogsAPI.addNewPost(newBook);
}


init();


