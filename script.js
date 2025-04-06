// Initialize everything when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link update
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const currentSection = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Initialize particles
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#0ef", "#ffffff", "#4a90e2"] },
            shape: { type: ["circle", "triangle", "edge"] },
            opacity: { value: 0.7, random: true, animation: { enable: true, speed: 1 } },
            size: { value: 5, random: true, animation: { enable: true, speed: 2 } },
            line_linked: { enable: true, distance: 150, color: "#0ef", opacity: 0.3, width: 2 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false }
        },
        interactivity: {
            detectOn: "canvas",
            events: {
                onhover: { enable: true, mode: ["grab", "bubble"] },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Initialize carousel
    const slidesData = [
        { icon: 'fab fa-html5', description: '' },
        { icon: 'fab fa-css3-alt', description: '' },
        { icon: 'fab fa-js', description: '' },
        { icon: 'fab fa-c', description: '' },
        { icon: 'fab fa-python', description: '' },
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    const createSlide = ({ icon, description }) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        const iconElement = document.createElement('i');
        iconElement.className = icon;
        const overlayElement = document.createElement('div');
        overlayElement.className = 'overlay';
        overlayElement.textContent = description;
        slideElement.append(iconElement, overlayElement);
        return slideElement;
    };

    const populateCarouselTrack = (slides) => {
        const fragment = document.createDocumentFragment();
        slides.forEach(slide => fragment.appendChild(createSlide(slide)));
        slides.forEach(slide => fragment.appendChild(createSlide(slide)));
        carouselTrack.appendChild(fragment);
    };
    populateCarouselTrack(slidesData);

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from(".hero-text", {
        opacity: 0,
        x: -500,
        duration: 1.5,
        ease: "power2.out"
    });

    gsap.from(".hero-image", {
        opacity: 0,
        x: 1000,
        duration: 1.5,
        ease: "power2.out"
    });

    // Project and education animations
    if (window.innerWidth > 768) {
        gsap.utils.toArray(".project-box,.education-item").forEach((box) => {
            gsap.from(box, {
                opacity: 0,
                x: -70,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: box,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            });
        });

        gsap.utils.toArray(".project-box2").forEach((box) => {
            gsap.from(box, {
                opacity: 0,
                x: 70,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: box,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // Initialize Typed.js after a short delay to ensure everything is loaded
    setTimeout(() => {
        if (typeof Typed !== 'undefined') {
            const typed = new Typed('.typed-text', {
                strings: [
                    'Frontend Developer',
                    'Web Designer',
                    'Travel Enthusiast',
                    'Gamer',
                    'Problem Solver',
                    'Tech Explorer',
                    'Creative Coder'
                ],
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 2000,
                startDelay: 1000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true,
                shuffle: false,
                fadeOut: false,
                fadeOutClass: 'typed-fade-out',
                fadeOutDelay: 500,
                onStringTyped: function(pos, self) {
                    const typedElement = document.querySelector('.typed-text');
                    typedElement.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        typedElement.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        } else {
            console.error('Typed.js library not loaded');
        }
    }, 1000);
});
