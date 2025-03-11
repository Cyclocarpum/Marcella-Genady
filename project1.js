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