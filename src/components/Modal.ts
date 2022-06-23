export default class Modal extends HTMLElement {
    protected url: string = 'https://help.nickelled.com'
    
    constructor() {
      super();
    }

    get title(): string {
        return this.getAttribute("title") as string
    }

    set title(value) {
        this.setAttribute("title", value)
    }

    get visible() : boolean {
        return this.hasAttribute("visible");
      }
    
    set visible(value) {
        if (value) {
          this.setAttribute("visible", "");
        } else {
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

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {    
        const titleAttr = this.shadowRoot?.querySelector(".title") as HTMLElement
        const wrapperAttr= this.shadowRoot?.querySelector(".wrapper") as HTMLElement
        if (name === "title" && titleAttr !== null && this.shadowRoot) {      
             titleAttr.textContent = newValue;    
        }    
        if (name === "visible" && wrapperAttr !== null && this.shadowRoot) {      
            if (newValue === null) {        
                wrapperAttr.classList.remove("visible");      
            } else {        
                wrapperAttr.classList.add("visible");      
            }    
        }  
    }

    _attachEventHandlers() {  
        const cancelButton = this.shadowRoot?.getElementById("yes");  
        cancelButton?.addEventListener('click', () => {    
            this.dispatchEvent(new CustomEvent("yes"))
            this.style.display = "none"
            window.open(this.url, "_blank")?.focus()
        });  
        const okButton = this.shadowRoot?.getElementById("no");  
        okButton?.addEventListener('click', () => {    
            this.dispatchEvent(new CustomEvent("no"))    
            this.style.display = "none"
        });}
  
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

//   <style>
//   .wrapper {
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: gray;
//     opacity: 0;
//     visibility: hidden;
//     transform: scale(1.1);
//     transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
//     z-index: 1;
//   }
//   .visible {
//     opacity: 1;
//     visibility: visible;
//     transform: scale(1);
//     transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
//   }
//   .modal {
//     font-family: Helvetica;
//     font-size: 14px;
//     padding: 10px 10px 5px 10px;
//     background-color: #fff;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%,-50%);
//     border-radius: 2px;
//     min-width: 300px;
//   }
//   .title {
//     font-size: 18px;
//   }
//   .button-container {
//     text-align: right;
//   }
//   button {
//     min-width: 80px;
//     background-color: #848e97;
//     border-color: #848e97;
//     border-style: solid;
//     border-radius: 2px;
//     padding: 3px;
//     color:white;
//     cursor: pointer;
//   }
//   button:hover {
//     background-color: #6c757d;
//     border-color: #6c757d;
//   }
// </style>