(() => {
  // <stdin>
  (function() {
    function formatNumber(n) {
      return n < 10 ? "0" + n : n;
    }
    function updateRuntime() {
      const runningTimeElement = document.getElementById("runningtime");
      if (!runningTimeElement) return;
      const startDateString = runningTimeElement.dataset.startDate;
      if (!startDateString) return;
      const startTime = new Date(startDateString);
      const currentTime = /* @__PURE__ */ new Date();
      const timeDifference = currentTime - startTime;
      if (isNaN(timeDifference) || timeDifference < 0) {
        runningTimeElement.textContent = "\u65F6\u95F4\u5F02\u5E38";
        return;
      }
      const days = Math.floor(timeDifference / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(timeDifference / (1e3 * 60 * 60) % 24);
      const minutes = Math.floor(timeDifference / (1e3 * 60) % 60);
      const seconds = Math.floor(timeDifference / 1e3 % 60);
      runningTimeElement.textContent = `${days} \u5929 ${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`;
    }
    document.addEventListener("DOMContentLoaded", () => {
      updateRuntime();
      setInterval(updateRuntime, 1e3);
    });
  })();
})();
