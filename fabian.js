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

// Scroll Animation for Experience Items
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const items = Array.from(document.querySelectorAll('.experience-item'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = items.indexOf(entry.target);
                const delay = index >= 0 ? index * 120 : 0;
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all experience items with an index-based stagger delay
    items.forEach(item => observer.observe(item));
});

// Fade-in on page load: auto-apply to main layout blocks and stagger
document.addEventListener('DOMContentLoaded', function() {
    // Auto-apply to common top-level blocks; adjust selector as needed
    const autoTargets = document.querySelectorAll('header, section, footer, .project-card, .logo-card, .experience-item, #copywriting-portfolio, .section-about');
    autoTargets.forEach(el => el.classList.add('fade-on-load'));

    const elems = document.querySelectorAll('.fade-on-load');
    elems.forEach((el, i) => {
        const delay = el.dataset.fadeDelay ? parseInt(el.dataset.fadeDelay, 10) : i * 80;
        setTimeout(() => el.classList.add('visible'), delay);
    });
});
