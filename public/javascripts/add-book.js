window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("crypt-submit").addEventListener("click", e => {
        e.preventDefault();


        const addBook = async () => {
            const book = document.querySelector('.list');
            const bookId = book.attributes.id.value;
            const crypts = document.querySelectorAll('.crypt');
            const cryptsArray = Array.from(crypts);

            const selectedCrypt = cryptsArray.filter((crypt) => {
                return crypt.selected
            })

            const cryptId = selectedCrypt[0].index;

            const result = await fetch(`/books/${bookId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({cryptId})
            });
        }

        addBook()
    })
})
