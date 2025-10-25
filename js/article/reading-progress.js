(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const progressBall = document.getElementById("article-readprog");
    const article = document.querySelector("article");
    if (!progressBall || !article) return;
    let isTicking = false;
    const updateReadingProgress = () => {
      const articleRect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = articleRect.height - windowHeight;
      if (scrollableHeight <= 0) {
        progressBall.dataset.visible = "false";
        return;
      }
      const scrollTop = -articleRect.top;
      let progress = scrollTop / scrollableHeight * 100;
      progress = Math.min(100, Math.max(0, progress));
      progressBall.textContent = `${Math.round(progress)}%`;
      const shouldShow = progress > 5 && progress < 95;
      progressBall.dataset.visible = shouldShow.toString();
      const hue = Math.round(progress * 1.2);
      progressBall.style.setProperty("--progress-hue", hue);
    };
    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateReadingProgress();
          isTicking = false;
        });
        isTicking = true;
      }
    };
    progressBall.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateReadingProgress();
  });
})();
