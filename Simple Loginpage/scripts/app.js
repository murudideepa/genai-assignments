const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password123";

const loginForm = document.querySelector("#login-form");
const loginPage = document.querySelector("#login-page");
const homePage = document.querySelector("#home-page");
const loginError = document.querySelector("#login-error");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    loginError.hidden = true;
    loginPage.hidden = true;
    homePage.hidden = false;
    homePage.querySelector("h1").focus();
    return;
  }

  loginError.hidden = false;
});
