// home.js (versão dinâmica com suporte a "icon" em /materias/N/js/info.js)

const container = document.getElementById("subjects");
const search = document.getElementById("qSearch");

// Cria o card visual com ícone opcional
function createCard({ icon, title, desc, color, file }) {
  const card = document.createElement("a");
  card.href = file;
  card.className = "card";
  card.innerHTML = `
    <div>
      <div class='title'>${icon ? `<span class="icon">${icon}</span>` : ""} ${title}</div>
      <div class='desc'>${desc}</div>
    </div>
    <div class='chip'>
      <span style='width:10px;height:10px;border-radius:50%;background:${color};display:inline-block;'></span> Acessar
    </div>`;
  return card;
}

// Função principal para carregar dinamicamente as matérias
async function loadMaterias() {
  const materias = [];
  let index = 1;

  while (true) {
    const folder = String(index).padStart(2, "0");
    const infoPath = `../materias/${folder}/js/info.js`;

    try {
      // Importa dinamicamente o info.js
      const module = await import(infoPath);
      const { pageInfo } = module;

      materias.push({
        icon: pageInfo.icon || "📘", // ícone padrão
        title: pageInfo.title || `Matéria ${folder}`,
        desc: pageInfo.subtitle || "Sem descrição disponível.",
        color: pageInfo.color || "#60a5fa",
        file: `materias/${folder}/index.html`
      });

      index++;
    } catch (err) {
      // Para quando não houver mais pastas válidas
      break;
    }
  }

  // Renderiza os cards dinamicamente
  materias.forEach(m => container.appendChild(createCard(m)));
}

// Campo de pesquisa
search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  Array.from(container.children).forEach(card => {
    const title = card.querySelector(".title").textContent.toLowerCase();
    const desc = card.querySelector(".desc").textContent.toLowerCase();
    card.style.display = title.includes(q) || desc.includes(q) ? "" : "none";
  });
});

// Inicializa
loadMaterias();
