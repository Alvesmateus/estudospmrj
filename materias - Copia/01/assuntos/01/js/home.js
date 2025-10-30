// home.js — varre /subassunto/NN/js/info.js e cria cards com title, desc, color
// Além disso: carrega ./js/info.js (ou candidatos) da própria página e preenche
// <h1.class="title"> e <p.class="subtitle"> com os valores de pageInfo.
(function () {
  const container = document.getElementById('subjects');
  const searchInput = document.getElementById('qSearch');
  if (!container) {
    console.error('home.js: elemento #subjects não encontrado.');
    return;
  }

  // ============= CONFIG =============
  const baseFolder = 'subassunto'; // pasta base
  const startIndex = 1;
  const pad = (n) => String(n).padStart(2, '0');
  const maxConsecutiveMisses = 4; // para quando parar
  const maxIndex = 999; // limite de segurança
  // ==================================

  // ---------- utilitários já existentes ----------
  // tenta import() dinâmico (bom para navegadores modernos, exige servidor)
  async function tryDynamicImport(path) {
    try {
      // forçar cache-bust para desenvolvimento
      const mod = await import(path + '?t=' + Date.now());
      if (mod && mod.pageInfo) {
        return {
          title: mod.pageInfo.title,
          desc: mod.pageInfo.subtitle || mod.pageInfo.desc || mod.pageInfo.description,
          color: mod.pageInfo.color
        };
      }
    } catch (e) {
      // falhou (provavelmente CORS, file:// ou navegador sem suporte) — retorna null
    }
    return null;
  }

  // extrai o objeto pageInfo do texto do arquivo JS de forma balanceada
  function extractPageInfoObject(scriptText) {
    const marker = 'pageInfo';
    const idx = scriptText.indexOf(marker);
    if (idx === -1) return null;

    // procura o primeiro '{' após "pageInfo"
    let braceStart = scriptText.indexOf('{', idx);
    if (braceStart === -1) return null;

    // varre para achar o '}' correspondente (conteúdo balanceado)
    let i = braceStart;
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let escaped = false;
    for (; i < scriptText.length; i++) {
      const ch = scriptText[i];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === stringChar) {
          inString = false;
          stringChar = '';
        }
        continue;
      }

      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
        continue;
      }

      if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0) {
          // retorno do trecho incluindo as chaves
          return scriptText.slice(braceStart, i + 1);
        }
      }
    }
    return null;
  }

  // Avalia apenas o literal de objeto (de forma isolada) e retorna o objeto JS
  function evalObjectLiteral(objText) {
    try {
      // cria uma função que retorna o objeto; assim não polui escopo global
      const fn = new Function('return ' + objText + ';');
      const o = fn();
      if (o && typeof o === 'object') return o;
    } catch (e) {
      // ignore
    }
    return null;
  }

  // fallback: tenta extrair campos por regex simples
  function fallbackFieldsFromText(txt) {
    const titleMatch = txt.match(/title\s*:\s*['"`]\s*([^'"`]+?)\s*['"`]/i);
    const descMatch = txt.match(/(subtitle|desc|description)\s*:\s*['"`]\s*([^'"`]+?)\s*['"`]/i);
    const colorMatch = txt.match(/color\s*:\s*['"`]\s*([^'"`#a-zA-Z0-9(),\s-]+?)\s*['"`]/i) ||
                       txt.match(/color\s*:\s*['"`]\s*(#[0-9A-Fa-f]{3,6})\s*['"`]/i);
    return {
      title: titleMatch ? titleMatch[1].trim() : null,
      desc: descMatch ? descMatch[2].trim() : null,
      color: colorMatch ? colorMatch[1].trim() : null
    };
  }

  // tenta fetch + parse do info.js (fallback ao import)
  async function tryFetchAndParse(path) {
    try {
      const res = await fetch(path, { method: 'GET' });
      if (!res.ok) return null;
      const txt = await res.text();

      // 1) extrair objeto balanceado
      const objText = extractPageInfoObject(txt);
      if (objText) {
        const obj = evalObjectLiteral(objText);
        if (obj) {
          return {
            title: obj.title,
            desc: obj.subtitle || obj.desc || obj.description,
            color: obj.color
          };
        }
      }

      // 2) fallback regex
      const fb = fallbackFieldsFromText(txt);
      if (fb.title || fb.desc || fb.color) return fb;

    } catch (e) {
      // ignore
    }
    return null;
  }

  // ---------- novas funções para preencher header da home ----------
  // tenta carregar info.js relativo à própria página e aplicar ao DOM
  async function loadPageHeaderFromInfoJs() {
    const candidates = [
      './js/info.js',
      'js/info.js',
      '/js/info.js',
      './info.js',
      'info.js'
    ];
    for (const c of candidates) {
      // tenta import primeiro
      try {
        const mod = await tryDynamicImport(c);
        if (mod && (mod.title || mod.desc || mod.color)) {
          applyHeaderInfo(mod);
          return;
        }
      } catch (e) {
        // ignore
      }

      // tenta fetch + parse
      try {
        const parsed = await tryFetchAndParse(c);
        if (parsed && (parsed.title || parsed.desc || parsed.color)) {
          applyHeaderInfo(parsed);
          return;
        }
      } catch (e) {
        // ignore
      }
    }
    // nada encontrado — mantém conteúdo atual do HTML
  }

  function applyHeaderInfo(info) {
    if (!info) return;
    const h1 = document.querySelector('h1.title');
    const p = document.querySelector('p.subtitle');

    if (h1 && info.title) {
      h1.textContent = String(info.title);
    }
    if (p && (info.desc || info.title)) {
      p.textContent = String(info.desc || '');
    }
  }
  // ---------- fim novas funções ----------

  // tenta resolver info a partir de um caminho relativo (tenta com ./ e sem)
  async function resolveInfoFor(id) {
    const id2 = pad(id);
    const candidates = [
      `./${baseFolder}/${id2}/js/info.js`,
      `${baseFolder}/${id2}/js/info.js`,
      `/${baseFolder}/${id2}/js/info.js`
    ];

    // 1) import dinâmico (se suportado)
    for (const c of candidates) {
      const info = await tryDynamicImport(c);
      if (info && (info.title || info.desc || info.color)) {
        return { ...info, foundPath: c };
      }
    }

    // 2) fetch + parse
    for (const c of candidates) {
      const info = await tryFetchAndParse(c);
      if (info && (info.title || info.desc || info.color)) {
        return { ...info, foundPath: c };
      }
    }

    // se nada foi retornado, verifique se pelo menos o arquivo existe (HEAD) — para contar como existente
    for (const c of candidates) {
      try {
        const head = await fetch(c, { method: 'HEAD' });
        if (head && head.ok) {
          return { title: null, desc: null, color: null, foundPath: c };
        }
      } catch (e) { }
    }

    return null;
  }

  // cria elemento card
  function createCard({ title, desc, color, file }) {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = file;
    const safeTitle = title ? escapeHtml(title) : escapeHtml(file);
    const safeDesc = desc ? escapeHtml(desc) : 'Clique para abrir';
    const col = color || getRandomColor();
    a.innerHTML = `
      <div>
        <div class="title">${safeTitle}</div>
        <div class="desc">${safeDesc}</div>
      </div>
      <div class="chip">
        <span style="width:10px;height:10px;border-radius:50%;background:${col};display:inline-block;"></span>
        Acessar
      </div>`;
    return a;
  }

  function escapeHtml(s = '') {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  }

  // varre pastas numeradas e monta cards
  async function loadAll() {
    container.innerHTML = '';
    const cards = [];
    let index = startIndex;
    let consecutiveMisses = 0;

    while (index <= maxIndex && consecutiveMisses < maxConsecutiveMisses) {
      const info = await resolveInfoFor(index);
      if (info) {
        // se arquivo existe (mesmo sem fields), reset miss counter
        consecutiveMisses = 0;
        const id2 = pad(index);
        const title = info.title || `Subassunto ${id2}`;
        const desc = info.desc || `Página: ${baseFolder}/${id2}/index.html`;
        const color = info.color || getRandomColor();
        const file = `${baseFolder}/${id2}/index.html`;
        cards.push({ title, desc, color, file });
      } else {
        consecutiveMisses++;
      }
      index++;
    }

    if (cards.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = 'Nenhum subassunto encontrado.';
      empty.style.padding = '12px';
      container.appendChild(empty);
      return;
    }

    // insere no DOM
    for (const c of cards) {
      container.appendChild(createCard(c));
    }

    // aplica busca
    installSearch();
  }

  function installSearch() {
    if (!searchInput) return;
    searchInput.removeEventListener?.('input', onSearchInput);
    searchInput.addEventListener('input', onSearchInput);
  }

  function onSearchInput(e) {
    const q = e.target.value.toLowerCase().trim();
    Array.from(container.children).forEach(card => {
      if (!card.querySelector) return;
      const title = card.querySelector('.title')?.textContent?.toLowerCase() || '';
      const desc = card.querySelector('.desc')?.textContent?.toLowerCase() || '';
      card.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  }

  // executa
  // carrega header (não bloqueante) e em paralelo varre subassuntos
  loadPageHeaderFromInfoJs().catch(()=>{});
  loadAll().catch(err => {
    console.error('Erro carregando subassuntos:', err);
  });

})();
