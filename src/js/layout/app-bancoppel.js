export default class AppBanCoppel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
             <section class="app">
                <div class="custom-container">
                    <div class="row">
                        <div class="col-12 col-lg-10 col-xl-12 app--mockup">
                           <div class="img--container">

                               <picture class="image">
                                   <source
                                       srcset="img/app.webp"
                                       type="image/webp"
                                   />
                                   <img                                    
                                       srcset="/img/app.jpeg"
                                       alt="magen App Bancoppel"
                                   />
                               </picture>
                              
                                <picture class="qr">
                                    <img                                     
                                        src="img/qr-image.png"
                                        width="224" height="224"
                                        alt="imagen QR"
                                    />
                                </picture>
                           </div>
                        </div>
                        <div class="col-lg-8 app--instrucciones">
                            <picture>
                                <img src="icons/idea.svg" alt="" />
                            </picture>
                            <p>
                                Pon la cámara de tu celular frente al código QR
                                para descargar la App.
                            </p>
                        </div>
                        <div class="col-12 col-lg-10 col-xl-6 app--info">
                            <h2 class="title-underline">
                                Lleva el banco a todas partes con la App
                                BanCoppel
                            </h2>
                            <p>
                                Acude a cualquier Sucursal para firmar el
                                Contrato de Servicios Digitales, antes de usar
                                la Banca Electrónica.
                            </p>
                            <a href="https://www.bancoppel.com/geolocalizacion/index.html" target="_blank"><custom-boton tipo="primario" texto="Descargar"></custom-boton></a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Define your custom element
window.customElements.define("app-bancoppel", AppBanCoppel);
