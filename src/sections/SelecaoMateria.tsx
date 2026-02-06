import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Usuario } from '@/types';
import { getMateriasPorArea } from '@/data/questoes';
import { GeminiStorage } from '@/services/geminiService';

interface SelecaoMateriaProps {
  usuario: Usuario;
  onSelecionarMateria: (materiaId: string) => void;
  onVoltar: () => void;
  onGerarQuestoes: () => void;
}

export function SelecaoMateria({ usuario, onSelecionarMateria, onVoltar, onGerarQuestoes }: SelecaoMateriaProps) {
  const materias = getMateriasPorArea(usuario.area);
  const hasApiKey = GeminiStorage.hasApiKey();

  const getNivelBadgeColor = (nivel: string) => {
    switch (nivel) {
      case 'municipal':
        return 'bg-blue-100 text-blue-700';
      case 'estadual':
        return 'bg-green-100 text-green-700';
      case 'federal':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-20 pb-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
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
                <h1 className="text-2xl font-bold text-[#1e293b] dark:text-gray-100">
                  Olá, {usuario.nome.split(' ')[0]}! 👋
                </h1>
                <p className="text-[#64748b] dark:text-gray-400 mt-1">
                  Escolha a matéria que deseja praticar
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getNivelBadgeColor(usuario.nivel)}`}>
                  {usuario.nivel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Opção de Gerar com IA */}
        <div className="mb-8 animate-slide-up">
          <button
            onClick={onGerarQuestoes}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    Gerar Questões com IA
                    {hasApiKey && (
                      <span className="px-2 py-0.5 bg-green-400 text-green-900 text-xs rounded-full">
                        Ativo
                      </span>
                    )}
                  </h3>
                  <p className="text-purple-100 text-sm mt-1">
                    Crie questões ilimitadas e personalizadas com inteligência artificial
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-purple-200">
                <span className="text-sm">Experimente</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[#e2e8f0] dark:bg-gray-700"></div>
          <span className="text-sm text-[#64748b] dark:text-gray-400 font-medium">Ou escolha uma matéria do banco de questões</span>
          <div className="flex-1 h-px bg-[#e2e8f0] dark:bg-gray-700"></div>
        </div>

        {/* Grid de Matérias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {materias.map((materia, index) => (
            <button
              key={materia.id}
              onClick={() => onSelecionarMateria(materia.id)}
              className="group bg-white dark:bg-[#1e293b] rounded-xl p-6 border-2 border-[#e2e8f0] dark:border-gray-700 hover:border-[#1a5fb4] dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${materia.cor} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {materia.icone}
                </div>
                <BookOpen className="w-5 h-5 text-[#e2e8f0] dark:text-gray-600 group-hover:text-[#1a5fb4] dark:group-hover:text-blue-400 transition-colors" />
              </div>
              
              <h3 className="font-semibold text-[#1e293b] dark:text-gray-100 mb-2 group-hover:text-[#1a5fb4] dark:group-hover:text-blue-400 transition-colors">
                {materia.nome}
              </h3>
              
              <p className="text-sm text-[#64748b] dark:text-gray-400 line-clamp-2">
                {materia.descricao}
              </p>
              
              <div className="mt-4 pt-4 border-t border-[#e2e8f0] dark:border-gray-700">
                <span className="text-xs text-[#64748b] dark:text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Disponível para prática
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Dica */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Dica de Estudo</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Alterne entre diferentes matérias para fixar melhor o conteúdo. 
                O simulador apresentará 10 questões aleatórias da matéria escolhida, 
                com correção detalhada e explicações ao final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
