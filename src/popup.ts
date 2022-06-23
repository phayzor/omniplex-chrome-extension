import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
//@ts-ignore
import Modal from "../build/components/Modal.js";


const btn = document.getElementById("button") as HTMLElement;
const passwordEl = document.getElementById("password-el") as HTMLInputElement;
const formEl = document.getElementById("form-el") as HTMLFormElement;
const nameEl = document.getElementById("name-el") as HTMLInputElement;
const loggedInContainer = document.getElementById("logged-container") as HTMLElement;
const introEl = document.getElementById("intro-el") as HTMLElement;
const logBtn = document.getElementById("logout-btn") as HTMLButtonElement;
loggedInContainer.style.display = "none"
const modal = document.querySelector("x-modal") as Modal
modal.style.display = "none"

type User = {
    name: string,
    password: string
}



window.customElements.define("x-modal", Modal);

let timeOutId: number;

btn.addEventListener("click", onLogin);

function onLogin(event: any): void {
    event.preventDefault()
  if (passwordEl.value === "Password") {
    let user: User = {
        name: nameEl.value,
        password: passwordEl.value
    }
    localStorage.setItem("user", JSON.stringify(user))
    formEl.style.display = "none"
    loggedInContainer.style.display = "flex"
    introEl.textContent = `Hi ${user.name}!`
    logBtn.addEventListener("click", () => {
        localStorage.clear()
        modal.style.display = "none"
        modal.visible = false
        loggedInContainer.style.display = "none"
        formEl.style.display = "block"
    })
    setup();
  } else {
    console.log(passwordEl.value);
  }
}

function setup() {
  document.addEventListener("mousemove", resetTimer, false);
  document.addEventListener("mousedown", resetTimer, false);
  document.addEventListener("keypress", resetTimer, false);
  document.addEventListener("DOMMouseScroll", resetTimer, false);
  document.addEventListener("mousewheel", resetTimer, false);
  document.addEventListener("touchmove", resetTimer, false);
  document.addEventListener("MSPointerMove", resetTimer, false);

  startTimer();
}

export function startTimer() {
  timeOutId = window.setTimeout(goInactive, 5000);
}

function resetTimer() {
  window.clearTimeout(timeOutId);
  startTimer();
}

export function goInactive(): void {
  console.log("modal fired")
  const modalText = document.getElementById("modal-text") as HTMLElement
  modalText.textContent = `Are you lost ${nameEl.value}?`
  modal.style.display = "flex"
  modal.visible = true;
}