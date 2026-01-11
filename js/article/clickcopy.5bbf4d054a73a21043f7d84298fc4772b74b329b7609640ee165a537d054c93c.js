(()=>{document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("pre").forEach(n=>{let e=document.createElement("button");e.className="copy-button",e.innerHTML=`
            <div class="i-carbon-copy w-3.5 h-3.5"></div>
            <span>\u590D\u5236\u4EE3\u7801</span>
        `,e.addEventListener("click",async()=>{let a=n.querySelector("code")?.innerText||n.innerText;try{await navigator.clipboard.writeText(a.trim()),e.classList.add("copied"),e.innerHTML=`
                    <div class="i-carbon-checkmark w-3.5 h-3.5"></div>
                    <span>\u5DF2\u590D\u5236</span>
                `,setTimeout(()=>{e.classList.remove("copied"),e.innerHTML=`
                        <div class="i-carbon-copy w-3.5 h-3.5"></div>
                        <span>\u590D\u5236\u4EE3\u7801</span>
                    `},2e3)}catch(c){console.error("\u590D\u5236\u5931\u8D25:",c),e.innerHTML=`
                    <div class="i-carbon-error w-3.5 h-3.5"></div>
                    <span>\u590D\u5236\u5931\u8D25</span>
                `}}),n.appendChild(e)})});})();
