// ============================================
// Mouse Spotlight Effect
// ============================================

export function initSpotlight() {
  const spotlight = document.querySelector('.blur-spotlight');
  
  if (!spotlight) return;
  
  document.addEventListener('mousemove', (e) => {
    spotlight.style.top = `${e.clientY}px`;
    spotlight.style.left = `${e.clientX}px`;
  });
}
