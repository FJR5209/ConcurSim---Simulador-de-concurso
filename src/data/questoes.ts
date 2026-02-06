import type { Questao, Materia, AreaConcurso } from '@/types';

export const areasConcurso: AreaConcurso[] = [
  { id: 'administrativo', nome: 'Administrativo', descricao: 'Área administrativa e gestão pública' },
  { id: 'ti', nome: 'Tecnologia da Informação', descricao: 'Analista de TI, desenvolvimento e infraestrutura' },
  { id: 'saude', nome: 'Saúde', descricao: 'Enfermagem, medicina e saúde pública' },
  { id: 'educacao', nome: 'Educação', descricao: 'Professor, pedagogia e educação básica' },
  { id: 'engenharia', nome: 'Engenharia', descricao: 'Engenharia civil, elétrica e mecânica' },
  { id: 'direito', nome: 'Direito', descricao: 'Advocacia pública, jurídica e legal' },
  { id: 'contabilidade', nome: 'Contabilidade', descricao: 'Contabilidade e finanças públicas' },
  { id: 'seguranca', nome: 'Segurança Pública', descricao: 'Polícia, bombeiros e defesa civil' },
];

export const materias: Materia[] = [
  { id: 'portugues', nome: 'Língua Portuguesa', icone: '📚', descricao: 'Gramática, interpretação e redação', cor: 'bg-blue-500' },
  { id: 'matematica', nome: 'Matemática', icone: '🔢', descricao: 'Aritmética, álgebra e geometria', cor: 'bg-green-500' },
  { id: 'raciocinio', nome: 'Raciocínio Lógico', icone: '🧩', descricao: 'Lógica proposicional e sequências', cor: 'bg-purple-500' },
  { id: 'informatica', nome: 'Informática', icone: '💻', descricao: 'Windows, Office e internet', cor: 'bg-cyan-500' },
  { id: 'constitucional', nome: 'Direito Constitucional', icone: '⚖️', descricao: 'Constituição e direitos fundamentais', cor: 'bg-red-500' },
  { id: 'administrativo', nome: 'Direito Administrativo', icone: '🏛️', descricao: 'Administração pública e atos administrativos', cor: 'bg-orange-500' },
  { id: 'adm_geral', nome: 'Administração Geral', icone: '📊', descricao: 'Planejamento, organização e controle', cor: 'bg-indigo-500' },
  { id: 'especificos', nome: 'Conhecimentos Específicos', icone: '🎯', descricao: 'Conhecimentos técnicos da área', cor: 'bg-pink-500' },
];

export const questoes: Questao[] = [
  // LÍNGUA PORTUGUESA
  {
    id: 1,
    area: 'administrativo',
    materia: 'portugues',
    nivel: 'federal',
    enunciado: 'Assinale a alternativa em que o uso da crase está correto:',
    alternativas: {
      A: 'Refiro-me à aquele professor que todos conhecem.',
      B: 'Cheguei às oito horas da manhã para à reunião.',
      C: 'Fui à festa e encontrei-a à espera de alguém.',
      D: 'Entreguei o documento à secretária à qual me referi.',
      E: 'À medida que o tempo passava, à ansiedade aumentava.'
    },
    respostaCorreta: 'D',
    explicacao: 'A crase é correta em "à secretária" (preposição + artigo feminino) e em "à qual" (preposição + pronome relativo feminino). Nas outras alternativas: A) "àquele" não leva crase (pronome demonstrativo masculino); B) "às oito horas" está correto, mas "à reunião" está errado (deveria ser "à reunião" apenas se houvesse artigo, mas "para a reunião" é o correto); C) "à festa" está correto, mas "à espera" está errado ("à espera" é locução adverbial fixa, mas "a espera" sem crase é usado quando não há artigo definido); E) "À medida" é locução conjuntiva (correta), mas "à ansiedade" está errado.',
    dica: 'Use a crase quando houver a fusão da preposição "a" com o artigo definido feminino "a" ou com o pronome demonstrativo "aquele", "aquela", "aquilo".',
    exemplo: 'Fui à escola (a + a = à) | Entreguei à menina (a + a = à)'
  },
  {
    id: 2,
    area: 'administrativo',
    materia: 'portugues',
    nivel: 'estadual',
    enunciado: 'Qual é a classificação morfológica da palavra "mais" na frase: "Ela é a mais inteligente da turma"?',
    alternativas: {
      A: 'Conjunção aditiva',
      B: 'Advérbio de intensidade',
      C: 'Adjetivo',
      D: 'Pronome indefinido',
      E: 'Numeral ordinal'
    },
    respostaCorreta: 'B',
    explicacao: 'Na frase "Ela é a mais inteligente da turma", a palavra "mais" funciona como advérbio de intensidade, modificando o adjetivo "inteligente" e formando o superlativo relativo de superioridade.',
    dica: 'O advérbio "mais" intensifica o significado de adjetivos ou outros advérbios, formando graus comparativos ou superlativos.',
    exemplo: '"Mais alto" (comparativo) | "A mais bonita" (superlativo relativo) | "Muito mais" (intensidade do advérbio)'
  },
  {
    id: 3,
    area: 'administrativo',
    materia: 'portugues',
    nivel: 'municipal',
    enunciado: 'Assinale a alternativa em que há erro de concordância verbal:',
    alternativas: {
      A: 'Cerca de mil pessoas compareceram ao evento.',
      B: 'Mais de um candidato foi aprovado no concurso.',
      C: 'A maioria dos alunos estudaram para a prova.',
      D: 'Nós próprios fizemos o trabalho.',
      E: 'Vossa Excelência está convidado para a cerimônia.'
    },
    respostaCorreta: 'C',
    explicacao: 'A concordância correta é: "A maioria dos alunos estudou para a prova." O sujeito é "A maioria" (singular), portanto o verbo deve estar no singular. O complemento "dos alunos" não altera o número do sujeito.',
    dica: 'Com o sujeito "maioria", o verbo concorda com essa palavra (singular), a menos que haja ideia de reciprocidade ou quando "maioria" é usada no sentido de "maior parte" com ênfase nos elementos.',
    exemplo: 'A maioria votou a favor (singular) | A maioria dos deputados votaram a favor (plural - ênfase nos elementos)'
  },
  {
    id: 4,
    area: 'administrativo',
    materia: 'portugues',
    nivel: 'federal',
    enunciado: 'Na frase "O documento, embora importante, não foi entregue", o termo "embora importante" é uma oração:',
    alternativas: {
      A: 'Coordenada sindética adversativa',
      B: 'Subordinada adverbial concessiva reduzida de particípio',
      C: 'Subordinada adverbial concessiva reduzida de infinitivo',
      D: 'Subordinada adverbial concessiva reduzida de gerúndio',
      E: 'Subordinada substantiva objetiva direta'
    },
    respostaCorreta: 'B',
    explicacao: 'A oração "embora importante" é uma subordinada adverbial concessiva reduzida de particípio (oracional "embora seja importante" reduzida ao particípio "importante"). A conjunção "embora" introduz orações concessivas.',
    dica: 'Orações reduzidas são formas concisas que eliminam o verbo flexionado, usando infinitivo, gerúndio ou particípio.',
    exemplo: '"Embora cansado" = embora estivesse cansado (particípio) | "Chegando cedo" = quando chegasse cedo (gerúndio)'
  },
  {
    id: 5,
    area: 'administrativo',
    materia: 'portugues',
    nivel: 'estadual',
    enunciado: 'Qual das alternativas apresenta o uso correto do pronome oblíquo átono?',
    alternativas: {
      A: 'Não sei a quem me dirigir.',
      B: 'Entreguei-lhe o documento a ele.',
      C: 'Vi-o ontem na rua.',
      D: 'Disse-me que viria hoje.',
      E: 'Todas as alternativas estão corretas.'
    },
    respostaCorreta: 'E',
    explicacao: 'Todas as alternativas estão corretas. A) "me" é pronome oblíquo átono (dativo/indireto); B) "lhe" é pronome oblíquo átono (dativo/indireto); C) "o" é pronome oblíquo átono (acusativo/direto); D) "me" é pronome oblíquo átono (dativo/indireto).',
    dica: 'Pronomes oblíquos átonos são: me, te, se, o, a, lhe, nos, vos, os, as, lhes. Eles funcionam como complementos verbais.',
    exemplo: '"Me deu" (indireto) | "O vi" (direto) | "Lhe entreguei" (indireto)'
  },

  // MATEMÁTICA
  {
    id: 6,
    area: 'administrativo',
    materia: 'matematica',
    nivel: 'municipal',
    enunciado: 'Um funcionário público recebeu um reajuste salarial de 15%. Se seu salário anterior era de R$ 2.400,00, qual é o novo salário?',
    alternativas: {
      A: 'R$ 2.640,00',
      B: 'R$ 2.760,00',
      C: 'R$ 2.800,00',
      D: 'R$ 2.880,00',
      E: 'R$ 3.000,00'
    },
    respostaCorreta: 'B',
    explicacao: 'Cálculo: R$ 2.400,00 × 1,15 = R$ 2.760,00. Ou seja: 15% de 2.400 = 360, então 2.400 + 360 = 2.760.',
    dica: 'Para calcular aumento percentual, multiplique o valor original por (1 + percentual/100).',
    exemplo: 'Aumento de 20% em 1000: 1000 × 1,20 = 1200'
  },
  {
    id: 7,
    area: 'administrativo',
    materia: 'matematica',
    nivel: 'estadual',
    enunciado: 'Em uma repartição pública, 3 funcionários digitam 180 documentos em 4 horas. Quantos documentos 5 funcionários digitarão em 6 horas, mantendo o mesmo ritmo?',
    alternativas: {
      A: '360',
      B: '400',
      C: '450',
      D: '480',
      E: '540'
    },
    respostaCorreta: 'C',
    explicacao: 'Regra de três composta: Se 3 funcionários digitam 180 documentos em 4 horas, então 1 funcionário digita 60 documentos em 4 horas, ou seja, 15 documentos/hora. Portanto, 5 funcionários em 6 horas: 5 × 15 × 6 = 450 documentos.',
    dica: 'Em regra de três composta, identifique se as grandezas são diretamente ou inversamente proporcionais.',
    exemplo: 'Mais funcionários = mais documentos (direta) | Mais horas = mais documentos (direta)'
  },
  {
    id: 8,
    area: 'administrativo',
    materia: 'matematica',
    nivel: 'federal',
    enunciado: 'Um servidor aplicou R$ 10.000,00 em um fundo que rende juros simples de 2% ao mês. Qual será o montante após 6 meses?',
    alternativas: {
      A: 'R$ 10.200,00',
      B: 'R$ 11.000,00',
      C: 'R$ 11.200,00',
      D: 'R$ 12.000,00',
      E: 'R$ 12.200,00'
    },
    respostaCorreta: 'C',
    explicacao: 'Juros simples: J = C × i × t = 10.000 × 0,02 × 6 = 1.200. Montante = C + J = 10.000 + 1.200 = 11.200.',
    dica: 'Juros simples: J = C × i × t. Montante = Capital + Juros.',
    exemplo: 'C = 1000, i = 10% a.m., t = 3 meses: J = 1000 × 0,10 × 3 = 300'
  },
  {
    id: 9,
    area: 'administrativo',
    materia: 'matematica',
    nivel: 'municipal',
    enunciado: 'Qual é o valor de 25% de 40% de 200?',
    alternativas: {
      A: '10',
      B: '15',
      C: '20',
      D: '25',
      E: '30'
    },
    respostaCorreta: 'C',
    explicacao: 'Cálculo: 25% de 40% de 200 = 0,25 × 0,40 × 200 = 0,10 × 200 = 20.',
    dica: '"De" em matemática geralmente significa multiplicação. Converta porcentagens para decimais.',
    exemplo: '20% de 50 = 0,20 × 50 = 10'
  },
  {
    id: 10,
    area: 'administrativo',
    materia: 'matematica',
    nivel: 'estadual',
    enunciado: 'Um terreno foi dividido em 4 lotes iguais. Se 3 lotes foram vendidos, que fração do terreno restou?',
    alternativas: {
      A: '1/4',
      B: '1/3',
      C: '3/4',
      D: '2/3',
      E: '1/2'
    },
    respostaCorreta: 'A',
    explicacao: 'Se o terreno foi dividido em 4 lotes iguais e 3 foram vendidos, restou 1 lote. Portanto, restou 1/4 do terreno.',
    dica: 'Em problemas de frações, identifique o total de partes e quantas partes estão sendo consideradas.',
    exemplo: 'Dividir em 5 partes e usar 2: representa 2/5'
  },

  // RACIOCÍNIO LÓGICO
  {
    id: 11,
    area: 'administrativo',
    materia: 'raciocinio',
    nivel: 'federal',
    enunciado: 'Se todos os A são B, e alguns B são C, então:',
    alternativas: {
      A: 'Todos os A são C',
      B: 'Alguns A são C',
      C: 'Nenhum A é C',
      D: 'Não se pode determinar a relação entre A e C',
      E: 'Todos os C são A'
    },
    respostaCorreta: 'D',
    explicacao: 'Não há informação suficiente para determinar a relação entre A e C. Os A estão contidos em B, e há uma interseção entre B e C, mas não sabemos se essa interseção inclui algum A.',
    dica: 'Em silogismos lógicos, analise cuidadosamente as premissas antes de concluir.',
    exemplo: 'Todos os gatos são mamíferos. Alguns mamíferos são aquáticos. Não podemos afirmar que alguns gatos são aquáticos.'
  },
  {
    id: 12,
    area: 'administrativo',
    materia: 'raciocinio',
    nivel: 'municipal',
    enunciado: 'Na sequência 2, 6, 12, 20, 30, ..., qual é o próximo número?',
    alternativas: {
      A: '36',
      B: '40',
      C: '42',
      D: '44',
      E: '48'
    },
    respostaCorreta: 'C',
    explicacao: 'A sequência segue o padrão: n×(n+1), onde n começa em 1. Ou seja: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
    dica: 'Procure padrões em sequências: diferenças entre termos, multiplicações, quadrados, etc.',
    exemplo: 'Sequência de quadrados: 1, 4, 9, 16, 25... (n²)'
  },
  {
    id: 13,
    area: 'administrativo',
    materia: 'raciocinio',
    nivel: 'estadual',
    enunciado: 'Se João é mais alto que Pedro, e Pedro é mais alto que Carlos, então:',
    alternativas: {
      A: 'João é mais baixo que Carlos',
      B: 'Carlos é mais alto que João',
      C: 'João é mais alto que Carlos',
      D: 'Pedro é mais alto que João',
      E: 'Não há relação de altura entre João e Carlos'
    },
    respostaCorreta: 'C',
    explicacao: 'Pela propriedade transitiva: se João > Pedro e Pedro > Carlos, então João > Carlos. Portanto, João é mais alto que Carlos.',
    dica: 'A relação "maior que" é transitiva: se A > B e B > C, então A > C.',
    exemplo: 'Se 5 > 3 e 3 > 1, então 5 > 1'
  },
  {
    id: 14,
    area: 'administrativo',
    materia: 'raciocinio',
    nivel: 'federal',
    enunciado: 'Em uma empresa, todos os analistas são formados em administração. Marcos é formado em administração. Logo:',
    alternativas: {
      A: 'Marcos é analista',
      B: 'Marcos não é analista',
      C: 'Marcos pode ser ou não analista',
      D: 'Todos os formados em administração são analistas',
      E: 'Nenhum formado em administração é analista'
    },
    respostaCorreta: 'C',
    explicacao: 'A premissa diz que todos os analistas são formados em administração, mas não que todos os formados em administração são analistas. Marcos pode ser analista ou não.',
    dica: 'Cuidado com a conversão indevida de proposições universais afirmativas.',
    exemplo: 'Todos os cachorros são mamíferos. X é mamífero. X pode ser ou não cachorro.'
  },
  {
    id: 15,
    area: 'administrativo',
    materia: 'raciocinio',
    nivel: 'municipal',
    enunciado: 'Complete a sequência lógica: AZ, BY, CX, DW, ___',
    alternativas: {
      A: 'EV',
      B: 'EU',
      C: 'FV',
      D: 'FU',
      E: 'EV'
    },
    respostaCorreta: 'A',
    explicacao: 'A sequência alterna entre avançar no alfabeto (A, B, C, D, E) e retroceder (Z, Y, X, W, V). Portanto, o próximo é EV.',
    dica: 'Em sequências alfabéticas, observe se há padrão de avanço, retrocesso ou combinação.',
    exemplo: 'AB, CD, EF, GH... (avanço de 2 em 2)'
  },

  // INFORMÁTICA
  {
    id: 16,
    area: 'administrativo',
    materia: 'informatica',
    nivel: 'municipal',
    enunciado: 'No Microsoft Excel, qual função é usada para calcular a média aritmética de um intervalo de células?',
    alternativas: {
      A: 'SOMA()',
      B: 'MÉDIA()',
      C: 'MEDIA()',
      D: 'AVERAGE()',
      E: 'MED()'
    },
    respostaCorreta: 'B',
    explicacao: 'No Excel em português, a função MÉDIA() calcula a média aritmética de um intervalo de células. A função AVERAGE() é a versão em inglês.',
    dica: 'No Excel PT-BR: MÉDIA() para média, SOMA() para soma, MÁXIMO() para máximo, MÍNIMO() para mínimo.',
    exemplo: '=MÉDIA(A1:A10) calcula a média das células de A1 a A10'
  },
  {
    id: 17,
    area: 'administrativo',
    materia: 'informatica',
    nivel: 'estadual',
    enunciado: 'Qual atalho do Windows é usado para copiar um texto selecionado?',
    alternativas: {
      A: 'Ctrl + X',
      B: 'Ctrl + C',
      C: 'Ctrl + V',
      D: 'Ctrl + Z',
      E: 'Ctrl + P'
    },
    respostaCorreta: 'B',
    explicacao: 'Ctrl + C é o atalho universal do Windows para copiar. Ctrl + X recorta, Ctrl + V cola, Ctrl + Z desfaz, Ctrl + P imprime.',
    dica: 'C de Copiar, X de cortar (parece uma tesoura), V de colar (parece uma ponta de cola).',
    exemplo: 'Selecione o texto → Ctrl + C → posicione o cursor → Ctrl + V'
  },
  {
    id: 18,
    area: 'administrativo',
    materia: 'informatica',
    nivel: 'federal',
    enunciado: 'No Microsoft Word, qual recurso permite criar uma lista numerada automaticamente?',
    alternativas: {
      A: 'Marcadores',
      B: 'Numeração de páginas',
      C: 'Numeração',
      D: 'Lista ordenada',
      E: 'Todas as alternativas estão corretas'
    },
    respostaCorreta: 'C',
    explicacao: 'No Word, o recurso "Numeração" (localizado na guia Página Inicial) permite criar listas numeradas automaticamente.',
    dica: 'Word: "Marcadores" para lista com símbolos, "Numeração" para lista com números.',
    exemplo: '1. Item um\n2. Item dois\n3. Item três'
  },
  {
    id: 19,
    area: 'administrativo',
    materia: 'informatica',
    nivel: 'municipal',
    enunciado: 'Qual é a extensão padrão de arquivos do Microsoft Word?',
    alternativas: {
      A: '.txt',
      B: '.pdf',
      C: '.docx',
      D: '.xlsx',
      E: '.pptx'
    },
    respostaCorreta: 'C',
    explicacao: '.docx é a extensão padrão dos documentos do Microsoft Word (versões 2007 em diante). A extensão antiga era .doc.',
    dica: 'Word = .docx | Excel = .xlsx | PowerPoint = .pptx | PDF = .pdf',
    exemplo: 'documento.docx, planilha.xlsx, apresentacao.pptx'
  },
  {
    id: 20,
    area: 'administrativo',
    materia: 'informatica',
    nivel: 'estadual',
    enunciado: 'Qual protocolo é responsável pelo envio de e-mails na internet?',
    alternativas: {
      A: 'HTTP',
      B: 'FTP',
      C: 'SMTP',
      D: 'POP3',
      E: 'IMAP'
    },
    respostaCorreta: 'C',
    explicacao: 'SMTP (Simple Mail Transfer Protocol) é o protocolo padrão para envio de e-mails. POP3 e IMAP são para recebimento.',
    dica: 'SMTP = envio | POP3/IMAP = recebimento | HTTP = navegação web | FTP = transferência de arquivos.',
    exemplo: 'Ao clicar "Enviar" no e-mail, o SMTP é utilizado'
  },

  // DIREITO CONSTITUCIONAL
  {
    id: 21,
    area: 'administrativo',
    materia: 'constitucional',
    nivel: 'federal',
    enunciado: 'Segundo a Constituição Federal de 1988, qual é o prazo de vigência do estado de sítio?',
    alternativas: {
      A: '15 dias, prorrogável por igual período',
      B: '30 dias, prorrogável por igual período',
      C: '45 dias, prorrogável por igual período',
      D: '60 dias, prorrogável por igual período',
      E: '90 dias, prorrogável por igual período'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 139, CF/88: O estado de sítio não poderá exceder de trinta dias, prorrogável por igual período, uma vez.',
    dica: 'Estado de sítio: 30 dias, prorrogável uma vez. Estado de defesa: 30 dias, prorrogável uma vez.',
    exemplo: 'Decreto do Presidente → Aprovação do Congresso em 10 dias → Vigência de 30 dias'
  },
  {
    id: 22,
    area: 'administrativo',
    materia: 'constitucional',
    nivel: 'estadual',
    enunciado: 'A Constituição Federal de 1988 estabelece que a revisão constitucional deve ser feita por:',
    alternativas: {
      A: 'Decreto do Presidente da República',
      B: 'Emenda Constitucional',
      C: 'Lei Ordinária',
      D: 'Lei Complementar',
      E: 'Ato das Disposições Constitucionais Transitórias'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 60, CF/88: A Constituição poderá ser emendada mediante proposta de: I - um terço, no mínimo, dos membros da Câmara dos Deputados ou do Senado Federal; II - o Presidente da República; III - mais da metade das Assembleias Legislativas das unidades da Federação.',
    dica: 'Emenda Constitucional = alteração da Constituição. Lei Complementar = lei para matérias constitucionalmente previstas.',
    exemplo: 'EC 103/2019 alterou a Previdência Social'
  },
  {
    id: 23,
    area: 'administrativo',
    materia: 'constitucional',
    nivel: 'municipal',
    enunciado: 'Segundo a CF/88, qual é a idade mínima para ser Presidente da República?',
    alternativas: {
      A: '30 anos',
      B: '33 anos',
      C: '35 anos',
      D: '40 anos',
      E: '45 anos'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 14, § 3º, II, CF/88: A idade mínima de trinta e cinco anos para Presidente e Vice-Presidente da República.',
    dica: 'Presidente: 35 anos | Governador: 30 anos | Prefeito: 21 anos | Deputado: 21 anos | Senador: 35 anos.',
    exemplo: 'Para concorrer à Presidência, o candidato deve ter completado 35 anos até a posse'
  },
  {
    id: 24,
    area: 'administrativo',
    materia: 'constitucional',
    nivel: 'federal',
    enunciado: 'A Constituição Federal de 1988 garante como direito fundamental:',
    alternativas: {
      A: 'A propriedade privada absoluta',
      B: 'A greve apenas para servidores públicos',
      C: 'A inviolabilidade do direito à vida',
      D: 'A imunidade parlamentar irrestrita',
      E: 'A pena de morte em caso de guerra'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 5º, CF/88: "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida..."',
    dica: 'Direitos fundamentais estão no art. 5º da CF/88. A vida é o primeiro direito listado.',
    exemplo: 'Direito à vida, liberdade, igualdade, segurança, propriedade (art. 5º, CF/88)'
  },
  {
    id: 25,
    area: 'administrativo',
    materia: 'constitucional',
    nivel: 'estadual',
    enunciado: 'Segundo a CF/88, a União, os Estados, o Distrito Federal e os Municípios são:',
    alternativas: {
      A: 'Regiões administrativas',
      B: 'Entidades estatais',
      C: 'Entes federativos',
      D: 'Órgãos públicos',
      E: 'Autarquias federais'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 1º, CF/88: "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito..." Art. 18: "A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, todos autônomos..."',
    dica: 'Brasil é uma federação composta por entes federativos: União, Estados, DF e Municípios.',
    exemplo: 'Cada ente federativo tem autonomia política, administrativa e financeira'
  },

  // DIREITO ADMINISTRATIVO
  {
    id: 26,
    area: 'administrativo',
    materia: 'administrativo',
    nivel: 'municipal',
    enunciado: 'Segundo a Lei 8.112/90, o servidor público estável só perde o cargo em virtude de:',
    alternativas: {
      A: 'Decisão administrativa do chefe imediato',
      B: 'Sentença judicial transitada em julgado',
      C: 'Processo administrativo disciplinar',
      D: 'Vontade expressa do servidor',
      E: 'Todas as alternativas estão corretas'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 41, CF/88 e art. 18, Lei 8.112/90: O servidor estável só perderá o cargo em virtude de sentença judicial transitada em julgado ou de processo administrativo disciplinar.',
    dica: 'Estabilidade = proteção contra demissão arbitrária. Requer processo administrativo ou sentença judicial.',
    exemplo: 'Servidor estável só pode ser demitido após PAD (Processo Administrativo Disciplinar)'
  },
  {
    id: 27,
    area: 'administrativo',
    materia: 'administrativo',
    nivel: 'federal',
    enunciado: 'A Lei 8.112/90 estabelece que a jornada de trabalho dos servidores públicos federais é de:',
    alternativas: {
      A: '6 horas diárias',
      B: '8 horas diárias',
      C: '40 horas semanais',
      D: '44 horas semanais',
      E: 'Depende do cargo'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 96, Lei 8.112/90: A jornada de trabalho dos servidores federais é de quarenta horas semanais, salvo disposição especial.',
    dica: 'Jornada padrão: 40h semanais. Pode haver regimes especiais (20h, 30h, 36h) dependendo do cargo.',
    exemplo: 'Professor: 20h ou 40h | Médico: 20h ou 40h | Técnico administrativo: 40h'
  },
  {
    id: 28,
    area: 'administrativo',
    materia: 'administrativo',
    nivel: 'estadual',
    enunciado: 'Segundo a doutrina administrativista, qual é a característica que diferencia o ato administrativo do ato jurídico privado?',
    alternativas: {
      A: 'A bilateralidade',
      B: 'A precariedade',
      C: 'A unilateralidade',
      D: 'A onerosidade',
      E: 'A comutatividade'
    },
    respostaCorreta: 'C',
    explicacao: 'O ato administrativo é unilateral, ou seja, decorre da vontade única da Administração Pública, não necessitando de concordância do particular.',
    dica: 'Ato administrativo = unilateral, precário, autoexecutor. Ato jurídico privado = bilateral, estável.',
    exemplo: 'Multa de trânsito é unilateral: o agente aplica sem precisar da concordância do infrator'
  },
  {
    id: 29,
    area: 'administrativo',
    materia: 'administrativo',
    nivel: 'municipal',
    enunciado: 'A Lei 8.112/90 estabelece que o estágio probatório do servidor público federal tem duração de:',
    alternativas: {
      A: '1 ano',
      B: '2 anos',
      C: '3 anos',
      D: '4 anos',
      E: '5 anos'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 20, Lei 8.112/90: O estágio probatório terá a duração de três anos. Durante esse período, o servidor será acompanhado e avaliado quanto ao desempenho.',
    dica: 'Estágio probatório: 3 anos para federal. Estados e municípios podem ter prazos diferentes.',
    exemplo: 'Servidor nomeado → 3 anos de estágio probatório → Estabilidade (se aprovado)'
  },
  {
    id: 30,
    area: 'administrativo',
    materia: 'administrativo',
    nivel: 'federal',
    enunciado: 'Segundo a Lei 8.112/90, a licença para tratamento de saúde do servidor público federal pode ter duração de até:',
    alternativas: {
      A: '6 meses',
      B: '1 ano',
      C: '2 anos',
      D: '3 anos',
      E: 'Tempo indeterminado'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 83, Lei 8.112/90: A licença para tratamento de saúde será concedida pelo período de até dois anos, prorrogável por igual período.',
    dica: 'Licença saúde: até 2 anos, prorrogável por mais 2 anos. Após, pode haver aposentadoria por invalidez.',
    exemplo: 'Servidor com problema de saúde → atestados médicos → licença de até 2 anos'
  },

  // ADMINISTRAÇÃO GERAL
  {
    id: 31,
    area: 'administrativo',
    materia: 'adm_geral',
    nivel: 'estadual',
    enunciado: 'Segundo a teoria clássica da administração, quais são as funções administrativas segundo Henri Fayol?',
    alternativas: {
      A: 'Planejar, organizar, dirigir, controlar',
      B: 'Prever, organizar, comandar, coordenar, controlar',
      C: 'Planejar, executar, verificar, agir',
      D: 'Organizar, dirigir, coordenar, supervisionar',
      E: 'Prever, planejar, executar, controlar'
    },
    respostaCorreta: 'B',
    explicacao: 'Henri Fayol (1916) definiu as funções administrativas como: Prever (Prevoyance), Organizar (Organiser), Comandar (Commander), Coordenar (Coordonner) e Controlar (Contrôler).',
    dica: 'Fayol = POCCC: Prever, Organizar, Comandar, Coordenar, Controlar.',
    exemplo: 'Prever: planejar o futuro | Organizar: estruturar recursos | Comandar: liderar | Coordenar: harmonizar | Controlar: verificar resultados'
  },
  {
    id: 32,
    area: 'administrativo',
    materia: 'adm_geral',
    nivel: 'municipal',
    enunciado: 'No ciclo PDCA (Deming), a letra "C" significa:',
    alternativas: {
      A: 'Criar',
      B: 'Controlar',
      C: 'Checar (verificar)',
      D: 'Corrigir',
      E: 'Coordenar'
    },
    respostaCorreta: 'C',
    explicacao: 'PDCA = Plan (Planejar), Do (Executar), Check (Verificar/Checar), Act (Agir). O "Check" é a verificação dos resultados.',
    dica: 'PDCA = Planejar, Executar, Checar, Agir. Também conhecido como ciclo de Deming.',
    exemplo: 'Planejar meta → Executar ação → Checar resultado → Agir (corrigir ou padronizar)'
  },
  {
    id: 33,
    area: 'administrativo',
    materia: 'adm_geral',
    nivel: 'federal',
    enunciado: 'Segundo a teoria de Frederick Taylor, a administração científica busca:',
    alternativas: {
      A: 'Aumentar a satisfação dos funcionários',
      B: 'Substituir a experiência empírica pelo método científico',
      C: 'Promover a democracia organizacional',
      D: 'Eliminar a hierarquia nas organizações',
      E: 'Fomentar a criatividade individual'
    },
    respostaCorreta: 'B',
    explicacao: 'Taylor (1911) propôs a Administração Científica, que substitui o "trabalho empírico" (baseado na experiência) pelo "trabalho científico" (baseado em estudos e métodos).',
    dica: 'Taylor = Administração Científica = substituir o "jeitinho" pelo método científico.',
    exemplo: 'Estudar o tempo de cada movimento para otimizar a produção'
  },
  {
    id: 34,
    area: 'administrativo',
    materia: 'adm_geral',
    nivel: 'estadual',
    enunciado: 'Na teoria burocrática de Max Weber, a autoridade baseada em regras e leis é chamada de:',
    alternativas: {
      A: 'Autoridade carismática',
      B: 'Autoridade tradicional',
      C: 'Autoridade racional-legal',
      D: 'Autoridade pessoal',
      E: 'Autoridade técnica'
    },
    respostaCorreta: 'C',
    explicacao: 'Weber definiu três tipos de autoridade: carismática (baseada na personalidade), tradicional (baseada no costume) e racional-legal (baseada em regras e leis).',
    dica: 'Weber: Carismática (líder) | Tradicional (costumes) | Racional-legal (leis e normas).',
    exemplo: 'Autoridade do presidente: racional-legal (baseada na Constituição)'
  },
  {
    id: 35,
    area: 'administrativo',
    materia: 'adm_geral',
    nivel: 'municipal',
    enunciado: 'Segundo a teoria das relações humanas (Elton Mayo), o fator mais importante para a produtividade é:',
    alternativas: {
      A: 'A remuneração financeira',
      B: 'As condições físicas de trabalho',
      C: 'As relações sociais e o sentimento de pertencimento',
      D: 'A fiscalização rigorosa',
      E: 'A especialização das tarefas'
    },
    respostaCorreta: 'C',
    explicacao: 'As experiências de Hawthorne (Mayo, 1927-1932) demonstraram que fatores sociais e psicológicos (relações humanas, reconhecimento, pertencimento) influenciam mais a produtividade que condições físicas.',
    dica: 'Mayo = Relações Humanas = o ser humano é social, não apenas econômico.',
    exemplo: 'Funcionários mais produtivos quando se sentem valorizados e parte de um grupo'
  },

  // CONHECIMENTOS ESPECÍFICOS - TI
  {
    id: 36,
    area: 'ti',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Qual é a camada do modelo OSI responsável pelo roteamento de pacotes entre redes diferentes?',
    alternativas: {
      A: 'Camada de Transporte',
      B: 'Camada de Rede',
      C: 'Camada de Enlace',
      D: 'Camada de Sessão',
      E: 'Camada de Aplicação'
    },
    respostaCorreta: 'B',
    explicacao: 'A Camada de Rede (Layer 3) é responsável pelo endereçamento lógico (IP) e roteamento de pacotes entre diferentes redes.',
    dica: 'OSI: 1-Física, 2-Enlace, 3-Rede, 4-Transporte, 5-Sessão, 6-Apresentação, 7-Aplicação.',
    exemplo: 'Roteadores operam na camada 3 (Rede) para interconectar redes diferentes'
  },
  {
    id: 37,
    area: 'ti',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Em SQL, qual comando é usado para modificar dados existentes em uma tabela?',
    alternativas: {
      A: 'INSERT',
      B: 'UPDATE',
      C: 'DELETE',
      D: 'ALTER',
      E: 'MODIFY'
    },
    respostaCorreta: 'B',
    explicacao: 'O comando UPDATE é usado para modificar registros existentes. INSERT adiciona novos registros, DELETE remove registros, ALTER modifica a estrutura da tabela.',
    dica: 'SQL: INSERT (criar), UPDATE (modificar), DELETE (remover), SELECT (consultar).',
    exemplo: 'UPDATE funcionarios SET salario = 5000 WHERE id = 1;'
  },
  {
    id: 38,
    area: 'ti',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Qual protocolo é utilizado para transferência segura de arquivos na internet?',
    alternativas: {
      A: 'HTTP',
      B: 'FTP',
      C: 'SFTP',
      D: 'SMTP',
      E: 'POP3'
    },
    respostaCorreta: 'C',
    explicacao: 'SFTP (SSH File Transfer Protocol) é o protocolo seguro para transferência de arquivos, usando criptografia SSH. FTP é inseguro (sem criptografia).',
    dica: 'S de Secure/Seguro: SFTP, HTTPS, SSH. Protocolos com criptografia.',
    exemplo: 'SFTP usa porta 22, FTP usa porta 21'
  },
  {
    id: 39,
    area: 'ti',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Em programação orientada a objetos, qual conceito permite que uma classe herde atributos e métodos de outra classe?',
    alternativas: {
      A: 'Encapsulamento',
      B: 'Polimorfismo',
      C: 'Herança',
      D: 'Abstração',
      E: 'Modularização'
    },
    respostaCorreta: 'C',
    explicacao: 'Herança é o mecanismo pelo qual uma classe (subclasse) pode estender outra classe (superclasse), herdando seus atributos e métodos.',
    dica: 'POO: Herança (é um), Encapsulamento (proteção), Polimorfismo (várias formas), Abstração (simplificação).',
    exemplo: 'class Cachorro extends Animal { ... } // Cachorro herda de Animal'
  },
  {
    id: 40,
    area: 'ti',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Qual é a principal função de um firewall em uma rede de computadores?',
    alternativas: {
      A: 'Acelerar a conexão com a internet',
      B: 'Bloquear vírus e malware',
      C: 'Controlar o tráfego de rede baseado em regras de segurança',
      D: 'Fazer backup dos dados',
      E: 'Compactar arquivos para economizar espaço'
    },
    respostaCorreta: 'C',
    explicacao: 'Firewall controla o tráfego de rede permitindo ou bloqueando conexões baseado em regras de segurança pré-definidas.',
    dica: 'Firewall = porteiro da rede. Decide quem entra e quem sai.',
    exemplo: 'Firewall bloqueando portas não utilizadas ou IPs suspeitos'
  },

  // CONHECIMENTOS ESPECÍFICOS - SAÚDE
  {
    id: 41,
    area: 'saude',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Segundo o SUS, qual é o princípio que garante atendimento a todos os brasileiros, independentemente de contribuição previdenciária?',
    alternativas: {
      A: 'Equidade',
      B: 'Universalidade',
      C: 'Integralidade',
      D: 'Descentralização',
      E: 'Hierarquização'
    },
    respostaCorreta: 'B',
    explicacao: 'A Universalidade garante que todos os brasileiros tenham acesso aos serviços de saúde, sem vínculo com contribuição previdenciária.',
    dica: 'Princípios SUS: Universalidade (todos), Integralidade (completo), Equidade (prioridade aos mais necessitados).',
    exemplo: 'Cidadão brasileiro tem direito ao SUS mesmo sem ter trabalhado formalmente'
  },
  {
    id: 42,
    area: 'saude',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'De acordo com a Lei 8.080/90 (Lei Orgânica da Saúde), a atenção básica é caracterizada por:',
    alternativas: {
      A: 'Atendimento hospitalar de alta complexidade',
      B: 'Conjunto de ações de saúde individuais e coletivas',
      C: 'Apenas consultas médicas especializadas',
      D: 'Procedimentos cirúrgicos eletivos',
      E: 'Atendimento de urgência e emergência'
    },
    respostaCorreta: 'B',
    explicacao: 'Atenção básica é o conjunto de ações de saúde, individuais e coletivas, que inclui promoção, prevenção, diagnóstico, tratamento e reabilitação.',
    dica: 'Atenção Básica = porta de entrada do SUS. UBS, PSF, equipes de saúde da família.',
    exemplo: 'Consultas, vacinas, pré-natal, acompanhamento de doenças crônicas na UBS'
  },
  {
    id: 43,
    area: 'saude',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Qual é a classificação do grau de risco gestacional quando há diabetes prévia à gravidez?',
    alternativas: {
      A: 'Risco habitual',
      B: 'Risco alto',
      C: 'Risco habitual com agravamento',
      D: 'Alto risco obstétrico',
      E: 'Risco intermediário'
    },
    respostaCorreta: 'B',
    explicacao: 'Diabetes pré-gestacional é considerado fator de risco alto na gestação, pois aumenta as chances de complicações para mãe e feto.',
    dica: 'Alto risco: diabetes, hipertensão, gemelaridade, idade extrema, doenças cardíacas.',
    exemplo: 'Gestante com diabetes tipo 1 ou 2 antes da gravidez = acompanhamento especializado'
  },
  {
    id: 44,
    area: 'saude',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Segundo a Política Nacional de Atenção Básica, qual é a equipe mínima da Estratégia Saúde da Família?',
    alternativas: {
      A: 'Médico e enfermeiro',
      B: 'Médico, enfermeiro e auxiliar de enfermagem',
      C: 'Médico, enfermeiro, auxiliar de enfermagem e agente comunitário de saúde',
      D: 'Apenas agentes comunitários de saúde',
      E: 'Enfermeiro e técnico de enfermagem'
    },
    respostaCorreta: 'C',
    explicacao: 'A equipe mínima da ESF compreende: médico, enfermeiro, auxiliar/técnico de enfermagem e agentes comunitários de saúde (ACS).',
    dica: 'ESF: 1 médico, 1 enfermeiro, 1-2 auxiliares, 4-12 ACS (depende da população).',
    exemplo: 'Equipe de saúde da família atende 3.450 a 4.500 pessoas em uma área definida'
  },
  {
    id: 45,
    area: 'saude',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'De acordo com o Protocolo de Manchester, a cor vermelha na classificação de risco significa:',
    alternativas: {
      A: 'Não urgente - pode esperar',
      B: 'Pouco urgente - observação',
      C: 'Urgente - atendimento em 1 hora',
      D: 'Muito urgente - atendimento em 10 minutos',
      E: 'Emergência - atendimento imediato'
    },
    respostaCorreta: 'E',
    explicacao: 'No Protocolo de Manchester: Vermelho = Emergência (atendimento imediato), Laranja = Muito urgente, Amarelo = Urgente, Verde = Pouco urgente, Azul = Não urgente.',
    dica: 'Manchester: Vermelho (imediato), Laranja (10 min), Amarelo (1h), Verde (2h), Azul (4h).',
    exemplo: 'Parada cardiorrespiratória = vermelho (imediato) | Dor de garganta = verde ou azul'
  },

  // CONHECIMENTOS ESPECÍFICOS - EDUCAÇÃO
  {
    id: 46,
    area: 'educacao',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Segundo a LDB 9.394/96, a educação infantil atende crianças de:',
    alternativas: {
      A: '0 a 3 anos',
      B: '0 a 5 anos',
      C: '4 a 5 anos',
      D: '0 a 6 anos',
      E: '3 a 6 anos'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 29, LDB: A educação infantil, primeira etapa da educação básica, atende crianças até 5 (cinco) anos de idade.',
    dica: 'Educação Infantil: 0-5 anos (creche e pré-escola) | Ensino Fundamental: 6-14 anos.',
    exemplo: 'Creche: 0-3 anos | Pré-escola: 4-5 anos'
  },
  {
    id: 47,
    area: 'educacao',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'De acordo com o PNE 2014-2024, qual é a meta de investimento em educação em relação ao PIB?',
    alternativas: {
      A: '4% do PIB',
      B: '6% do PIB',
      C: '7% do PIB',
      D: '10% do PIB',
      E: '12% do PIB'
    },
    respostaCorreta: 'C',
    explicacao: 'Meta 20 do PNE: Elevar o investimento público em educação pública para, no mínimo, 7% do Produto Interno Bruto (PIB) do país.',
    dica: 'PNE Meta 20: 7% do PIB para educação (União: 4,5%, Estados: 1,5%, Municípios: 1%).',
    exemplo: 'Brasil deve investir 7% do PIB em educação até 2024'
  },
  {
    id: 48,
    area: 'educacao',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Segundo a LDB, o ensino fundamental tem duração de:',
    alternativas: {
      A: '8 anos',
      B: '9 anos',
      C: '10 anos',
      D: '11 anos',
      E: '12 anos'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 32, LDB: O ensino fundamental, segunda etapa da educação básica, tem duração de nove anos, iniciando-se aos seis anos de idade.',
    dica: 'Fundamental: 9 anos (6-14 anos) | Médio: 3 anos (15-17 anos).',
    exemplo: '1º ao 9º ano do ensino fundamental'
  },
  {
    id: 49,
    area: 'educacao',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Qual é a principal característica da pedagogia tradicional segundo Libânio?',
    alternativas: {
      A: 'Aprendizagem significativa e centrada no aluno',
      B: 'Educação bancária e transmissão de conhecimentos',
      C: 'Escola sem paredes e educação informal',
      D: 'Aprendizagem colaborativa e em grupo',
      E: 'Educação por projetos e interdisciplinaridade'
    },
    respostaCorreta: 'B',
    explicacao: 'A pedagogia tradicional é caracterizada pela educação bancária (Freire), onde o professor deposita conhecimentos no aluno passivo.',
    dica: 'Tradicional: professor ativo, aluno passivo, aula expositiva, memorização.',
    exemplo: 'Professor explica, aluno ouve e copia, prova memorizada'
  },
  {
    id: 50,
    area: 'educacao',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Segundo a BNCC, qual é a base curricular nacional comum para toda a educação básica?',
    alternativas: {
      A: 'Língua Portuguesa e Matemática',
      B: 'Língua Portuguesa, Matemática e Ciências',
      C: 'Áreas do conhecimento com competências e habilidades',
      D: 'Apenas o ensino fundamental',
      E: 'Somente disciplinas obrigatórias'
    },
    respostaCorreta: 'C',
    explicacao: 'A BNCC (Base Nacional Comum Curricular) define as competências e habilidades de todas as áreas do conhecimento para a educação básica.',
    dica: 'BNCC = competências + habilidades para todas as áreas do conhecimento.',
    exemplo: 'BNCC define o que alunos devem aprender em cada ano e área'
  },

  // CONHECIMENTOS ESPECÍFICOS - ENGENHARIA
  {
    id: 51,
    area: 'engenharia',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Em um projeto estrutural, qual é o principal fator de segurança considerado no dimensionamento de uma viga de concreto armado?',
    alternativas: {
      A: 'Resistência do aço apenas',
      B: 'Resistência do concreto apenas',
      C: 'Compatibilização das deformações do aço e do concreto',
      D: 'Peso próprio da estrutura apenas',
      E: 'Cargas acidentais máximas'
    },
    respostaCorreta: 'C',
    explicacao: 'No concreto armado, o fator de segurça principal é a compatibilização das deformações entre o aço (tração) e o concreto (compressão), garantindo o trabalho conjunto dos materiais.',
    dica: 'Concreto armado = concreto resiste à compressão + aço resiste à tração.',
    exemplo: 'Viga de concreto: concreto na parte superior (compressão), aço na inferior (tração)'
  },
  {
    id: 52,
    area: 'engenharia',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Qual é a norma técnica brasileira que estabelece os requisitos para projetos de estruturas de concreto?',
    alternativas: {
      A: 'NBR 6118',
      B: 'NBR 9050',
      C: 'NBR 5410',
      D: 'NBR 8160',
      E: 'NBR 13531'
    },
    respostaCorreta: 'A',
    explicacao: 'A NBR 6118 é a norma brasileira que estabelece os requisitos básicos para o projeto, execução e controle de estruturas de concreto.',
    dica: 'NBR 6118 = Projeto de estruturas de concreto. NBR 9050 = Acessibilidade. NBR 5410 = Instalações elétricas.',
    exemplo: 'Dimensionamento de vigas, pilares e lajes segue a NBR 6118'
  },
  {
    id: 53,
    area: 'engenharia',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Em topografia, qual instrumento é utilizado para medir ângulos horizontais e verticais?',
    alternativas: {
      A: 'Trena',
      B: 'Nível de bolha',
      C: 'Teodolito',
      D: 'GPS',
      E: 'Prisma'
    },
    respostaCorreta: 'C',
    explicacao: 'O teodolito é o instrumento topográfico utilizado para medir ângulos horizontais e verticais com precisão.',
    dica: 'Teodolito = ângulos | Nível = diferença de nível | Trena = distâncias | GPS = coordenadas.',
    exemplo: 'Teodolito é usado em levantamentos topográficos para definir ângulos de terreno'
  },
  {
    id: 54,
    area: 'engenharia',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Qual é o prazo de validade do ART (Anotação de Responsabilidade Técnica) para obras de pequeno porte?',
    alternativas: {
      A: '1 ano',
      B: '2 anos',
      C: '3 anos',
      D: '5 anos',
      E: '10 anos'
    },
    respostaCorreta: 'D',
    explicacao: 'Segundo o CREA, o ART para obras de pequeno porte tem validade de 5 anos. Para obras de grande porte, a validade é de 10 anos.',
    dica: 'ART: Pequeno porte = 5 anos | Grande porte = 10 anos.',
    exemplo: 'Reforma residencial = ART com 5 anos de validade'
  },
  {
    id: 55,
    area: 'engenharia',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Em saneamento básico, qual é o parâmetro que indica a quantidade de oxigênio disponível para a vida aquática?',
    alternativas: {
      A: 'DBO (Demanda Bioquímica de Oxigênio)',
      B: 'DQO (Demanda Química de Oxigênio)',
      C: 'OD (Oxigênio Dissolvido)',
      D: 'pH',
      E: 'Turbidez'
    },
    respostaCorreta: 'C',
    explicacao: 'O Oxigênio Dissolvido (OD) mede a quantidade de oxigênio disponível na água para a respiração dos organismos aquáticos.',
    dica: 'OD = oxigênio disponível | DBO = oxigênio consumido por matéria orgânica | DQO = oxigênio consumido por oxidantes químicos.',
    exemplo: 'Peixes precisam de OD mínimo de 5 mg/L para sobreviver'
  },

  // CONHECIMENTOS ESPECÍFICOS - DIREITO
  {
    id: 56,
    area: 'direito',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Segundo o CPC/2015, qual é o prazo para o réu apresentar resposta à inicial?',
    alternativas: {
      A: '10 dias',
      B: '15 dias',
      C: '20 dias',
      D: '30 dias',
      E: '45 dias'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 335, CPC/2015: O prazo para resposta do réu é de 15 (quinze) dias, contados da intimação da citação.',
    dica: 'CPC/2015: Resposta do réu = 15 dias | Contestação, reconvenção, arguição de impedimento.',
    exemplo: 'Réu citado → 15 dias para apresentar contestação'
  },
  {
    id: 57,
    area: 'direito',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'De acordo com o Código Penal, qual é a pena máxima para o crime de furto simples?',
    alternativas: {
      A: '1 ano de reclusão',
      B: '2 anos de reclusão',
      C: '4 anos de reclusão',
      D: '8 anos de reclusão',
      E: '12 anos de reclusão'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 155, CP: Furto simples tem pena de reclusão de 1 a 4 anos e multa. A pena máxima é de 4 anos.',
    dica: 'Furto simples: 1-4 anos | Furto qualificado: 2-8 anos | Roubo: 4-10 anos.',
    exemplo: 'Subtrair coisa móvel alheia sem violência = furto simples (até 4 anos)'
  },
  {
    id: 58,
    area: 'direito',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Segundo a Consolidação das Leis do Trabalho (CLT), qual é a duração máxima da jornada de trabalho?',
    alternativas: {
      A: '6 horas diárias',
      B: '8 horas diárias',
      C: '10 horas diárias',
      D: '44 horas semanais',
      E: '48 horas semanais'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 7º, XVI, CF/88 e art. 58, CLT: A duração normal do trabalho não excederá de oito horas diárias.',
    dica: 'Jornada máxima: 8h diárias | 44h semanais (6 dias) ou 40h semanais (5 dias).',
    exemplo: 'Trabalhador pode fazer 8h por dia, 5 dias por semana = 40h semanais'
  },
  {
    id: 59,
    area: 'direito',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'De acordo com o Código Civil, qual é o prazo de prescrição para cobrança de dívidas líquidas?',
    alternativas: {
      A: '2 anos',
      B: '3 anos',
      C: '5 anos',
      D: '10 anos',
      E: '20 anos'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 205, CC: Prescreve em cinco anos a pretensão à cobrança de dívidas líquidas constantes de instrumento público ou particular.',
    dica: 'Prescrição CC: Dívidas líquidas = 5 anos | Alimentos = 2 anos | Danos morais = 3 anos.',
    exemplo: 'Nota promissória não paga → prescreve em 5 anos'
  },
  {
    id: 60,
    area: 'direito',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Segundo o CPP, qual é o prazo máximo para a prisão temporária?',
    alternativas: {
      A: '5 dias',
      B: '10 dias',
      C: '15 dias',
      D: '30 dias',
      E: '45 dias'
    },
    respostaCorreta: 'A',
    explicacao: 'Art. 2º, Lei 7.960/89: A prisão temporária não excederá de 5 (cinco) dias, prorrogável por igual período em caso de extrema e comprovada necessidade.',
    dica: 'Prisão temporária: 5 dias, prorrogável por mais 5 = total 10 dias.',
    exemplo: 'Investigação de crime → prisão temporária para investigar (máx. 10 dias)'
  },

  // CONHECIMENTOS ESPECÍFICOS - CONTABILIDADE
  {
    id: 61,
    area: 'contabilidade',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Segundo as Normas Brasileiras de Contabilidade, qual é a equação patrimonial fundamental?',
    alternativas: {
      A: 'Ativo = Passivo + Patrimônio Líquido',
      B: 'Ativo = Passivo - Patrimônio Líquido',
      C: 'Ativo + Passivo = Patrimônio Líquido',
      D: 'Ativo - Passivo = Receitas',
      E: 'Passivo = Ativo + Patrimônio Líquido'
    },
    respostaCorreta: 'A',
    explicacao: 'A equação patrimonial fundamental é: Ativo = Passivo + Patrimônio Líquido. O Ativo representa os bens e direitos, o Passivo as obrigações, e o PL a diferença (patrimônio líquido).',
    dica: 'A = P + PL. Ativo é aplicado, Passivo + PL é a origem dos recursos.',
    exemplo: 'Bens de 100 = Dívidas de 60 + Patrimônio de 40'
  },
  {
    id: 62,
    area: 'contabilidade',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Em contabilidade pública, qual é o regime contábil adotado pela União, Estados e Municípios?',
    alternativas: {
      A: 'Regime de caixa',
      B: 'Regime de competência',
      C: 'Regime misto (caixa e competência)',
      D: 'Regime de caixa para receitas e competência para despesas',
      E: 'Regime de competência para receitas e caixa para despesas'
    },
    respostaCorreta: 'B',
    explicacao: 'A Lei 4.320/64 estabelece o regime de competência para a contabilidade pública, onde as receitas e despesas são registradas no exercício a que se referem, independentemente do recebimento ou pagamento.',
    dica: 'Contabilidade pública: regime de competência. Contabilidade privada: também competência (Lei 6.404/76).',
    exemplo: 'Serviço prestado em dezembro, pago em janeiro → despesa de dezembro'
  },
  {
    id: 63,
    area: 'contabilidade',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Qual é a finalidade do balancete de verificação na contabilidade?',
    alternativas: {
      A: 'Demonstrar o resultado do exercício',
      B: 'Verificar a igualdade entre débitos e créditos',
      C: 'Apresentar a posição financeira da entidade',
      D: 'Calcular o imposto de renda',
      E: 'Registrar as operações do dia a dia'
    },
    respostaCorreta: 'B',
    explicacao: 'O balancete de verificação é um relatório contábil que lista todas as contas com seus saldos devedores e credores, verificando se a soma dos débitos é igual à soma dos créditos.',
    dica: 'Balancete = verificação da igualdade débito = crédito. Não é demonstração contábil.',
    exemplo: 'Lista de contas: Caixa (D), Fornecedores (C), Capital (C)... total D = total C'
  },
  {
    id: 64,
    area: 'contabilidade',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Segundo a NBC T 16.9, qual é a característica da despesa empenhada?',
    alternativas: {
      A: 'Despesa já paga',
      B: 'Despesa já liquidada',
      C: 'Reserva de orçamento para futura despesa',
      D: 'Despesa que já consumiu o serviço',
      E: 'Despesa em processo de pagamento'
    },
    respostaCorreta: 'C',
    explicacao: 'O empenho é o ato que reserva a dotação orçamentária para uma despesa que se vai realizar. É a primeira fase da despesa pública.',
    dica: 'Fases da despesa pública: 1-Empenho (reserva), 2-Liquidação (verificação), 3-Pagamento.',
    exemplo: 'Empenho de 10.000 para compra de material de expediente'
  },
  {
    id: 65,
    area: 'contabilidade',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Em contabilidade de custos, qual método atribui apenas os custos variáveis aos produtos?',
    alternativas: {
      A: 'Custeio por absorção',
      B: 'Custeio variável (direto)',
      C: 'Custeio padrão',
      D: 'Custeio por atividade (ABC)',
      E: 'Custeio histórico'
    },
    respostaCorreta: 'B',
    explicacao: 'O custeio variável (ou direto) atribui apenas os custos variáveis aos produtos. Os custos fixos são tratados como despesas do período.',
    dica: 'Custeio variável: custos variáveis ao produto, custos fixos como despesa. Custeio por absorção: todos os custos ao produto.',
    exemplo: 'Matéria-prima (variável) vai para o produto | Aluguel da fábrica (fixo) = despesa'
  },

  // CONHECIMENTOS ESPECÍFICOS - SEGURANÇA PÚBLICA
  {
    id: 66,
    area: 'seguranca',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Segundo o Estatuto do Desarmamento (Lei 10.826/03), qual é o prazo de validade do registro de arma de fogo?',
    alternativas: {
      A: '1 ano',
      B: '3 anos',
      C: '5 anos',
      D: '10 anos',
      E: 'Vitalício'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 4º, Lei 10.826/03: O registro de arma de fogo tem validade de 5 (cinco) anos, devendo ser renovado nesse prazo.',
    dica: 'Registro de arma: 5 anos de validade. Renovação obrigatória.',
    exemplo: 'Cidadão com arma registrada deve renovar a cada 5 anos'
  },
  {
    id: 67,
    area: 'seguranca',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'De acordo com o Código de Processo Penal, qual é o prazo para o flagrante delito ser relaxado se não houver representação?',
    alternativas: {
      A: '12 horas',
      B: '24 horas',
      C: '48 horas',
      D: '72 horas',
      E: '5 dias'
    },
    respostaCorreta: 'B',
    explicacao: 'Art. 306, CPP: O flagrante será relaxado se, verificado o crime de ação penal pública, não for oferecida representação no prazo de 24 horas.',
    dica: 'Flagrante sem representação em 24h = relaxamento (libertação).',
    exemplo: 'Prisão em flagrante → 24h para representação ou o preso é solto'
  },
  {
    id: 68,
    area: 'seguranca',
    materia: 'especificos',
    nivel: 'federal',
    enunciado: 'Segundo a Lei 13.675/18 (Lei de Organizações Básicas da Polícia Civil), qual é a função da perícia criminal?',
    alternativas: {
      A: 'Prender criminosos',
      B: 'Realizar investigações policiais',
      C: 'Produzir provas técnicas e científicas',
      D: 'Julgar processos criminais',
      E: 'Aplicar penas'
    },
    respostaCorreta: 'C',
    explicacao: 'A perícia criminal tem como função produzir provas técnicas e científicas para subsidiar a investigação criminal e a Justiça.',
    dica: 'Perícia = prova técnica e científica. Não prende, não investiga, não julga.',
    exemplo: 'Perito coleta digitais, analisa DNA, examina documentos'
  },
  {
    id: 69,
    area: 'seguranca',
    materia: 'especificos',
    nivel: 'municipal',
    enunciado: 'Em defesa civil, qual é a escala que mede a intensidade dos terremotos?',
    alternativas: {
      A: 'Escala Beaufort',
      B: 'Escala Richter',
      C: 'Escala Fujita',
      D: 'Escala Mercalli',
      E: 'Escala Saffir-Simpson'
    },
    respostaCorreta: 'B',
    explicacao: 'A Escala Richter mede a magnitude (intensidade) dos terremotos com base na amplitude das ondas sísmicas.',
    dica: 'Richter = terremotos | Beaufort = vento | Fujita = tornados | Mercalli = efeitos sentidos | Saffir-Simpson = furacões.',
    exemplo: 'Terremoto de magnitude 7 na escala Richter'
  },
  {
    id: 70,
    area: 'seguranca',
    materia: 'especificos',
    nivel: 'estadual',
    enunciado: 'Segundo o Código Penal Militar, qual é a pena máxima para o crime de insubordinação?',
    alternativas: {
      A: 'Detenção de 6 meses',
      B: 'Detenção de 1 ano',
      C: 'Reclusão de 2 anos',
      D: 'Reclusão de 5 anos',
      E: 'Reclusão de 8 anos'
    },
    respostaCorreta: 'C',
    explicacao: 'Art. 158, CPM: A insubordinação tem pena de reclusão de seis meses a dois anos, se o fato não constituir crime mais grave.',
    dica: 'Insubordinação = desobediência a ordem superior. Pena: 6 meses a 2 anos.',
    exemplo: 'Militar que desobedece ordem direta do superior = insubordinação'
  }
];

export function getQuestoesPorFiltros(area: string, materia: string, nivel: string, quantidade: number = 10): Questao[] {
  let questoesFiltradas = questoes.filter(q => q.materia === materia);
  
  if (area !== 'todas') {
    questoesFiltradas = questoesFiltradas.filter(q => q.area === area || q.area === 'administrativo');
  }
  
  if (nivel !== 'todos') {
    questoesFiltradas = questoesFiltradas.filter(q => q.nivel === nivel);
  }
  
  // Embaralhar e retornar a quantidade solicitada
  const embaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
  return embaralhadas.slice(0, quantidade);
}

export function getMateriasPorArea(area: string): Materia[] {
  if (area === 'todas') {
    return materias;
  }
  
  // Para áreas específicas, retornar matérias relevantes
  const materiasPorArea: Record<string, string[]> = {
    administrativo: ['portugues', 'matematica', 'raciocinio', 'informatica', 'constitucional', 'administrativo', 'adm_geral'],
    ti: ['portugues', 'raciocinio', 'informatica', 'especificos'],
    saude: ['portugues', 'raciocinio', 'constitucional', 'especificos'],
    educacao: ['portugues', 'raciocinio', 'constitucional', 'especificos'],
    engenharia: ['portugues', 'matematica', 'raciocinio', 'especificos'],
    direito: ['portugues', 'constitucional', 'administrativo', 'especificos'],
    contabilidade: ['portugues', 'matematica', 'raciocinio', 'especificos'],
    seguranca: ['portugues', 'constitucional', 'administrativo', 'especificos'],
  };
  
  const idsPermitidos = materiasPorArea[area] || materias.map(m => m.id);
  return materias.filter(m => idsPermitidos.includes(m.id));
}
