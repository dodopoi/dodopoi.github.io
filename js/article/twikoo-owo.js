(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    let activePanel = null;
    document.addEventListener("click", function(e) {
      const owoTrigger = e.target.closest(".OwO-logo");
      if (owoTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const panel = owoTrigger.closest(".OwO").querySelector(".OwO-body");
        if (activePanel && activePanel !== panel) {
          closePanel(activePanel);
        }
        if (panel.classList.contains("active")) {
          closePanel(panel);
        } else {
          openPanel(panel);
        }
      } else if (!e.target.closest(".OwO-body")) {
        if (activePanel) {
          closePanel(activePanel);
        }
      }
    });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && activePanel) {
        closePanel(activePanel);
      }
    });
    function openPanel(panel) {
      panel.classList.add("active");
      document.body.classList.add("owo-active");
      activePanel = panel;
    }
    function closePanel(panel) {
      panel.classList.remove("active");
      document.body.classList.remove("owo-active");
      activePanel = null;
    }
  });
})();
