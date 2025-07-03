document.addEventListener('DOMContentLoaded', function () {
    let activePanel = null;

    // 打开面板
    function openPanel(panel) {
        if (!panel) return;
        panel.classList.add('active');
        document.body.classList.add('owo-active');
        activePanel = panel;
    }

    // 关闭面板
    function closePanel(panel) {
        if (!panel) return;
        panel.classList.remove('active');
        document.body.classList.remove('owo-active');
        activePanel = null;
    }

    // 监听表情按钮点击
    document.addEventListener('click', function (e) {
        const owoTrigger = e.target.closest('.OwO-logo');
        if (owoTrigger) {
            e.preventDefault();
            e.stopPropagation();
            const owoRoot = owoTrigger.closest('.OwO');
            if (!owoRoot) return;
            const panel = owoRoot.querySelector('.OwO-body');
            if (!panel) return;

            // 如果已经有打开的面板，先关闭它
            if (activePanel && activePanel !== panel) {
                closePanel(activePanel);
            }

            // 切换当前面板
            if (panel.classList.contains('active')) {
                closePanel(panel);
            } else {
                openPanel(panel);
            }
        } else if (!e.target.closest('.OwO-body')) {
            // 点击面板外部时关闭
            if (activePanel) {
                closePanel(activePanel);
            }
        }
    });

    // 监听 ESC 键关闭面板
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && activePanel) {
            closePanel(activePanel);
        }
    });
});