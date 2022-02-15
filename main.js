const myLibrary = []; // ! array of books

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

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

let harryPotter = new Book(
  "Harry Potter and The Philospher's Stone",
  "J.K. Rowling",
  223,
  false
);

let theLordOfTheRings = new Book(
  "The Lord of the Rings",
  "J.R.R. Tolkien",
  450,
  true
);

addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(theLordOfTheRings);

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
  const card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("id", book.title);
  card.append(title, author, pages, read, remove);
  container.appendChild(card);

  title.innerText = `Title: ${book.title}`;
  author.innerText = `Author: ${book.author}`;
  pages.innerText = `Pages: ${book.pages}`;

  read.innerText = `${book.read === true ? "Read" : "Not Read"}`;

  remove.innerText = "Remove";

  remove.addEventListener("click", () => {
    removeBookFromLibrary(book);
    card.remove();
  });

  read.addEventListener("click", () => {
    if (book.read) {
      book.read = false;
      read.innerText = "Not Read";
    } else {
      book.read = true;
      read.innerText = "Read";
    }
  });
};

// ? Defaults ?

myLibrary.forEach((book) => {
  createCard(book);
});

// ? Add Book Button ?

addBook.addEventListener("click", () => {
  let userBook = new Book();

  userBook.title = prompt("The title of the book");
  userBook.author = prompt("The author of the book");
  userBook.pages = parseInt(prompt("The number of pages in the book"));
  userBook.read = confirm("Have you read the book?");

  createCard(userBook);
});
