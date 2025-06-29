(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach((block) => {
      const button = document.createElement("button");
      button.className = "copy-button";
      button.innerHTML = `
            <div class="i-carbon-copy w-3.5 h-3.5"></div>
            <span>\u590D\u5236\u4EE3\u7801</span>
        `;
      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.innerText || block.innerText;
        try {
          await navigator.clipboard.writeText(code.trim());
          button.classList.add("copied");
          button.innerHTML = `
                    <div class="i-carbon-checkmark w-3.5 h-3.5"></div>
                    <span>\u5DF2\u590D\u5236</span>
                `;
          setTimeout(() => {
            button.classList.remove("copied");
            button.innerHTML = `
                        <div class="i-carbon-copy w-3.5 h-3.5"></div>
                        <span>\u590D\u5236\u4EE3\u7801</span>
                    `;
          }, 2e3);
        } catch (err) {
          console.error("\u590D\u5236\u5931\u8D25:", err);
          button.innerHTML = `
                    <div class="i-carbon-error w-3.5 h-3.5"></div>
                    <span>\u590D\u5236\u5931\u8D25</span>
                `;
        }
      });
      block.appendChild(button);
    });
  });
})();
