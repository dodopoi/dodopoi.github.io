(() => {
  // <stdin>
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("pre").forEach((block) => {
        const button = document.createElement("button");
        button.className = "copy-button";
        button.type = "button";
        button.innerHTML = `
                <div class="i-carbon-copy w-3.5 h-3.5"></div>
                <span>\u590D\u5236\u4EE3\u7801</span>
            `;
        button.addEventListener("click", async () => {
          const codeEl = block.querySelector("code");
          const code = codeEl ? codeEl.innerText : block.innerText;
          if (!navigator.clipboard) {
            button.innerHTML = `
                        <div class="i-carbon-error w-3.5 h-3.5"></div>
                        <span>\u4E0D\u652F\u6301</span>
                    `;
            setTimeout(() => {
              button.classList.remove("copied");
              button.innerHTML = `
                            <div class="i-carbon-copy w-3.5 h-3.5"></div>
                            <span>\u590D\u5236\u4EE3\u7801</span>
                        `;
            }, 2e3);
            return;
          }
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
            setTimeout(() => {
              button.classList.remove("copied");
              button.innerHTML = `
                            <div class="i-carbon-copy w-3.5 h-3.5"></div>
                            <span>\u590D\u5236\u4EE3\u7801</span>
                        `;
            }, 2e3);
          }
        });
        if (block.firstChild) {
          block.insertBefore(button, block.firstChild);
        } else {
          block.appendChild(button);
        }
      });
    });
  })();
})();
