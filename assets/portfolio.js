(() => {
  const container = document.querySelector('[data-project-portfolio]');
  if (!container) return;

  const source = container.dataset.source;
  const status = container.querySelector('[data-project-status]');

  const render = (projects) => {
    container.replaceChildren();
    projects.forEach((project, index) => {
      const card = document.createElement('a');
      card.className = `project-card${project.tone === 'negative' ? ' negative' : ''}`;
      card.href = project.url;

      const code = document.createElement('span');
      code.textContent = `${String(index + 1).padStart(2, '0')} / ${project.code}`;

      const name = document.createElement('h3');
      name.textContent = project.name;

      const summary = document.createElement('p');
      summary.dataset.en = project.summary_en;
      summary.dataset.zh = project.summary_zh;

      const footer = document.createElement('footer');
      const owner = document.createElement('small');
      owner.textContent = project.owner;
      const state = document.createElement('em');
      state.dataset.en = `${project.status_en} ↗`;
      state.dataset.zh = `${project.status_zh} ↗`;
      footer.append(owner, state);

      card.append(code, name, summary, footer);
      container.append(card);
    });

    if (typeof window.rideApplyLanguage === 'function') {
      window.rideApplyLanguage(document.documentElement.lang.startsWith('zh') ? 'zh' : 'en');
    }
  };

  fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error('portfolio unavailable');
      return response.json();
    })
    .then((payload) => render(payload.projects))
    .catch(() => {
      status.dataset.en = 'The portfolio is temporarily unavailable.';
      status.dataset.zh = '课题组合暂时无法加载。';
      if (typeof window.rideApplyLanguage === 'function') {
        window.rideApplyLanguage(document.documentElement.lang.startsWith('zh') ? 'zh' : 'en');
      }
    });
})();
