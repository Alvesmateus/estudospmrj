let questionEl, optionsEl, feedbackEl, difficultyEl, quizContainer, scoreDisplay, errorDisplay, finishBtn, questionCounter;

let questions = [];
let currentIndex = 0;
let score = 0;
let errors = 0;
let answeredMap = new Map();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function init() {
  // agora o arquivo questions.js define "window.questions"
  if (!window.questions) {
    console.error("❌ Arquivo questions.js não carregado!");
    return;
  }

  questions = shuffle([...window.questions]);
  currentIndex = 0;
  score = 0;
  errors = 0;
  answeredMap.clear();

  quizContainer.innerHTML = `
    <div class="quiz-header">
      <div id="difficulty" class="difficulty"><span></span></div>
      <div class="scoreboard">
        <span id="scoreDisplay">✅ 0</span>
        <span id="errorDisplay">❌ 0</span>
        <span id="questionCounter">📘 1 / ${questions.length}</span>
      </div>
    </div>
    <div id="question" class="question"></div>
    <div id="options" class="options"></div>
    <div class="feedback" id="feedback"></div>
    <div class="nav-buttons">
      <button id="prevBtn">⬅️</button>
      <button id="nextBtn">➡️</button>
      <button id="finishBtn" class="finish-btn">🏁 Finalizar</button>
    </div>
  `;

  questionEl = quizContainer.querySelector('#question');
  optionsEl = quizContainer.querySelector('#options');
  feedbackEl = quizContainer.querySelector('#feedback');
  difficultyEl = quizContainer.querySelector('#difficulty');
  scoreDisplay = quizContainer.querySelector('#scoreDisplay');
  errorDisplay = quizContainer.querySelector('#errorDisplay');
  finishBtn = quizContainer.querySelector('#finishBtn');
  questionCounter = quizContainer.querySelector('#questionCounter');

  quizContainer.querySelector('#nextBtn').addEventListener('click', nextQuestion);
  quizContainer.querySelector('#prevBtn').addEventListener('click', prevQuestion);
  finishBtn.addEventListener('click', confirmFinish);

  loadQuestion(currentIndex);
  updateScoreboard();
}

function loadQuestion(index) {
  const q = questions[index];
  if (!q) return;

  questionEl.textContent = `${index + 1}. ${q.question}`;
  optionsEl.innerHTML = '';
  feedbackEl.style.display = 'none';
  feedbackEl.textContent = '';

  difficultyEl.className = `difficulty ${q.difficulty || ''}`;
  const span = difficultyEl.querySelector('span');
  if (span) span.textContent = `${capitalize(q.difficulty || '')} | ${q.category || ''}`;

  questionCounter.textContent = `📘 ${index + 1} / ${questions.length}`;

  const answered = answeredMap.get(index);

  q.options.forEach((opt, optIndex) => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.textContent = opt.text;

    div.classList.remove('correct', 'incorrect');

    if (answered) {
      if (optIndex === answered.selectedOptionIndex) {
        div.classList.add(answered.correct ? 'correct' : 'incorrect');
      }
      if (!answered.correct && opt.correct) {
        div.classList.add('correct');
      }
    } else {
      div.addEventListener('click', () => checkAnswer(div, opt, index, optIndex));
    }

    optionsEl.appendChild(div);
  });

  if (answered) {
    feedbackEl.style.display = 'block';
    feedbackEl.textContent = (answered.correct ? '✅ ' : '❌ ') + answered.explanation;
    feedbackEl.style.color = answered.correct ? '#63ff9e' : '#ff7b7b';
  }
}

function checkAnswer(optionEl, opt, questionIndex, selectedOptionIndex) {
  if (answeredMap.has(questionIndex)) return;

  const optionNodes = optionsEl.querySelectorAll('.option');
  optionNodes.forEach(o => o.classList.remove('correct', 'incorrect'));

  let wasCorrect = false;

  if (opt.correct) {
    optionEl.classList.add('correct');
    feedbackEl.style.color = '#63ff9e';
    feedbackEl.textContent = "✅ " + opt.explanation;
    score++;
    wasCorrect = true;
  } else {
    optionEl.classList.add('incorrect');
    feedbackEl.style.color = '#ff7b7b';
    feedbackEl.textContent = "❌ " + opt.explanation;
    errors++;

    const correctOption = questions[questionIndex].options.find(o => o.correct);
    if (correctOption) {
      const correctDiv = Array.from(optionNodes).find(o => o.textContent.trim() === correctOption.text.trim());
      if (correctDiv) correctDiv.classList.add('correct');
    }
  }

  feedbackEl.style.display = 'block';

  answeredMap.set(questionIndex, {
    selectedOptionIndex,
    correct: wasCorrect,
    explanation: opt.explanation
  });

  updateScoreboard();
}

function updateScoreboard() {
  scoreDisplay.textContent = `✅ ${score}`;
  errorDisplay.textContent = `❌ ${errors}`;
  if (questionCounter) questionCounter.textContent = `📘 ${currentIndex + 1} / ${questions.length}`;
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
    updateScoreboard();
  } else {
    alert("Você chegou à última questão.");
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
    updateScoreboard();
  }
}

function confirmFinish() {
  const confirmEnd = confirm("Tem certeza de que deseja finalizar o quiz agora?");
  if (confirmEnd) showResults();
}

function showResults() {
  quizContainer.innerHTML = `
    <div class="results">
      <h2>🏁 Fim do Quiz!</h2>
      <p><strong>Acertos:</strong> ${score}</p>
      <p><strong>Erros:</strong> ${errors}</p>
      <p><strong>Pontuação final:</strong> ${score} / ${questions.length}</p>
      <button id="restartBtn">🔁 Jogar novamente</button>
    </div>
  `;

  quizContainer.querySelector('#restartBtn').addEventListener('click', init);
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

document.addEventListener('DOMContentLoaded', () => {
  quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) {
    console.error('Elemento .quiz-container não encontrado no DOM.');
    return;
  }
  init();
});
