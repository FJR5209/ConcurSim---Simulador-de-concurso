import { useState } from 'react';
import { ArrowLeft, Sparkles, Loader2, Check, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GeminiService, GeminiStorage, type GeminiConfig } from '@/services/geminiService';
import type { Questao, Usuario } from '@/types';
import { toast } from 'sonner';

interface GerarQuestoesProps {
  usuario: Usuario;
  onVoltar: () => void;
  onQuestoesGeradas: (questoes: Questao[], materiaNome: string) => void;
}

const MATERIAS_GERACAO = [
  { id: 'portugues', nome: 'Língua Portuguesa', icone: '📚' },
  { id: 'matematica', nome: 'Matemática', icone: '🔢' },
  { id: 'raciocinio', nome: 'Raciocínio Lógico', icone: '🧩' },
  { id: 'informatica', nome: 'Informática', icone: '💻' },
  { id: 'constitucional', nome: 'Direito Constitucional', icone: '⚖️' },
  { id: 'administrativo', nome: 'Direito Administrativo', icone: '🏛️' },
  { id: 'adm_geral', nome: 'Administração Geral', icone: '📊' },
  { id: 'especificos', nome: 'Conhecimentos Específicos', icone: '🎯' },
];

const QUANTIDADE_FIXA = 10;

export function GerarQuestoes({ usuario, onVoltar, onQuestoesGeradas }: GerarQuestoesProps) {
  const [materiaSelecionada, setMateriaSelecionada] = useState('');
  const [dificuldade, setDificuldade] = useState<GeminiConfig['dificuldade']>('misto');
  const [isGerando, setIsGerando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const hasApiKey = GeminiStorage.hasApiKey();

  const handleGerar = async () => {
    if (!materiaSelecionada) {
      toast.error('Selecione uma matéria');
      return;
    }

    const apiKey = GeminiStorage.getApiKey();
    if (!apiKey) {
      toast.error('API key não encontrada');
      return;
    }

    setIsGerando(true);
    setProgresso(0);

    let progressInterval: ReturnType<typeof setInterval> | undefined;

    try {
      const service = new GeminiService(apiKey);
      
      // Simular progresso
      progressInterval = setInterval(() => {
        setProgresso(prev => Math.min(prev + 10, 80));
      }, 500);

      const questoesGeradas = await service.gerarQuestoes(
        usuario.area,
        materiaSelecionada,
        usuario.nivel,
        {
          quantidade: QUANTIDADE_FIXA,
          dificuldade,
          banca: usuario.banca,
        }
      );

      setProgresso(100);

      const materia = MATERIAS_GERACAO.find(m => m.id === materiaSelecionada);
      const materiaNome = materia?.nome || materiaSelecionada;

      toast.success(`${questoesGeradas.length} questões geradas com sucesso!`);
      
      setTimeout(() => {
        onQuestoesGeradas(questoesGeradas, materiaNome);
      }, 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao gerar questões';
      toast.error(errorMessage);
      console.error('Erro ao gerar questões:', error);
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setIsGerando(false);
    }
  };

  const getNivelBadgeColor = (nivel: string) => {
    switch (nivel) {
      case 'municipal': return 'bg-blue-100 text-blue-700';
      case 'estadual': return 'bg-green-100 text-green-700';
      case 'federal': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={onVoltar}
            className="mb-4 text-[#64748b] dark:text-gray-400 hover:text-[#1e293b] dark:hover:text-gray-200 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1e293b] dark:text-gray-100 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                  Gerar Questões com IA
                </h1>
                <p className="text-[#64748b] dark:text-gray-400 mt-1">
                  Crie questões únicas e personalizadas com inteligência artificial
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getNivelBadgeColor(usuario.nivel)}`}>
                  {usuario.nivel}
                </span>
                {hasApiKey && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    IA Ativa
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Configurações */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 md:p-8 animate-slide-up transition-colors">
          {/* Matéria */}
          <div className="mb-8">
            <Label className="text-[#1e293b] dark:text-gray-100 font-medium mb-4 block">
              Selecione a Matéria
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MATERIAS_GERACAO.map((materia) => (
                <button
                  key={materia.id}
                  onClick={() => setMateriaSelecionada(materia.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    materiaSelecionada === materia.id
                      ? 'border-purple-500 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-[#e2e8f0] dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{materia.icone}</span>
                  <span className={`text-sm font-medium ${
                    materiaSelecionada === materia.id ? 'text-purple-700 dark:text-purple-300' : 'text-[#1e293b] dark:text-gray-100'
                  }`}>
                    {materia.nome}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade fixa */}
          <div className="mb-8">
            <Label className="text-[#1e293b] dark:text-gray-100 font-medium mb-1 block">
              Quantidade de Questões
            </Label>
            <p className="text-sm text-[#64748b] dark:text-gray-400">
              Serão sempre geradas <span className="font-semibold text-purple-600 dark:text-purple-400">{QUANTIDADE_FIXA}</span> questões por vez.
            </p>
          </div>

          {/* Dificuldade */}
          <div className="mb-8">
            <Label className="text-[#1e293b] dark:text-gray-100 font-medium mb-4 block">
              Nível de Dificuldade
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['facil', 'medio', 'dificil', 'misto'] as const).map((dif) => (
                <button
                  key={dif}
                  onClick={() => setDificuldade(dif)}
                  className={`px-4 py-3 rounded-xl border-2 font-medium capitalize transition-all ${
                    dificuldade === dif
                      ? 'border-purple-500 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'border-[#e2e8f0] dark:border-gray-700 text-[#64748b] dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500/50'
                  }`}
                >
                  {dif === 'facil' && '🟢 Fácil'}
                  {dif === 'medio' && '🟡 Médio'}
                  {dif === 'dificil' && '🔴 Difícil'}
                  {dif === 'misto' && '🎲 Misto'}
                </button>
              ))}
            </div>
          </div>

          {/* Progresso */}
          {isGerando && (
            <div className="mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#64748b] dark:text-gray-400">Gerando questões...</span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{progresso}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 transition-all duration-300"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <p className="text-xs text-[#64748b] dark:text-gray-400 mt-2">
                A IA está criando questões personalizadas para você. Isso pode levar alguns segundos...
              </p>
            </div>
          )}

          {/* Botão Gerar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleGerar}
              disabled={isGerando || !materiaSelecionada}
              className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 h-12"
            >
              {isGerando ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gerando Questões...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gerar {QUANTIDADE_FIXA} Questões
                </>
              )}
            </Button>
          </div>

          {/* Sem aviso de configuração de API na UI por enquanto */}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 border border-[#e2e8f0] dark:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-1">Questões Únicas</h3>
            <p className="text-sm text-[#64748b] dark:text-gray-400">
              Cada geração cria questões originais e personalizadas para seu estudo
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 border border-[#e2e8f0] dark:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-1">Gabarito Incluído</h3>
            <p className="text-sm text-[#64748b] dark:text-gray-400">
              Todas as questões vêm com resposta correta e explicação detalhada
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 border border-[#e2e8f0] dark:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
              <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-1">Personalizável</h3>
            <p className="text-sm text-[#64748b] dark:text-gray-400">
              Escolha a dificuldade e quantidade de acordo com suas necessidades
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
