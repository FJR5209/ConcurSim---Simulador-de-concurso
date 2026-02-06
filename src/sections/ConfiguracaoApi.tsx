import { useState, useEffect } from 'react';
import { Key, Check, AlertCircle, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { GeminiService, GeminiStorage } from '@/services/geminiService';

interface ConfiguracaoApiProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigurado: () => void;
}

export function ConfiguracaoApi({ isOpen, onClose, onConfigurado }: ConfiguracaoApiProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedKey = GeminiStorage.getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const validarKey = async () => {
    if (!apiKey.trim()) {
      setError('Por favor, insira uma API key');
      return;
    }

    setIsValidating(true);
    setError('');
    setIsValid(null);

    try {
      const service = new GeminiService(apiKey.trim());
      const valid = await service.validarApiKey();
      
      setIsValid(valid);
      
      if (valid) {
        GeminiStorage.saveApiKey(apiKey.trim());
        onConfigurado();
      } else {
        setError('API key inválida. Verifique e tente novamente.');
      }
    } catch (err) {
      setError('Erro ao validar API key. Verifique sua conexão.');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const removerKey = () => {
    GeminiStorage.removeApiKey();
    setApiKey('');
    setIsValid(null);
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Configurar API do Gemini
          </DialogTitle>
          <DialogDescription>
            Insira sua API key do Google Gemini para gerar questões ilimitadas com IA.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Como obter sua API Key:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Acesse <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google AI Studio</a></li>
                  <li>Faça login com sua conta Google</li>
                  <li>Clique em "Create API Key"</li>
                  <li>Copie a chave e cole aqui</li>
                </ol>
              </div>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Key do Gemini
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                placeholder="Cole sua API key aqui..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsValid(null);
                  setError('');
                }}
                className="pr-20"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748b] hover:text-[#1e293b]"
              >
                {showKey ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            {isValid === true && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                API key válida!
              </div>
            )}
          </div>

          {/* Status */}
          {GeminiStorage.hasApiKey() && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <Check className="w-4 h-4" />
                  API key configurada
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removerKey}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remover
                </Button>
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="text-xs text-[#64748b] bg-gray-50 rounded-lg p-3">
            <strong>🔒 Segurança:</strong> Sua API key é armazenada apenas no navegador (localStorage) 
            e nunca é enviada para nossos servidores. As questões são geradas diretamente pela API do Google.
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={validarKey}
            disabled={isValidating || !apiKey.trim()}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {isValidating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Validando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Salvar e Validar
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
