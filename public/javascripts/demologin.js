window.addEventListener("DOMContentLoaded", (e) => {
  const demobtn = document.querySelector(".demobtn");

  const demologin = async () => {
    const username = "demo";
    const password = "password";

    await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    window.location.href = "/";
  };

  demobtn.addEventListener("click", (e) => {
    // const username = document.querySelector(".username");
    // const password = document.querySelector(".password");
    // username.value = "demo";
    // password.value = "password";
    e.preventDefault();
    demologin();
  });
});
