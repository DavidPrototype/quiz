export default class Promociones extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let titulo = this.getAttribute("titulo");
        let subtitulo = this.getAttribute("subtitulo");
        let textButton = this.getAttribute("texto-boton");
        let linkButton = this.getAttribute("link-boton");
        let idBoton = this.getAttribute("id-boton");
        let imagen = this.getAttribute("imagen");
        let imagenWebp = this.getAttribute("imagen-webp");
        let icono = this.getAttribute("icon");
        let texto = this.getAttribute("texto-badge");

        this.innerHTML = `
         <section class="section-hero">
            <div class="custom-container">
                <div class="hero"> 
                    <div class="hero--info">
                        <h1 class="title-underline">${titulo}</h1>
                        <p>${subtitulo}</p>

                        ${
                            textButton == null
                                ? ""
                                : '<a href="' +
                                  linkButton +
                                  '"><custom-boton tipo="secundario" texto-boton="' +
                                  textButton +
                                  '" id-boton="' +
                                  idBoton +
                                  '"><custom-boton></a>'
                        }
                    </div>
                    
                    <figure class="hero--img">
                        <picture class="hero--fondo">
                            <source srcset="${imagenWebp}" type="image/webp">
                            <img
                                class="w-100"
                                src="${imagen}"
                                alt="Imagen Hero"
                            />
                        </picture>
                        
                        ${
                            icono == null
                                ? ""
                                : '<div class="hero--badge"><custom-badge icon="' +
                                  icono +
                                  '" texto-badge="' +
                                  texto +
                                  '"></custom-badge></div>'
                        }    
                    </figure>
                    
                </div>
            </div>
        </section>
            `;
    }
}

// Define your custom element
window.customElements.define("custom-hero", Promociones);

const mediaquery = window.matchMedia("(max-width:1279px)");
let swiper;

const initSlider = () => {
    if (mediaquery.matches === true) {
        /* console.log("mo"); */
        return enableSwiper();
    } else if (mediaquery.matches === false) {
        /* console.log("d"); */
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
    }
};

const enableSwiper = () => {
    swiper = new Swiper(".swiper", {
        spaceBetween: 24,
        slidesPerView: "auto",
        direction: "horizontal",
        pagination: {
            el: ".swiper-pagination",
        },
    });
};

mediaquery.addListener(initSlider);

initSlider();
