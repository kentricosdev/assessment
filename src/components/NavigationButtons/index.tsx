import React from 'react';

import { useForms } from '../../context/forms';
import { Next, Previous, Container, SeeResult } from './styles';


interface NavigationButtonsProps {
  currentPillar: number;
  onSeeResultClick: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentPillar, onSeeResultClick }) => {
  const { handleAssessmentNextStep, handleAssessmentPreviousStep } = useForms();
  return (
    <Container>
      <Previous onClick={handleAssessmentPreviousStep}>Voltar</Previous>
      {currentPillar === 2 ? (
        <SeeResult onClick={onSeeResultClick}>Ver Resultado</SeeResult>
      ) : (
        <Next onClick={handleAssessmentNextStep}>Próxima</Next>
      )}
    </Container>
  );
};

export default NavigationButtons;
