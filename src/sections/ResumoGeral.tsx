import { useState } from 'react';
import { Trophy, Target, Check, Clock, Home, BarChart3, BookOpen, ChevronDown, ChevronUp, Minus, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { ResumoGeral as ResumoGeralType, Questao, ResultadoMateria } from '@/types';

interface ResumoGeralProps {
  resumo: ResumoGeralType;
  nomeUsuario: string;
  banca?: string;
  onVoltarInicio: () => void;
  onContinuarQuestionario?: () => void;
}

function getStatusIcon(questao: Questao, respostas: Record<number, string>) {
  const resposta = respostas[questao.id];
  if (!resposta) return <Minus className="w-5 h-5 text-gray-400 dark:text-gray-600" />;
  if (resposta === questao.respostaCorreta) return <Check className="w-5 h-5 text-green-500 dark:text-green-400" />;
  return <X className="w-5 h-5 text-red-500 dark:text-red-400" />;
}

function getStatusClass(questao: Questao, respostas: Record<number, string>) {
  const resposta = respostas[questao.id];
  if (!resposta) return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50';
  if (resposta === questao.respostaCorreta) return 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20';
  return 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20';
}

function QuestoesPorMateria({ materias }: { materias: ResultadoMateria[] }) {
  const [questaoAberta, setQuestaoAberta] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 mb-6 animate-slide-up transition-colors">
      <h2 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-[#1a5fb4] dark:text-blue-400" />
        Questões por matéria (acertos e erros)
      </h2>
      <div className="space-y-8">
        {materias.map((materia) => {
          const questoes = materia.questoes ?? [];
          const respostas = materia.respostas ?? {};
          if (questoes.length === 0) return null;

          return (
            <div key={materia.materiaId}>
              <h3 className="text-lg font-semibold text-[#1e293b] dark:text-gray-100 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                {materia.materiaNome} — {materia.resultado.acertos}/{materia.resultado.total} acertos
              </h3>
              <div className="space-y-3">
                {questoes.map((questao, index) => {
                  const resposta = respostas[questao.id];
                  const isCorreta = resposta === questao.respostaCorreta;
                  const chave = `${materia.materiaId}-${questao.id}`;
                  const isExpandida = questaoAberta === chave;

                  return (
                    <Collapsible key={chave} open={isExpandida} onOpenChange={() => setQuestaoAberta(isExpandida ? null : chave)}>
                      <div className={`border-2 rounded-xl overflow-hidden transition-all ${getStatusClass(questao, respostas)}`}>
                        <CollapsibleTrigger asChild>
                          <button className="w-full p-4 flex items-center gap-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex-shrink-0">{getStatusIcon(questao, respostas)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#1e293b] dark:text-gray-100 truncate">Questão {index + 1}: {questao.enunciado.substring(0, 55)}...</p>
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
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ResumoGeral({ resumo, nomeUsuario, banca, onVoltarInicio, onContinuarQuestionario }: ResumoGeralProps) {
  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    if (horas > 0) {
      return `${horas}h ${minutos}min ${segs}s`;
    }
    return `${minutos}min ${segs}s`;
  };

  const getMensagemGeral = () => {
    if (resumo.percentualGeral >= 80) return { texto: 'Desempenho Excepcional!', cor: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
    if (resumo.percentualGeral >= 60) return { texto: 'Bom Desempenho!', cor: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (resumo.percentualGeral >= 40) return { texto: 'Continue Estudando!', cor: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    return { texto: 'Não Desista!', cor: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const mensagem = getMensagemGeral();
  const temDados = resumo.materiasCompletadas.length > 0;

  return (
    <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-8 mb-6 animate-slide-up transition-colors">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${mensagem.bg} rounded-full mb-4`}>
              <Trophy className={`w-10 h-10 ${mensagem.cor}`} />
            </div>
            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-gray-100 mb-2">
              {temDados ? mensagem.texto : 'Seu relatório'}
            </h1>
            <p className="text-[#64748b] dark:text-gray-400">
              {temDados
                ? `Parabéns, ${nomeUsuario.split(' ')[0]}! Você completou todas as matérias do simulado.`
                : `Olá, ${nomeUsuario.split(' ')[0]}! Complete simulados para ver suas estatísticas aqui.`}
            </p>
            {banca && (
              <p className="mt-2 text-sm text-[#64748b] dark:text-gray-400">
                Simulado completo no estilo da banca <span className="font-semibold">{banca}</span>.
              </p>
            )}
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90 text-gray-200 dark:text-gray-700">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke={resumo.percentualGeral >= 60 ? '#2ec27e' : resumo.percentualGeral >= 40 ? '#ff7800' : '#e01b24'} 
                  strokeWidth="12" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeDasharray={`${(resumo.percentualGeral / 100) * 440} 440`} 
                  className="transition-all duration-1000" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#1e293b] dark:text-gray-100">{resumo.percentualGeral}%</span>
                <span className="text-sm text-[#64748b] dark:text-gray-400">aproveitamento geral</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#f8fafc] dark:bg-[#0f172a] rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#1a5fb4] dark:text-blue-400" />
                <span className="text-sm text-[#64748b] dark:text-gray-400">Total Questões</span>
              </div>
              <span className="text-2xl font-bold text-[#1e293b] dark:text-gray-100">{resumo.totalQuestoes}</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">Total Acertos</span>
              </div>
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">{resumo.totalAcertos}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Matérias</span>
              </div>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{resumo.materiasCompletadas.length}/{resumo.totalMaterias}</span>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-purple-700 dark:text-purple-300">Tempo Total</span>
              </div>
              <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatarTempo(resumo.tempoTotal)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 mb-6 animate-slide-up transition-colors" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1a5fb4] dark:text-blue-400" />
            Desempenho por Matéria
          </h2>

          <div className="space-y-3">
            {resumo.materiasCompletadas.map((materia) => (
              <div 
                key={materia.materiaId} 
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-1">
                      {materia.materiaNome}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[#64748b] dark:text-gray-400">
                        {materia.resultado.acertos}/{materia.resultado.total} acertos
                      </span>
                      <span className="text-[#64748b] dark:text-gray-400">
                        {formatarTempo(materia.tempoDecorrido)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        materia.resultado.percentual >= 80 ? 'text-green-600 dark:text-green-400' :
                        materia.resultado.percentual >= 60 ? 'text-blue-600 dark:text-blue-400' :
                        materia.resultado.percentual >= 40 ? 'text-amber-600 dark:text-amber-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {materia.resultado.percentual}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      materia.resultado.percentual >= 80 ? 'bg-green-500' :
                      materia.resultado.percentual >= 60 ? 'bg-blue-500' :
                      materia.resultado.percentual >= 40 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${materia.resultado.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questões por matéria (acertos e erros) */}
        {resumo.materiasCompletadas.some(m => (m.questoes?.length ?? 0) > 0) && (
          <QuestoesPorMateria materias={resumo.materiasCompletadas} />
        )}

        <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {onContinuarQuestionario && (
            <Button 
              onClick={onContinuarQuestionario}
              variant="outline"
              className="h-12 px-6 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Continuar questionário
            </Button>
          )}
          <Button 
            onClick={onVoltarInicio} 
            className="h-12 px-8 bg-[#1a5fb4] hover:bg-[#154a8c] dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </section>
  );
}
