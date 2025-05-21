
import { Question } from '@/contexts/QuizContext';

// A sample of 30 questions with different difficulty levels
export const questionsData: Question[] = [
  // Easy Questions
  {
    id: 'e1',
    question: 'Quem construiu a arca para salvar os animais do dilúvio?',
    options: ['Abraão', 'Moisés', 'Noé', 'Davi'],
    correctAnswer: 2, // Noé
    difficulty: 'easy',
    reference: 'Gênesis 6:14'
  },
  {
    id: 'e2',
    question: 'Quantos dias Jesus foi tentado no deserto?',
    options: ['10 dias', '30 dias', '40 dias', '50 dias'],
    correctAnswer: 2, // 40 dias
    difficulty: 'easy',
    reference: 'Mateus 4:2'
  },
  {
    id: 'e3',
    question: 'O que Jesus transformou em vinho em seu primeiro milagre?',
    options: ['Água', 'Suco de uva', 'Azeite', 'Leite'],
    correctAnswer: 0, // Água
    difficulty: 'easy',
    reference: 'João 2:1-11'
  },
  {
    id: 'e4',
    question: 'Qual era a profissão de Jesus antes de iniciar seu ministério?',
    options: ['Pescador', 'Carpinteiro', 'Pastor', 'Agricultor'],
    correctAnswer: 1, // Carpinteiro
    difficulty: 'easy',
    reference: 'Marcos 6:3'
  },
  {
    id: 'e5',
    question: 'Quem traiu Jesus por 30 moedas de prata?',
    options: ['Pedro', 'João', 'Judas', 'Mateus'],
    correctAnswer: 2, // Judas
    difficulty: 'easy',
    reference: 'Mateus 26:14-16'
  },
  {
    id: 'e6',
    question: 'Qual o primeiro livro da Bíblia?',
    options: ['Êxodo', 'Gênesis', 'Levítico', 'Números'],
    correctAnswer: 1, // Gênesis
    difficulty: 'easy',
    reference: 'Gênesis 1:1'
  },
  {
    id: 'e7',
    question: 'Quem recebeu as tábuas com os Dez Mandamentos?',
    options: ['Abraão', 'Josué', 'Moisés', 'Arão'],
    correctAnswer: 2, // Moisés
    difficulty: 'easy',
    reference: 'Êxodo 31:18'
  },
  {
    id: 'e8',
    question: 'Qual personagem bíblico foi engolido por um grande peixe?',
    options: ['Daniel', 'Jonas', 'José', 'Davi'],
    correctAnswer: 1, // Jonas
    difficulty: 'easy',
    reference: 'Jonas 1:17'
  },
  {
    id: 'e9',
    question: 'Qual foi o nome dado ao primeiro homem?',
    options: ['Caim', 'Abel', 'Adão', 'Seth'],
    correctAnswer: 2, // Adão
    difficulty: 'easy',
    reference: 'Gênesis 2:19'
  },
  {
    id: 'e10',
    question: 'Quem matou o gigante Golias?',
    options: ['Saul', 'Davi', 'Samuel', 'Salomão'],
    correctAnswer: 1, // Davi
    difficulty: 'easy',
    reference: '1 Samuel 17:50'
  },
  
  // Medium Questions
  {
    id: 'm1',
    question: 'Qual das seguintes pessoas NÃO era um dos 12 apóstolos?',
    options: ['André', 'Bartolomeu', 'Lucas', 'Filipe'],
    correctAnswer: 2, // Lucas
    difficulty: 'medium',
    reference: 'Mateus 10:1-4'
  },
  {
    id: 'm2',
    question: 'Quantos anos durou a construção do Templo de Salomão?',
    options: ['3 anos', '7 anos', '12 anos', '40 anos'],
    correctAnswer: 1, // 7 anos
    difficulty: 'medium',
    reference: '1 Reis 6:38'
  },
  {
    id: 'm3',
    question: 'Qual dos seguintes livros não está no Antigo Testamento?',
    options: ['Rute', 'Atos', 'Ester', 'Job'],
    correctAnswer: 1, // Atos
    difficulty: 'medium',
    reference: ''
  },
  {
    id: 'm4',
    question: 'Qual era o nome do irmão de Moisés?',
    options: ['Arão', 'Josué', 'Calebe', 'Eli'],
    correctAnswer: 0, // Arão
    difficulty: 'medium',
    reference: 'Êxodo 4:14'
  },
  {
    id: 'm5',
    question: 'Qual o rio onde Jesus foi batizado?',
    options: ['Nilo', 'Eufrates', 'Tigre', 'Jordão'],
    correctAnswer: 3, // Jordão
    difficulty: 'medium',
    reference: 'Mateus 3:13'
  },
  {
    id: 'm6',
    question: 'Quem foi lançado na cova dos leões?',
    options: ['Ezequiel', 'Daniel', 'Jeremias', 'Isaías'],
    correctAnswer: 1, // Daniel
    difficulty: 'medium',
    reference: 'Daniel 6:16'
  },
  {
    id: 'm7',
    question: 'Qual rei viu uma escrita na parede durante um banquete?',
    options: ['Nabucodonosor', 'Belsazar', 'Dario', 'Ciro'],
    correctAnswer: 1, // Belsazar
    difficulty: 'medium',
    reference: 'Daniel 5:5'
  },
  {
    id: 'm8',
    question: 'Quem foi o primeiro mártir cristão mencionado em Atos?',
    options: ['Pedro', 'Paulo', 'Estêvão', 'Tiago'],
    correctAnswer: 2, // Estêvão
    difficulty: 'medium',
    reference: 'Atos 7:54-60'
  },
  {
    id: 'm9',
    question: 'Quantas pragas Deus enviou sobre o Egito?',
    options: ['7', '10', '12', '14'],
    correctAnswer: 1, // 10
    difficulty: 'medium',
    reference: 'Êxodo 7-12'
  },
  {
    id: 'm10',
    question: 'Qual dos seguintes NÃO é um fruto do Espírito mencionado em Gálatas?',
    options: ['Paciência', 'Bondade', 'Sabedoria', 'Mansidão'],
    correctAnswer: 2, // Sabedoria
    difficulty: 'medium',
    reference: 'Gálatas 5:22-23'
  },
  
  // Hard Questions
  {
    id: 'h1',
    question: 'Qual era o nome do servo do sumo sacerdote que teve a orelha cortada e depois curada por Jesus?',
    options: ['Malco', 'Jairo', 'Silas', 'Barnabé'],
    correctAnswer: 0, // Malco
    difficulty: 'hard',
    reference: 'João 18:10'
  },
  {
    id: 'h2',
    question: 'Quantos livros há na Bíblia (Antigo e Novo Testamentos)?',
    options: ['39', '66', '73', '81'],
    correctAnswer: 1, // 66
    difficulty: 'hard',
    reference: ''
  },
  {
    id: 'h3',
    question: 'Qual dos seguintes NÃO era um dos sete diáconos escolhidos em Atos?',
    options: ['Estêvão', 'Filipe', 'Timóteo', 'Prócoro'],
    correctAnswer: 2, // Timóteo
    difficulty: 'hard',
    reference: 'Atos 6:5'
  },
  {
    id: 'h4',
    question: 'Qual era o nome do pai de Abraão?',
    options: ['Naor', 'Terá', 'Serugue', 'Peleg'],
    correctAnswer: 1, // Terá
    difficulty: 'hard',
    reference: 'Gênesis 11:26'
  },
  {
    id: 'h5',
    question: 'Qual profeta menor tem apenas um capítulo em seu livro?',
    options: ['Obadias', 'Jonas', 'Ageu', 'Sofonias'],
    correctAnswer: 0, // Obadias
    difficulty: 'hard',
    reference: ''
  },
  {
    id: 'h6',
    question: 'Quem disse: "Ainda que ele me mate, nele esperarei"?',
    options: ['Davi', 'Jó', 'Daniel', 'Paulo'],
    correctAnswer: 1, // Jó
    difficulty: 'hard',
    reference: 'Jó 13:15'
  },
  {
    id: 'h7',
    question: 'Qual dos seguintes reis NÃO governou o Reino Dividido do Norte (Israel)?',
    options: ['Jeroboão', 'Acabe', 'Josias', 'Jeú'],
    correctAnswer: 2, // Josias
    difficulty: 'hard',
    reference: ''
  },
  {
    id: 'h8',
    question: 'Qual a ordem correta dos primeiros quatro livros do Novo Testamento?',
    options: ['Mateus, Marcos, João, Lucas', 'Marcos, Mateus, Lucas, João', 'Mateus, Marcos, Lucas, João', 'João, Mateus, Marcos, Lucas'],
    correctAnswer: 2, // Mateus, Marcos, Lucas, João
    difficulty: 'hard',
    reference: ''
  },
  {
    id: 'h9',
    question: 'Quem era o governador romano da Judeia quando Jesus foi crucificado?',
    options: ['Herodes', 'Quirino', 'Pôncio Pilatos', 'César Augusto'],
    correctAnswer: 2, // Pôncio Pilatos
    difficulty: 'hard',
    reference: 'Mateus 27:2'
  },
  {
    id: 'h10',
    question: 'Qual dos seguintes livros foi escrito por Salomão?',
    options: ['Salmos', 'Provérbios', 'Lamentações', 'Isaías'],
    correctAnswer: 1, // Provérbios
    difficulty: 'hard',
    reference: 'Provérbios 1:1'
  }
];
