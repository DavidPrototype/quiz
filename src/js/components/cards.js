export default class Card extends HTMLElement {
    constructor() {
        super();
        /* this.attachShadow({ mode: "open" }); */
    }

    connectedCallback() {
        let icono = this.getAttribute("icon");
        let texto = this.getAttribute("texto-badge");
        let titulo = this.getAttribute("titulo");
        let descripcion = this.getAttribute("descripcion");
        let imagen = this.getAttribute("imagen");
        let imagenWebp = this.getAttribute("imagenWebp");
        let link = this.getAttribute("link");

        this.innerHTML = `
            <a href="${link}" class="text-decoration-none">
                <div class="card card-promo">
                    <custom-badge icon="${icono}" texto-badge="${texto}"></custom-badge>
                    <div class="card-promo__info">
                        <h5><strong>${titulo}</strong></h5>
                        <p>${descripcion}
                        </p>
                        <h6 class="link d-none"><strong>Ver más</strong></h6>
                        
                    </div>
                    <div class="card-promo__image">
                        <picture>
                            <source srcset="${imagenWebp}" type="image/webp">
                            <img src="${imagen}" alt="" />
                        </picture>
                    </div>
                </div>
            </a>
    `;
    }
}

// Define your custom element
window.customElements.define("custom-card", Card);

export class CardIcon extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let alineacion = this.getAttribute("alineacion");
        let flujo = this.getAttribute("flujo");
        let icono = this.getAttribute("icono");
        let titulo = this.getAttribute("titulo-card");
        let contenido = this.getAttribute("contenido-card");
        let linkCard = this.getAttribute("link-card");
        let textoLinkCard = this.getAttribute("texto-link");
        let target = this.getAttribute("target-link");
        this.innerHTML = `        
                <div
                    class="card card-icon ${alineacion} ${flujo}"
                >
                    <picture>
                        <img
                            class="w-100"
                            src="${icono}"
                            alt=""
                        />
                    </picture>
                    
                    ${
                        flujo == "fila"
                            ? '<div class="contenido"><h5>' + titulo + "</h5>"
                            : '<div class="contenido"><h5>' +
                              titulo +
                              "</h5>"
                    }
                   
                    ${contenido == null ? "" : contenido} 
                    
                    ${
                        textoLinkCard == null
                            ? ""
                            : target != null
                            ? '<a href="' +
                              linkCard +
                              '" target="' +
                              target +
                              '">' +
                              textoLinkCard +
                              "</a></div>"
                            : '<a href="' +
                              linkCard +
                              '">' +
                              textoLinkCard +
                              "</a></div>"
                    } 
                </div>
            `;
    }
}

// Define your custom element
window.customElements.define("custom-card-icon", CardIcon);
