document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de aparición suave para las tarjetas y elementos del timeline
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.card, .timeline-item, .skills-group, .section-title');
    
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // Language Toggle functionality
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'es'; // default language

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        
        // Update button text
        langToggleBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
        
        // Update document language
        document.documentElement.lang = currentLang;

        // Update all elements with class 'i18n'
        const elementsToTranslate = document.querySelectorAll('.i18n');
        elementsToTranslate.forEach(el => {
            if (el.hasAttribute(`data-${currentLang}`)) {
                el.innerHTML = el.getAttribute(`data-${currentLang}`);
            }
        });
    });
});
