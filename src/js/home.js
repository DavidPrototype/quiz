// import Swiper JS
import Swiper from 'swiper';
import {  Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';

let progresoBase =16.66666666666667;
let ultimoSlide = 5;
let calificacion=0;
let quizRespuestas = new Array();
let url = location.href;
let swiperBeneficios;

const progresoBar = document.querySelector('.progreso .progress-bar');
const mediaqueryBeneficios = window.matchMedia("(max-width:1279px)");

const initSliderBeneficios = () => {
    if (mediaqueryBeneficios.matches === true) {
        /* console.log("mo"); */
        return enableSwiperBeneficios();
    } else if (mediaqueryBeneficios.matches === false) {
        /* console.log("d"); */
        if (swiperBeneficios !== undefined ){           
            swiperBeneficios.destroy(true, true);
        } 
        return;
    }
};
const enableSwiperBeneficios = () => {
  
    swiperBeneficios = new Swiper(".swiper-beneficios", {
        modules: [Pagination],
        spaceBetween: 24,
        slidesPerView: "auto",
        direction: "horizontal",
        pagination: {
            el: ".swiper-beneficios-pagination",
        },
    });
};
mediaqueryBeneficios.addListener(initSliderBeneficios);
initSliderBeneficios();

/**QUIZ EFECTO con slide */
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
            document.getElementById('quiz-entrada').classList.add('d-none');
            document.getElementById('loader-quiz').classList.remove('d-none');
            setTimeout(()=>{
                document.getElementById('loader-quiz').classList.add('d-none');         
                let suCalifiacion = obtenerCalificacion(quizRespuestas);
                let miPerfil =obtenerPerfil(suCalifiacion);
                mostrarResultadosPerfil(miPerfil);
                // document.getElementById('resultadosQuiz-ahorrador').classList.remove('d-none');  
            }, 1500)  
            
           
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

function mostrarResultadosPerfil(perfil){
  //Ocultar todos los posibles
document.getElementById('resultadosQuiz-ahorrador').classList.add('d-none');
document.getElementById('resultadosQuiz-espontaneo').classList.add('d-none');
document.getElementById('resultadosQuiz-generoso').classList.add('d-none');
  
    if(perfil =='espontaneo'){
        document.getElementById('resultadosQuiz-ahorrador').classList.remove('d-none');
    }else if(perfil =='ahorrador'){
        document.getElementById('resultadosQuiz-espontaneo').classList.remove('d-none');
    }else{
        document.getElementById('resultadosQuiz-generoso').classList.remove('d-none');
    }


}
const linksQuizRepetir = document.querySelectorAll('.link-repTest');
linksQuizRepetir.forEach(linkrepetir =>{
    linkrepetir.addEventListener('click',(event)=>{ 
 
        regrearQuiz(event.target.dataset.perfil);
      
      });
})


function regrearQuiz(perfilActual){
    document.getElementById('resultadosQuiz-'+perfilActual).classList.add('d-none');
    swiperQuiz.slideTo(0, 300, true);
    progresoBar.style.width = progresoBase + '%';
    document.getElementById('quiz-entrada').classList.remove('d-none');
}

const facebookLinks = document.querySelectorAll('.contenedor-social-logos .facebook-img')
facebookLinks.forEach(facelink=>{
    facelink.addEventListener('click',()=>{
        console.log(url);
            window.open("https://www.facebook.com/sharer/sharer.php?u="+url);
        })
});
const linkedinLinks = document.querySelectorAll('.contenedor-social-logos .linkedin-img')
linkedinLinks.forEach(linkedinlink=>{
    linkedinlink.addEventListener('click',()=>{
        console.log(url);
            window.open("https://www.linkedin.com/shareArticle?mini=true&url="+url);
        })
});
const whatsAppLinks = document.querySelectorAll('.contenedor-social-logos .whatsapp-img')
whatsAppLinks.forEach(whatsAppLink=>{
    whatsAppLink.addEventListener('click',()=>{
        console.log(url);
            window.open("whatsapp://send?text= Conoce tu perfil de ahorro en: "+url +'index.html#quiz-title');
        })
});
//https://www.linkedin.com/shareArticle?mini=true&url=https%3A//dscreaciones.com/
