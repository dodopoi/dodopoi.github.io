(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("article");
    const progress = document.getElementById("reading-progress");
    const percent = document.getElementById("percent");
    function updateReadingProgress() {
      if (!article || !progress || !percent) return;
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top;
      const articleHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = -articleTop;
      const scrollable = articleHeight - viewportHeight;
      let percentage = Math.min(100, Math.max(
        0,
        Math.round(scrolled / scrollable * 100)
      ));
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
        const context = this;
        if (now - lastExecTime >= delay) {
          func.apply(context, args);
          lastExecTime = now;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(context, args);
            lastExecTime = Date.now();
          }, delay);
        }
      };
    }
    window.addEventListener("scroll", throttle(updateReadingProgress, 100), { passive: true });
    window.addEventListener("resize", throttle(updateReadingProgress, 100), { passive: true });
    updateReadingProgress();
  });
})();
