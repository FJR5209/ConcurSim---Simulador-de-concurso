import { GraduationCap, Moon, Sun, FileBarChart } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HeaderProps {
  usuario?: { nome: string } | null;
  onLimparDados?: () => void;
  onAbrirRelatorio?: () => void;
}

export function Header({ usuario, onLimparDados, onAbrirRelatorio }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1c3d6e] dark:bg-[#0f1f3a] z-50 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 dark:bg-white/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ConcurSim</span>
        </div>
        
        <div className="flex items-center gap-3">
          {usuario && (
            <>
              <span className="text-white/80 text-sm hidden sm:inline">
                Bem-vindo,
              </span>
              <span className="text-white font-medium text-sm">
                {usuario.nome.split(' ')[0]}
              </span>
              <div className="w-8 h-8 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
            </>
          )}

          {/* Botão Relatório */}
          {onAbrirRelatorio && (
            <button
              type="button"
              onClick={onAbrirRelatorio}
              className="w-9 h-9 rounded-lg border border-white/30 dark:border-white/40 flex items-center justify-center text-white hover:bg-white/10 dark:hover:bg-white/20 transition-colors"
              aria-label="Abrir relatório"
              title="Relatório"
            >
              <FileBarChart className="w-4 h-4" />
            </button>
          )}

          {/* Toggle Dark/Light Mode */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg border border-white/30 dark:border-white/40 flex items-center justify-center text-white hover:bg-white/10 dark:hover:bg-white/20 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {onLimparDados && (
            <button
              type="button"
              onClick={onLimparDados}
              className="ml-2 px-3 py-1 rounded-full border border-white/30 text-xs text-white/90 hover:bg-white/10 transition-colors"
            >
              Limpar dados
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
