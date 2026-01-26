// ============================================
// Skills Data for Marquee
// ============================================
const allSkills = [
  { name: "HTML", icon: "/assets/svg/skills/HTML5.svg" },
  { name: "CSS", icon: "/assets/svg/skills/CSS.svg" },
  { name: "JavaScript", icon: "/assets/svg/skills/js.svg" },
  { name: "Tailwind", icon: "/assets/svg/skills/tailwind.svg" },
  { name: "React", icon: "/assets/svg/skills/react.svg" },
  { name: "Next.js", icon: "/assets/svg/skills/nextjs.svg" },
  { name: "Python", icon: "/assets/svg/skills/python.svg" },
  { name: "Node.js", icon: "/assets/svg/skills/nodejs.svg" },
  { name: "Express", icon: "/assets/svg/skills/expressjs.svg" },
  { name: "Fastify", icon: "/assets/svg/skills/fastify.svg" },
  { name: "NestJS", icon: "/assets/svg/skills/nestjs.svg" },
  { name: "Swift", icon: "/assets/svg/skills/swift.svg" },
  { name: "OpenAI", icon: "/assets/svg/skills/openAi.svg" },
  { name: "Ollama", icon: "/assets/svg/skills/ollama.svg" },
  { name: "Figma", icon: "/assets/svg/skills/figma.svg" },
  { name: "Photoshop", icon: "/assets/svg/skills/photoshop.svg" },
];

// ============================================
// Initialize Skills Marquee
// ============================================
function initMarquee() {
  const marquee1 = document.getElementById('marquee-1');
  const marquee2 = document.getElementById('marquee-2');
  
  if (!marquee1 || !marquee2) return;
  
  // Split skills into two rows
  const row1Skills = allSkills.slice(0, 8);
  const row2Skills = allSkills.slice(8).concat(allSkills.slice(0, 8 - (allSkills.length - 8)));
  
  // Create skill items (duplicate for seamless loop)
  const createSkillItems = (skills) => {
    return skills.map(skill => `
      <div class="skill-item">
        <img src="${skill.icon}" alt="${skill.name}" onerror="this.style.display='none'">
        <span>${skill.name}</span>
      </div>
    `).join('');
  };
  
  // Duplicate items for seamless infinite scroll
  const row1HTML = createSkillItems(row1Skills);
  const row2HTML = createSkillItems(row2Skills);
  
  marquee1.innerHTML = row1HTML + row1HTML;
  marquee2.innerHTML = row2HTML + row2HTML;
}

// ============================================
// Typewriter Effect
// ============================================
const typewriterTexts = [
  "Software Developer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
  if (!typewriterElement) return;
  
  const currentText = typewriterTexts[textIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
    typeSpeed = 500; // Pause before new word
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#web-navbar a');
  
  // Add scrolled class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Update active link based on scroll position
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  
  sections.forEach((section) => observer.observe(section));
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });
}

function closeMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (toggle) toggle.classList.remove('active');
  if (menu) menu.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  fadeElements.forEach((el) => observer.observe(el));
}

// ============================================
// Mouse Spotlight Effect
// ============================================
function initSpotlight() {
  const spotlight = document.querySelector('.blur-spotlight');
  
  if (!spotlight) return;
  
  document.addEventListener('mousemove', (e) => {
    spotlight.style.top = `${e.clientY}px`;
    spotlight.style.left = `${e.clientX}px`;
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// GSAP Animations
// ============================================
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Hero entrance animation
  gsap.from('.hero-image', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
  });
  
  gsap.from('.hero-badge', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.4
  });
  
  gsap.from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.5
  });
  
  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.7
  });
  
  gsap.from('.hero-description', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.8
  });
  
  gsap.from('.hero-social a', {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.9
  });
  
  gsap.from('.hero-cta a', {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 1
  });
  
  // Scroll indicator animation
  gsap.to('.scroll-indicator', {
    y: 10,
    duration: 1,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMarquee();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initSpotlight();
  initSmoothScroll();
  initGSAPAnimations();
  
  // Start typewriter after a short delay
  setTimeout(typeWriter, 1000);
});
