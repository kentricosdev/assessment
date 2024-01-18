
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

export interface IAssessmentAnswers {
  respostasPessoa: {
      pilarId: number;
      pilarPeso: number;
      perguntas: {
          ordem: string;
          resposta: {
              peso: number;
          };
      }[];
  }[];
}

export interface IAssessmentScoreIndividual {
  totalScore: number;
  scoresByPillar: { [key: number]: number };
}

export interface IAssessmentScoreIndividualResponse {
  assessmentScore: IAssessmentScoreIndividual;
  setor: string;
}


export interface IPersonalFormData {
  fullName: string;
  company: string;
  email: string;
  sector: string;
  whatsapp: string;
  employeeQuantity: string;
  privacyPolicy: boolean;
  receiveContent: boolean;
  annualRevenue: string;
  maturityLevel: string;
}