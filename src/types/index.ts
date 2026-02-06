export interface Questao {
  id: number;
  area: string;
  materia: string;
  nivel: 'municipal' | 'estadual' | 'federal';
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  respostaCorreta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacao: string;
  dica: string;
  exemplo?: string;
}

export interface Usuario {
  nome: string;
  area: string;
  nivel: 'municipal' | 'estadual' | 'federal';
  banca: string;
}

export interface QuizState {
  usuario: Usuario | null;
  materiaSelecionada: string | null;
  questoes: Questao[];
  questaoAtual: number;
  respostas: Record<number, string>;
  mostrarResultado: boolean;
  tempoInicio: number;
  tempoFim: number;
}

export interface Materia {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  cor: string;
}

export interface AreaConcurso {
  id: string;
  nome: string;
  descricao: string;
}

export interface ResultadoQuiz {
  total: number;
  acertos: number;
  erros: number;
  naoRespondidas: number;
  percentual: number;
}

export interface ResultadoMateria {
  materiaId: string;
  materiaNome: string;
  resultado: ResultadoQuiz;
  tempoDecorrido: number;
  dataCompletao: number;
  /** Questões e respostas da matéria (para exibir no relatório por matéria) */
  questoes?: Questao[];
  respostas?: Record<number, string>;
}

export interface ResumoGeral {
  materiasCompletadas: ResultadoMateria[];
  totalMaterias: number;
  tempoTotal: number;
  percentualGeral: number;
  totalAcertos: number;
  totalQuestoes: number;
}
