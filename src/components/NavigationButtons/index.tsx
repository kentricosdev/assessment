import React from 'react';
import { Next, Previous, Container, SeeResult } from './styles';

import { useForms } from '../../context/forms';

interface NavigationButtonsProps {
  onSeeResultClick: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onSeeResultClick }) => {
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
