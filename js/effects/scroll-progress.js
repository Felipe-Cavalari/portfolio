// ============================================
// Scroll-driven progress lines: the tech-stack
// timeline fill and the process step flow.
// ============================================

export function initScrollProgress(accent) {
  const track = document.querySelector('[data-track]');
  const fill = document.querySelector('[data-track-fill]');
  const flow = document.querySelector('[data-flow]');
  const dots = Array.from(document.querySelectorAll('[data-dot]'));
  const stepDots = Array.from(document.querySelectorAll('[data-step-dot]'));
  const stepFills = Array.from(document.querySelectorAll('[data-step-fill]'));
  let raf = null;
  let maxP = 0;
  let trackFn = null;

  const lightDot = (d, on) => {
    d.style.borderColor = on ? accent : 'rgba(255,255,255,.28)';
    d.style.boxShadow = on ? '0 0 10px ' + accent + '66' : 'none';
    d.classList.toggle('process-step-dot--on', on && d.classList.contains('process-step-dot'));
    if (!d.classList.contains('process-step-dot')) {
      d.style.background = on ? accent : '#08090b';
    }
  };

  const prog = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    return Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (r.height + vh * 0.18)));
  };

  if (track && fill) {
    const setTrack = (p) => {
      const h = Math.max(0, track.getBoundingClientRect().height - 28);
      fill.style.height = (h * p).toFixed(1) + 'px';
      dots.forEach((d, i) => lightDot(d, p >= (i + 0.35) / dots.length));
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          maxP = 1;
          requestAnimationFrame(() => setTrack(1));
          io.disconnect();
        });
      },
      { threshold: 0.12 }
    );
    io.observe(track);
    trackFn = setTrack;
    setTimeout(() => {
      if (!maxP) {
        maxP = 1;
        setTrack(1);
      }
    }, 3000);
  }

  if (flow && stepFills.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          stepFills.forEach((f, i) =>
            setTimeout(() => {
              f.style.width = '100%';
              if (stepDots[i]) lightDot(stepDots[i], true);
            }, 140 + i * 190)
          );
          io.disconnect();
        });
      },
      { threshold: 0.2 }
    );
    io.observe(flow);
    setTimeout(() => {
      stepFills.forEach((f, i) =>
        setTimeout(() => {
          if (f.style.width !== '100%') {
            f.style.width = '100%';
            if (stepDots[i]) lightDot(stepDots[i], true);
          }
        }, i * 190)
      );
    }, 3000);
  }

  const onScroll = () => {
    if (raf || !trackFn) return;
    raf = requestAnimationFrame(() => {
      trackFn(Math.max(prog(track), maxP || 0));
      maxP = Math.max(prog(track), maxP || 0);
      raf = null;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
