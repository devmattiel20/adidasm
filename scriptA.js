const container = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0; // posicion del slide
let carouselTimer;

// Actualiza la posición y las clases visuales del carrusel principal.
function updateCarousel(){

    container.style.transform = `translateX(-${index * 100}%)`;

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

// Avanza una posición y actualiza el carrusel.
function goToNextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
}

// Inicia la rotación automática del carrusel.
function startCarouselRotation() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(goToNextSlide, 4000);
}

next.addEventListener("click", () => { //evento del boton

    goToNextSlide();
    startCarouselRotation();

});

prev.addEventListener("click", () => {

    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
    startCarouselRotation();

});

// Inicializar
updateCarousel();
const mainCarousel = document.querySelector(".carousel");
mainCarousel.addEventListener("mouseenter", () => clearInterval(carouselTimer));
mainCarousel.addEventListener("mouseleave", startCarouselRotation);
mainCarousel.addEventListener("focusin", () => clearInterval(carouselTimer));
mainCarousel.addEventListener("focusout", startCarouselRotation);
startCarouselRotation();

// ============ ANUNCIOS ============

const announcement = document.querySelector(".anuncio");
const announcementTrack = document.querySelector(".anuncio-track");
const announcementSlides = document.querySelectorAll(".anuncio-slide");
const announcementDots = document.querySelectorAll(".anuncio-dot");
let announcementIndex = 0;
let announcementTimer;

// Muestra el anuncio seleccionado y sincroniza sus indicadores.
function updateAnnouncement(nextIndex) {
    announcementIndex = nextIndex;
    announcementTrack.style.transform = `translateY(-${announcementIndex * 100}%)`;

    announcementDots.forEach((dot, index) => {
        const isActive = index === announcementIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
    });
}

// Programa el cambio automático de anuncios.
function startAnnouncementRotation() {
    clearInterval(announcementTimer);
    announcementTimer = setInterval(() => {
        updateAnnouncement((announcementIndex + 1) % announcementSlides.length);
    }, 4500);
}

if (announcement && announcementTrack && announcementSlides.length) {
    announcementDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateAnnouncement(index);
            startAnnouncementRotation();
        });
    });

    announcement.addEventListener("mouseenter", () => clearInterval(announcementTimer));
    announcement.addEventListener("mouseleave", startAnnouncementRotation);
    announcement.addEventListener("focusin", () => clearInterval(announcementTimer));
    announcement.addEventListener("focusout", startAnnouncementRotation);
    updateAnnouncement(0);
    startAnnouncementRotation();
}

// ============ CARRUSELES DE PRODUCTOS ============

// Configura los controles de un carrusel de productos.
function createProductCarousel(containerId, prevBtnId, nextBtnId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const cards = container.querySelectorAll('.card');
    let currentIndex = 0;
    const cardWidth = 180; // ancho de la tarjeta + gap
    const visibleCards = 2; // cantidad de tarjetas visibles
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    // Mueve las tarjetas según el índice actual.
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

// 1) Obtenemos los elementos del DOM que vamos a manipular.
const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutCartBtn = document.getElementById("checkout-cart");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-to-cart");
const STORAGE_KEY = "adidasm-cart";

const darkModeToggle = document.getElementById("dark-mode-toggle");
const navbarLogo = document.getElementById("navbar-logo");

// Cambia el logo para mantener el contraste con el fondo actual.
function updateNavbarLogo(isDarkMode) {
    if (!navbarLogo) return;

    navbarLogo.src = isDarkMode ? "./images/logoDark.png" : "./images/logoLight.png";
}

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('dark-mode', isDarkMode);
        }

        const infoContainer = document.querySelector('.info-container');
        if (infoContainer) {
            infoContainer.classList.toggle('dark-mode', isDarkMode);
        }

        const productos = document.querySelector('.productos');
        if (productos) {
            productos.classList.toggle('dark-mode', isDarkMode);
        }

        const cartPanel = document.getElementById('cart-panel');
        if (cartPanel) {
            cartPanel.classList.toggle('dark-mode', isDarkMode);
        }

        updateNavbarLogo(isDarkMode);

        darkModeToggle.setAttribute("aria-pressed", String(isDarkMode));
        darkModeToggle.setAttribute("aria-label", isDarkMode ? "Desactivar modo oscuro" : "Activar modo oscuro");
        darkModeToggle.querySelector("span").textContent = isDarkMode ? "☀" : "☾";
    });
}

// 2) Creamos la estructura del carrito como un array de objetos.
// Cada producto tiene nombre, precio, imagen y cantidad.
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// 3) Guardamos los cambios en localStorage para que el carrito no se pierda al recargar.
// Guarda el carrito actual en el navegador.
function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// 4) Mostramos un mensaje flotante cuando agregan un producto.
// Muestra una notificación temporal al usuario.
function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

// 5) Tomamos la info del producto desde la card que disparó el click.
// Extrae los datos del producto desde su botón de compra.
function getProductFromButton(button) {
    const card = button.closest(".card");
    const image = card?.querySelector(".foto")?.src || "";

    return {
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image
    };
}

// 6) Calculamos la cantidad total de productos y el total a pagar.
// Recalcula cantidades, total y persistencia del carrito.
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    saveCart();
}

// 7) Dibujamos cada producto dentro del panel del carrito.
// Dibuja el contenido actual del carrito y sus controles.
function renderCart() {
    cartItems.innerHTML = "";

    if (!cart.length) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-cart";
        emptyItem.textContent = "Tu carrito está vacío.";
        cartItems.appendChild(emptyItem);
        updateCartSummary();
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const subtotal = item.price * item.quantity;

        li.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} c/u</p>
                <div class="cart-item-controls">
                    <button class="qty-btn decrease" data-index="${index}" aria-label="Disminuir cantidad">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase" data-index="${index}" aria-label="Aumentar cantidad">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <strong>$${subtotal.toFixed(2)}</strong>
                <button class="remove-item" data-index="${index}">Quitar</button>
            </div>
        `;

        cartItems.appendChild(li);
    });

    // 8) Asignamos eventos a los botones de +, - y quitar.
    document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = Number(e.currentTarget.dataset.index);
            cart[index].quantity += 1;
            renderCart();
        });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = Number(e.currentTarget.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            renderCart();
        });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = Number(e.currentTarget.dataset.index);
            cart.splice(index, 1);
            renderCart();
        });
    });

    updateCartSummary();
}

// 9) Añadimos un producto al carrito o aumentamos su cantidad si ya existe.
// Añade un producto nuevo o incrementa su cantidad.
function addProductToCart(product) {
    const itemExists = cart.find((item) => item.name === product.name);

    if (itemExists) {
        itemExists.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    showToast(`${product.name} agregado al carrito`);
}

// 10) Abrimos y cerramos el panel del carrito.
openCart.addEventListener("click", () => {
    cartPanel.classList.add("active");
    overlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
});

// 11) Vaciar carrito por completo.
clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
    showToast("Carrito vacío");
});

// 12) Botón de compra: recibe la lista de productos, calcula total y limpia el carrito.
checkoutCartBtn.addEventListener("click", () => {
    if (!cart.length) {
        showToast("No hay productos en el carrito");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const resumen = cart
        .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join("\n");

    
    cart = [];
    renderCart();
    showToast("Compra realizada");
});

// 13) Evento de cada botón “Añadir”.
addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const product = getProductFromButton(e.currentTarget);
        addProductToCart(product);
    });
});

// 14) Al cargar la página, se restauran los productos guardados.
renderCart();

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
