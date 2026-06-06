function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (!scrollToTopButton) return;
    // Show button after user scrolls down 300px (adjust if desired)
    const threshold = 300;
    if (window.scrollY >= threshold) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Timeline progress and markers
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.experience-section .container');
    if (!container) return;
    const line = container.querySelector('.timeline-line');
    const progress = container.querySelector('.timeline-progress');
    const items = Array.from(container.querySelectorAll('.experience-item'));

    // create dots
    const dots = items.map(() => {
        const dot = document.createElement('span');
        dot.className = 'timeline-dot';
        container.appendChild(dot);
        return dot;
    });

    function positionDots() {
        const containerRect = container.getBoundingClientRect();
        dots.forEach((dot, i) => {
            const item = items[i];
            const itemRect = item.getBoundingClientRect();
            const top = itemRect.top - containerRect.top + (itemRect.height * 0.08);
            dot.style.top = `${top}px`;
            // left set via CSS; adjust if needed
        });
        updateProgress();
    }

    function updateProgress() {
        const containerRect = container.getBoundingClientRect();
        let max = 0;
        items.forEach((item, i) => {
            const itemRect = item.getBoundingClientRect();
            // consider item visible when its top is above 75% window height
            if (itemRect.top < window.innerHeight * 0.9) {
                const center = itemRect.top - containerRect.top + (itemRect.height / 2);
                if (center > max) max = center;
                dots[i].classList.add('visible');
            } else {
                dots[i].classList.remove('visible');
            }
        });
        progress.style.height = `${Math.max(0, max)}px`;
    }

    // initial position and listeners
    positionDots();
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', positionDots);

    // observe changes in item sizes
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(positionDots);
        items.forEach(i => ro.observe(i));
    }
});