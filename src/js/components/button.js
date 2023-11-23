import "../../scss/components/button.scss";

export default class Button extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let id = this.getAttribute("data-id");
        let texto = this.getAttribute("texto");
        let tipo = this.getAttribute("tipo");
        let desabilitado = this.getAttribute("desabilitado");

        this.innerHTML = `
              <button class="btn ${tipo}" id='${id}'  ${desabilitado ? 'disabled' : ''}>${texto}</buton>`;
    }

    attributeChangesCallback(nombreAtr, viejoAtr, nuevoAtr) {}
}

window.customElements.define("custom-boton", Button);
