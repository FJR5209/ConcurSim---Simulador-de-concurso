import { useState } from 'react';
import { ArrowLeft, RotateCcw, BookOpen, Home, Check, X, Minus, ChevronDown, ChevronUp, Trophy, Target, Clock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Questao, ResultadoQuiz } from '@/types';

interface ResultadosProps {
  questoes: Questao[];
  respostas: Record<number, string>;
  tempoDecorrido: number;
  nomeUsuario: string;
  banca?: string;
  resultado: ResultadoQuiz;
  onReiniciar: () => void;
  onNovaMateria: () => void;
  onVoltarInicio: () => void;
  onSeguirProxima?: () => void;
  temProximaMateria?: boolean;
  isGerandoProxima?: boolean;
}

export function Resultados({ 
  questoes, 
  respostas, 
  tempoDecorrido, 
  nomeUsuario,
  banca,
  resultado,
  onReiniciar, 
  onNovaMateria, 
  onVoltarInicio,
  onSeguirProxima,
  temProximaMateria = false,
  isGerandoProxima = false,
}: ResultadosProps) {
  const [questaoExpandida, setQuestaoExpandida] = useState<number | null>(null);

  const { total, acertos, erros, percentual } = resultado;

  const getMensagem = () => {
    if (percentual >= 80) return { texto: 'Excelente!', cor: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
    if (percentual >= 60) return { texto: 'Muito bom!', cor: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (percentual >= 40) return { texto: 'Continue estudando!', cor: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    return { texto: 'Não desista!', cor: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const mensagem = getMensagem();

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}min ${segs}s`;
  };

  const getStatusIcon = (questao: Questao) => {
    const resposta = respostas[questao.id];
    if (!resposta) return <Minus className="w-5 h-5 text-gray-400 dark:text-gray-600" />;
    if (resposta === questao.respostaCorreta) return <Check className="w-5 h-5 text-green-500 dark:text-green-400" />;
    return <X className="w-5 h-5 text-red-500 dark:text-red-400" />;
  };

  const getStatusClass = (questao: Questao) => {
    const resposta = respostas[questao.id];
    if (!resposta) return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50';
    if (resposta === questao.respostaCorreta) return 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20';
    return 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20';
  };

  return (
    <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <Button
            variant="ghost"
            onClick={onVoltarInicio}
            className="mb-4 text-[#64748b] dark:text-gray-400 hover:text-[#1e293b] dark:hover:text-gray-200 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-8 mb-6 animate-slide-up transition-colors">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${mensagem.bg} rounded-full mb-4`}>
              <Trophy className={`w-10 h-10 ${mensagem.cor}`} />
            </div>
            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-gray-100 mb-2">{mensagem.texto}</h1>
            <p className="text-[#64748b] dark:text-gray-400">
              Parabéns, {nomeUsuario.split(' ')[0]}! Você completou o simulador.
            </p>
            {banca && (
              <p className="mt-2 text-sm text-[#64748b] dark:text-gray-400">
                Prova simulada no estilo da banca <span className="font-semibold">{banca}</span>.
              </p>
            )}
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90 text-gray-200 dark:text-gray-700">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" />
                <circle cx="80" cy="80" r="70" stroke={percentual >= 60 ? '#2ec27e' : percentual >= 40 ? '#ff7800' : '#e01b24'} strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={`${(percentual / 100) * 440} 440`} className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#1e293b] dark:text-gray-100">{percentual}%</span>
                <span className="text-sm text-[#64748b] dark:text-gray-400">aproveitamento</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#f8fafc] dark:bg-[#0f172a] rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#1a5fb4] dark:text-blue-400" />
                <span className="text-sm text-[#64748b] dark:text-gray-400">Total</span>
              </div>
              <span className="text-2xl font-bold text-[#1e293b] dark:text-gray-100">{total || questoes.length}</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">Acertos</span>
              </div>
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">{acertos}</span>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-700 dark:text-red-300">Erros</span>
              </div>
              <span className="text-2xl font-bold text-red-700 dark:text-red-300">{erros}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Tempo</span>
              </div>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatarTempo(tempoDecorrido)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 mb-6 animate-slide-up transition-colors" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1a5fb4] dark:text-blue-400" />
            Correção das Questões
          </h2>

          <div className="space-y-4">
            {questoes.map((questao, index) => {
              const resposta = respostas[questao.id];
              const isCorreta = resposta === questao.respostaCorreta;
              const isExpandida = questaoExpandida === questao.id;

              return (
                <Collapsible key={questao.id} open={isExpandida} onOpenChange={() => setQuestaoExpandida(isExpandida ? null : questao.id)}>
                  <div className={`border-2 rounded-xl overflow-hidden transition-all ${getStatusClass(questao)}`}>
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-4 flex items-center gap-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="flex-shrink-0">{getStatusIcon(questao)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1e293b] dark:text-gray-100 truncate">Questão {index + 1}: {questao.enunciado.substring(0, 60)}...</p>
                          <div className="flex items-center gap-4 mt-1 text-sm">
                            <span className={isCorreta ? 'text-green-600 dark:text-green-400' : resposta ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>Sua resposta: {resposta || '-'}</span>
                            <span className="text-green-600 dark:text-green-400">Gabarito: {questao.respostaCorreta}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">{isExpandida ? <ChevronUp className="w-5 h-5 text-[#64748b] dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-[#64748b] dark:text-gray-400" />}</div>
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-2">Enunciado:</h4>
                            <p className="text-[#64748b] dark:text-gray-300">{questao.enunciado}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-2">Alternativas:</h4>
                            <div className="space-y-2">
                              {Object.entries(questao.alternativas).map(([letra, texto]) => {
                                const isRespostaUsuario = resposta === letra;
                                const isRespostaCorreta = questao.respostaCorreta === letra;
                                let classe = 'p-3 rounded-lg border ';
                                if (isRespostaCorreta) classe += 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
                                else if (isRespostaUsuario && !isRespostaCorreta) classe += 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
                                else classe += 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';

                                return (
                                  <div key={letra} className={classe}>
                                    <div className="flex items-center gap-3">
                                      <span className={`w-6 h-6 rounded flex items-center justify-center text-sm font-semibold ${isRespostaCorreta ? 'bg-green-500 dark:bg-green-600 text-white' : isRespostaUsuario ? 'bg-red-500 dark:bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{letra}</span>
                                      <span className="text-[#1e293b] dark:text-gray-100">{texto}</span>
                                      {isRespostaCorreta && <Check className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />}
                                      {isRespostaUsuario && !isRespostaCorreta && <X className="w-4 h-4 text-red-600 dark:text-red-400 ml-auto" />}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Explicação:</h4>
                            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">{questao.explicacao}</p>
                          </div>

                          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Dica:</h4>
                            <p className="text-amber-800 dark:text-amber-200 text-sm">{questao.dica}</p>
                          </div>

                          {questao.exemplo && (
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Exemplo:</h4>
                              <p className="text-purple-800 dark:text-purple-200 text-sm italic">{questao.exemplo}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {temProximaMateria && onSeguirProxima && (
            <Button 
              onClick={onSeguirProxima}
              disabled={isGerandoProxima}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              {isGerandoProxima ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando questões...</>
              ) : (
                <>Seguir para Próxima Matéria <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          )}
          <Button onClick={onReiniciar} variant="outline" className="flex-1 h-12 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
            <RotateCcw className="w-4 h-4 mr-2" />Tentar Novamente
          </Button>
          <Button onClick={onNovaMateria} variant="outline" className="flex-1 h-12 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
            <BookOpen className="w-4 h-4 mr-2" />Escolher Outra Matéria
          </Button>
          <Button onClick={onVoltarInicio} className="flex-1 h-12 bg-[#1a5fb4] hover:bg-[#154a8c] dark:bg-blue-700 dark:hover:bg-blue-600">
            <Home className="w-4 h-4 mr-2" />Voltar ao Início
          </Button>
        </div>
      </div>
    </section>
  );
}
