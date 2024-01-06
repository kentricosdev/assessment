import React from 'react';

import QuestionComponent from '../../components/QuestionComponent';

import { useForms } from '../../context/forms';
import useAssessmentRedirect from '../../hooks/assessmentRedirect';
import { Wrapper } from './styles';
import ExitModal from '../../components/ExitModal';
import Breadcrumb from '../../components/Breadcrumb';
import PillarComponent from '../../components/PillarComponent';


const Pillar: React.FC = () => {
  const { handleExit, assessmentStep, pillarsData } = useForms();

  useAssessmentRedirect()

  const currentPillar = pillarsData.find((pillar) => pillar.ordem === assessmentStep);

  if (!currentPillar) {
    return null;
  }

  return (
    <Wrapper>
      <Breadcrumb />

      <PillarComponent
        title={currentPillar.nome}
        description={currentPillar.texto}
        ordem={currentPillar.ordem}
      />
      <QuestionComponent
        questions={currentPillar.questoes}
        currentPillar={currentPillar}
      />
    </Wrapper>
  );
};

export default Pillar;
