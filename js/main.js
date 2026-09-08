// ============================================
// Main JavaScript - Portfolio Felipe Cavalari
// ============================================
// Este arquivo importa todos os módulos JS
// e inicializa os componentes.
// ============================================

// Components
import { initNavbarScroll, initMobileMenu } from './components/navbar.js';
import { initTerminal } from './components/terminal.js';
import { initGraph } from './components/graph.js';
import { initLangSwitch } from './components/lang-switch.js';
import { initContactForm } from './components/contact-form.js';

// Effects
import { initReveals, initWords } from './effects/reveal.js';
import { initNetCanvas } from './effects/net-canvas.js';
import { initMagnets } from './effects/magnets.js';
import { initParallax } from './effects/parallax.js';
import { initTilt } from './effects/tilt.js';
import { initScrollProgress } from './effects/scroll-progress.js';

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3B82F6';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNavbarScroll();
  initMobileMenu();
  initLangSwitch();
  initTerminal();
  initGraph(accent);
  initContactForm();
  initReveals();
  initWords();

  if (!reduceMotion) {
    initNetCanvas(accent);
    initMagnets();
    initParallax();
    initScrollProgress(accent);
    initTilt();
  }
});
