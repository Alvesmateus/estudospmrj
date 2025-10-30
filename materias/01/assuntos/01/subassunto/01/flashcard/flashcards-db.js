// Torna o array acessível globalmente
window.flashcardsData = [
  // Fonética e Fonologia
  {
    pergunta: "O que é ortoépia?",
    resposta: "É o estudo da pronúncia correta das palavras. Exemplo: pronunciar 'superfície' corretamente como su-per-fí-cie."
  },
  {
    pergunta: "O que é prosódia?",
    resposta: "É o estudo da sílaba e da acentuação correta das palavras. Exemplo: identificar que 'café' é oxítona."
  },
  {
    pergunta: "Qual a diferença entre acento tônico e acento gráfico?",
    resposta: "Acento tônico ocorre na fala (ex: saci - sílaba 'ci' é tônica). Acento gráfico ocorre na escrita (ex: café - acento agudo no 'e')."
  },
  {
    pergunta: "O que são monossílabos tônicos?",
    resposta: "São palavras de uma só sílaba pronunciadas com mais intensidade e autonomia fonética. Exemplos: pé, dó, ré, pó, meu."
  },
  {
    pergunta: "O que são monossílabos átonos?",
    resposta: "São palavras de uma só sílaba que não têm autonomia fonética e se apoiam em outra palavra. Exemplos: de, sem, em, a, com."
  },

  // Fonemas e Letras
  {
    pergunta: "O que é fonema?",
    resposta: "É uma unidade sonora que serve para formar palavras e distinguir uma palavra da outra. Exemplo: /p/ em 'pato' e /g/ em 'gato'."
  },
  {
    pergunta: "O que é letra?",
    resposta: "É a representação gráfica de um som, o símbolo visual do fonema. Exemplo: a letra 'm' representa o fonema /m/ em 'mato'."
  },
  {
    pergunta: "Quando há diferença entre número de fonemas e letras?",
    resposta: "Quando existem dígrafos. Exemplo: 'machado' tem 6 letras mas 5 fonemas (/m/a/x/a/d/o/)."
  },

  // Dígrafos
  {
    pergunta: "O que é dígrafo?",
    resposta: "É o encontro de duas letras que formam um único fonema. Exemplo: 'ch' em 'chá' forma o fonema /x/."
  },
  {
    pergunta: "Quais são os principais dígrafos consonantais?",
    resposta: "CH (chá), LH (malha), NH (banha), GU (guerra), QU (queijo), RR (carro), SS (passo), SC (nascer), XC (exceção)."
  },
  {
    pergunta: "O que são dígrafos nasais?",
    resposta: "São dígrafos que representam sons vocálicos nasais. Exemplos: AM (campo), EM (tempo), IM (limbo), OM (ombro), UM (tumba)."
  },
  {
    pergunta: "Qual palavra NÃO tem dígrafo consonantal?",
    resposta: "'Principalmente' - tem encontro consonantal 'pr' e dígrafos nasais 'en' e 'in', mas não dígrafo consonantal."
  },
  {
    pergunta: "Qual a diferença entre dígrafo nasal e ditongo nasal?",
    resposta: "Dígrafo nasal tem um som (ex: AMPlo - som nasal /ã/). Ditongo nasal tem dois sons (ex: chegAM - /chegãü/)."
  },

  // Encontros Consonantais
  {
    pergunta: "O que é encontro consonantal?",
    resposta: "É a sequência de dois fonemas consonantais numa palavra. Exemplo: 'claro' - /k/ e /l/ são encontro consonantal."
  },
  {
    pergunta: "Como os encontros consonantais podem ocorrer?",
    resposta: "Na mesma sílaba (ex: CLI-ma) ou em sílabas diferentes (ex: AD-ven-to)."
  },
  {
    pergunta: "Dê exemplos de encontros consonantais na mesma sílaba.",
    resposta: "CLI-ma, FLO-res, PSI-co-se, LE-tra, PSEU-dô-ni-mo."
  },
  {
    pergunta: "Dê exemplos de encontros consonantais em sílabas diferentes.",
    resposta: "AD-ven-to, OB-tu-so, FÚC-sia, ÉT-ni-co."
  },

  // Ditongos
  {
    pergunta: "O que é ditongo?",
    resposta: "É o encontro de dois sons vocálicos na mesma sílaba (uma vogal + uma semivogal). Exemplos: Gló-ri-a, Sai, Meu."
  },
  {
    pergunta: "O que é ditongo crescente?",
    resposta: "Ditongo onde primeiro vem a semivogal (fraca) depois a vogal (forte). Exemplos: precári-as, históri-a, águ-a."
  },
  {
    pergunta: "O que é ditongo decrescente?",
    resposta: "Ditongo onde primeiro vem a vogal (forte) depois a semivogal (fraca). Exemplos: jóqu-ei, imóv-eis, m-eu."
  },
  {
    pergunta: "Quais são os ditongos abertos?",
    resposta: "Éi, Ói, Éu - são decrescentes. Exemplos: pap-éis, her-ói, chap-éu."
  },
  {
    pergunta: "O que é ditongo nasal?",
    resposta: "Ditongo com som nasal. Exemplos: câimbra, am-am, beb-em, sót-ão."
  },
  {
    pergunta: "Dê exemplos de ditongos orais.",
    resposta: "Crescentes: águ-a, nódo-a. Decrescentes: az-eite, sAudade, pAisagem."
  },

  // Tritongos
  {
    pergunta: "O que é tritongo?",
    resposta: "É o encontro de uma vogal entre duas semivogais, na mesma sílaba. Exemplos: U-ru-guai, sa-guão, de-sá-guem."
  },
  {
    pergunta: "Como o M funciona em tritongos?",
    resposta: "O M funciona como semivogal. Exemplo: 'deságuem' tem som de /deságuei/."
  },

  // Hiatos
  {
    pergunta: "O que é hiato?",
    resposta: "É o encontro de duas vogais em sílabas diferentes. Exemplos: in-clu-í-ram, sa-ú-de, pa-í-ses."
  },
  {
    pergunta: "Dê exemplos de hiato com separação silábica.",
    resposta: "SA-Ú-DE, PA-Í-SES, PRE-JU-Í-ZO, VE-Í-CU-LO, CA-Ó-TI-CO."
  },
  {
    pergunta: "Quando acentuamos o I e U em hiato?",
    resposta: "Quando são tônicos, formando sílaba sozinhos ou com S. Exemplos: ca-í, fa-ís-ca, ru-í-do, sa-ú-de."
  },
  {
    pergunta: "Quando NÃO acentuamos o I e U em hiato?",
    resposta: "Quando formam sílaba com letra que não seja S. Exemplos: ca-ir, sa-in-do, ju-iz, a-in-da."
  },
  {
    pergunta: "Qual a exceção para acentuação de hiato?",
    resposta: "Hiato seguido de NH na próxima sílaba não é acentuado. Exemplos: ra-inha, ba-inha, mo-inho."
  },
  {
    pergunta: "Quando o U ou I tônico após ditongo NÃO é acentuado?",
    resposta: "Quando vem após ditongo decrescente numa paroxítona. Exemplos: fei-u-ra, bai-u-ca, sau-i-pe."
  },
  {
    pergunta: "Quando o U ou I tônico após ditongo É acentuado?",
    resposta: "Quando a palavra é oxítona. Exemplos: Pia-u-í, tu-bu-í, te-i-ú."
  },
  {
    pergunta: "Quais hiatos não são acentuados por terem letras repetidas?",
    resposta: "Saara, Mooca, semeemos, xiita, vadice."
  },
  {
    pergunta: "Quais hiatos com 'e' e 'o' não são acentuados?",
    resposta: "Creem, deem, leem, enjoo, voo, doo, zoo."
  },

  // Classificação por Número de Sílabas
  {
    pergunta: "O que são palavras monossílabas?",
    resposta: "Palavras com apenas uma sílaba. Exemplos: pá, pé, chá."
  },
  {
    pergunta: "O que são palavras dissílabas?",
    resposta: "Palavras com duas sílabas. Exemplos: so-fá, ci-pó, ca-sa."
  },
  {
    pergunta: "O que são palavras trissílabas?",
    resposta: "Palavras com três sílabas. Exemplos: va-ta-pá, te-cla-do, mé-di-co."
  },
  {
    pergunta: "O que são palavras polissílabas?",
    resposta: "Palavras com mais de três sílabas. Exemplos: ja-ca-ran-dá, con-tra-fi-lé."
  },

  // Acentuação - Regras Gerais
  {
    pergunta: "O que são palavras oxítonas?",
    resposta: "Palavras com sílaba tônica na última sílaba. Exemplos: vatapá, carrossel, devagar."
  },
  {
    pergunta: "O que são palavras paroxítonas?",
    resposta: "Palavras com sílaba tônica na penúltima sílaba. Exemplos: escola, secretária, lavabo."
  },
  {
    pergunta: "O que são palavras proparoxítonas?",
    resposta: "Palavras com sílaba tônica na antepenúltima sílaba. Exemplos: médico, lâmpada, específico."
  },

  // Acentuação de Monossílabos
  {
    pergunta: "Quais monossílabos tônicos são acentuados?",
    resposta: "Os terminados em A, E, O e os terminados em ditongos abertos ÉU, ÉI, ÓI. Exemplos: pá, pé, dó, céu, réis, dói."
  },
  {
    pergunta: "Dê exemplos de monossílabos tônicos acentuados com terminação em A, E, O.",
    resposta: "Pá, dá, cá, más, pé, ré, mês, dê, dó, pó, só, nós."
  },
  {
    pergunta: "Dê exemplos de monossílabos tônicos acentuados com ditongo aberto.",
    resposta: "Céu, véu, réis, dói, sóis."
  },

  // Acentuação de Oxítonas
  {
    pergunta: "Quais oxítonas são acentuadas?",
    resposta: "As terminadas em A, E, O, EM, ENS e as terminadas em ditongos abertos ÉU, ÉI, ÓI."
  },
  {
    pergunta: "Dê exemplos de oxítonas acentuadas com terminação em A, E, O.",
    resposta: "Sofá, gambá, Pará, café, você, Tietê, avó, jiló, cipó."
  },
  {
    pergunta: "Dê exemplos de oxítonas acentuadas com terminação em ÉU, ÉI, ÓI.",
    resposta: "Chapéu, troféu, papéis, fiéis, destrói, anzóis, Niterói."
  },
  {
    pergunta: "Dê exemplos de oxítonas acentuadas com terminação em EM, ENS.",
    resposta: "Parabéns, armazéns, alguém, mantém, porém."
  },

  // Acentuação de Paroxítonas
  {
    pergunta: "Qual a regra geral para acentuação das paroxítonas?",
    resposta: "Acentuam-se todas as paroxítonas, EXCETO as terminadas em A, E, O, EM, ENS."
  },
  {
    pergunta: "Quais são as terminações das paroxítonas que são acentuadas?",
    resposta: "I, N, UM, OM, R, NS, X, IS, US, PS, Ã, ÃO. Exemplos: fácil, hífen, álbum, tórax, júri."
  },
  {
    pergunta: "Qual a regra específica para paroxítonas?",
    resposta: "Acentuam-se as paroxítonas terminadas em ditongo oral. Exemplos: indivíduos, precárias, série."
  },
  {
    pergunta: "Dê exemplos de paroxítonas acentuadas por terminarem em ditongo.",
    resposta: "História, homogênea, médio, água, distância, primário, rádio, Brasília."
  },
  {
    pergunta: "Quais paroxítonas NÃO são mais acentuadas pelo Novo Acordo?",
    resposta: "As com ditongo aberto (EI, OI) na posição paroxítona. Exemplos: ideia, plateia, assembleia, heroico."
  },
  {
    pergunta: "Quais prefixos paroxítonos não são acentuados?",
    resposta: "Hiper, super, mini, anti, semi terminados em R ou I."
  },

  // Acentuação de Proparoxítonas
  {
    pergunta: "Qual a regra para acentuação das proparoxítonas?",
    resposta: "Todas as proparoxítonas são acentuadas. Exemplos: página, antônimo, átomo, relâmpago, caótico."
  },
  {
    pergunta: "Dê exemplos de proparoxítonas.",
    resposta: "PE-núl-ti-mo, PÁ-gi-na, AN-tô-ni-mo, Á-to-mo, RE-lâm-pa-go, CA-ó-ti-co."
  },

  // Proparoxítonas Aparentes
  {
    pergunta: "O que são proparoxítonas aparentes?",
    resposta: "Paroxítonas terminadas em ditongo crescente que podem ser consideradas como proparoxítonas. Exemplo: his-tó-ri-a."
  },
  {
    pergunta: "Quais sequências vocálicas formam proparoxítonas aparentes?",
    resposta: "-ea, -eo, -ia, -ie, -io, -oa, -ua, -uo. Exemplos: álea, etéreo, enciclopédia, série."
  },

  // Acentuação do Hiato
  {
    pergunta: "Qual a regra para acentuação do hiato?",
    resposta: "Acentuam-se o I e U tônicos em hiato, formando sílaba sozinhos ou com S."
  },
  {
    pergunta: "Dê exemplos de acentuação por hiato em oxítonas.",
    resposta: "A-ça-í, ca-í, fa-ís-ca, Pa-ra-í-ba."
  },
  {
    pergunta: "Dê exemplos de acentuação por hiato em paroxítonas.",
    resposta: "Sa-ú-de, ba-la-ús-tre, e-go-ís-ta."
  },
  {
    pergunta: "Quais palavras com hiato NÃO são acentuadas?",
    resposta: "Ju-iz, ru-im, ra-ul, a-in-da, di-ur-no, cau-im."
  },

  // Difonos
  {
    pergunta: "O que são difonos?",
    resposta: "Letras que podem ter mais de um som. Exemplo: a letra 'X' pode ter som de SS (máximo), Z (exato), CS (fixo)."
  },
  {
    pergunta: "Dê exemplos de palavras com 'X' tendo som de SS.",
    resposta: "Máximo, próximo, trouxe."
  },
  {
    pergunta: "Dê exemplos de palavras com 'X' tendo som de Z.",
    resposta: "Exato, exemplo, exercício."
  },
  {
    pergunta: "Dê exemplos de palavras com 'X' tendo som de CS.",
    resposta: "Fixo, táxi, contexto."
  },

  // Encontros Vocálicos - Resumo
  {
    pergunta: "Qual a diferença entre ditongo, tritongo e hiato?",
    resposta: "Ditongo: 2 sons vocálicos na mesma sílaba (glória). Tritongo: 3 sons vocálicos na mesma sílaba (uruguai). Hiato: 2 sons vocálicos em sílabas diferentes (saúde)."
  },
  {
    pergunta: "Como identificar se é ditongo ou hiato?",
    resposta: "Ditongo: os sons estão na mesma sílaba (pais - 1 sílaba). Hiato: os sons estão em sílabas diferentes (pa-ís - 2 sílabas)."
  },

  // Aplicação Prática
  {
    pergunta: "Quantos fonemas tem a palavra 'exceção'?",
    resposta: "6 fonemas: /e/, /k/, /s/, /e/, /s/, /ã/, /o/ - escrita com 7 letras."
  },
  {
    pergunta: "Quantos fonemas tem a palavra 'guerra'?",
    resposta: "4 fonemas: /g/, /e/, /R/, /a/ - 'gu' é dígrafo, 'rr' é dígrafo."
  },
  {
    pergunta: "A palavra 'principalmente' tem dígrafo consonantal?",
    resposta: "Não, tem encontro consonantal 'pr' e dígrafos nasais 'en' e 'in'."
  },
  {
    pergunta: "Como separar silabicamente a palavra 'saúde'?",
    resposta: "Sa-ú-de - apresenta hiato entre 'a' e 'u'."
  },
  {
    pergunta: "Qual a classificação da palavra 'perenes' quanto ao número de sílabas?",
    resposta: "Trissílaba (pe-re-nes), não polissílaba."
  },
  {
    pergunta: "Por que 'evidências' não é considerada proparoxítona?",
    resposta: "Porque é paroxítona terminada em ditongo (e-vi-dên-cias)."
  },
  {
    pergunta: "Quais palavras são acentuadas pela mesma regra do hiato?",
    resposta: "Saúde, saída, ciúme, reúne, atribuída."
  },
  {
    pergunta: "Quais palavras NÃO são acentuadas pela mesma regra?",
    resposta: "Pássaros (proparoxítona), aquático (proparoxítona), poluídas (hiato)."
  },
  {
    pergunta: "Como justificar o acento em 'incrível'?",
    resposta: "Paroxítona terminada em L - pela regra geral das paroxítonas."
  },
  {
    pergunta: "Por que 'será' é acentuada?",
    resposta: "Por ser oxítona terminada em A."
  },
  {
    pergunta: "Quais palavras são acentuadas por serem proparoxítonas?",
    resposta: "Única, política, atlântico, doméstico, médico, xícara, ônibus."
  },
  {
    pergunta: "Quais palavras são acentuadas por serem paroxítonas terminadas em ditongo?",
    resposta: "Pátria, indícios, critério, história, indivíduos, série."
  },
  {
    pergunta: "Quais palavras perderam o acento com o Novo Acordo?",
    resposta: "Ideia, assembleia, heroico, jiboia, paranoia, enjoo."
  },
  {
    pergunta: "Como classificar 'água' quanto à terminação para acentuação?",
    resposta: "Termina em ditongo 'ua', não em 'a', por isso é acentuada como paroxítona terminada em ditongo."
  },
  {
    pergunta: "Qual a diferença na acentuação de 'anéis' e 'ideia'?",
    resposta: "'Anéis' é oxítona terminada em ditongo aberto (acentua). 'Ideia' é paroxítona com ditongo aberto (não acentua)."
  },
  {
    pergunta: "Por que 'biquíni' é acentuada?",
    resposta: "Por ser paroxítona terminada em 'i' - pela regra geral das paroxítonas."
  },
  {
    pergunta: "Quais palavras são acentuadas pela mesma regra de 'café'?",
    resposta: "Você, jiló, cipó - todas oxítonas terminadas em E ou O."
  },
  {
    pergunta: "Como justificar o acento em 'aparência'?",
    resposta: "Paroxítona terminada em ditongo - mesma regra de 'fragrância'."
  },
  {
    pergunta: "Por que 'países' e 'línguas' são acentuadas por regras diferentes?",
    resposta: "'Países' - hiato na sílaba tônica. 'Línguas' - paroxítona terminada em ditongo."
  }
];