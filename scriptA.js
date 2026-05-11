const container = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0; // posicion del slide

function updateCarousel(){ // hace que sea dinamico y interactivo

    container.style.transform =    // modifica CSS desde JavaScript
    `translateX(-${index * 1100}px)`; // mueve hacia la izquierda calculando la posicion * ancho del slide

    // Agregar efectos 3D a las slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev-slide', 'next-slide');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('prev-slide');
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add('next-slide');
        }
    });

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

// Inicializar
updateCarousel(); 