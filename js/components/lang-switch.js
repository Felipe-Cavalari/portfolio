// ============================================
// PT / EN language switch.
// Every translatable node carries the English
// copy in a `data-en` attribute; toggling swaps
// innerHTML and persists the choice.
// ============================================

export function initLangSwitch() {
  const nodes = Array.from(document.querySelectorAll('[data-en]')).map((el) => ({
    el,
    pt: el.innerHTML,
    en: el.getAttribute('data-en'),
  }));

  const btns = Array.from(document.querySelectorAll('[data-lang]'));
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3B82F6';

  const apply = (lang) => {
    nodes.forEach((n) => {
      n.el.innerHTML = lang === 'en' ? n.en : n.pt;
    });
    document.querySelectorAll('[data-ph-en]').forEach((el) => {
      if (el.dataset.phPt === undefined) el.dataset.phPt = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', lang === 'en' ? el.getAttribute('data-ph-en') : el.dataset.phPt);
    });
    const status = document.querySelector('[data-status]');
    if (status) status.textContent = '';
    btns.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.style.background = on ? accent : 'transparent';
      b.style.color = on ? '#F4F7FF' : '#8A8F98';
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    window.currentLang = lang;
    try {
      localStorage.setItem('cavalaridev-lang', lang);
    } catch (e) {
      /* storage unavailable */
    }
  };

  btns.forEach((b) => b.addEventListener('click', () => apply(b.dataset.lang)));

  let saved = null;
  try {
    saved = localStorage.getItem('cavalaridev-lang');
  } catch (e) {
    /* storage unavailable */
  }
  window.currentLang = 'pt';
  if (saved === 'en') apply('en');
}
