class PagefindUI {
    constructor(opts = {}) {
        this.element = typeof opts.element === 'string' ? document.querySelector(opts.element) : opts.element;
        this.translations = opts.translations || {};
        this.debounceTimeoutMs = opts.debounceTimeoutMs || 300;
        this._buildUI();
        this._loadIndex();
    }

    _buildUI() {
        if (!this.element) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'pagefind-ui';
        wrapper.innerHTML = `
            <input class="pagefind-ui__search-input" placeholder="${this.translations.placeholder||'Search...'}" />
            <div class="pagefind-ui__results"></div>
        `;
        this.element.appendChild(wrapper);
        this.input = wrapper.querySelector('.pagefind-ui__search-input');
        this.results = wrapper.querySelector('.pagefind-ui__results');
        this.input.addEventListener('input', () => this._onInput());
    }

    async _loadIndex() {
        try {
            const res = await fetch('/pagefind/index.json');
            if (!res.ok) { console.error('search: failed to load index', res.status); return; }
            this.index = await res.json();
            // init fuse
            if (window.Fuse) {
                this.fuse = new Fuse(this.index, { keys: ['title','content'], includeMatches: false });
            }
        } catch (e) {
            console.error('search index load error', e);
        }
    }

    _onInput() {
        clearTimeout(this._debounce);
        this._debounce = setTimeout(() => this._doSearch(this.input.value), this.debounceTimeoutMs);
    }

    _doSearch(q) {
        if (!q) { this.results.innerHTML = ''; return; }
        let hits = [];
        if (this.fuse) {
            hits = this.fuse.search(q).slice(0,20).map(r=>r.item);
        } else if (this.index) {
            const ql = q.toLowerCase();
            hits = this.index.filter(i => (i.title+' '+i.content).toLowerCase().includes(ql)).slice(0,20);
        }
        this._renderResults(hits, q);
    }

    _escapeRegex(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    _escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    _highlight(text, q) {
        if (!q) return text;
        // split query into terms, escape regex
        const terms = q.split(/\s+/).filter(Boolean).map(t => this._escapeRegex(t));
        if (terms.length === 0) return text;
        const re = new RegExp('(' + terms.join('|') + ')', 'ig');
        return text.replace(re, '<span class="pagefind-highlight">$1</span>');
    }

    _renderResults(items, query) {
        this.results.innerHTML = '';
        if (!items.length) {
            this.results.innerHTML = `<div class="pagefind-ui__no-results">${this.translations.zero_results||'No results'}</div>`;
            return;
        }
        for (const it of items) {
            const el = document.createElement('div');
            el.className = 'pagefind-ui__result';
            const title = this._highlight(this._escapeHtml(it.title || ''), query);

            // Build a short snippet: prefer summary, otherwise a window around first match in content
            let rawExcerpt = (it.summary && String(it.summary).trim()) ? String(it.summary) : String(it.content || '');
            rawExcerpt = rawExcerpt.replace(/\s+/g, ' ').trim();
            let snippet = '';
            if ((it.summary || '').trim()) {
                snippet = rawExcerpt.slice(0, 220);
            } else {
                const ql = (query || '').toLowerCase();
                if (ql) {
                    const idx = rawExcerpt.toLowerCase().indexOf(ql);
                    if (idx !== -1) {
                        const start = Math.max(0, idx - 60);
                        const end = Math.min(rawExcerpt.length, idx + ql.length + 120);
                        snippet = (start > 0 ? '...' : '') + rawExcerpt.slice(start, end) + (end < rawExcerpt.length ? '...' : '');
                    } else {
                        snippet = rawExcerpt.slice(0, 200) + (rawExcerpt.length > 200 ? '...' : '');
                    }
                } else {
                    snippet = rawExcerpt.slice(0, 200) + (rawExcerpt.length > 200 ? '...' : '');
                }
            }

            const excerpt = this._highlight(this._escapeHtml(snippet), query);
            el.innerHTML = `<div class="pagefind-ui__title"><a href="${it.url}">${title}</a></div>
                            <div class="pagefind-ui__excerpt">${excerpt}</div>`;
            this.results.appendChild(el);
        }
    }
}

// expose globally for theme
window.PagefindUI = PagefindUI;
