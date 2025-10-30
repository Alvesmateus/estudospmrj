const flashcardsData = window.flashcardsData;

let totalCards = flashcardsData.length;
let cardsRestantes = totalCards;
let acertos = 0;
let esquecidos = 0;

function atualizarContadores() {
  document.getElementById('total-cards').textContent = totalCards;
  document.getElementById('cards-restantes').textContent = cardsRestantes;
  document.getElementById('acertos').textContent = acertos;
  document.getElementById('esquecidos').textContent = esquecidos;
}

function criarFlashcards() {
  const container = document.getElementById('flashcard-container');

  flashcardsData.forEach(({ pergunta, resposta }) => {
    const card = document.createElement('div');
    card.classList.add('flashcard');

    const inner = document.createElement('div');
    inner.classList.add('flashcard-inner');

    const front = document.createElement('div');
    front.classList.add('flashcard-front');
    front.textContent = pergunta;

    const back = document.createElement('div');
    back.classList.add('flashcard-back');
    back.textContent = resposta;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const btnAcertar = document.createElement('button');
    btnAcertar.textContent = 'Acertei';
    btnAcertar.classList.add('action-button', 'acertar-button');
    btnAcertar.addEventListener('click', (e) => {
      e.stopPropagation();
      acertos++;
      cardsRestantes--;
      card.remove();
      atualizarContadores();
      verificarFim();
    });

    const btnEsqueci = document.createElement('button');
    btnEsqueci.textContent = 'Esqueci';
    btnEsqueci.classList.add('action-button', 'esqueci-button');
    btnEsqueci.addEventListener('click', (e) => {
      e.stopPropagation();
      esquecidos++;
      container.appendChild(card);
      atualizarContadores();
    });

    buttonContainer.appendChild(btnAcertar);
    buttonContainer.appendChild(btnEsqueci);
    back.appendChild(buttonContainer);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    container.appendChild(card);
  });

  atualizarContadores();
}

function verificarFim() {
  const container = document.getElementById('flashcard-container');
  const cards = container.querySelectorAll('.flashcard');
  if (cards.length === 0) {
    document.getElementById('parabens').classList.add('active');
  }
}

criarFlashcards();
