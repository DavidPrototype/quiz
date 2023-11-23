export default class Accordion extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let title = this.getAttribute("title");
        let content = this.getAttribute("content");
        let valor = "";
        this.innerHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-button collapsed" data-bs-toggle="collapse" aria-expanded="false">
                        ${title}
                    </h2>
                    <div id="" class="accordion-collapse collapse" data-bs-parent="#accordionExample"><p>
                        ${content}
                        </p>
                    </div>
                </div>
                `;
    }

    attributeChangesCallback(nombreAtr, viejoAtr, nuevoAtr) {}

    static get observedAttributes() {
        /* return ["nombreAtr"] */
    }
}

window.customElements.define("custom-accordion", Accordion);

let array = document.querySelectorAll("custom-accordion");
for (let index = 0; index < array.length; index++) {
    array[index]
        .querySelector(".accordion-button")
        .setAttribute("data-bs-target", "#accordion-" + index);
    array[index].querySelector(".accordion-button").id = "heading-" + index;
    array[index].querySelector(".accordion-collapse").id = "accordion-" + index;
}
