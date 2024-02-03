import React, { useEffect, useState } from 'react';
import { pillarsExplanations } from '../../../components/ModalPillarExplanation/PillarsTexts';
import {  ModalContent, ExplanationText } from './styles/pillarExplanationStyles';

interface PillarComponentProps {
  pillarScore: number;
  PillarId: number;
}

const PillarExplanationPdf: React.FC<PillarComponentProps> = ({ pillarScore, PillarId }) => {
  const [pillarScoreText, setPillarScoreText] = useState('');
  const [pillarName, setPillarName] = useState('');

  useEffect(() => {
    const currentPillar = pillarsExplanations.pillars.find(pillar => pillar.id === PillarId)?.texts

    if (!currentPillar) return;

    switch (true) {
      case pillarScore >= 0 && pillarScore <= 19:
        setPillarScoreText(currentPillar[0])
        break;
      case pillarScore >= 20 && pillarScore <= 39:
        setPillarScoreText(currentPillar[1])
        break;
      case pillarScore >= 40 && pillarScore <= 59:
        setPillarScoreText(currentPillar[2])
        break;
      case pillarScore >= 60 && pillarScore <= 79:
        setPillarScoreText(currentPillar[3])
        break;
      case pillarScore >= 80 && pillarScore <= 100:
        setPillarScoreText(currentPillar[4])
        break;
      default:
        setPillarScoreText("Indefinido.");
    }

    switch (PillarId) {
      case 1:
        setPillarName('Compreensão')
        break;
      case 2:
        setPillarName('Medição')
        break;
      case 3:
        setPillarName('Design de Experiência')
        break;
      case 4:
        setPillarName('Cultura e EX')
        break;
      case 5:
        setPillarName('Governança')
        break;
      case 6:
        setPillarName('Estratégia')
        break;
      default:
        setPillarName('')
    }
  }, [])

  return (
    <ModalContent>
      <h2>{pillarName}</h2>
      <ExplanationText>{pillarScoreText}</ExplanationText>
    </ModalContent>
  )

};

export default PillarExplanationPdf;
