document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. MENÚ MÓVIL (Hamburguesa)
       ========================================= */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            
            // Cambiar icono de hamburguesa a X
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================
       2. HEADER CON EFECTO AL HACER SCROLL
       ========================================= */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "15px 0";
        }
    });

    /* =========================================
       3. ANIMACIONES AL HACER SCROLL (Intersection Observer)
       ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    /* =========================================
       4. MANEJO DEL FORMULARIO DE CONTACTO
       ========================================= */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                alert('¡Gracias por contactar a SYDAMI FIBER! Un asesor se comunicará contigo en menos de 24 horas para confirmar tu cobertura.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
        });
    }

    /* =========================================
       5. RESALTADO ACTIVO DEL MENÚ AL SCROLLEAR
       ========================================= */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
