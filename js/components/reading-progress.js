(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("article");
    const progress = document.getElementById("reading-progress");
    const percent = document.getElementById("percent");
    if (!article || !progress || !percent) return;
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
    }
    function throttle(func, delay) {
      let timeoutId;
      let lastExecTime = 0;
      return function(...args) {
        const now = Date.now();
        if (now - lastExecTime >= delay) {
          func.apply(this, args);
          lastExecTime = now;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(this, args);
            lastExecTime = Date.now();
          }, delay);
        }
      };
    }
    const throttledUpdate = throttle(updateReadingProgress, 100);
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate, { passive: true });
    updateReadingProgress();
  });
})();
