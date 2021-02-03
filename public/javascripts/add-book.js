window.addEventListener("DOMContentLoaded", () => {
  const cryptSubmit = document.getElementById("crypt-submit");
  const crypts = document.querySelectorAll(".crypt");
  const book = document.querySelector(".list");
  const errorDiv = document.querySelector(".errors");
  const successDiv = document.querySelector(".success");

  const addBook = async () => {
    const bookId = book.attributes.id.value;
    const cryptsArray = Array.from(crypts);

    const selectedCrypt = cryptsArray.filter((crypt) => {
      return crypt.selected;
    });

    const cryptId = selectedCrypt[0].value;

    const result = await fetch(`/api/books/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cryptId, bookId }),
    });
    const res = await result.json();

    if (res === true) {
      errorDiv.innerHTML = "";
      successDiv.innerHTML = "Book added!";
    } else {
      successDiv.innerHTML = "";
      errorDiv.innerHTML = res;
    }
  };

  cryptSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addBook();
  });
});
