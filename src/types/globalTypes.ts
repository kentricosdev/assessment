
export interface PillarData {
  id: string;
  ordem: number;
  texto: string;
  nome: string;
  peso: number;
  questoes: QuestaoData[];
}

export interface PillarDataGet {
  ordem: number;
  texto: string;
  nome: string;
  peso: number;
  questoes: QuestaoData[];
}


export interface QuestaoData {
  id: string;
  ordem: number;
  texto: string;
  opcoes: OpcaoData[];
}

export interface QuestaoDataGet {
  ordem: number;
  texto: string;
  opcoes: OpcaoData[];
}

export interface OpcaoData {
  id: string;
  peso: number;
  texto: string;
}

export interface OpcaoDataGet {
  peso: number;
  texto: string;
}