import { IAssessmentAnswers } from "../types/globalTypes";

export const calculateScoresIndividual = (assessmentAnswers: IAssessmentAnswers) => {
  let totalScore = 0;
  const scoresByPillar: { [key: number]: number } = {};

  assessmentAnswers.respostasPessoa.forEach((answer) => {
    const pillarId = answer.pilarId;
    const pillarWeight = answer.pilarPeso;

    const pillarScore = answer.perguntas.reduce((acc, { resposta }) => {
      return acc + resposta.peso;
    }, 0);

    scoresByPillar[pillarId] = Math.round(pillarScore / answer.perguntas.length);

    totalScore += scoresByPillar[pillarId] * pillarWeight;
  });

  const normalizedTotalScore = Math.round(totalScore);
  const normalizedScoresByPillar = Object.fromEntries(
    Object.entries(scoresByPillar).map(([pilarId, score]) => [pilarId, Math.round(score)])
  );

  return { totalScore: normalizedTotalScore, scoresByPillar: normalizedScoresByPillar };
};
