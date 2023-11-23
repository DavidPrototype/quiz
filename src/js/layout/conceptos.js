import Swiper from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/* VALIDACION SLIDES */

const breakpoint = window.matchMedia(
    "(min-width:768px) and (max-width:1279px)"
);
const mediaqueryMobile = window.matchMedia("(min-width:768px)");
const slides = document.querySelectorAll(".swiper-slide").length;
let mySwiper;

const breakpointChecker = function () {
    if (breakpoint.matches === false) {
        if (mediaqueryMobile.matches === false) {
            console.log("m");
            if (slides > 3) {
                console.log("3+");
                return enableSwiper();
            } else {
                console.log("0");
                document
                    .querySelector(".conceptos-container-swiper")
                    .classList.add("no-slide");
            }
        } else {
            console.log("d");
            document
                .querySelector(".swiper-conceptos .swiper-wrapper")
                .removeAttribute("style");
            document
                .querySelector(".conceptos-container-swiper")
                .classList.add("no-slide");
        }
        if (mySwiper !== undefined) mySwiper.destroy(true, true);
        // or/and do nothing
        return;
    } else if (breakpoint.matches === true) {
        console.log("t");
        document
            .querySelector(".conceptos-container-swiper")
            .classList.remove("no-slide");
        return enableSwiper();
    }
};

const enableSwiper = function () {
    mySwiper = new Swiper(".swiper-conceptos", {
        modules: [Pagination],
        spaceBetween: 12,
        slidesPerView: "auto",
        direction: "horizontal",
        centerInsufficientSlides: true,
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            768: {
                spaceBetween: 24,
            },
            1280: {
                allowTouchMove: false,
            },
        },
    });
};

breakpoint.addListener(breakpointChecker);
breakpointChecker();

const ordenSlides = () => {
    const slides = document.querySelectorAll(".swiper-slide");
    const imagenes = document.querySelectorAll(".conceptos__image");
    document
        .querySelector(".swiper-conceptos")
        .classList.add("conceptos" + slides.length);

    slides.forEach((element, index) => {
        element.id = "card" + index;
    });
    imagenes.forEach((element, index) => {
        element.id = "imagen" + index;
    });
};

ordenSlides();
