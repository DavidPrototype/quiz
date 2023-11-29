// import Swiper JS
import Swiper from 'swiper';
import {  Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';

let progresoBase =16.66666666666667;
let ultimoSlide = 5;
let calificacion=0;
let quizRespuestas = new Array();

const progresoBar = document.querySelector('.progreso .progress-bar');



// const mediaquery = window.matchMedia("(max-width:1278px)");
// const mediaqueryBeneficios = window.matchMedia("(max-width:767px)");
// let swiperBeneficios, swiperPromos;

// const initSliderPromos = () => {
//     if (mediaquery.matches === true) {
//         /* console.log("mo"); */
//         return enableSwiperPromos();
//     } else if (mediaquery.matches === false) {
//         /* console.log("d"); */
//         if (swiperPromos !== undefined ){           
//             swiperPromos.destroy(true, true);
//         } 
//         return;
//     }
// };
// const initSliderBeneficios = () => {
//     if (mediaqueryBeneficios.matches === true) {
//         /* console.log("mo"); */
//         return enableSwiperBeneficios();
//     } else if (mediaqueryBeneficios.matches === false) {
//         /* console.log("d"); */
//         if (swiperBeneficios !== undefined ){           
//             swiperBeneficios.destroy(true, true);
//         } 
//         return;
//     }
// };

// const enableSwiperPromos = () => {
  
//     swiperPromos = new Swiper(".swiper", {
//         modules: [Pagination],
//         // spaceBetween: 24,
//         slidesPerView: "auto",
//         direction: "horizontal",
//         pagination: {
//             el: ".swiper-pagination",
//         },
//     });
// };
// const enableSwiperBeneficios = () => {
  
//     swiperBeneficios = new Swiper(".swiper-beneficios", {
//         modules: [Pagination],
//         spaceBetween: 16,
//         slidesPerView: "auto",
//         direction: "horizontal",
//         pagination: {
//             el: ".swiper-beneficios-pagination",
//         },
//     });
// };

// mediaquery.addListener(initSliderPromos);
// mediaqueryBeneficios.addListener(initSliderBeneficios);

// initSliderPromos();
// initSliderBeneficios();

   const  swiperQuiz = new Swiper(".swiper-quiz", {
        modules: [Pagination],
        spaceBetween: "92",
        slidesPerGroupSkip:'2',
        direction: "horizontal",
        allowTouchMove:false,
        pagination: {
            el: ".swiper-pagination",
            type:'fraction'
        },
       
    });

const regresaActions = document.querySelectorAll('.swiper-quiz .pregunta .link-back a');
regresaActions.forEach( regresa=>{
    regresa.addEventListener('click',()=>{        
       
        progresoBar.style.width= progresoBase + ((swiperQuiz.realIndex - 1) * progresoBase) + "%" ;
        swiperQuiz.slidePrev(300, true);
    })
})
   
  


const respuestas = document.querySelectorAll('.swiper-quiz .respuestas .respuesta');
respuestas.forEach(respuesta => {
    respuesta.addEventListener('click',()=>{
        // console.log(respuesta.dataset.puntaje);
        quizRespuestas[swiperQuiz.realIndex] = parseInt( respuesta.dataset.puntaje);
        if(swiperQuiz.realIndex == ultimoSlide){
            console.log('Es el ultimo slide: entonces cargar el loader y luego mostrar resultado');            
            let suCalifiacion = obtenerCalificacion(quizRespuestas);
            obtenerPerfil(suCalifiacion);
        }
        progresoBar.style.width= progresoBase + ((swiperQuiz.realIndex + 1) * progresoBase) + "%";      
        swiperQuiz.slideNext(300, true);
    })
});

// swiperQuiz.on('reachEnd',()=>{
//     ultimoSlide =true;
// })

//TODO: funcion para calcular perfil
const obtenerCalificacion = (respuestasQuiz)=>{
    calificacion = 0;    
    respuestasQuiz.forEach( respuesta=>{      
        calificacion += respuesta;
    })
  return calificacion;
}
//TODO: funcion para mostrar el perfil en base a la calificacion del perfil
// Si la puntuación total es menor a 5, la calificación podría ser  Ahorrador.
// Si la puntuación total está entre 5 y 9, la calificación podría ser  Espontáneo.
// Si la puntuación total es igual o mayor a 10, la calificación podría ser Generoso.
function obtenerPerfil(calificacion){
    
   let perfil ='';
    if(calificacion < 5){
        perfil='ahorrador';
    }else if( calificacion >= 5 && calificacion <=9){
        perfil='espontaneo';
    }else{
        perfil='generoso';
    }

   return perfil;
}

