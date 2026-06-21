// ===========================
// VASTRA BY ANANKHA - SCRIPTS
// ===========================

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    initBackToTop();
    initScrollAnimations();
    initGalleryFilters();
    initLightbox();
    initContactForm();
    initSmoothScroll();
    initNavActiveLink();
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animationElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    animationElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== Gallery Filters =====
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-filter').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Lightbox Gallery =====
function initLightbox() {
    const lightboxButtons = document.querySelectorAll('.btn-lightbox');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (!lightboxModal) return;

    let currentIndex = 0;

    // Open lightbox
    lightboxButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(this);
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = currentIndex === 0 ? lightboxButtons.length - 1 : currentIndex - 1;
            openLightbox(lightboxButtons[currentIndex]);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = currentIndex === lightboxButtons.length - 1 ? 0 : currentIndex + 1;
            openLightbox(lightboxButtons[currentIndex]);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = currentIndex === 0 ? lightboxButtons.length - 1 : currentIndex - 1;
                openLightbox(lightboxButtons[currentIndex]);
            } else if (e.key === 'ArrowRight') {
                currentIndex = currentIndex === lightboxButtons.length - 1 ? 0 : currentIndex + 1;
                openLightbox(lightboxButtons[currentIndex]);
            }
        }
    });

    function openLightbox(button) {
        const caption = button.getAttribute('data-caption');
        document.querySelector('.lightbox-caption').textContent = caption;
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Simulate form submission
        submitForm(data);
    });
}

function validateForm(data) {
    if (!data.name || data.name.trim() === '') {
        showAlert('Please enter your name', 'error');
        return false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }

    if (!data.service || data.service === '') {
        showAlert('Please select a service', 'error');
        return false;
    }

    if (!data.message || data.message.trim() === '') {
        showAlert('Please enter your message', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    // Log form data (in production, this would be sent to a server)
    console.log('Form submitted:', data);

    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById('contactForm').reset();
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hide');
        
        setTimeout(() => {
            successMessage.classList.add('hide');
        }, 5000);
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Update Active Navigation Link =====
function initNavActiveLink() {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== Form Input Enhancement =====
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        control.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// ===== Mobile Menu Close =====
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarToggler.offsetParent !== null) { // Check if mobile menu is visible
                navbarToggler.click();
            }
        });
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Testimonial Carousel (Optional) =====
function initTestimonialCarousel() {
    const testimonialItems = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonialItems.length === 0) return;

    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
        });

        testimonialItems[index].style.display = 'block';
        setTimeout(() => {
            testimonialItems[index].style.opacity = '1';
        }, 10);
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Auto-rotate (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// ===== Service Tabs =====
function initServiceTabs() {
    const serviceButtons = document.querySelectorAll('[data-service-tab]');
    const serviceContents = document.querySelectorAll('[data-service-content]');

    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service-tab');

            // Update active button
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active content
            serviceContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0';
            });

            const activeContent = document.querySelector(`[data-service-content="${serviceType}"]`);
            if (activeContent) {
                activeContent.style.display = 'block';
                setTimeout(() => {
                    activeContent.style.opacity = '1';
                }, 10);
            }
        });
    });
}

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                    observer.unobserve(entry.target);
                }
            }
        });
    });

    statNumbers.forEach(number => observer.observe(number));
}

// Initialize counter animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCounterAnimation();
});

// ===== Accordion FAQ =====
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });

            // Toggle current answer
            answer.style.display = isOpen ? 'none' : 'block';

            // Smooth scroll to answer
            if (!isOpen) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initFAQAccordion();
});

// ===== Page Transition =====
function initPageTransition() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && link.href && !link.target && link.origin === window.location.origin) {
            const currentPage = window.location.pathname;
            const targetPage = link.pathname;

            if (currentPage !== targetPage) {
                document.body.style.opacity = '0.8';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initPageTransition();
});

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Parallax Effect (Optional) =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    const parallaxScroll = throttle(() => {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            const yOffset = scrollPercent * 50;

            if (yOffset > -50 && yOffset < 100) {
                element.style.transform = `translateY(${yOffset * 0.5}px)`;
            }
        });
    }, 30);

    window.addEventListener('scroll', parallaxScroll);
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
});

// ===== Console Log (for testing) =====
console.log('Vastra by Anankha - Premium Fashion Website Loaded Successfully! 🎉');
