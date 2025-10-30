const subjects = [
  { 
    title: 'Conceitos Básicos - Definição', 
    desc: '1. Letra e fonema, 2. Vogais, semivogais e consoantes, 3. Sílabas. 4. Difono, atonos, digrafos', 
    color: '#f6c', 
    file: 'flashcard/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Letra Vs Fonema', 
    desc: 'Letra é a representação gráfica de um som, enquanto fonema é a unidade sonora em si.', 
    color: '#f6c', 
    file: 'flashcard-letravsfonema/flashcard.html',
    accessText: 'Flashcards',
  },
  { 
    title: 'Vogais, semivogais e consoantes', 
    desc: 'São fonemas, os quais são unidades de som que distinguem as palavras', 
    color: '#f6c', 
    file: 'flashcard-vogais-semivogais-consoantes/flashcard.html',
    accessText: 'Flashcards',
  },
  { 
    title: 'Encontros', 
    desc: 'Encontro vocálico, Encontro Nasal, encontro consonantal, dígrafo.', 
    color: '#f6c', 
    file: 'flashcard-encontros/flashcard.html',
    accessText: 'Flashcards',
  },
  { 
    title: 'Acentuação', 
    desc: 'Saiba tudo sobre acentuação gráfica!', 
    color: '#f6c', 
    file: 'flashcard-acentuacao/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Crase', 
    desc: 'Decore tudo sobre crase!', 
    color: '#f6c', 
    file: 'flashcard-crase/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Separação e divisão Silábica', 
    desc: 'Seja humilde, essa materia ferra muita gente!', 
    color: '#f6c', 
    file: 'flashcard-separacaoSilabica/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Acentuação em paroxitonas', 
    desc: 'Eu sei que você tem dúvida.', 
    color: '#f6c', 
    file: 'flashcard-acentuacaoParoxitona/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Acentuação em Oxitonas', 
    desc: 'Eu sei que você tem dúvida.', 
    color: '#f6c', 
    file: 'flashcard-acentuacaoOxitona/flashcard.html',
    accessText: 'Flashcards'
  },
  { 
    title: 'Dígrafos: Consonantais x Vocálicos', 
    desc: 'Eu sei que você tem dúvida.', 
    color: '#f6c', 
    file: 'flashcard-digrafos/flashcard.html',
    accessText: 'Flashcards'
  },  
  { 
    title: 'Acentuação Gráfica', 
    desc: 'Prátique acentuação com as melhores questões de concurso!', 
    color: '#63ff9e', 
    file: 'questoes/index.html',
    accessText: 'Exercícios de Concursos'
  },
  { 
    title: 'Fonética e fonologia', 
    desc: 'Pratique questões sobre fonética e fonologia!', 
    color: '#63ff9e', 
    file: 'questoes/index.html',
    accessText: 'Exercícios de Concursos'
  },
  { 
    title: 'Silaba tônica em palavras sem acento!', 
    desc: 'se fala ruBRIca ou RUbrica? se fala REcord ou reCORD? - Descubra agora!', 
    color: '#63ff9e', 
    file: 'flashcard-silabaTonica/index.html',
    accessText: 'Flashcards'
  },  
  
];

const container = document.getElementById('subjects');

function createCard(s) {
  const card = document.createElement('a');
  card.href = s.file;
  card.className = 'card';
  card.innerHTML = `
    <div>
    
      <div class='title'>${s.title}</div>
      <div class='desc'>${s.desc}</div>
    </div>
    <div class='chip'>
      <span style='width:10px;height:10px;border-radius:50%;background:${s.color};display:inline-block;'></span> 
      ${s.accessText || 'Acessar'}
    </div>`;
  return card;
}

subjects.forEach(s => container.appendChild(createCard(s)));

const search = document.getElementById('qSearch');
search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  Array.from(container.children).forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    const desc = card.querySelector('.desc').textContent.toLowerCase();
    card.style.display = title.includes(q) || desc.includes(q) ? '' : 'none';
  });
});
