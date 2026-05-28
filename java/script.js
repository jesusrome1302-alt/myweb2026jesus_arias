document.addEventListener('DOMContentLoaded', () => {

    // 1. Cambio de estilo del Header al hacer Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animación de "Revelar" secciones (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejamos de observar una vez que se ha revelado
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Smooth Scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajuste por el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Lógica básica para el Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulación de envío
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Enviando...";
            btn.disabled = true;
            btn.style.backgroundColor = "#10b981"; // Cambia a verde éxito

            setTimeout(() => {
                alert('¡Gracias! Tu mensaje ha sido enviado con éxito.');
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = ""; // Vuelve al original
                contactForm.reset();
            }, 1500);
        });
    }
});