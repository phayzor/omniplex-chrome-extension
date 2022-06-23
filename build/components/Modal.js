export default class Modal extends HTMLElement {
    constructor() {
        super();
        this.url = 'https://help.nickelled.com';
    }
    get title() {
        return this.getAttribute("title");
    }
    set title(value) {
        this.setAttribute("title", value);
    }
    get visible() {
        return this.hasAttribute("visible");
    }
    set visible(value) {
        if (value) {
            this.setAttribute("visible", "");
        }
        else {
            this.removeAttribute("visible");
        }
    }
    connectedCallback() {
        this._render();
        this._attachEventHandlers();
    }
    static get observedAttributes() {
        return ["visible", "title"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a, _b;
        const titleAttr = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".title");
        const wrapperAttr = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".wrapper");
        if (name === "title" && titleAttr !== null && this.shadowRoot) {
            titleAttr.textContent = newValue;
        }
        if (name === "visible" && wrapperAttr !== null && this.shadowRoot) {
            if (newValue === null) {
                wrapperAttr.classList.remove("visible");
            }
            else {
                wrapperAttr.classList.add("visible");
            }
        }
    }
    _attachEventHandlers() {
        var _a, _b;
        const cancelButton = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("yes");
        cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.addEventListener('click', () => {
            var _a;
            this.dispatchEvent(new CustomEvent("yes"));
            this.style.display = "none";
            (_a = window.open(this.url, "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
        });
        const okButton = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById("no");
        okButton === null || okButton === void 0 ? void 0 : okButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent("no"));
            this.style.display = "none";
        });
    }
    _render() {
        const wrapperClass = this.visible ? "wrapper visible" : "wrapper";
        const container = document.createElement("div");
        container.innerHTML = `

        <div class='${wrapperClass}'>
          <div class='modal'>
            <span class='title'>${this.title}</span>
            <div class='content'>
              <slot></slot>
            </div>
            <div class='button-container'>
              <button id='yes' class="px-6 py-2 rounded bg-lime-400 hover:bg-lime-500 text-lime-100">Yes</button>
              <button id='no' class="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">No</button>
            </div>
          </div>
        </div>`;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(container);
    }
}
//# sourceMappingURL=Modal.js.map