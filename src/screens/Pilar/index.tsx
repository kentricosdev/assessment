import React from 'react';
import PillarComponent from '../../components/PilarComponent';
import QuestionComponent from '../../components/QuestionComponent';

import { useForms } from '../../context/forms';
import useAssessmentRedirect from '../../hooks/assessmentRedirect';
import { Wrapper } from './styles';
import ExitModal from '../../components/ExitModal';
import { PillarData } from '../../types/globalTypes';
import Breadcrumb from '../../components/Breadcrumb';

interface PillarScreenProps {
  pillarData: PillarData;
}

const Pilar: React.FC<PillarScreenProps> = ({ pillarData }) => {
  const { handleExit, assessmentStep, pillarsData } = useForms();

  useAssessmentRedirect()

  const currentPillar = pillarsData.find((pillar) => pillar.ordem === assessmentStep);

  if (!currentPillar) {
    return null;
  }

  console.log("pillarsData in pilar screen:", pillarData)

  return (
    <Wrapper>
      <ExitModal confirmClear={handleExit} />

      <Breadcrumb />

      <PillarComponent
        title={currentPillar.nome}
        description={currentPillar.texto}
        ordem={currentPillar.ordem}
      />
      <QuestionComponent
        questions={currentPillar.questoes}
        currentPillar={currentPillar.ordem}
      />
    </Wrapper>
  );
};

export default Pilar;
