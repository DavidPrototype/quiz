export default class Badge extends HTMLElement {
    constructor() {
        super();
        /* this.attachShadow({ mode: "open" }); */
    }

    connectedCallback() {
        let icono = this.getAttribute("icon");
        let texto = this.getAttribute("texto-badge");

        this.innerHTML = `
          <div class="badge">
            <img src="${icono}">
            <h6>${texto}</h6>
          </div>
        `;
        /* this.shadowRoot.innerHTML = `
          <div class="tag">
            <img src="${icono}">
            <h6>${texto}</h6>
          </div>
        `; */
    }
}

// Define your custom element
window.customElements.define("custom-badge", Badge);
