(() => {
  // <stdin>
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("pre").forEach((block) => {
        const button = document.createElement("button");
        button.className = "copy-button";
        button.type = "button";
        const setButton = (icon, text, copied = false) => {
          button.innerHTML = `<div class="i-carbon-${icon} w-3.5 h-3.5"></div><span>${text}</span>`;
          button.classList.toggle("copied", copied);
        };
        setButton("copy", "\u590D\u5236\u4EE3\u7801");
        button.addEventListener("click", async () => {
          const codeEl = block.querySelector("code");
          const code = codeEl ? codeEl.innerText : block.innerText;
          if (!navigator.clipboard) {
            setButton("error", "\u4E0D\u652F\u6301");
            setTimeout(() => setButton("copy", "\u590D\u5236\u4EE3\u7801"), 2e3);
            return;
          }
          try {
            await navigator.clipboard.writeText(code.trim());
            setButton("checkmark", "\u5DF2\u590D\u5236", true);
            setTimeout(() => setButton("copy", "\u590D\u5236\u4EE3\u7801"), 2e3);
          } catch (err) {
            setButton("error", "\u590D\u5236\u5931\u8D25");
            setTimeout(() => setButton("copy", "\u590D\u5236\u4EE3\u7801"), 2e3);
          }
        });
        block.insertBefore(button, block.firstChild);
      });
    });
  })();
})();
