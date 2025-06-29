(() => {
  // <stdin>
  (function() {
    function formatNumber(n) {
      return n < 10 ? "0" + n : n;
    }
    function runtime() {
      const runningTimeElement = document.getElementById("runningtime");
      if (!runningTimeElement) return;
      const startDateString = runningTimeElement.dataset.startDate;
      if (!startDateString) return;
      const startTime = new Date(startDateString);
      const currentTime = /* @__PURE__ */ new Date();
      const timeDifference = currentTime - startTime;
      const days = Math.floor(timeDifference / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(timeDifference / (1e3 * 60 * 60) % 24);
      const minutes = Math.floor(timeDifference / (1e3 * 60) % 60);
      const seconds = Math.floor(timeDifference / 1e3 % 60);
      const timeString = `${days} \u5929 ${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`;
      runningTimeElement.textContent = timeString;
    }
    document.addEventListener("DOMContentLoaded", () => {
      runtime();
      setInterval(runtime, 1e3);
    });
  })();
})();
