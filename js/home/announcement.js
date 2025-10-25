(() => {
  // <stdin>
  var isAnnouncementVisible = false;
  var announcement = () => document.getElementById("home-announcement__container");
  var AUTO_CLOSE_MS = 5e3;
  var _closeTimeoutId = null;
  var clearAutoClose = () => {
    if (_closeTimeoutId) {
      clearTimeout(_closeTimeoutId);
      _closeTimeoutId = null;
    }
  };
  var showAnnouncement = () => {
    const el = announcement();
    if (el) {
      el.classList.remove("translate-x-[120%]", "opacity-0");
      isAnnouncementVisible = true;
      clearAutoClose();
      _closeTimeoutId = setTimeout(() => {
        closeAnnouncement();
      }, AUTO_CLOSE_MS);
    }
  };
  var closeAnnouncement = () => {
    const el = announcement();
    if (el) {
      el.classList.add("translate-x-[120%]", "opacity-0");
      isAnnouncementVisible = false;
      clearAutoClose();
    }
  };
  var toggleAnnouncement = () => isAnnouncementVisible ? closeAnnouncement() : showAnnouncement();
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      toggleAnnouncement();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(showAnnouncement, 2025);
    const closeBtn = document.getElementById("home-announcement__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeAnnouncement);
    }
  });
})();
