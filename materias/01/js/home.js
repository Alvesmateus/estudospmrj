// home.js — lê info.js local e gera dinamicamente os assuntos

import { pageInfo } from "./info.js"; // importa título e descrição locais

const container = document.getElementById("subjects");
const search = document.getElementById("qSearch");

// elementos do cabeçalho
const headerTitle = document.querySelector(".title");
const headerSubtitle = document.querySelector(".subtitle");

// atualiza o header com dados do info.js local
function updateHeader() {
  headerTitle.textContent = pageInfo.title || "Título não definido";
  headerSubtitle.textContent = pageInfo.subtitle || "Sem descrição disponível.";
}

// função para criar os cards visuais
function createCard({ title, desc, color, file }) {
  const card = document.createElement("a");
  card.href = file;
  card.className = "card";
  card.innerHTML = `
    <div>
      <div class='title'>${title}</div>
      <div class='desc'>${desc}</div>
    </div>
    <div class='chip'>
      <span style='width:10px;height:10px;border-radius:50%;background:${color};display:inline-block;'></span>
      Acessar
    </div>`;
  return card;
}

// carrega dinamicamente as pastas de assuntos
async function loadAssuntos() {
  const assuntos = [];
  let index = 1;

  while (true) {
    const folder = String(index).padStart(2, "0");
    const infoPath = `../assuntos/${folder}/js/info.js`;

    try {
      const module = await import(infoPath);
      const { pageInfo } = module;

      assuntos.push({
        title: pageInfo.title || `Assunto ${folder}`,
        desc: pageInfo.subtitle || "Sem descrição disponível.",
        color: pageInfo.color || "#60a5fa",
        file: `assuntos/${folder}/index.html`,
      });

      index++;
    } catch {
      break; // para quando não há mais pastas válidas
    }
  }

  // adiciona todos os cards ao container
  assuntos.forEach((a) => container.appendChild(createCard(a)));
}

// filtro de busca
search.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  Array.from(container.children).forEach((card) => {
    const title = card.querySelector(".title").textContent.toLowerCase();
    const desc = card.querySelector(".desc").textContent.toLowerCase();
    card.style.display = title.includes(q) || desc.includes(q) ? "" : "none";
  });
});

// inicializa tudo
updateHeader();
loadAssuntos();
