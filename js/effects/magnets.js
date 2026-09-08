// ============================================
// Magnetic hover effect for buttons / links
// ============================================

export function initMagnets() {
  const els = Array.from(document.querySelectorAll('[data-magnet]'));
  const strength = 0.2;
  els.forEach((el) => {
    el.style.willChange = 'transform';
    const base = el.style.transition || '';
    el.style.transition = (base ? base + ', ' : '') + 'transform .35s cubic-bezier(.2,.9,.2,1)';
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = 'translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)';
    };
    const out = () => {
      el.style.transform = 'translate(0,0)';
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', out);
  });
}
