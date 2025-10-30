let frasesAleatorias = [];
let indiceAtual = 0;
let acertos = 0;
let erros = 0;
let tempo = 60;
let timer = null;
let jogoAtivo = false;

const questionEl = document.getElementById("question");
const trueBtn = document.getElementById("trueBtn");
const falseBtn = document.getElementById("falseBtn");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const acertosEl = document.getElementById("acertos");
const errosEl = document.getElementById("erros");
const endGameEl = document.getElementById("endGame");
const endMessageEl = document.getElementById("endMessage");
const finalScoreEl = document.getElementById("finalScore");

// sons leves (acerto e erro)
const somAcerto = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c019ab0cc.mp3?filename=correct-2-46134.mp3");
const somErro = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_ae0e364c3c.mp3?filename=error-126627.mp3");

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function iniciarJogo() {
  frasesAleatorias = embaralhar([...frases]);
  indiceAtual = 0;
  acertos = 0;
  erros = 0;
  tempo = 60;
  jogoAtivo = true;

  startBtn.classList.add("hidden");
  endGameEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  trueBtn.disabled = false;
  falseBtn.disabled = false;
  acertosEl.textContent = acertos;
  errosEl.textContent = erros;
  feedbackEl.textContent = "";

  iniciarTimer();
  mostrarPergunta();
}

function iniciarTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    tempo--;
    timerEl.textContent = tempo;
    if (tempo <= 0) encerrarJogo(false);
  }, 1000);
}

function mostrarPergunta() {
  const frase = frasesAleatorias[indiceAtual];
  questionEl.textContent = frase.texto;
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  nextBtn.classList.add("hidden");
}

function verificarResposta(resposta) {
  if (!jogoAtivo) return;
  const frase = frasesAleatorias[indiceAtual];
  const acertou = resposta === frase.correta;

  if (acertou) {
    acertos++;
    tempo += 10; // +10 segundos por acerto
    feedbackEl.innerHTML = `<p class="emoji">✅</p><p>${frase.explicacao}</p>`;
    feedbackEl.className = "correct animate";
    somAcerto.currentTime = 0;
    somAcerto.play();
  } else {
    erros++;
    feedbackEl.innerHTML = `<p class="emoji">❌</p><p>${frase.explicacao}</p>`;
    feedbackEl.className = "wrong animate";
    somErro.currentTime = 0;
    somErro.play();
  }

  acertosEl.textContent = acertos;
  errosEl.textContent = erros;

  trueBtn.disabled = true;
  falseBtn.disabled = true;
  nextBtn.classList.remove("hidden");

  if (indiceAtual === frasesAleatorias.length - 1) {
    nextBtn.textContent = "Finalizar";
  }
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual >= frasesAleatorias.length) {
    encerrarJogo(true);
  } else {
    trueBtn.disabled = false;
    falseBtn.disabled = false;
    nextBtn.textContent = "Próxima";
    mostrarPergunta();
  }
}

function encerrarJogo(vitoria) {
  jogoAtivo = false;
  clearInterval(timer);
  trueBtn.disabled = true;
  falseBtn.disabled = true;
  nextBtn.classList.add("hidden");
  endGameEl.classList.remove("hidden");

  if (vitoria) {
    endMessageEl.textContent = "🎉 Parabéns! Você completou todas as perguntas!";
  } else {
    endMessageEl.textContent = "⏰ O tempo acabou!";
  }

  finalScoreEl.textContent = `✅ ${acertos} acertos | ❌ ${erros} erros`;
}

trueBtn.addEventListener("click", () => verificarResposta(true));
falseBtn.addEventListener("click", () => verificarResposta(false));
nextBtn.addEventListener("click", proximaPergunta);
startBtn.addEventListener("click", iniciarJogo);
restartBtn.addEventListener("click", iniciarJogo);
