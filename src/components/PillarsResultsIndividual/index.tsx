import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, Container, Result, ProgressBarContainer, ScoresContainer, TalkToUsCard, TalkToUsAction } from './styles';

const PillarsResultsIndividual: React.FC = () => {
  const { assessmentScoreIndividual, pillarsData } =  useForms();
  const { scoresByPillar } = assessmentScoreIndividual;

  return (
    <Container>
      <ScoresContainer>
        <div style={{display: 'flex', gap: '25px', flexWrap: 'wrap'}}>
          {Object.entries(scoresByPillar).map(([pillarId, score]) => (
            <Card key={pillarId}>
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
                  trailColor: '#E4E9F2'
                })}
              >
                <Result>{score}<span>/100</span></Result>
                </CircularProgressbarWithChildren>
              </ProgressBarContainer>
            </Card>
          ))}
        </div>

        <TalkToUsCard>
          <img src="/icons/rocket.png" />
          <p>Quer ir mais a fundo nessa análise?</p>

          <TalkToUsAction>
            Fale com a gente
          </TalkToUsAction>
        </TalkToUsCard>
      </ScoresContainer>

    </Container>
  );
};

export default PillarsResultsIndividual;
