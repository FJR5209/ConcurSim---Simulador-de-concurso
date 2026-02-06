import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Questao } from '@/types';

// 1. Pega a chave do arquivo .env
const apiKeyFromEnv = (import.meta as any).env?.VITE_GEMINI_API_KEY ?? (import.meta as any).env?.VITE_AI_API_KEY ?? undefined;

// 2. Trava de segurança: Se não achar a chave, avisa no console
if (!apiKeyFromEnv) {
  console.error('ERRO CRÍTICO: Chave de API não encontrada no .env');
}

// Modelo: gemini-flash-latest (versão mais recente disponível)
const GEMINI_MODEL = (import.meta as any).env?.VITE_GEMINI_MODEL ?? 'gemini-flash-latest';

export interface GeminiConfig {
  apiKey: string;
  quantidade: number;
  dificuldade: 'facil' | 'medio' | 'dificil' | 'misto';
  banca?: string;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    const key = apiKey?.trim();
    if (!key) {
      throw new Error('Chave de API ausente. Verifique o arquivo .env');
    }
    
    // Inicializa o SDK do Google Generative AI
    this.genAI = new GoogleGenerativeAI(key);
    // Usa o modelo 1.5 Flash (O mais estável do plano gratuito)
    this.model = this.genAI.getGenerativeModel({ model: GEMINI_MODEL });
  }

  async gerarQuestoes(
    area: string,
    materia: string,
    nivel: string,
    config: Omit<GeminiConfig, 'apiKey'>
  ): Promise<Questao[]> {
    const prompt = this.construirPrompt(area, materia, nivel, config);
    const maxTentativas = 3;
    const delayInicial = 2000; // 2 segundos

    for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
      try {
        const result = await this.model.generateContent(prompt, {
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        });

        const response = await result.response;
        const textoResposta = response.text();

        if (!textoResposta) {
          throw new Error('Resposta vazia da API');
        }

        console.info('[GeminiService] Requisição gerarQuestoes OK');
        return this.parsearQuestoes(textoResposta, area, materia, nivel);
      } catch (error: any) {
        console.error('Erro detalhado do Gemini:', error);

        const msg = String(error?.message ?? '');
        const is503 = msg.includes('503') || msg.includes('overloaded');
        const is429 = msg.includes('429') || msg.includes('quota') || msg.includes('QUOTA');

        if (is429) {
          throw new Error('Limite gratuito excedido. Espere 1 minuto e tente de novo.');
        }

        if (is503 && tentativa < maxTentativas) {
          const esperar = delayInicial * tentativa;
          console.warn(`[GeminiService] Modelo sobrecarregado (503). Tentativa ${tentativa}/${maxTentativas}. Aguardando ${esperar / 1000}s...`);
          await new Promise((r) => setTimeout(r, esperar));
          continue;
        }

        if (is503) {
          throw new Error(
            'O servidor da IA está sobrecarregado no momento. Tente novamente em alguns minutos.'
          );
        }

        throw error;
      }
    }

    throw new Error('Não foi possível gerar as questões. Tente novamente em alguns minutos.');
  }

  private construirPrompt(
    area: string,
    materia: string,
    nivel: string,
    config: Omit<GeminiConfig, 'apiKey'>
  ): string {
    const mapaAreas: Record<string, string> = {
      administrativo: 'Administrativo',
      ti: 'Tecnologia da Informação',
      saude: 'Saúde',
      educacao: 'Educação',
      engenharia: 'Engenharia',
      direito: 'Direito',
      contabilidade: 'Contabilidade',
      seguranca: 'Segurança Pública',
    };

    const mapaMaterias: Record<string, string> = {
      portugues: 'Língua Portuguesa',
      matematica: 'Matemática',
      raciocinio: 'Raciocínio Lógico',
      informatica: 'Informática',
      constitucional: 'Direito Constitucional',
      administrativo: 'Direito Administrativo',
      adm_geral: 'Administração Geral',
      especificos: 'Conhecimentos Específicos',
    };

    const areaNome = mapaAreas[area] || area;
    const materiaNome = mapaMaterias[materia] || materia;
    const nivelNome = nivel.charAt(0).toUpperCase() + nivel.slice(1);
    const bancaInfo = config.banca ? `\n- Banca: ${config.banca}` : '';

    return `Gere ${config.quantidade} questões de múltipla escolha para concurso público brasileiro no formato JSON.

CONTEXTO:
- Área: ${areaNome}
- Matéria: ${materiaNome}
- Nível: ${nivelNome}
- Dificuldade: ${config.dificuldade}${bancaInfo}

REGRAS IMPORTANTES:
1. As questões devem ser no estilo de concursos públicos brasileiros e, se uma banca específica tiver sido informada, siga o padrão de prova dessa banca.
2. Cada questão deve ter EXATAMENTE 5 alternativas (A, B, C, D, E)
3. Apenas UMA alternativa deve estar correta
4. A explicação deve ser detalhada e didática
5. A dica deve ajudar a memorizar o conceito
6. Inclua exemplo prático quando relevante

FORMATO JSON OBRIGATÓRIO:
{
  "questoes": [
    {
      "enunciado": "Texto da questão",
      "alternativas": {
        "A": "Texto alternativa A",
        "B": "Texto alternativa B",
        "C": "Texto alternativa C",
        "D": "Texto alternativa D",
        "E": "Texto alternativa E"
      },
      "respostaCorreta": "A",
      "explicacao": "Explicação detalhada de por que a resposta está correta",
      "dica": "Dica mnemônica ou regra prática para memorizar",
      "exemplo": "Exemplo prático quando aplicável (pode ser omitido se não fizer sentido)"
    }
  ]
}

IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional, sem markdown, sem explicações fora do JSON.`;
  }

  private parsearQuestoes(
    texto: string,
    area: string,
    materia: string,
    nivel: string
  ): Questao[] {
    try {
      // Tentar extrair JSON do texto (mesmo que venha com markdown ou texto extra)
      const jsonMatch = texto.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('JSON não encontrado na resposta da IA.');
      }

      const jsonStr = jsonMatch[0];
      const data = JSON.parse(jsonStr);

      const questoesBrutas = Array.isArray(data.questoes) ? data.questoes : [];
      if (!questoesBrutas.length) {
        throw new Error('A IA não retornou nenhuma questão no formato esperado.');
      }

      const alternativasValidas = ['A', 'B', 'C', 'D', 'E'] as const;

      const questoesProcessadas: Questao[] = [];

      questoesBrutas.forEach((q: any, index: number) => {
        try {
          if (!q || typeof q !== 'object') {
            throw new Error('Questão inválida (tipo incorreto).');
          }

          if (!q.enunciado || typeof q.enunciado !== 'string') {
            throw new Error('Questão sem enunciado válido.');
          }

          if (!q.alternativas || typeof q.alternativas !== 'object') {
            throw new Error('Questão sem alternativas válidas.');
          }

          const alternativas: Questao['alternativas'] = {
            A: String(q.alternativas.A ?? ''),
            B: String(q.alternativas.B ?? ''),
            C: String(q.alternativas.C ?? ''),
            D: String(q.alternativas.D ?? ''),
            E: String(q.alternativas.E ?? ''),
          };

          // Garantir que todas as alternativas tenham texto
          if (
            !alternativas.A ||
            !alternativas.B ||
            !alternativas.C ||
            !alternativas.D ||
            !alternativas.E
          ) {
            throw new Error('Questão com alternativas incompletas.');
          }

          const respostaCorretaBruta = String(q.respostaCorreta ?? '').toUpperCase();
          if (!alternativasValidas.includes(respostaCorretaBruta as any)) {
            throw new Error('Questão com resposta correta inválida.');
          }

          const explicacao = q.explicacao && typeof q.explicacao === 'string'
            ? q.explicacao
            : 'Explicação não fornecida pela IA.';

          const dica = q.dica && typeof q.dica === 'string'
            ? q.dica
            : 'Dica não fornecida pela IA.';

          const exemplo = q.exemplo && typeof q.exemplo === 'string'
            ? q.exemplo
            : undefined;

          questoesProcessadas.push({
            id: Date.now() + index,
            area,
            materia,
            nivel: nivel as 'municipal' | 'estadual' | 'federal',
            enunciado: q.enunciado,
            alternativas,
            respostaCorreta: respostaCorretaBruta as Questao['respostaCorreta'],
            explicacao,
            dica,
            exemplo,
          });
        } catch (innerError) {
          // Descarta apenas a questão problemática, mantendo o restante
          console.warn('Questão descartada por formato inválido:', innerError, q);
        }
      });

      if (!questoesProcessadas.length) {
        throw new Error('Nenhuma questão válida foi gerada pela IA. Tente novamente.');
      }

      return questoesProcessadas;
    } catch (error) {
      console.error('Erro ao parsear questões:', error);
      console.log('Texto recebido:', texto);
      throw new Error('Não foi possível processar as questões geradas. Tente novamente.');
    }
  }

  // Valida se a API key está funcionando
  async validarApiKey(): Promise<boolean> {
    try {
      const result = await this.model.generateContent('Olá');
      await result.response;
      console.info('[GeminiService] validação de API key OK');
      return true;
    } catch (error: any) {
      console.error('Erro ao validar API key:', error);
      return false;
    }
  }
}

// Storage para API key
const STORAGE_KEY = 'concursim_gemini_api_key';

const isStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

export const GeminiStorage = {
  saveApiKey: (key: string) => {
    if (!isStorageAvailable()) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch (error) {
      console.error('Não foi possível salvar a API key no storage.', error);
    }
  },
  
  getApiKey: (): string | null => {
    // 1) Prioridade: .env via import.meta.env (VITE_GEMINI_API_KEY ou VITE_AI_API_KEY)
    const envKey = typeof apiKeyFromEnv === 'string' && apiKeyFromEnv.trim() ? apiKeyFromEnv.trim() : null;
    if (envKey) {
      return envKey;
    }

    // 2) Fallback: localStorage (se o usuário já salvou antes)
    if (isStorageAvailable()) {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && stored.trim()) return stored.trim();
      } catch {
        // ignora
      }
    }

    return null;
  },
  
  removeApiKey: () => {
    if (!isStorageAvailable()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Não foi possível remover a API key do storage.', error);
    }
  },
  
  hasApiKey: (): boolean => {
    const envKey = typeof apiKeyFromEnv === 'string' && apiKeyFromEnv.trim();
    if (envKey) return true;
    if (isStorageAvailable()) {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && stored.trim()) return true;
      } catch {
        // ignora
      }
    }
    return false;
  }
};
