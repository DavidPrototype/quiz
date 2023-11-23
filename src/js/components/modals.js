export default class ModalSalida extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let idModal = this.getAttribute("id-modal");
        let idBtn = this.getAttribute("id-btn-salida");
        let link = this.getAttribute("link-btn-salida");

        this.innerHTML = `
             <div
                class="modal fade"
                id="${idModal}"
                tabindex="-1"
                aria-labelledby="modal-salidaLabel"
                aria-hidden="true"
                role="dialog"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-body">
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                        <h1 id="modal-salidaLabel">
                            <strong>
                                Estás a punto de salir de 
                                Inversiones BanCoppel</strong
                            >
                        </h1>
                        <p>
                         Serás redirigido al sitio enlazado. Este sitio es responsable de
                         su propio contenido y política de privacidad.
                        </p>
                        <a
                            href="${link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="${idBtn}"
                        >
                            <custom-boton
                                tipo="secundario-icon"
                                texto="Continuar"
                            ></custom-boton
                        ></a>
                    </div>
                </div>
            </div>

        `;
    }
}

// Define your custom element
window.customElements.define("modal-salida", ModalSalida);
