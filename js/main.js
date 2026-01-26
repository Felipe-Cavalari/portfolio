// ============================================
// Main JavaScript - Portfolio Felipe Cavalari
// ============================================
// Este arquivo importa todos os módulos JS
// e inicializa os componentes.
// ============================================

// Components
import { initMarquee } from './components/marquee.js';
import { typeWriter } from './components/typewriter.js';
import { initNavbarScroll, initMobileMenu } from './components/navbar.js';

// Effects
import { initScrollReveal } from './effects/scroll-reveal.js';
import { initSpotlight } from './effects/spotlight.js';
import { initSmoothScroll } from './effects/smooth-scroll.js';
import { initGSAPAnimations } from './effects/gsap-animations.js';

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
