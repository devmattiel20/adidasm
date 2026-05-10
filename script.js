const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");


hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
});