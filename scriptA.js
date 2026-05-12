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

// ============ CARRITO ============

const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-to-cart");

let cart = [];

function renderCart(){
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
}

// Abrir carrito
openCart.addEventListener("click", () => {
    cartPanel.classList.add("active");
    overlay.classList.add("active");
});

// Cerrar carrito
closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
});

// Agregar al carrito
addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const name = e.target.dataset.name;
        const price = Number(e.target.dataset.price);

        cart.push({
            name,
            price
        });

        renderCart();
    });
});
