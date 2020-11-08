window.addEventListener("DOMContentLoaded", (e) => {
  const addButton = document.querySelector(".add-review");
  const reviewArea = document.querySelector(".textcontainer");

  let count = 0;

  addButton.addEventListener("click", (e) => {
    if (count === 0) {
      const textArea = document.createElement("textarea");
      const newButton = document.createElement("button");
      newButton.classList.add("add-review");
      newButton.setAttribute("type", "submit");
      textArea.classList.add("text-area");
      newButton.innerHTML = "Submit Review";
      reviewArea.appendChild(textArea);
      reviewArea.appendChild(newButton);
      count++;
    } else if (count >= 1) {
      return;
    }
  });

  const reviewForm = document.querySelector(".review-container");

  reviewForm.addEventListener("click", async (e) => {
    if (e.target.className === "add-review") {
      const review = document.querySelector(".text-area");
      const book = document.querySelector(".list");
      const reviewText = review.value;

      const bookId = book.id;

      const result = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewText, bookId }),
      });

      const res = await result.json();

      // console.log(res);

      if (res === true) {
        const results = await fetch(`/api/books/${bookId}`);

        const newRes = await results.json();

        const textArea = document.querySelector(".text-area");
        const newButton = document.querySelector(".add-review");

        textArea.classList.add("hidden");
        newButton.classList.add("hidden");

        count = 0;
        // const user = newRes.User;

        // console.log(newRes);

        // console.log(newRes);

        const review = newRes.book.Reviews[newRes.book.Reviews.length - 1];

        const usernameDiv = document.createElement("div");
        usernameDiv.classList.add("username");
        usernameDiv.innerHTML = newRes.user.username;
        const reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");
        reviewDiv.innerHTML = review.review;

        const textContain = document.querySelector(".textcontainer");

        textContain.appendChild(usernameDiv);
        textContain.appendChild(reviewDiv);

        console.log(textArea);
      }
    }
  });
});
