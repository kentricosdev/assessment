import React from 'react';
import { Next, Previous, Container, SeeResult } from './styles';
import { useForms } from '../../context/forms';

interface NavigationButtonsProps {
  onSeeResultClick: () => void;
  isOptionSelected: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onSeeResultClick, isOptionSelected }) => {
  const { handleAssessmentNextStep, handleAssessmentPreviousStep, assessmentStep, pillarsData } = useForms();
  const totalQuestions = pillarsData.reduce((total, pillar) => total + pillar.questoes.length, 0);

  return (
    <Container>
      <Previous onClick={handleAssessmentPreviousStep}>Voltar</Previous>
      {assessmentStep === totalQuestions ? (
        <SeeResult onClick={onSeeResultClick} disabled={!isOptionSelected}>Ver Resultado</SeeResult>
      ) : (
        <Next onClick={handleAssessmentNextStep} disabled={!isOptionSelected}>Próxima</Next>
      )}
    </Container>
  );
};

export default NavigationButtons;
