import { useState, useCallback, useMemo } from 'react';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { SelecaoMateria } from '@/sections/SelecaoMateria';
import { Quiz } from '@/sections/Quiz';
import { Resultados } from '@/sections/Resultados';
import { ResumoGeral } from '@/sections/ResumoGeral';
import { GerarQuestoes } from '@/sections/GerarQuestoes';
import { useQuiz } from '@/hooks/useQuiz';
import { getQuestoesPorFiltros, materias, getMateriasPorArea } from '@/data/questoes';
import { GeminiService, GeminiStorage } from '@/services/geminiService';
import type { Usuario, Questao, ResumoGeral as ResumoGeralType } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type Tela = 'hero' | 'materia' | 'quiz' | 'resultado' | 'gerar-questoes' | 'resumo-geral';

function App() {
  const [tela, setTela] = useState<Tela>('hero');
  const [materiaNome, setMateriaNome] = useState('');
  const [materiaIdAtual, setMateriaIdAtual] = useState<string | null>(null);
  const [usarGeminiParaProximas, setUsarGeminiParaProximas] = useState(false);
  const [isGerandoProxima, setIsGerandoProxima] = useState(false);
  
  const {
    state,
    materiasCompletadas,
    setUsuario,
    setMateriaSelecionada,
    setQuestoes,
    responderQuestao,
    finalizarQuiz,
    reiniciarQuiz,
    getTempoDecorrido,
    getResultado,
    adicionarResultadoMateria,
    limparDados,
  } = useQuiz();

  // Obter matérias disponíveis para a área do usuário
  const materiasDisponiveis = useMemo(() => {
    if (!state.usuario) return [];
    return getMateriasPorArea(state.usuario.area);
  }, [state.usuario]);

  // Obter próxima matéria não completada
  const proximaMateriaDisponivel = useMemo(() => {
    const completadasIds = new Set(materiasCompletadas.map(m => m.materiaId));
    return materiasDisponiveis.find(m => !completadasIds.has(m.id));
  }, [materiasDisponiveis, materiasCompletadas]);

  // Calcular resumo geral
  const calcularResumoGeral = useCallback((): ResumoGeralType => {
    const totalQuestoes = materiasCompletadas.reduce((acc, m) => acc + m.resultado.total, 0);
    const totalAcertos = materiasCompletadas.reduce((acc, m) => acc + m.resultado.acertos, 0);
    const tempoTotal = materiasCompletadas.reduce((acc, m) => acc + m.tempoDecorrido, 0);
    const percentualGeral = totalQuestoes > 0 ? Math.round((totalAcertos / totalQuestoes) * 100) : 0;

    return {
      materiasCompletadas,
      totalMaterias: materiasDisponiveis.length,
      tempoTotal,
      percentualGeral,
      totalAcertos,
      totalQuestoes,
    };
  }, [materiasCompletadas, materiasDisponiveis.length]);

  const handleIniciar = useCallback((usuario: Usuario) => {
    setUsuario(usuario);
    setTela('materia');
  }, [setUsuario]);

  const handleSelecionarMateria = useCallback((materiaId: string) => {
    if (!state.usuario) return;

    setUsarGeminiParaProximas(false);

    const materia = materias.find(m => m.id === materiaId);
    if (materia) {
      setMateriaNome(materia.nome);
      setMateriaIdAtual(materiaId);
      setMateriaSelecionada(materiaId);

      const questoesFiltradas = getQuestoesPorFiltros(
        state.usuario.area,
        materiaId,
        state.usuario.nivel,
        10
      );

      if (!questoesFiltradas.length) {
        toast.error(
          'Não encontramos questões para essa combinação de área, matéria e nível. ' +
          'Tente outra configuração ou use a geração de questões com IA.'
        );
        return;
      }

      setQuestoes(questoesFiltradas);
      setTela('quiz');
    }
  }, [state.usuario, setMateriaSelecionada, setQuestoes]);

  const handleFinalizarQuiz = useCallback((respostas: Record<number, string>) => {
    Object.entries(respostas).forEach(([questaoId, resposta]) => {
      responderQuestao(Number(questaoId), resposta);
    });
    finalizarQuiz();
    
    // Salvar resultado da matéria atual (com questões e respostas para o relatório)
    if (materiaIdAtual && materiaNome) {
      const resultado = getResultado();
      const tempoDecorrido = getTempoDecorrido();
      adicionarResultadoMateria(
        materiaIdAtual,
        materiaNome,
        resultado,
        tempoDecorrido,
        state.questoes,
        state.respostas
      );
    }

    setTela('resultado');
  }, [responderQuestao, finalizarQuiz, materiaIdAtual, materiaNome, getResultado, getTempoDecorrido, adicionarResultadoMateria, state.questoes, state.respostas]);

  const handleReiniciar = useCallback(() => {
    reiniciarQuiz();
    setTela('hero');
    setMateriaNome('');
  }, [reiniciarQuiz]);

  const handleNovaMateria = useCallback(() => {
    setTela('materia');
    setMateriaNome('');
  }, []);

  const handleVoltarInicio = useCallback(() => {
    reiniciarQuiz();
    setTela('hero');
    setMateriaNome('');
  }, [reiniciarQuiz]);

  const handleAbrirRelatorio = useCallback(() => {
    setTela('resumo-geral');
  }, []);

  const handleLimparDados = useCallback(() => {
    const confirmar = window.confirm(
      'Isso vai apagar seus dados salvos no navegador (nome, área, respostas, etc.). Deseja continuar?'
    );
    if (!confirmar) return;

    limparDados();
    setTela('hero');
    setMateriaNome('');
  }, [limparDados]);

  const handleGerarQuestoes = useCallback(() => {
    setTela('gerar-questoes');
  }, []);

  const handleQuestoesGeradas = useCallback((questoesGeradas: Questao[], nomeMateria: string) => {
    if (!questoesGeradas.length) {
      toast.error('A IA não retornou questões válidas. Tente gerar novamente.');
      return;
    }

    setUsarGeminiParaProximas(true);

    const materia = materias.find(m => m.nome.toLowerCase() === nomeMateria.toLowerCase());
    setMateriaNome(nomeMateria);
    setMateriaIdAtual(materia?.id || 'ia-gerada');
    setQuestoes(questoesGeradas);
    setTela('quiz');
  }, [setQuestoes]);

  const handleSeguirProxima = useCallback(async () => {
    if (!proximaMateriaDisponivel || !state.usuario) {
      setTela('resumo-geral');
      return;
    }

    if (usarGeminiParaProximas) {
      const apiKey = GeminiStorage.getApiKey();
      if (!apiKey) {
        toast.error('Chave da API não encontrada. Gere questões pela tela de IA.');
        return;
      }
      setIsGerandoProxima(true);
      toast.info('Gerando questões da próxima matéria com IA...');
      try {
        const service = new GeminiService(apiKey);
        const questoesGeradas = await service.gerarQuestoes(
          state.usuario.area,
          proximaMateriaDisponivel.id,
          state.usuario.nivel,
          { quantidade: 10, dificuldade: 'misto', banca: state.usuario.banca }
        );
        if (!questoesGeradas.length) {
          toast.error('A IA não retornou questões. Tente novamente.');
          return;
        }
        setMateriaNome(proximaMateriaDisponivel.nome);
        setMateriaIdAtual(proximaMateriaDisponivel.id);
        setMateriaSelecionada(proximaMateriaDisponivel.id);
        setQuestoes(questoesGeradas);
        setTela('quiz');
        toast.success(`${questoesGeradas.length} questões de ${proximaMateriaDisponivel.nome} geradas.`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro ao gerar questões';
        toast.error(msg);
      } finally {
        setIsGerandoProxima(false);
      }
      return;
    }

    handleSelecionarMateria(proximaMateriaDisponivel.id);
  }, [proximaMateriaDisponivel, state.usuario, usarGeminiParaProximas, setMateriaSelecionada, setQuestoes]);

  const renderTela = () => {
    switch (tela) {
      case 'hero':
        return <Hero onIniciar={handleIniciar} />;
      
      case 'materia':
        return state.usuario ? (
          <SelecaoMateria
            usuario={state.usuario}
            onSelecionarMateria={handleSelecionarMateria}
            onVoltar={handleVoltarInicio}
            onGerarQuestoes={handleGerarQuestoes}
          />
        ) : null;
      
      case 'quiz':
        return (
          <Quiz
            questoes={state.questoes}
            materiaNome={materiaNome}
            banca={state.usuario?.banca}
            onVoltar={handleNovaMateria}
            onFinalizar={handleFinalizarQuiz}
          />
        );
      
      case 'resultado':
        return state.usuario ? (
          <Resultados
            questoes={state.questoes}
            respostas={state.respostas}
            tempoDecorrido={getTempoDecorrido()}
            nomeUsuario={state.usuario.nome}
            banca={state.usuario.banca}
            resultado={getResultado()}
            onReiniciar={handleReiniciar}
            onNovaMateria={handleNovaMateria}
            onVoltarInicio={handleVoltarInicio}
            onSeguirProxima={handleSeguirProxima}
            temProximaMateria={!!proximaMateriaDisponivel}
            isGerandoProxima={isGerandoProxima}
          />
        ) : null;

      case 'resumo-geral':
        return state.usuario ? (
          <ResumoGeral
            resumo={calcularResumoGeral()}
            nomeUsuario={state.usuario.nome}
            banca={state.usuario.banca}
            onVoltarInicio={handleVoltarInicio}
            onContinuarQuestionario={handleNovaMateria}
          />
        ) : null;

      case 'gerar-questoes':
        return state.usuario ? (
          <GerarQuestoes
            usuario={state.usuario}
            onVoltar={handleNovaMateria}
            onQuestoesGeradas={handleQuestoesGeradas}
          />
        ) : null;
      
      default:
        return <Hero onIniciar={handleIniciar} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors">
      <Header usuario={state.usuario} onLimparDados={handleLimparDados} onAbrirRelatorio={state.usuario ? handleAbrirRelatorio : undefined} />
      <main>
        {renderTela()}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
