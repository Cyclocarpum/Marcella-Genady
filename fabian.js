     function toggleMagnify(event) {
        event.currentTarget.classList.toggle('magnified');
    }

    function toggleText(id) {
        const textElement = document.getElementById(id);
        if (textElement.style.display === 'none' || textElement.style.display === '') {
            textElement.style.display = 'block';
        } else {
            textElement.style.display = 'none';
        }
    }
    function toggleMagnify(event) {
        event.currentTarget.classList.toggle('magnified');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const images = [
            'images/background.jpg',
            'images/background2.jpeg',
            'images/background3.jpg',
            'images/background4.jpg'
        ];
        let currentIndex = 0;
        const banner = document.querySelector('.background-banner');
    
        function changeBackground() {
            banner.classList.remove('fade-in');
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                banner.style.backgroundImage = `url(${images[currentIndex]})`;
                banner.classList.add('fade-in');
            }, 650); // Match this duration with the CSS transition duration
        }
    
        setInterval(changeBackground, 6000); // Change image every 5 seconds
        banner.style.backgroundImage = `url(${images[currentIndex]})`;
        banner.classList.add('fade-in');
    });

    function translatePage(language) {
        const elementsToTranslate = document.querySelectorAll('[data-en]');
    
        elementsToTranslate.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    function redirectWithLanguage(event) {
        event.preventDefault();
        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        window.location.href = `project1.html?lang=${selectedLanguage}`;
    }