const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) ?? []; // ! array of books
console.log(myLibrary);

// ! Book Object !
class Book {
  constructor(title = "", author = "", pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// ? adds a book to the library ?
let addBookToLibrary = (book) => {
  myLibrary.push(book);
};

// ? removes a book from the library ?
let removeBookFromLibrary = (book) => {
  myLibrary.splice(myLibrary.indexOf(book), 1);
};

// ** Default books **

// let percyJackson = new Book(
//   "Percy Jackson and the Lightning Thief",
//   "Rick Riordan",
//   377,
//   true
// );

// let harryPotter = new Book(
//   "Harry Potter and The Philospher's Stone",
//   "J.K. Rowling",
//   223,
//   true
// );

// let warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1225, false);

// addBookToLibrary(harryPotter);
// addBookToLibrary(percyJackson);
// addBookToLibrary(warAndPeace);

// ! The following code is for the UI !

const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");

let createDOMElement = (x) => {
  return document.createElement(x);
};

// ** Card Creation Function **

const createCard = (book) => {
  const title = createDOMElement("p");
  const author = createDOMElement("p");
  const pages = createDOMElement("p");
  const read = createDOMElement("button");
  const remove = createDOMElement("button");
  const trash = createDOMElement("i"); // trash icon
  const card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("id", book.title);
  card.append(title, author, pages, read, remove);
  container.appendChild(card);

  title.innerText = book.title;
  title.classList.add("title");

  author.innerText = book.author;
  author.classList.add("author");

  pages.innerText = `${book.pages} pages`;

  read.innerText = `${book.read === true ? "Read" : "Not Read"}`;
  book.read
    ? read.classList.add("green") && read.classList.remove("red")
    : read.classList.add("red") && read.classList.remove("green");

  trash.classList.add("fa-regular", "fa-trash-can");
  remove.appendChild(trash);
  remove.classList.add("remove");

  remove.addEventListener("click", () => {
    removeBookFromLibrary(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    card.remove();
  });

  read.addEventListener("click", () => {
    if (book.read) {
      book.read = false;
      read.innerText = "Not Read";
      read.classList.add("red");
      read.classList.remove("green");
    } else {
      book.read = true;
      read.innerText = "Read";
      read.classList.add("green");
      read.classList.remove("red");
    }
  });
};

// ? Defaults ?

myLibrary.forEach((book) => {
  createCard(book);
});

// ! Form Variables !
const formContainer = document.querySelector(".form-container");
const form = formContainer.firstElementChild;
const submit = form.querySelector(".green");
const cancel = form.querySelector(".red");
const title = form.querySelector("#title");
const author = form.querySelector("#author");
const pages = form.querySelector("#pages");
const read = form.querySelector("#read");

// ? Add Book Button ?
console.log(cancel);
addBook.addEventListener("click", () => {
  formContainer.classList.remove("inactive");
});

// ? Submit Button ?
submit.addEventListener("click", () => {
  let userBook = new Book();
  userBook.title = title.value;
  userBook.author = author.value;
  userBook.pages = parseInt(pages.value);
  userBook.read = read.checked;

  addBookToLibrary(userBook);
  createCard(userBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  title.value = null;
  author.value = null;
  pages.value = null;
  read.checked = false;

  formContainer.classList.add("inactive");
});

// ? Cancel Button ?
cancel.addEventListener("click", () => {
  formContainer.classList.add("inactive");
});
