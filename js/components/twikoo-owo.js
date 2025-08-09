document.addEventListener('DOMContentLoaded', () => {
    let activePanel = null;

    const openPanel = panel => {
        if (!panel) return;
        panel.classList.add('active');
        document.body.classList.add('owo-active');
        activePanel = panel;
    };

    const closePanel = panel => {
        if (!panel) return;
        panel.classList.remove('active');
        document.body.classList.remove('owo-active');
        activePanel = null;
    };

    document.addEventListener('click', e => {
        const owoTrigger = e.target.closest('.OwO-logo');
        if (owoTrigger) {
            e.preventDefault();
            e.stopPropagation();
            const owoRoot = owoTrigger.closest('.OwO');
            if (!owoRoot) return;
            const panel = owoRoot.querySelector('.OwO-body');
            if (!panel) return;

            if (activePanel && activePanel !== panel) closePanel(activePanel);

            panel.classList.contains('active') ? closePanel(panel) : openPanel(panel);
        } else if (activePanel && !e.target.closest('.OwO-body')) {
            closePanel(activePanel);
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && activePanel) {
            closePanel(activePanel);
        }
    });
});