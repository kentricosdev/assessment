import React from 'react';

import { useForms } from '../../context/forms';
import { Next, Previous, Container, SeeResult } from './styles';


interface NavigationButtonsProps {
  currentPillar: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentPillar }) => {
  const { handleAssessmentNextStep, handleAssessmentPreviousStep } = useForms();
  return (
    <Container>
      <Previous onClick={handleAssessmentPreviousStep}>Voltar</Previous>
      {
        currentPillar === 2 ? <SeeResult onClick={handleAssessmentNextStep}>Ver Resultado</SeeResult> : <Next onClick={handleAssessmentNextStep}>Próxima</Next>
      }
    </Container>
  );
};

export default NavigationButtons;
