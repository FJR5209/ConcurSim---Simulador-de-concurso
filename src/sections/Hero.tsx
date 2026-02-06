import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { areasConcurso } from '@/data/questoes';
import type { Usuario } from '@/types';

interface HeroProps {
  onIniciar: (usuario: Usuario) => void;
}

const BANCAS = [
  'CESPE / CEBRASPE',
  'FGV',
  'FCC',
  'VUNESP',
  'QUADRIX',
  'IBFC',
  'IADES',
  'CESGRANRIO',
  'Outra / Genérica',
];

export function Hero({ onIniciar }: HeroProps) {
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [nivel, setNivel] = useState<'municipal' | 'estadual' | 'federal'>('municipal');
  const [banca, setBanca] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setErro('Por favor, informe seu nome');
      return;
    }
    if (!area) {
      setErro('Por favor, selecione uma área');
      return;
    }
    if (!banca) {
      setErro('Por favor, selecione a banca examinadora');
      return;
    }

    onIniciar({
      nome: nome.trim(),
      area,
      nivel,
      banca,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1c3d6e] via-[#1a5fb4] to-[#2563eb] flex items-center justify-center px-4 py-12 pt-24">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prepare-se para o Sucesso
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Simulador completo de questões de concursos públicos. 
            Todas as áreas, todos os níveis. Estude com questões reais e melhore sua performance.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl p-8 md:p-10 animate-slide-up transition-colors">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1a5fb4]/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#1a5fb4] dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1e293b] dark:text-gray-100">Iniciar Simulador</h2>
              <p className="text-sm text-[#64748b] dark:text-gray-400">Preencha seus dados para começar</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-[#1e293b] dark:text-gray-100 font-medium">
                Nome Completo
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setErro('');
                }}
                className="h-12 text-base border-2 border-[#e2e8f0] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-[#1a5fb4] dark:focus:border-blue-500 focus:ring-[#1a5fb4]/20 dark:focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Área do Concurso */}
            <div className="space-y-2">
              <Label htmlFor="area" className="text-[#1e293b] dark:text-gray-100 font-medium">
                Área do Concurso
              </Label>
              <div className="relative">
                <select
                  id="area"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    setErro('');
                  }}
                  className="w-full h-12 px-4 text-base border-2 border-[#e2e8f0] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:border-[#1a5fb4] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#1a5fb4]/20 dark:focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecione uma área</option>
                  {areasConcurso.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] dark:text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Nível */}
            <div className="space-y-2">
              <Label className="text-[#1e293b] dark:text-gray-100 font-medium">
                Nível do Concurso
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {(['municipal', 'estadual', 'federal'] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNivel(n)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      nivel === n
                        ? 'border-[#1a5fb4] dark:border-blue-500 bg-[#e8f4fd] dark:bg-blue-900/30 text-[#1a5fb4] dark:text-blue-400'
                        : 'border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#64748b] dark:text-gray-300 hover:border-[#1a5fb4]/50 dark:hover:border-blue-500/50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">{n}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Banca examinadora */}
            <div className="space-y-2">
              <Label htmlFor="banca" className="text-[#1e293b] dark:text-gray-100 font-medium">
                Banca Examinadora
              </Label>
              <div className="relative">
                <select
                  id="banca"
                  value={banca}
                  onChange={(e) => {
                    setBanca(e.target.value);
                    setErro('');
                  }}
                  className="w-full h-12 px-4 text-base border-2 border-[#e2e8f0] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:border-[#1a5fb4] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#1a5fb4]/20 dark:focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecione a banca</option>
                  {BANCAS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] dark:text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm animate-shake">
                {erro}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-[#1a5fb4] hover:bg-[#154a8c] dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Iniciar Simulador
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-[#e2e8f0] dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">✓</span>
              </div>
              <span className="text-sm text-[#64748b] dark:text-gray-400">Correção Instantânea</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">💡</span>
              </div>
              <span className="text-sm text-[#64748b] dark:text-gray-400">Dicas e Explicações</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">📊</span>
              </div>
              <span className="text-sm text-[#64748b] dark:text-gray-400">Estatísticas de Desempenho</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-white">70+</div>
            <div className="text-sm text-white/70">Questões</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-sm text-white/70">Áreas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-sm text-white/70">Níveis</div>
          </div>
        </div>
      </div>
    </section>
  );
}
