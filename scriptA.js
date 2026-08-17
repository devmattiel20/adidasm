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

// ============ CARRUSELES DE PRODUCTOS ============

function createProductCarousel(containerId, prevBtnId, nextBtnId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const cards = container.querySelectorAll('.card');
    let currentIndex = 0;
    const cardWidth = 250; // ancho de la tarjeta + gap
    const visibleCards = 3; // cantidad de tarjetas visibles
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    function updateCarouselProducts() {
        const offset = -currentIndex * cardWidth;
        container.style.transform = `translateX(${offset}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselProducts();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselProducts();
        }
    });
}

// Inicializar carruseles de productos
createProductCarousel('carousel-shirts', 'prev-shirts', 'next-shirts');
createProductCarousel('carousel-shorts', 'prev-shorts', 'next-shorts');

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

// ============ MODAL DE PRODUCTOS ============

const modalOverlay = document.getElementById("modal-overlay");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");
const viewButtons = document.querySelectorAll(".viewbutton");

// Abrir modal con imagen del producto
viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Encontrar la imagen del producto en la tarjeta padre
        const card = e.target.closest(".card");
        const productImage = card.querySelector(".foto");
        
        if (productImage) {
            modalImage.src = productImage.src;
            modalOverlay.classList.add("active");
        }
    });
});

// Cerrar modal
modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
});

// Cerrar modal al hacer clic en el overlay
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
    }
});

// Cerrar modal con tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modalOverlay.classList.remove("active");
    }
});
