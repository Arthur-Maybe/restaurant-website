let currentPage = 'home';

// --- INITIALIZATION & PARTICLES ---
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}
createParticles();

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';
    }
    if (cursorOutline) {
        cursorOutline.style.left = posX + 'px';
        cursorOutline.style.top = posY + 'px';
    }

    // Mouse move parallax effect on floating text
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    document.querySelectorAll('.floating-text').forEach((text, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        text.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .menu-item, .gallery-item, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        if (cursorOutline) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
        }
    });
});

// Add 3D tilt effect to menu items and gallery items
document.querySelectorAll('.menu-item, .gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});

// --- PAGE NAVIGATION & ANIMATIONS ---

// Page navigation with advanced transitions
function showPage(pageName) {
    const allPages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(pageName);
    const transition = document.getElementById('pageTransition');

    // Show transition overlay
    if (transition) transition.classList.add('active');

    // Fade out current page
    allPages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            page.style.transform = 'scale(0.95)';
            setTimeout(() => {
                page.classList.remove('active');
            }, 400);
        }
    });

    // Fade in new page
    setTimeout(() => {
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'scale(1)';
            currentPage = pageName;
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Remove transition overlay
            setTimeout(() => {
                if (transition) transition.classList.remove('active');
            }, 300);

            // Trigger animations based on page
            setTimeout(() => {
                if (pageName === 'menu') {
                    animateSignatureMenu();
                } else if (pageName === 'full-menu') {
                    animateFullMenu();
                } else if (pageName === 'gallery') {
                    animateGallery();
                } else if (pageName === 'home') {
                    animateHomeSignatureMenu();
                    setTimeout(() => animateHomeGallery(), 300);
                }
            }, 100);
        }
    }, 500);
}

// Helper to remove animation classes
function resetAnimations(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.remove('pop-in', 'zoom-in', 'slide-in-left', 'slide-in-right');
    });
}

// Animate signature menu items
function animateSignatureMenu() {
    resetAnimations('#signatureMenu .menu-item');
    const menuItems = document.querySelectorAll('#signatureMenu .menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9) rotateX(20deg)';
        setTimeout(() => {
            item.classList.add('pop-in');
        }, index * 150);
    });
}

// Animate home page signature menu
function animateHomeSignatureMenu() {
    resetAnimations('#homeSignatureMenu .menu-item');
    const menuItems = document.querySelectorAll('#homeSignatureMenu .menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9) rotateX(20deg)';
        setTimeout(() => {
            item.classList.add('pop-in');
        }, index * 150);
    });
}

// Animate home page gallery
function animateHomeGallery() {
    resetAnimations('#homeGalleryGrid .gallery-item');
    const galleryItems = document.querySelectorAll('#homeGalleryGrid .gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) rotate(-10deg) rotateY(20deg)';
        setTimeout(() => {
            item.classList.add('zoom-in');
        }, index * 150);
    });
}

// Animate full menu categories
function animateFullMenu() {
    resetAnimations('.menu-category');
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach((category, index) => {
        category.style.opacity = '0';
        const direction = category.getAttribute('data-direction');
        category.style.transform = direction === 'left' ? 'translateX(-100px)' : 'translateX(100px)';

        setTimeout(() => {
            if (direction === 'left') {
                category.classList.add('slide-in-left');
            } else {
                category.classList.add('slide-in-right');
            }
        }, index * 250);
    });
}

// Animate gallery items
function animateGallery() {
    resetAnimations('#galleryGrid .gallery-item');
    const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) rotate(-10deg) rotateY(20deg)';
        setTimeout(() => {
            item.classList.add('zoom-in');
        }, index * 150);
    });
}

// --- SCROLL EFFECTS & OBSERVERS ---

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const currentScroll = window.pageYOffset;

    // Navbar background
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Scroll progress bar
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    // Show/hide scroll indicator
    if (scrollIndicator) {
        if (currentPage === 'home' && currentScroll < 100) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }

    // NOTE: Image parallax removed in previous fix.

    // Parallax effect on hero (REMOVING THIS SECTION NOW)
    /*
    const hero = document.querySelector('.hero');
    if (currentPage === 'home' && hero) {
        hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
    } else if (hero) {
        // Reset transform on other pages to prevent layout shift
        hero.style.transform = `translateY(0px)`;
    }
    */

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('menu-item')) {
                entry.target.classList.add('pop-in');
            } else if (entry.target.classList.contains('gallery-item')) {
                entry.target.classList.add('zoom-in');
            } else if (entry.target.classList.contains('menu-category')) {
                const direction = entry.target.getAttribute('data-direction');
                if (direction === 'left') {
                    entry.target.classList.add('slide-in-left');
                } else {
                    entry.target.classList.add('slide-in-right');
                }
            } else if (entry.target.parentNode.classList.contains('about')) {
                 // For about section elements
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item, .gallery-item, .menu-category').forEach(el => {
        observer.observe(el);
    });
    
    // Observe about section elements for scroll-in fade
    document.querySelectorAll('#home .about-content, #home .about-image').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// --- FORM SUBMISSION & CONFETTI ---

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#d4af37', '#f4e5c3', '#fff'][Math.floor(Math.random() * 3)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10001';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;
        const xMovement = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(100vh) translateX(${xMovement}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Enhanced form submission
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    const originalText = btn.textContent;
    const form = e.target;

    // Disable form
    form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);

    // Button animation (Processing)
    btn.textContent = 'PROCESSING...';
    btn.style.transform = 'scale(0.95)';

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 1.5s ease-out';
    btn.appendChild(ripple);

    // Simulate server response
    setTimeout(() => {
        // Confirmation state
        btn.textContent = '✓ CONFIRMED';
        btn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
        btn.style.transform = 'scale(1.05)';
        
        // Confetti effect
        createConfetti();
        
        // Final cleanup
        setTimeout(() => {
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            form.reset();
            form.querySelectorAll('input, select, button').forEach(el => el.disabled = false);
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, #d4af37, #f4e5c3)'; // Reset color
            btn.style.transform = 'scale(1)';
            if (ripple.parentNode) ripple.remove();
        }, 2000);
    }, 1500);
}

// --- MOBILE MENU & EASTER EGG ---

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Use classList.toggle for simple state management and rely on CSS media queries
    navLinks.classList.toggle('open');
    mobileMenu.classList.toggle('active');

    // Manually setting styles for a slick mobile menu animation (as defined in your fragments)
    if (navLinks.classList.contains('open')) {
        // Set opening styles
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.right = '5%';
        navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.borderRadius = '15px';
        navLinks.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
        navLinks.style.border = '1px solid rgba(212, 175, 55, 0.3)';
    } else {
        // Set closing styles
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300); // Delay hiding until after CSS transition
    }
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 You found the secret! Enjoy 10% off your next visit!');
        }, 3000);
    }
});

// --- INITIAL LOAD & MISC ---

// Typing effect for hero subtitle
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, 1000);
    }

    // Initialize first page animations on load
    showPage('home'); // This also triggers initial animations
    
    // Check scroll position on load to hide indicator/show navbar background
    window.dispatchEvent(new Event('scroll'));
});

// Prevent default hash link behavior
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});