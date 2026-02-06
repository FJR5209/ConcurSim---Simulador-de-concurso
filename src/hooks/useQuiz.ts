import { useState, useCallback, useEffect } from 'react';
import type { Questao, Usuario, QuizState, ResultadoQuiz, ResultadoMateria } from '@/types';

const QUIZ_STORAGE_KEY = 'concursim_quiz_state_v1';
const RESULTADOS_STORAGE_KEY = 'concursim_resultados_materias_v1';

const defaultQuizState: QuizState = {
  usuario: null,
  materiaSelecionada: null,
  questoes: [],
  questaoAtual: 0,
  respostas: {},
  mostrarResultado: false,
  tempoInicio: 0,
  tempoFim: 0,
};

const loadInitialState = (): QuizState => {
  if (typeof window === 'undefined') return defaultQuizState;
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return defaultQuizState;
    const parsed = JSON.parse(raw);
    return { ...defaultQuizState, ...parsed };
  } catch {
    return defaultQuizState;
  }
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(loadInitialState);
  const [materiasCompletadas, setMateriasCompletadas] = useState<ResultadoMateria[]>([]);

  // Carregar matérias completadas do storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(RESULTADOS_STORAGE_KEY);
      if (raw) {
        setMateriasCompletadas(JSON.parse(raw));
      }
    } catch {
      // ignora
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Falha ao salvar estado do quiz no storage.', error);
    }
  }, [state]);

  // Salvar matérias completadas no storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(RESULTADOS_STORAGE_KEY, JSON.stringify(materiasCompletadas));
    } catch (error) {
      console.error('Falha ao salvar resultados das matérias no storage.', error);
    }
  }, [materiasCompletadas]);

  const setUsuario = useCallback((usuario: Usuario) => {
    setState(prev => ({
      ...prev,
      usuario,
      tempoInicio: Date.now(),
    }));
  }, []);

  const setMateriaSelecionada = useCallback((materia: string) => {
    setState(prev => ({
      ...prev,
      materiaSelecionada: materia,
    }));
  }, []);

  const setQuestoes = useCallback((questoes: Questao[]) => {
    setState(prev => ({
      ...prev,
      questoes,
    }));
  }, []);

  const responderQuestao = useCallback((questaoId: number, resposta: string) => {
    setState(prev => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [questaoId]: resposta,
      },
    }));
  }, []);

  const proximaQuestao = useCallback(() => {
    setState(prev => ({
      ...prev,
      questaoAtual: Math.min(prev.questaoAtual + 1, prev.questoes.length - 1),
    }));
  }, []);

  const questaoAnterior = useCallback(() => {
    setState(prev => ({
      ...prev,
      questaoAtual: Math.max(prev.questaoAtual - 1, 0),
    }));
  }, []);

  const finalizarQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      mostrarResultado: true,
      tempoFim: Date.now(),
    }));
  }, []);

  const reiniciarQuiz = useCallback(() => {
    setState(defaultQuizState);
  }, []);

  const getResultado = useCallback((): ResultadoQuiz => {
    const { questoes, respostas } = state;
    let acertos = 0;
    let erros = 0;
    const naoRespondidas = questoes.length - Object.keys(respostas).length;

    questoes.forEach(questao => {
      if (respostas[questao.id] === questao.respostaCorreta) {
        acertos++;
      } else if (respostas[questao.id]) {
        erros++;
      }
    });

    const percentual = questoes.length > 0 ? Math.round((acertos / questoes.length) * 100) : 0;

    return {
      total: questoes.length,
      acertos,
      erros,
      naoRespondidas,
      percentual,
    };
  }, [state]);

  const getTempoDecorrido = useCallback(() => {
    if (state.tempoInicio === 0) return 0;
    const fim = state.tempoFim || Date.now();
    return Math.floor((fim - state.tempoInicio) / 1000); // em segundos
  }, [state.tempoInicio, state.tempoFim]);

  const adicionarResultadoMateria = useCallback((
    materiaId: string,
    materiaNome: string,
    resultado: ResultadoQuiz,
    tempoDecorrido: number,
    questoes?: Questao[],
    respostas?: Record<number, string>
  ) => {
    setMateriasCompletadas(prev => {
      const filtrado = prev.filter(m => m.materiaId !== materiaId);
      return [...filtrado, {
        materiaId,
        materiaNome,
        resultado,
        tempoDecorrido,
        dataCompletao: Date.now(),
        ...(questoes && respostas && { questoes, respostas }),
      }];
    });
  }, []);

  const limparDados = useCallback(() => {
    setState(defaultQuizState);
    setMateriasCompletadas([]);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(QUIZ_STORAGE_KEY);
      window.localStorage.removeItem(RESULTADOS_STORAGE_KEY);
    } catch (error) {
      console.error('Falha ao limpar dados do quiz no storage.', error);
    }
  }, []);

  return {
    state,
    materiasCompletadas,
    setUsuario,
    setMateriaSelecionada,
    setQuestoes,
    responderQuestao,
    proximaQuestao,
    questaoAnterior,
    finalizarQuiz,
    reiniciarQuiz,
    getResultado,
    getTempoDecorrido,
    adicionarResultadoMateria,
    limparDados,
  };
}
