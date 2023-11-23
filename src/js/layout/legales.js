export default class Legales extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section class="legales">
        <div class="custom-container">
          <div class="row">
             <div class="col-12 legales--imagen">
                  <picture id="img-ipab">
                    <source
                        srcset="img/ipab.webp"
                        type="image/webp"
                    />
                    <img
                        src="img/ipab.png"
                        alt="image/webp"
                    />
                </picture>
               
                  <p>Inversión Creciente y Pagaré son productos garantizados por el IPAB hasta por 400 mil UDIS. <a data-bs-toggle="modal" data-bs-target="#modal-salida-ipab" id="link-ipab">www.ipab.org.mx</a></p>
               
             </div>
             <div class="col-12 legales--info">
                
                <p>Los productos anteriores solo se encuentran disponibles para su contratación en la República Mexicana.</p>
                <p>*Para hacer uso de los servicios de Banca Electrónica, es indispensable que el cliente haya firmado el contrato de servicios digitales.</p>
                <p id="link-tyc"><a href="https://www.bancoppel.com/imagenes/1001/pdf.php?id=4836a6a5" target="_blank">Tabla de tasas y comisiones</a></p>
             </div>
          </div>
        </div>
    </section>
    <modal-salida id-modal="modal-salida-ipab" link-btn-salida="https://www.gob.mx/ipab"></modal-salida>
        `;
    }
}

// Define your custom element
window.customElements.define("custom-legales", Legales);
