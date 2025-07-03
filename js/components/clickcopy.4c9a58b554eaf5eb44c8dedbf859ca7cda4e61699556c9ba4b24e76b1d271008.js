(()=>{document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("pre").forEach(n=>{let e=document.createElement("button");e.className="copy-button",e.type="button",e.innerHTML=`
                <div class="i-carbon-copy w-3.5 h-3.5"></div>
                <span>\u590D\u5236\u4EE3\u7801</span>
            `,e.addEventListener("click",async()=>{let i=n.querySelector("code"),s=i?i.innerText:n.innerText;if(!navigator.clipboard){e.innerHTML=`
                        <div class="i-carbon-error w-3.5 h-3.5"></div>
                        <span>\u4E0D\u652F\u6301</span>
                    `,setTimeout(()=>{e.classList.remove("copied"),e.innerHTML=`
                            <div class="i-carbon-copy w-3.5 h-3.5"></div>
                            <span>\u590D\u5236\u4EE3\u7801</span>
                        `},2e3);return}try{await navigator.clipboard.writeText(s.trim()),e.classList.add("copied"),e.innerHTML=`
                        <div class="i-carbon-checkmark w-3.5 h-3.5"></div>
                        <span>\u5DF2\u590D\u5236</span>
                    `,setTimeout(()=>{e.classList.remove("copied"),e.innerHTML=`
                            <div class="i-carbon-copy w-3.5 h-3.5"></div>
                            <span>\u590D\u5236\u4EE3\u7801</span>
                        `},2e3)}catch(r){console.error("\u590D\u5236\u5931\u8D25:",r),e.innerHTML=`
                        <div class="i-carbon-error w-3.5 h-3.5"></div>
                        <span>\u590D\u5236\u5931\u8D25</span>
                    `,setTimeout(()=>{e.classList.remove("copied"),e.innerHTML=`
                            <div class="i-carbon-copy w-3.5 h-3.5"></div>
                            <span>\u590D\u5236\u4EE3\u7801</span>
                        `},2e3)}}),n.firstChild?n.insertBefore(e,n.firstChild):n.appendChild(e)})});})();
