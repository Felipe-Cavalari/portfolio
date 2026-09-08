// ============================================
// Contact form — char counter, focus states,
// validation and mailto handoff (no backend).
// ============================================

export function initContactForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;
  const ta = form.querySelector('[data-msg]');
  const count = form.querySelector('[data-count]');
  const status = form.querySelector('[data-status]');
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3B82F6';
  const en = () => window.currentLang === 'en';

  const upd = () => {
    const n = ta.value.length;
    count.textContent = n + ' / 1000';
    count.style.color = n > 900 ? accent : '#4E535A';
  };
  ta.addEventListener('input', upd);
  upd();

  const val = (n) => {
    const el = form.querySelector('[name="' + n + '"]');
    return el ? el.value.trim() : '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = val('nome'),
      email = val('email');
    if (!nome || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      status.style.color = '#E0A2A2';
      status.textContent = en() ? 'Please fill in your name and a valid email.' : 'Preencha nome e um e-mail válido.';
      return;
    }
    const body = 'Nome: ' + nome + '\nEmail: ' + email + '\nTelefone: ' + val('telefone') + '\n\n' + val('mensagem');
    status.style.color = accent;
    status.textContent = en() ? 'Opening your email client…' : 'Abrindo seu cliente de e-mail…';
    window.location.href =
      'mailto:contato@felipecavalari.com.br?subject=' +
      encodeURIComponent((en() ? 'Contact via site — ' : 'Contato via site — ') + nome) +
      '&body=' +
      encodeURIComponent(body);
  });
}
