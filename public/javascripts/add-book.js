const { json } = require("sequelize/types");

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("crypt-submit").addEventListener("click", e => {
        e.preventDefault();

        const addBook = async () => {
            const result = await fetch('/books/1', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ test: 'test' }),
            });

            window.location.href('/books/1')
        }

        addBook()
    })
})
