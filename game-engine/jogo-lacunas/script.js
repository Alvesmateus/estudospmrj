'use strict';

const mainBtn = document.getElementById('mainBtn');
const phraseArea = document.getElementById('phraseArea');
const phraseBox = document.getElementById('phraseBox');
const wordBank = document.getElementById('wordBank');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const scoreCorrectEl = document.getElementById('scoreCorrect');
const scoreWrongEl = document.getElementById('scoreWrong');
const endScreen = document.getElementById('endScreen');
const endTitle = document.getElementById('endTitle');
const endSummary = document.getElementById('endSummary');

let frasesPool = [];
let current = null;
let shuffledIndexes = [];
let currentIndex = 0;
let placements = [];
let timer = null;
let timeLeft = 60;
let running = false;
let scoreCorrect = 0;
let scoreWrong = 0;

/* -----------------------------------
   Utilidades
----------------------------------- */
const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
function allFilled() { return placements.length > 0 && placements.every(x => x && x.text); }
function clearFeedback() { feedbackEl.className = 'feedback'; feedbackEl.textContent = ''; }

/* -----------------------------------
   Controle do botão principal
----------------------------------- */
function setButtonState(state) {
  if (state === 'start') {
    mainBtn.textContent = 'Iniciar Jogo';
    mainBtn.dataset.state = 'start';
  } else if (state === 'restart') {
    mainBtn.textContent = 'Reiniciar Partida';
    mainBtn.dataset.state = 'restart';
  } else if (state === 'playagain') {
    mainBtn.textContent = 'Jogar Novamente';
    mainBtn.dataset.state = 'playagain';
  }
}

/* -----------------------------------
   Inicializar / Reiniciar
----------------------------------- */
function prepareGame() {
  if (typeof frases === 'undefined' || !Array.isArray(frases) || frases.length === 0) {
    alert('Erro: arquivo frases.js não encontrado ou vazio.');
    return false;
  }
  shuffledIndexes = shuffle(frases.map((_, i) => i));
  currentIndex = 0;
  scoreCorrect = 0;
  scoreWrong = 0;
  scoreCorrectEl.textContent = 0;
  scoreWrongEl.textContent = 0;
  timeLeft = 60;
  timerEl.textContent = timeLeft;
  endScreen.classList.add('hidden');
  phraseArea.classList.remove('hidden');
  feedbackEl.textContent = '';
  checkBtn.disabled = false;
  running = true;
  setButtonState('restart');
  return true;
}

function startGame() {
  const ok = prepareGame();
  if (!ok) return;
  startTimer();
  loadCurrent();
  checkBtn.style.display = 'inline-block';

}

function restartGame() {
  if (timer) clearInterval(timer);
  const ok = prepareGame();
  if (!ok) return;
  startTimer();
  loadCurrent();
}

/* -----------------------------------
   Timer
----------------------------------- */
function startTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      end(false);
    }
  }, 1000);
}

/* -----------------------------------
   Carregar frase
----------------------------------- */
function loadCurrent() {
  clearFeedback();
  // reexibir o botão de verificar com animação
  checkBtn.style.display = 'inline-block';
  checkBtn.style.opacity = '0';
  checkBtn.disabled = true;
  nextBtn.hidden = true;
  placements = [];
  phraseBox.innerHTML = '';
  wordBank.innerHTML = '';

  // animação suave de fade-in
  requestAnimationFrame(() => {
    checkBtn.style.transition = 'opacity 0.4s ease';
    checkBtn.style.opacity = '1';
  });

  if (currentIndex >= shuffledIndexes.length) {
    end(true);
    return;
  }

  const idx = shuffledIndexes[currentIndex];
  current = JSON.parse(JSON.stringify(frases[idx]));
  const words = shuffle([...current.answers, ...(current.distractors || [])]);
  frasesPool = words.map((w, i) => ({ id: `w${i}-${Date.now()}`, text: String(w), used: false }));

  // construir frase
  const parts = current.template.split('___');
  for (let i = 0; i < parts.length; i++) {
    const seg = document.createElement('span');
    seg.textContent = parts[i];
    phraseBox.appendChild(seg);

    if (i < parts.length - 1) {
      const blank = document.createElement('button');
      blank.className = 'blank';
      blank.dataset.index = i;
      blank.textContent = '...';
      blank.addEventListener('click', () => removeWord(i, blank));
      phraseBox.appendChild(blank);
      placements[i] = null;
    }
  }

  // banco de palavras
  frasesPool.forEach(p => {
    const w = document.createElement('button');
    w.className = 'word';
    w.textContent = p.text;
    w.dataset.id = p.id;
    w.addEventListener('click', () => insertWord(p.id, w));
    wordBank.appendChild(w);
  });
}

/* -----------------------------------
   Inserção automática e animação
----------------------------------- */
function insertWord(id, element) {
  if (!running) return;
  const item = frasesPool.find(x => x.id === id);
  if (!item || item.used) return;

  // achar primeira lacuna vazia
  const emptyIndex = placements.findIndex(x => !x);
  if (emptyIndex === -1) return;

  const blank = phraseBox.querySelector(`.blank[data-index="${emptyIndex}"]`);
  if (!blank) return;

  // marcar como usado
  item.used = true;
  placements[emptyIndex] = { id: item.id, text: item.text };

  // animação de encaixe
  blank.classList.add('filled');
  blank.textContent = item.text;
  blank.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
    { duration: 220, easing: 'ease-out' }
  );

  element.style.transition = 'all 0.25s ease';
  element.style.opacity = '0';
  element.style.transform = 'scale(0.8)';
  setTimeout(() => element.remove(), 250);

  checkBtn.disabled = !allFilled();
}

/* -----------------------------------
   Remover palavra e retornar ao banco
----------------------------------- */
function removeWord(index, blank) {
  if (!placements[index] || !running) return;
  const removed = placements[index];
  placements[index] = null;
  blank.classList.remove('filled');
  blank.textContent = '...';

  const word = document.createElement('button');
  word.className = 'word';
  word.textContent = removed.text;
  word.dataset.id = removed.id;
  word.addEventListener('click', () => insertWord(removed.id, word));
  word.style.opacity = '0';
  word.style.transform = 'scale(0.8)';
  wordBank.appendChild(word);

  requestAnimationFrame(() => {
    word.style.transition = 'all 0.25s ease';
    word.style.opacity = '1';
    word.style.transform = 'scale(1)';
  });

  const poolItem = frasesPool.find(x => x.id === removed.id);
  if (poolItem) poolItem.used = false;

  checkBtn.disabled = !allFilled();
}

/* -----------------------------------
   Verificação
----------------------------------- */
checkBtn.addEventListener('click', () => {
  if (!running || !allFilled()) return;

  // animação de sumir o botão ao clicar
  checkBtn.style.transition = 'opacity 0.4s ease';
  checkBtn.style.opacity = '0';
  setTimeout(() => { checkBtn.style.display = 'none'; }, 400);

  const given = placements.map(p => p.text.toLowerCase());
  const expected = current.answers.map(a => a.toLowerCase());
  const correct = expected.every((v, i) => v === given[i]);

  if (correct) {
    scoreCorrect++;
    scoreCorrectEl.textContent = scoreCorrect;
    feedbackEl.className = 'feedback success';
    feedbackEl.innerHTML = `<strong>✅ Correto!</strong>`;
  } else {
    scoreWrong++;
    scoreWrongEl.textContent = scoreWrong;
    feedbackEl.className = 'feedback error';
    let full = current.template;
    current.answers.forEach(ans => full = full.replace('___', `<strong>${ans}</strong>`));
    feedbackEl.innerHTML = `<strong>❌ Incorreto!</strong><br>Frase correta: ${full}`;
  }

  nextBtn.hidden = false;
  checkBtn.disabled = true;
});

/* -----------------------------------
   Próxima frase
----------------------------------- */
nextBtn.addEventListener('click', () => {
  currentIndex++;
  loadCurrent();
});

/* -----------------------------------
   Final do jogo
----------------------------------- */
function end(completed) {
  running = false;
  clearInterval(timer);
  phraseArea.classList.add('hidden');
  endScreen.classList.remove('hidden');

  if (completed) {
    endTitle.textContent = '🎉 Parabéns! Você terminou o jogo.';
  } else {
    endTitle.textContent = '⏰ O tempo acabou!';
  }

  endSummary.textContent = `✅ ${scoreCorrect} acertos • ❌ ${scoreWrong} erros`;
  setButtonState('playagain');
}

/* -----------------------------------
   Eventos principais
----------------------------------- */
mainBtn.addEventListener('click', () => {
  const state = mainBtn.dataset.state;
  if (state === 'start' || state === 'playagain') startGame();
  else if (state === 'restart') restartGame();
});

/* -----------------------------------
   Inicialização
----------------------------------- */
(function init() {
  document.documentElement.classList.remove('light'); // sempre dark
  phraseArea.classList.add('hidden');
  endScreen.classList.add('hidden');
  checkBtn.disabled = true;
  nextBtn.hidden = true;
  setButtonState('start');
  checkBtn.style.display = 'none';

})();
