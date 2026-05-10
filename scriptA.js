const container = document.querySelector(".carousel-container");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0; // posicion del slide

function updateCarousel(){ // hace que sea dinamico y interactivo

    container.style.transform =    // modifica CSS desde JavaScript
    `translateX(-${index * 1100}px)`; // mueve hacia la izquierda calculando la posicion * ancho del slide

}

next.addEventListener("click", () => { //evento del boton

    index++; // cada click aumenta la posicion en 1

    if(index > 2){
        index = 0;
    }

    updateCarousel();

});

prev.addEventListener("click", () => {

    index--;

    if(index < 0){
        index = 2;
    }

    updateCarousel();

}); 