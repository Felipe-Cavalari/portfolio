// ============================================
// 3D tilt on hover for project media
// ============================================

export function initTilt() {
  Array.from(document.querySelectorAll('[data-tilt]')).forEach((el) => {
    el.style.willChange = 'transform';
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        'perspective(900px) rotateY(' + (px * 5).toFixed(2) + 'deg) rotateX(' + (-py * 5).toFixed(2) + 'deg) scale(1.012)';
    };
    const out = () => {
      el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', out);
  });
}
