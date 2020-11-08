window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchfield");

  // const storeBooks = (result) => {
  //   const props = [];

  //   const bookIds = [];

  //   const properties = result.map((obj) => {
  //     const { id, author, title, coverArt, synopsis } = obj;

  //     props.push(author, title, coverArt, synopsis);

  //     bookIds.push(id);
  //   });

  //   const books = [bookIds, props];

  //   console.log(books);

  //   for (let i = 0; i < books.length - 1; i++) {
  //     const bookId = books[0][i];
  //     const properties = books[1];
  //     localStorage.setItem(bookId, properties);
  //   }
  // };

  searchBar.addEventListener("keyup", async (e) => {
    if (e.code === "Enter") {
      const searchTerm = searchBar.value;

      const encodedSearchTerm = encodeURIComponent(searchTerm);

      document.location.href = `/books/results?searchTerm=${encodedSearchTerm}`;
    }
  });
});
