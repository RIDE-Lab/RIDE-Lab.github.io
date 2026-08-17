(() => {
  const toggle = document.querySelector('#lang-toggle');
  const localized = [...document.querySelectorAll('[data-en][data-zh]')];
  const applyLanguage = (language) => {
    const chinese = language === 'zh';
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    document.title = chinese ? 'RIDE Lab｜智能体原生系统' : 'RIDE Lab | Agent-Native Systems';
    localized.forEach((node) => { node.textContent = node.dataset[chinese ? 'zh' : 'en']; });
    toggle.setAttribute('aria-label', chinese ? 'Switch to English' : '切换到中文');
    toggle.textContent = chinese ? 'EN / 中' : '中 / EN';
    try { localStorage.setItem('ride-language', language); } catch (_) { /* optional */ }
  };
  let language = 'en';
  try { language = localStorage.getItem('ride-language') || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'); } catch (_) { /* optional */ }
  applyLanguage(language);
  toggle.addEventListener('click', () => applyLanguage(document.documentElement.lang.startsWith('zh') ? 'en' : 'zh'));
})();
