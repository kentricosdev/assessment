import React from 'react';

import { useForms } from '../../context/forms';
import { Next, Previous, Container, SeeResult } from './styles';


interface NavigationButtonsProps {
  currentPillar: number;
  onSeeResultClick: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentPillar, onSeeResultClick }) => {
  const { handleAssessmentNextStep, handleAssessmentPreviousStep, assessmentStep, pillarsData } = useForms();
  const totalQuestions = pillarsData.reduce((total, pillar) => total + pillar.questoes.length, 0);

  return (
    <Container>
      <Previous onClick={handleAssessmentPreviousStep}>Voltar</Previous>
      {assessmentStep === totalQuestions ? (
        <SeeResult onClick={onSeeResultClick}>Ver Resultado</SeeResult>
      ) : (
        <Next onClick={handleAssessmentNextStep}>Próxima</Next>
      )}
    </Container>
  );
};

export default NavigationButtons;
