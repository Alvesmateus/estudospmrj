(function () {
  const ID = "modern_topbar";
  if (document.getElementById(ID)) return; // Evita duplicar

  // 🎨 ESTILO GLOBAL DO MENU
  const style = document.createElement("style");
  style.textContent = `
    #${ID} {
      position: fixed;
      top: 12px;
      left: 12px;
      right: 12px;
      height: 60px;
      background: rgba(20, 20, 25, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      color: #eaeaea;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      transition: background 0.3s ease;
    }
    #${ID}:hover {
      background: rgba(25, 25, 30, 0.9);
    }
    #${ID} .side {
      width: 80px; /* garante que o centro fica fixo */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #${ID} .center {
      flex: 1;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.1rem;
      font-weight: 600;
      color: #f3f4f6;
      white-space: nowrap;
      pointer-events: none;
    }
    #${ID} button {
      background: none;
      border: none;
      color: #e0e0e0;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 10px;
      transition: background 0.2s, color 0.2s;
    }
    #${ID} button:hover {
      background: rgba(255,255,255,0.08);
      color: #8ab4f8;
    }
    #${ID} svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 1.6;
      fill: none;
    }
    @media (max-width: 600px) {
      #${ID} {
        height: 52px;
        font-size: 0.9rem;
      }
      #${ID} button span {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);

  // 🌙 CRIAÇÃO DO MENU
  const bar = document.createElement("div");
  bar.id = ID;

  // Botão de voltar
  const back = document.createElement("div");
  back.className = "side";
  const backBtn = document.createElement("button");
  backBtn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
    <span>Voltar</span>
  `;
  backBtn.onclick = () => {
    if (history.length > 1) history.back();
    else if (document.referrer) location.href = document.referrer;
  };
  back.appendChild(backBtn);

  // Texto central — título da página
  const center = document.createElement("div");
  center.className = "center";
  center.textContent = document.title || "Sem título";

  // Ícone de configurações
  const gear = document.createElement("div");
  gear.className = "side";
  const gearBtn = document.createElement("button");
  gearBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"></path>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.27 16.9l.06-.06a1.65 1.65 0 0 0 .33-1.82"></path>
    </svg>
  `;
  gear.appendChild(gearBtn);

  // Montagem final
  bar.appendChild(back);
  bar.appendChild(center);
  bar.appendChild(gear);
  document.body.appendChild(bar);

  // 🔒 Esconde o botão "Voltar" na primeira página
  if (history.length <= 1 || !document.referrer) {
    back.style.visibility = "hidden";
  }

  // ✨ Ajuste automático de espaçamento no body
  function adjustPadding() {
    const h = bar.offsetHeight + 20;
    const current = parseInt(getComputedStyle(document.body).paddingTop) || 0;
    if (current < h) document.body.style.paddingTop = h + "px";
  }
  adjustPadding();
  window.addEventListener("resize", adjustPadding);

  // Atualiza dinamicamente se o <title> mudar
  const titleEl = document.querySelector("head > title");
  if (titleEl) {
    new MutationObserver(() => {
      center.textContent = document.title || "Sem título";
    }).observe(titleEl, { childList: true, characterData: true, subtree: true });
  }
})();
