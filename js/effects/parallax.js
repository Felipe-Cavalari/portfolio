// ============================================
// Hero parallax — inner content and photo drift
// gently with the mouse.
// ============================================

export function initParallax() {
  const inner = document.querySelector('[data-hero-inner]');
  if (!inner) return;
  let tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    raf = null;
  const amp = 8;
  const figure = document.querySelector('[data-photo]');

  const loop = () => {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    inner.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
    if (figure) {
      figure.style.transform =
        'translate3d(' + (-cx * 1.6).toFixed(2) + 'px,calc(-48% + ' + (-cy * 1.6).toFixed(2) + 'px),0)';
    }
    raf = Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : null;
  };

  const onMove = (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * -amp;
    ty = (e.clientY / window.innerHeight - 0.5) * -amp;
    if (!raf) raf = requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', onMove, { passive: true });
}
