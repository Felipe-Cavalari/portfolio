// ============================================
// Expertise radial graph — hover highlights the
// edge to the hub, animated pulses travel along
// each edge, and the whole graph draws itself in
// once it scrolls into view.
// ============================================

export function initGraph(accent) {
  const graph = document.querySelector('[data-graph]');
  if (!graph) return;
  const svg = graph.querySelector('[data-graph-svg]');
  const paths = Array.from(svg.querySelectorAll('[data-path]'));
  const nodes = Array.from(graph.querySelectorAll('[data-node]'));
  const base = 'rgba(255,255,255,.18)';

  nodes.forEach((n) => {
    const edge = paths.find((p) => p.dataset.edge === n.dataset.edge);
    if (!edge) return;
    const on = () => {
      edge.setAttribute('stroke', accent);
      edge.setAttribute('stroke-width', '1.6');
    };
    const off = () => {
      edge.setAttribute('stroke', base);
      edge.setAttribute('stroke-width', '1');
    };
    n.addEventListener('mouseenter', on);
    n.addEventListener('mouseleave', off);
  });

  const dash = 26;
  const cycle = 3400;
  const phases = { trunk: 0, 0: 0.02, 1: 0.1, 2: 0.18, 3: 0.5, 4: 0.58, 5: 0.66, 6: 0.74 };
  const pulses = paths.map((p) => {
    const c = p.cloneNode(false);
    c.removeAttribute('data-path');
    c.setAttribute('stroke', accent);
    c.setAttribute('stroke-width', '1.8');
    c.setAttribute('stroke-linecap', 'round');
    c.style.filter = 'drop-shadow(0 0 7px ' + accent + ')';
    c.style.opacity = '0';
    svg.appendChild(c);
    return { el: c, len: p.getTotalLength(), phase: p.dataset.trunk ? phases.trunk : phases[p.dataset.edge] || 0 };
  });
  let praf = null,
    running = false,
    pulsesReady = false;
  const step = (ts) => {
    if (svg.style.display !== 'none') {
      pulses.forEach((pu) => {
        const t = (ts / cycle + pu.phase) % 1;
        const travel = t * (pu.len + dash);
        pu.el.style.strokeDasharray = dash + ' ' + (pu.len + dash);
        pu.el.style.strokeDashoffset = (pu.len - travel).toFixed(1);
        pu.el.style.opacity = t < 0.03 || t > 0.97 ? '0' : '0.95';
      });
    }
    praf = requestAnimationFrame(step);
  };
  const startPulses = () => {
    if (!running) {
      running = true;
      praf = requestAnimationFrame(step);
    }
  };
  const stopPulses = () => {
    if (praf) cancelAnimationFrame(praf);
    praf = null;
    running = false;
    pulses.forEach((pu) => (pu.el.style.opacity = '0'));
  };
  const vis = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (pulsesReady) startPulses();
        } else stopPulses();
      });
    },
    { threshold: 0 }
  );
  vis.observe(graph);

  paths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.style.transition = 'stroke-dashoffset .95s cubic-bezier(.3,.85,.2,1)';
  });
  nodes.forEach((n) => {
    n.style.opacity = '0';
    n.style.transition = (n.style.transition || '') + ',opacity .7s ease';
  });
  let drawn = false;
  const drawIn = () => {
    if (drawn) return;
    drawn = true;
    paths.forEach((p, i) => {
      const d = p.dataset.trunk ? 0 : 320 + i * 85;
      setTimeout(() => (p.style.strokeDashoffset = '0'), d);
    });
    nodes.forEach((n, i) => setTimeout(() => (n.style.opacity = '1'), 260 + i * 90));
    setTimeout(() => {
      pulsesReady = true;
      startPulses();
    }, 1500);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          drawIn();
          io.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  io.observe(graph);
  setTimeout(drawIn, 3000);
}
