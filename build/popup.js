import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import Modal from "../build/components/Modal.js";
const btn = document.getElementById("button");
const passwordEl = document.getElementById("password-el");
const formEl = document.getElementById("form-el");
const nameEl = document.getElementById("name-el");
const loggedInContainer = document.getElementById("logged-container");
const introEl = document.getElementById("intro-el");
const logBtn = document.getElementById("logout-btn");
loggedInContainer.style.display = "none";
const modal = document.querySelector("x-modal");
modal.style.display = "none";
window.customElements.define("x-modal", Modal);
let timeOutId;
btn.addEventListener("click", onLogin);
function onLogin(event) {
    event.preventDefault();
    if (passwordEl.value === "Password") {
        let user = {
            name: nameEl.value,
            password: passwordEl.value
        };
        localStorage.setItem("user", JSON.stringify(user));
        formEl.style.display = "none";
        loggedInContainer.style.display = "flex";
        introEl.textContent = `Hi ${user.name}!`;
        logBtn.addEventListener("click", () => {
            localStorage.clear();
            modal.style.display = "none";
            modal.visible = false;
            loggedInContainer.style.display = "none";
            formEl.style.display = "block";
        });
        setup();
    }
    else {
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
function startTimer() {
    timeOutId = window.setTimeout(goInactive, 5000);
}
function resetTimer() {
    window.clearTimeout(timeOutId);
    startTimer();
}
function goInactive() {
    console.log("modal fired");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = `Are you lost ${nameEl.value}?`;
    modal.style.display = "flex";
    modal.visible = true;
}
//# sourceMappingURL=popup.js.map