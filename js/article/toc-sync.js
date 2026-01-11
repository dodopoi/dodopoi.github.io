document.addEventListener("DOMContentLoaded", function () {
  const toc = document.getElementById('toc-main');
  const article = document.querySelector('article.e-content') || document.querySelector('article');
  if (!toc || !article) return;

  const tocLinks = Array.from(toc.querySelectorAll('a[href^="#"]'));
  if (tocLinks.length === 0) return;

  const idToLink = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));

  // Smooth-scroll when clicking TOC links (prevent instant jump)
  tocLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--herm-toc-offset')) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - Math.max(72, offset);
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  });

  // Observe headings to keep TOC in sync
  const headingSelector = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';
  const headings = Array.from(article.querySelectorAll(headingSelector));
  if (headings.length === 0) return;

  let activeLink = null;

  const onActive = (link) => {
    if (!link) return;
    if (activeLink) activeLink.classList.remove('active');
    link.classList.add('active');
    activeLink = link;
    // scroll the toc container so the active link is centered
    const parent = toc;
    const linkTop = link.offsetTop;
    const offset = linkTop - parent.clientHeight / 2 + link.clientHeight / 2;
    parent.scrollTo({ top: offset, behavior: 'smooth' });
  };

  // Use IntersectionObserver but pick the most-seen heading
  const observer = new IntersectionObserver((entries) => {
    // find visible entries and choose the one closest to top
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length > 0) {
      const id = visible[0].target.id;
      const link = idToLink.get(id);
      if (link) onActive(link);
    }
  }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: [0, 0.1, 0.5] });

  headings.forEach(h => observer.observe(h));

  // If page loads with a hash, activate it
  if (location.hash) {
    const id = location.hash.slice(1);
    const link = idToLink.get(id);
    if (link) {
      // delay to allow layout
      setTimeout(() => onActive(link), 300);
    }
  }
});
