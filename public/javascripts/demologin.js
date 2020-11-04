window.addEventListener("DOMContentLoaded", (e) => {
  const demobtn = document.querySelector(".demobtn");

  // failed attempt to be fancy
  // const demologin = async () => {
  //   const username = "demo";
  //   const password = "password";

  //   try {
  //     const res = await fetch("/users/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  demobtn.addEventListener("click", (e) => {
    const username = document.querySelector(".username");
    const password = document.querySelector(".password");
    username.value = "demo";
    password.value = "password";
  });
});
