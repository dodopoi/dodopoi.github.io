let fuse, indexData = [];
const modal = document.getElementById('local-search-modal');
const btn = document.getElementById('local-search-btn');
const closeBtn = document.getElementById('local-search-close');
const input = document.getElementById('local-search-input');
const results = document.getElementById('local-search-results');

function highlight(text, keyword) {
  if (!keyword) return text;
  return text.replace(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`);
}

async function loadIndex() {
  if (indexData.length) return;
  const res = await fetch('/index.json');
  indexData = await res.json();
  fuse = new Fuse(indexData, {
    keys: ['title', 'content'], // 只检索标题和正文纯文本内容
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 1,
  });
}

function renderResults(items, keyword) {
  if (!items.length) {
    results.innerHTML = '<div style="color:#888;text-align:center;">无结果</div>';
    return;
  }
  results.innerHTML = items.map(({item, matches}) => {
    let summary = item.summary || item.content.slice(0, 120) + '...';
    summary = highlight(summary, keyword);
    const title = highlight(item.title, keyword);
    return `<a href="${item.permalink}" style="display:block;padding:1rem 0;border-bottom:1px solid #eee;text-decoration:none;color:#222;">
      <div style="font-weight:600;font-size:1.1rem;">${title}</div>
      <div style="color:#666;font-size:0.95rem;margin-top:0.3rem;">${summary}</div>
    </a>`;
  }).join('');
}

btn.onclick = async () => {
  modal.style.display = 'flex';
  input.value = '';
  results.innerHTML = '';
  input.focus();
  await loadIndex();
};

closeBtn.onclick = () => modal.style.display = 'none';
modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

input.oninput = () => {
  const keyword = input.value.trim();
  if (!keyword) {
    results.innerHTML = '';
    return;
  }
  const found = fuse.search(keyword);
  renderResults(found, keyword);
};

document.addEventListener('keydown', e => {
  if (modal.style.display === 'flex' && e.key === 'Escape') modal.style.display = 'none';
});