// ============================================
// GSAP Animations
// ============================================

export function initGSAPAnimations() {
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
