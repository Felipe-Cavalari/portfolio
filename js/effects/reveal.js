// ============================================
// Scroll reveal — fade-up on [data-reveal],
// word-by-word reveal on [data-words]
// ============================================

export function initReveals() {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  const dist = 18;
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(' + dist + 'px)';
    el.style.transition = 'opacity .9s cubic-bezier(.22,.8,.2,1), transform 1s cubic-bezier(.22,.8,.2,1)';
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sibs = Array.from(e.target.parentElement.querySelectorAll(':scope > [data-reveal]'));
        const i = Math.max(0, sibs.indexOf(e.target));
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, Math.min(i * 80, 400));
        io.unobserve(e.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
  setTimeout(() => {
    els.forEach((el) => {
      if (el.style.opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 3200);
}

export function initWords() {
  const blocks = Array.from(document.querySelectorAll('[data-words]'));
  blocks.forEach((block) => {
    const words = (block.textContent || '').trim().split(/\s+/);
    block.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'top';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = w;
      inner.style.transform = 'translateY(105%)';
      inner.style.opacity = '0';
      inner.style.transition = 'transform .95s cubic-bezier(.2,.85,.15,1) ' + i * 45 + 'ms, opacity .7s ease ' + i * 45 + 'ms';
      outer.appendChild(inner);
      block.appendChild(outer);
      if (i < words.length - 1) block.appendChild(document.createTextNode(' '));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          block.querySelectorAll('span > span').forEach((s) => {
            s.style.transform = 'translateY(0)';
            s.style.opacity = '1';
          });
          io.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(block);
    setTimeout(() => {
      block.querySelectorAll('span > span').forEach((s) => {
        s.style.transform = 'translateY(0)';
        s.style.opacity = '1';
      });
    }, 3200);
  });
}
