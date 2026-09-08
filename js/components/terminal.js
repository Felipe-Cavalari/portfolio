// ============================================
// Identity terminal — powerline prompt bars
// compact on narrow widths, lines type in when
// the section scrolls into view.
// ============================================

export function initTerminal() {
  const term = document.querySelector('[data-term]');
  if (!term) return;
  const lines = Array.from(term.querySelectorAll('[data-term-line]'));
  const caret = term.querySelector('[data-caret]');

  const bars = lines.filter((l) => l.classList.contains('term-promptbar'));
  const compact = () => {
    const small = term.getBoundingClientRect().width < 560;
    bars.forEach((bar) => {
      bar.style.fontSize = small ? '11px' : '';
      const ctx = bar.querySelector('[data-term-ctx]');
      const ctxSep = bar.querySelector('[data-term-ctx-sep]');
      const leadSep = bar.querySelector('[data-term-lead-sep]');
      const timeSeg = bar.querySelector('[data-term-time]');
      if (!ctx || !ctxSep || !leadSep || !timeSeg) return;
      ctx.style.display = small ? 'none' : 'flex';
      ctxSep.style.display = small ? 'none' : 'block';
      leadSep.style.setProperty(
        '--sep-bg',
        small ? timeSeg.style.getPropertyValue('--seg-bg') : leadSep.dataset.origBg
      );
    });
  };
  compact();
  window.addEventListener('resize', compact);

  lines.forEach((l) => {
    l.style.opacity = '0';
    l.style.transition = 'opacity .28s ease';
  });
  if (caret) caret.style.opacity = '0';
  const typers = new Map();
  lines.forEach((l) => {
    const t = l.querySelector('[data-type]');
    if (t) typers.set(l, t.textContent);
  });
  let ran = false;
  const run = () => {
    if (ran) return;
    ran = true;
    let delay = 120;
    lines.forEach((l) => {
      const full = typers.get(l);
      setTimeout(() => {
        l.style.opacity = '1';
        if (!full) return;
        const el = l.querySelector('[data-type]');
        el.textContent = '';
        let i = 0;
        const tick = () => {
          el.textContent = full.slice(0, ++i);
          if (i < full.length) setTimeout(tick, 26);
        };
        tick();
      }, delay);
      delay += full ? 190 + full.length * 26 : 130;
    });
    if (caret) setTimeout(() => (caret.style.opacity = '1'), delay + 120);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(term);
  setTimeout(run, 3000);
}
