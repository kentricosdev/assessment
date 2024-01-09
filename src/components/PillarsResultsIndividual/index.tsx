import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, Container, Result, ProgressBarContainer, ScoresContainer, TalkToUsCard, TalkToUsAction } from './styles';

const PillarCard: React.FC<{ pillarId: string; score: number }> = ({ pillarId, score }) => {
  const { pillarsData } = useForms();

  return (
    <Card>
      <CardTitle>Pilar {pillarId} - {pillarsData[Number(pillarId) - 1]?.nome}</CardTitle>

      <ProgressBarContainer>
        <CircularProgressbarWithChildren
          counterClockwise={true}
          strokeWidth={12}
          value={score}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `#16B8CC`,
            textColor: '#16B8CC',
            trailColor: '#E4E9F2',
          })}
        >
          <Result>{score}<span>/100</span></Result>
        </CircularProgressbarWithChildren>
      </ProgressBarContainer>
    </Card>
  );
};

const PillarsResultsIndividual: React.ForwardRefRenderFunction<HTMLDivElement> = ({}, ref) => {
  const { assessmentScoreIndividual, setIsContactModalOpen } = useForms();
  const { scoresByPillar } = assessmentScoreIndividual;

  return (
    <Container>
      <ScoresContainer>
        <div className="scoreWrapper" ref={ref}>
          {Object.entries(scoresByPillar).map(([pillarId, score]) => (
            <PillarCard key={pillarId} pillarId={pillarId} score={score} />
          ))}
        </div>

        <TalkToUsCard>
          <img src="/icons/rocket.png" alt="Rocket" />
          <p>Quer ir mais a fundo nessa análise?</p>
          <TalkToUsAction onClick={() => setIsContactModalOpen(true)}>
            Fale com a gente
          </TalkToUsAction>
        </TalkToUsCard>
      </ScoresContainer>
    </Container>
  );
};

export default React.forwardRef(PillarsResultsIndividual);
