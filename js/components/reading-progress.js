(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const article = document.querySelector("article");
    const progress = document.getElementById("reading-progress");
    const percent = document.getElementById("percent");
    if (!article || !progress || !percent) return;
    let ticking = false;
    function updateReadingProgress() {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top;
      const articleHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollable = articleHeight - viewportHeight;
      let percentage = 0;
      if (scrollable > 0) {
        const scrolled = -articleTop;
        percentage = Math.round(scrolled / scrollable * 100);
        percentage = Math.min(100, Math.max(0, percentage));
      } else {
        percentage = 100;
      }
      if (rect.bottom <= viewportHeight) {
        percentage = 100;
      }
      progress.style.width = `${percentage}%`;
      percent.textContent = percentage;
      ticking = false;
    }
    function onScrollOrResize() {
      if (!ticking) {
        window.requestAnimationFrame(updateReadingProgress);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    updateReadingProgress();
  });
})();
