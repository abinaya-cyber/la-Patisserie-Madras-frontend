/* ============================================
   LA PATISSERIE MADRAS — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initScrollAnimations();
        }, 1200);
    });

    // Fallback in case load fires before DOMContentLoaded listener
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initScrollAnimations();
        }
    }, 3000);

    // ---------- Sparkle Cursor Effect ----------
    const sparkleCanvas = document.getElementById('sparkle-canvas');
    const ctx = sparkleCanvas.getContext('2d');
    let sparkles = [];

    function resizeCanvas() {
        sparkleCanvas.width = window.innerWidth;
        sparkleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.55) {
            for (let i = 0; i < 2; i++) {
                sparkles.push({
                    x: e.clientX + (Math.random() - 0.5) * 20,
                    y: e.clientY + (Math.random() - 0.5) * 20,
                    size: Math.random() * 2.5 + 0.8,
                    speedX: (Math.random() - 0.5) * 1.5,
                    speedY: (Math.random() - 0.5) * 1.5 - 0.8,
                    opacity: 1,
                    color: ['#c9a96e', '#e8d5a8', '#d4a0a0', '#ffffff'][Math.floor(Math.random() * 4)],
                    rotation: Math.random() * Math.PI * 2
                });
            }
        }
    });

    function drawSparkle(s) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = s.color;
        const size = s.size;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.lineTo(Math.cos(angle + Math.PI / 4) * size * 0.3, Math.sin(angle + Math.PI / 4) * size * 0.3);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function animateSparkles() {
        ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
        sparkles = sparkles.filter(s => s.opacity > 0.01);
        sparkles.forEach(s => {
            s.x += s.speedX;
            s.y += s.speedY;
            s.opacity *= 0.95;
            s.rotation += 0.04;
            s.size *= 0.98;
            drawSparkle(s);
        });
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();

    // ---------- Navbar Scroll ----------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------- Mobile Nav ----------
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
        // prevent body scroll when menu is open
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Scroll-Reveal Animations ----------
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('[data-animate]').forEach(el => {
            // Skip hero title/subtitle/actions — they use their own CSS keyframe entrance
            if (!el.closest('#hero')) {
                observer.observe(el);
            } else {
                // For hero elements, reveal them immediately (CSS handles animation)
                el.classList.add('visible');
            }
        });
    }

    // ---------- Hero Particles ----------
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1.5}px;
                height: ${Math.random() * 4 + 1.5}px;
                background: radial-gradient(circle, rgba(201,169,110,0.55), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particleFade ${Math.random() * 5 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
            `;
            particlesContainer.appendChild(particle);
        }

        for (let i = 0; i < 35; i++) {
            createParticle();
        }

        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particleFade {
                0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
                50% { opacity: 0.8; transform: translateY(-28px) scale(1); }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    // ---------- Testimonials Slider ----------
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        let currentSlide = 0;
        let slidesPerView = 3;

        function updateSlidesPerView() {
            if (window.innerWidth <= 768) {
                slidesPerView = 1;
            } else if (window.innerWidth <= 1024) {
                slidesPerView = 2;
            } else {
                slidesPerView = 3;
            }
        }

        function getTotalSlides() {
            return Math.max(1, track.children.length - slidesPerView + 1);
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            const total = getTotalSlides();
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index) {
            const total = getTotalSlides();
            currentSlide = Math.max(0, Math.min(index, total - 1));
            const card = track.children[0];
            if (!card) return;
            const cardWidth = card.offsetWidth + 24;
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
            dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

        let autoSlide = setInterval(() => {
            const total = getTotalSlides();
            goToSlide(currentSlide >= total - 1 ? 0 : currentSlide + 1);
        }, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoSlide));
        track.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                const total = getTotalSlides();
                goToSlide(currentSlide >= total - 1 ? 0 : currentSlide + 1);
            }, 5000);
        });

        updateSlidesPerView();
        createDots();

        window.addEventListener('resize', () => {
            updateSlidesPerView();
            createDots();
            goToSlide(0);
        });
    }

    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span>✓ Order Received!</span>';
                btn.style.background = 'linear-gradient(135deg, #2d6a4f, #40916c)';

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ---------- Subtle Magnetic Buttons (reduced intensity) ----------
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ---------- Card 3D Tilt (reduced intensity) ----------
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -5;
            const rotateY = (x - 0.5) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---------- Subtle Parallax on Scroll ----------
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg && scrolled < window.innerHeight) {
            // very gentle parallax; CSS animation handles the base zoom
            heroImg.style.transform = `scale(${1.0 + scrolled * 0.00008}) translateY(${scrolled * 0.18}px)`;
        }
    }, { passive: true });

    // ---------- Gallery Click Effect ----------
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            item.style.zIndex = '10';
            item.style.transform = 'scale(1.04)';
            item.style.transition = 'transform 0.3s ease';

            setTimeout(() => {
                item.style.transform = '';
                item.style.zIndex = '';
            }, 500);
        });
    });

    // ---------- Lazy load images below the fold ----------
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img:not(.hero-img)').forEach(img => {
            img.loading = 'lazy';
        });
    }

});
