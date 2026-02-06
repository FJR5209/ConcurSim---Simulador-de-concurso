import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Questao } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface QuizProps {
  questoes: Questao[];
  materiaNome: string;
  banca?: string;
  onVoltar: () => void;
  onFinalizar: (respostas: Record<number, string>) => void;
}

export function Quiz({ questoes, materiaNome, banca, onVoltar, onFinalizar }: QuizProps) {
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [mostrarDicas, setMostrarDicas] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoDecorrido(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Proteção extra: se não houver questões, evita que o componente quebre
  if (!questoes || questoes.length === 0) {
    return (
      <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-8 text-center transition-colors">
            <h1 className="text-2xl font-bold text-[#1e293b] dark:text-gray-100 mb-2">
              Nenhuma questão disponível
            </h1>
            <p className="text-[#64748b] dark:text-gray-400 mb-6">
              Não encontramos questões para essa combinação de área, matéria e nível.
              Volte e selecione outra configuração ou utilize a geração de questões com IA.
            </p>
            <Button
              onClick={onVoltar}
              className="bg-[#1a5fb4] hover:bg-[#154a8c] dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const respostasDadas = Object.keys(respostas).length;
  const progresso = (respostasDadas / questoes.length) * 100;

  const selecionarResposta = (questaoId: number, letra: string) => {
    setRespostas(prev => ({
      ...prev,
      [questaoId]: letra,
    }));
  };

  const toggleDica = (questaoId: number) => {
    setMostrarDicas(prev => ({
      ...prev,
      [questaoId]: !prev[questaoId],
    }));
  };

  const confirmarFinalizar = () => {
    if (respostasDadas < questoes.length) {
      setMostrarConfirmacao(true);
    } else {
      onFinalizar(respostas);
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4 mb-6 animate-fade-in transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={onVoltar}
                className="text-[#64748b] dark:text-gray-400 hover:text-[#1e293b] dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Sair
              </Button>
              <div className="h-6 w-px bg-[#e2e8f0] dark:bg-gray-700"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="font-medium text-[#1e293b] dark:text-gray-100">{materiaNome}</span>
                {banca && (
                  <span className="text-xs text-[#64748b] dark:text-gray-400 bg-[#e2e8f0] dark:bg-gray-700 px-2 py-1 rounded-full">
                    Banca: {banca}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#64748b] dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatarTempo(tempoDecorrido)}</span>
              </div>
              <div className="text-sm text-right">
                <span className="font-semibold text-[#1a5fb4] dark:text-blue-400">{respostasDadas}</span>
                <span className="text-[#64748b] dark:text-gray-400">/{questoes.length} respondidas</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progresso} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-[#64748b] dark:text-gray-400">
              <span>Progresso</span>
              <span>{Math.round(progresso)}% concluído</span>
            </div>
          </div>
        </div>

        {/* Lista de questões (todas na mesma tela) */}
        <div className="space-y-6">
          {questoes.map((questao, index) => {
            const respostaSelecionada = respostas[questao.id];
            const dicaVisivel = !!mostrarDicas[questao.id];

            return (
              <div
                key={questao.id}
                className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 md:p-8 animate-slide-up transition-colors"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Enunciado */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-[#1a5fb4]/10 dark:bg-blue-900/30 text-[#1a5fb4] dark:text-blue-400 text-xs font-semibold rounded-full mb-3">
                    Questão {index + 1}
                  </span>
                  <h2 className="text-lg md:text-xl text-[#1e293b] dark:text-gray-100 leading-relaxed">
                    {questao.enunciado}
                  </h2>
                </div>

                {/* Alternativas */}
                <div className="space-y-3">
                  {Object.entries(questao.alternativas).map(([letra, texto]) => {
                    const isSelecionada = respostaSelecionada === letra;
                    return (
                      <button
                        key={letra}
                        type="button"
                        onClick={() => selecionarResposta(questao.id, letra)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelecionada
                            ? 'border-[#1a5fb4] dark:border-blue-500 bg-[#e8f4fd] dark:bg-blue-900/30'
                            : 'border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#1a5fb4]/50 dark:hover:border-blue-500/50 hover:bg-[#f8fafc] dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                              isSelecionada
                                ? 'bg-[#1a5fb4] dark:bg-blue-500 text-white'
                                : 'bg-[#f1f5f9] dark:bg-gray-700 text-[#64748b] dark:text-gray-300'
                            }`}
                          >
                            {letra}
                          </span>
                          <span className="text-[#1e293b] dark:text-gray-100 leading-relaxed pt-1">
                            {texto}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dica */}
                {dicaVisivel && (
                  <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Dica</h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200">{questao.dica}</p>
                        {questao.exemplo && (
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-2 italic">
                            Exemplo: {questao.exemplo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações por questão */}
                <div className="mt-6 pt-4 border-t border-[#e2e8f0] dark:border-gray-700 flex items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => toggleDica(questao.id)}
                    className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    💡 {dicaVisivel ? 'Ocultar Dica' : 'Ver Dica'}
                  </Button>

                  <span className="text-xs text-[#64748b] dark:text-gray-400">
                    {respostaSelecionada
                      ? 'Resposta selecionada'
                      : 'Ainda não respondida'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Finalizar geral */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={confirmarFinalizar}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 px-8 h-12"
          >
            <Check className="w-4 h-4 mr-2" />
            Finalizar Simulado
          </Button>
        </div>
      </div>

      {/* Dialog de Confirmação */}
      <Dialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <DialogContent className="dark:bg-[#1e293b] dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-gray-100">
              <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              Atenção
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Você respondeu {respostasDadas} de {questoes.length} questões. 
              {questoes.length - respostasDadas} questão(ões) ficará(ão) sem resposta.
              <br /><br />
              Deseja finalizar o simulador mesmo assim?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setMostrarConfirmacao(false)} className="dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
              Continuar Respondendo
            </Button>
            <Button 
              onClick={() => onFinalizar(respostas)}
              className="bg-[#1a5fb4] hover:bg-[#154a8c] dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Finalizar Mesmo Assim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
