// Function to toggle magnification on an element
function toggleMagnify(event) {
    event.currentTarget.classList.toggle('magnified');
}

// Function to show/hide text by changing opacity
function toggleText(id) {
    const textElement = document.getElementById(id);
    if (textElement.style.opacity === "0" || textElement.style.opacity === "") {
        textElement.style.opacity = "1";
        textElement.style.pointerEvents = "auto";
    } else {
        textElement.style.opacity = "0";
        textElement.style.pointerEvents = "none";
    }
}

// Background Image Slideshow
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "images/background.jpg",
        "images/background2.jpeg",
        "images/background3.jpg",
        "images/background4.jpg",
    ];
    let currentIndex = 0;
    const banner = document.querySelector(".background-banner");

    function changeBackground() {
        banner.classList.remove("fade-in");
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            banner.style.backgroundImage = `url(${images[currentIndex]})`;
            banner.classList.add("fade-in");
        }, 650); // Match transition duration
    }

    setInterval(changeBackground, 6000);
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    banner.classList.add("fade-in");

    // Language Handling (Merged both event listeners)
    const params = new URLSearchParams(window.location.search);
    let savedLanguage = params.get("lang") || localStorage.getItem("selectedLanguage") || "en";

    localStorage.setItem("selectedLanguage", savedLanguage);
    document.documentElement.lang = savedLanguage;
    translatePage(savedLanguage);

    // Update all links to carry the ?lang=XX parameter
    document.querySelectorAll("a").forEach((link) => {
        const href = new URL(link.href, window.location.href);
        href.searchParams.set("lang", savedLanguage);
        link.href = href.toString();
    });
});

// Function to translate page content
function translatePage(language) {
    document.querySelectorAll("[data-en]").forEach((element) => {
        const translation = element.getAttribute(`data-${language}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Function to change language and redirect
function changeLanguage(language) {
    localStorage.setItem("selectedLanguage", language);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("lang", language);
    window.location.href = newUrl.toString();
}