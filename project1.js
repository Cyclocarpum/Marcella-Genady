function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const secondImage = document.querySelectorAll('.image-container img')[1];
    if (secondImage) {
        const secondImagePosition = secondImage.getBoundingClientRect().top + window.scrollY;

        if (window.scrollY >= secondImagePosition) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    }
});

function translatePage(language) {
    localStorage.setItem('selectedLanguage', language);
    const elementsToTranslate = document.querySelectorAll('[data-en]');

    elementsToTranslate.forEach(element => {
        const translation = element.getAttribute(`data-${language}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");

    // If there's a language in the URL, use it and update localStorage
    if (urlLang) {
        localStorage.setItem("selectedLanguage", urlLang);
    }

    // Get the language to use (from URL if present, otherwise from localStorage, default to English)
    const savedLanguage = urlLang || localStorage.getItem("selectedLanguage") || "en";

    // Set the document language
    document.documentElement.lang = savedLanguage;

    // Apply translation
    translatePage(savedLanguage);
});
