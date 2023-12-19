// import Swiper JS
import Swiper from 'swiper';
import {  Pagination } from 'swiper/modules';
import Tooltip from 'bootstrap/js/src/tooltip';


import 'swiper/css';
import 'swiper/css/pagination';

let progresoBase =16.66666666666667;
let ultimoSlide = 5;
let calificacion=0;
let quizRespuestas = new Array();
let url = location.href;
let shareimg='';
let swiperBeneficios;
let titlePage = 'Conoce tu perfil de ahorro';
let tooltipLink;

//Referencias html
const metaImage = document.querySelector('#meta-image');
const metaUrl = document.querySelector('#meta-url');
const progresoBar = document.querySelector('.progreso .progress-bar');
const mediaqueryBeneficios = window.matchMedia("(max-width:1279px)");

metaUrl.setAttribute('content',url);

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
        breakpoints: {
            768: {
                centeredSlides:true
            }
        }
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
    
/**
 * Habilitar Tooltips
 */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

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
            // document.getElementById('quiz-entrada').classList.remove('show');
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
document.getElementById('resultadosQuiz-ahorrador').classList.remove('show');
document.getElementById('resultadosQuiz-espontaneo').classList.remove('show');
document.getElementById('resultadosQuiz-generoso').classList.remove('show');

document.getElementById('resultadosQuiz-ahorrador').classList.add('hide');
document.getElementById('resultadosQuiz-espontaneo').classList.add('hide');
document.getElementById('resultadosQuiz-generoso').classList.add('hide');
  
    if(perfil =='espontaneo'){
        document.getElementById('resultadosQuiz-ahorrador').classList.remove('hide');
        document.getElementById('resultadosQuiz-ahorrador').classList.add('show');
        metaImage.setAttribute('content','img/share-espontaneo.jpg');
    }else if(perfil =='ahorrador'){
        document.getElementById('resultadosQuiz-espontaneo').classList.remove('hide');
        document.getElementById('resultadosQuiz-espontaneo').classList.remove('show');
        metaImage.setAttribute('content','img/share-ahorrador.jpg');
    }else{
        document.getElementById('resultadosQuiz-generoso').classList.remove('hide');
        document.getElementById('resultadosQuiz-generoso').classList.add('show');
        metaImage.setAttribute('content','img/share-generoso.jpg');
    }


}
const linksQuizRepetir = document.querySelectorAll('.link-repTest');
linksQuizRepetir.forEach(linkrepetir =>{
    linkrepetir.addEventListener('click',(event)=>{ 
 
        regrearQuiz(event.target.dataset.perfil);
      
      });
})


function regrearQuiz(perfilActual){
    document.getElementById('resultadosQuiz-'+perfilActual).classList.remove('show');
    document.getElementById('resultadosQuiz-'+perfilActual).classList.add('hide');
    swiperQuiz.slideTo(0, 300, true);
    progresoBar.style.width = progresoBase + '%';
    document.getElementById('quiz-entrada').classList.remove('d-none');
    // document.getElementById('quiz-entrada').classList.add('show');
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
        window.open('https://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+titlePage);
        })
});
const whatsAppLinks = document.querySelectorAll('.contenedor-social-logos .whatsapp-img')
whatsAppLinks.forEach(whatsAppLink=>{
    whatsAppLink.addEventListener('click',()=>{
        console.log(url);
            window.open("whatsapp://send?text= Conoce tu perfil de ahorro en: "+url +'index.html#quiz-title');
        })
});
const quizLinks = document.querySelectorAll('.contenedor-social-logos .ancla-img')
quizLinks.forEach(quizLink=>{
    quizLink.addEventListener('click',(event)=>{ 
     
  navigator.clipboard.writeText(url).then(function() {
           
            let tooltip = new Tooltip(event.target);
            // setContent example
            tooltip.setContent({ 
                '.tooltip-inner': `                   
                <img src="icons/check-icon.svg"/>
                <p>Link copiado</p> 
               ` 
               
            })
        //    deshabilitarTooltips();
           tooltipLink.disable();
           tooltipLink.hide();

            tooltip.show();
            setTimeout(()=>{
                tooltip.disable();
                tooltip.hide();
               
            },1000)
         
        }, function() {
            console.log('Copy error')
        });
    })
    // habilitarTooltips();
});

function deshabilitarTooltips(){
    tooltipList.forEach((tip)=>{
      
        tip.hide();
    });
}
function habilitarTooltips(){
    tooltipList.forEach((tip)=>{
      
        tip.show();
    });
}

quizLinks.forEach(quizLink=>{
    quizLink.addEventListener('mouseover',(event)=>{ 
        
        tooltipLink = new Tooltip(event.target);
        // tooltipLink.setContent({ '.tooltip-inner': '<p>Link</p>' })
        tooltipLink.show();
    })
});

