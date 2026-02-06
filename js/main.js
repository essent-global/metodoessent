/**
 * ESSENT - Main JavaScript
 * Funcionalidades principais do site
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Atualiza ícone do menu
            if (navMenu.classList.contains('active')) {
                mobileToggle.textContent = '✕';
            } else {
                mobileToggle.textContent = '☰';
            }
        });

        // Fecha menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        });
    }

    // ========================================
    // SCROLL TO TOP ON PAGE LOAD
    // ========================================
    window.addEventListener('load', function() {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }, 10);
    });

    // Previne restauração de scroll do navegador
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // ========================================
    // SMOOTH SCROLL PARA ÂNCORAS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora # vazio
            if (href === '#' || href === '#checkout') {
                e.preventDefault();
                
                // Para #checkout, rola até o elemento
                if (href === '#checkout') {
                    const target = document.getElementById('checkout');
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // ANIMAÇÕES AO SCROLL (Fade In)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.feature-card, .value-card, .testimonial-card, .bonus-card, .content-block'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Adiciona sombra ao header ao rolar
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // COUNTDOWN TIMER (Opcional para Urgência)
    // ========================================
    function initCountdown(elementId, hours) {
        const countdownEl = document.getElementById(elementId);
        if (!countdownEl) return;

        const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);

        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hoursLeft = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownEl.innerHTML = `${hoursLeft}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(timer);
                countdownEl.innerHTML = "EXPIRADO";
            }
        }, 1000);
    }

    // Ativa countdown se elemento existir
    // initCountdown('countdown', 24); // 24 horas

    // ========================================
    // VALIDAÇÃO DE FORMULÁRIO (se necessário)
    // ========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar lógica de validação
            // e integração com sistemas de email/CRM
            
            console.log('Formulário enviado');
        });
    });

    // ========================================
    // SCROLL PROGRESS BAR (Opcional)
    // ========================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #2f5d50, #4a9fbf);
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Ativa barra de progresso
    createScrollProgress();

    // ========================================
    // LAZY LOADING DE IMAGENS
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // ANALYTICS & TRACKING (Preparado para GTM/GA)
    // ========================================
    function trackEvent(category, action, label) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', action, {
                category: category,
                label: label
            });
        }

        console.log('Event tracked:', category, action, label);
    }

    // Rastrear cliques em CTAs
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-checkout');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            trackEvent('CTA', 'Click', btnText);
        });
    });

    // Rastrear visualização de seções importantes
    const sections = document.querySelectorAll('.product-section, .price-box, .bonus-section');
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.className;
                    trackEvent('Section View', 'Visible', sectionName);
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        sectionObserver.observe(section);
    });

    // ========================================
    // UTILITÁRIOS
    // ========================================
    
    // Detecta device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }

    // Console branding (opcional)
    console.log(
        '%cESSENT',
        'font-size: 40px; font-weight: bold; color: #2f5d50;'
    );
    console.log(
        '%cTransformando vidas através da saúde e bem-estar',
        'font-size: 14px; color: #4a5568;'
    );

})();
```

---

## 📁 **Estrutura Final Completa do Projeto**
```
/essent/
│
├── index.html                 (Home - Hero, features, valores, depoimentos)
├── ebook.html                 (Página de vendas do produto)
├── sobre.html                 (Institucional - História, missão, visão)
│
├── valores/
│   ├── saude.html            (Valor: Saúde Real)
│   ├── transparencia.html    (Valor: Transparência)
│   └── excelencia.html       (Valor: Excelência)
│
├── css/
│   └── style.css             (CSS completo e responsivo)
│
└── js/
    └── main.js               (JavaScript com todas as funcionalidades)
