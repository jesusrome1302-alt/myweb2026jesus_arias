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

    // 5. Efecto de partículas / Nebulosa en el cursor
    document.addEventListener('mousemove', (e) => {
        // Limitamos la creación de partículas para rendimiento
        if (Math.random() > 0.25) return;

        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4; // Tamaño entre 4px y 12px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posicionamiento centrado en el cursor (fixed para seguir el viewport)
        particle.style.left = `${e.clientX - size / 2}px`;
        particle.style.top = `${e.clientY - size / 2}px`;

        // Colores aleatorios con temática espacial/naranja
        const colors = ['#ff6b00', '#ffffff', '#2563eb', '#ffb700', '#00d2ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;

        // Dirección de dispersión aleatoria
        const destX = (Math.random() - 0.5) * 80;
        const destY = (Math.random() - 0.5) * 80;
        particle.style.setProperty('--x', `${destX}px`);
        particle.style.setProperty('--y', `${destY}px`);

        // Remover del DOM al finalizar la animación
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    });
});
