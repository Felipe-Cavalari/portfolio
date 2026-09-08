// ============================================
// Hero network canvas — animated particle mesh
// that reacts to the mouse.
// ============================================

export function initNetCanvas(accent) {
  const canvas = document.querySelector('[data-net]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const density = 19000;
  let w = 0,
    h = 0,
    nodes = [],
    raf = null,
    visible = true;
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(26, Math.min(110, Math.round((w * h) / density)));
    nodes = new Array(n).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      r: Math.random() * 1.4 + 0.7,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const link = Math.min(190, Math.max(120, w * 0.11));
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
      const dxm = p.x - mouse.x,
        dym = p.y - mouse.y;
      const dm = Math.sqrt(dxm * dxm + dym * dym);
      let px = p.x,
        py = p.y;
      if (dm < 170) {
        const f = (1 - dm / 170) * 22;
        px += (dxm / dm) * f;
        py += (dym / dm) * f;
      }
      p._px = px;
      p._py = py;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const dx = a._px - b._px,
          dy = a._py - b._py;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > link) continue;
        const t = 1 - d / link;
        ctx.strokeStyle = 'rgba(255,255,255,' + (t * 0.11).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a._px, a._py);
        ctx.lineTo(b._px, b._py);
        ctx.stroke();
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      const near = Math.hypot(p._px - mouse.x, p._py - mouse.y) < 200;
      ctx.fillStyle = near ? accent : 'rgba(233,234,236,0.34)';
      ctx.globalAlpha = near ? 0.85 : 1;
      ctx.beginPath();
      ctx.arc(p._px, p._py, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (visible) raf = requestAnimationFrame(draw);
  };

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };
  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };

  resize();
  raf = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseout', onLeave);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    },
    { threshold: 0 }
  );
  io.observe(canvas);
}
