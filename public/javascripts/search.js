window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchfield");

  searchBar.addEventListener("keyup", async (e) => {
    if (e.code === "Enter") {
      const searchTerm = searchBar.value;

      const encodedSearchTerm = encodeURIComponent(searchTerm);

      document.location.href = `/books/results?searchTerm=${encodedSearchTerm}`;
    }
  });
});
