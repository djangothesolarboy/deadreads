const { body } = require("express-validator");

window.addEventListener("DOMContentLoaded", (e) => {
  const body = document.getElementsByTagName("body");
  const booksContainer = document.querySelector(".books-container");
  const booksTitle = document.createElement("div");
  booksTitle.classList.add("nested-books-container");
  const storageLength = localStorage.length;

  booksContainer.appendChild(BooksTitle);

  booksTitle.appendChild(body);

  // for each book in local storage create a div
  document.createElement("div").classList.add("books");
});
