import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../../context/forms';
import { Card, CardTitle, Container, Result, IndividualPillarsContainer, ProgressBarContainer, ScoresContainer } from './styles/pillarsStyles';
import PillarExplanationPdf from './PillarExplanationPdf';

const PillarCard: React.FC<{ pillarId: string; score: number}> = ({ pillarId, score }) => {
  const { pillarsData } = useForms();

  return (
   <IndividualPillarsContainer>
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
      <PillarExplanationPdf pillarScore={score} PillarId={Number(pillarId)}/>
   </IndividualPillarsContainer>
  );
};

const IndividualPillarsPdf: React.FC = () => {
  const localScore = localStorage.getItem('assessmentScoreIndividual')
  const { scoresByPillar }: { scoresByPillar?: { [key: number]: number } } = localScore && JSON.parse(localScore);

  if (!scoresByPillar) return

  return (
    <Container>
      <ScoresContainer>
        <div className="scoreWrapper">
          {Object.entries(scoresByPillar).map(([pillarId, score]) => (
            <PillarCard key={pillarId} pillarId={pillarId} score={score} />
          ))}
        </div>
      </ScoresContainer>
    </Container>
  );
};

export default IndividualPillarsPdf;
