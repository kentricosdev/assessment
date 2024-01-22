import React, { useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, CardSubtitle, Container, Result, ProgressBarContainer, ScoresContainer, Dropdown, ComparativeScore } from './styles';
import { IoIosArrowDropdown } from 'react-icons/io';
import styled, { css } from 'styled-components';
import { IAssessmentScoreIndividualResponse } from '../../types/globalTypes';

interface ArrowProps {
  isModalOpen: string;
}

interface PillarCardProps {
  pillarId: string;
  individualScore: number;
  comparativeScore: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillarId, individualScore, comparativeScore }) => {
  const { pillarsData } = useForms();

  return (
    <Card>
      <CardTitle>Pilar {pillarId} - {pillarsData[Number(pillarId) - 1]?.nome}</CardTitle>

      <ProgressBarContainer>
        <CircularProgressbarWithChildren
          counterClockwise={true}
          strokeWidth={12}
          value={individualScore > comparativeScore ? individualScore : comparativeScore}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `${individualScore > comparativeScore ? '#16B8CC' : '#184E77'}`,
            trailColor: '#E4E9F2'
          })}
        >
          <Result>{individualScore}<span>/100</span></Result>
          <CircularProgressbar
            value={individualScore < comparativeScore ? individualScore : comparativeScore}
            strokeWidth={12}
            counterClockwise={true}
            styles={buildStyles({
              rotation: 0.75,
              strokeLinecap: 'round',
              pathTransitionDuration: 0.5,
              pathColor: `${individualScore < comparativeScore ? '#16B8CC' : '#184E77'}`,
              trailColor: 'transparent',
            })}
          />
        </CircularProgressbarWithChildren>
      </ProgressBarContainer>

      <CardSubtitle>Xcore Mercado</CardSubtitle>
      <ComparativeScore>
        {comparativeScore}
        <span>
          /100
        </span>
      </ComparativeScore>
    </Card>
  );
};

interface PillarsResultsComparativeProps {
  dropdownOpen: boolean;
  comparativeScore: IAssessmentScoreIndividualResponse;
  individualScores: IAssessmentScoreIndividualResponse;
}

const PillarsResultsComparative: React.ForwardRefRenderFunction<HTMLDivElement, PillarsResultsComparativeProps> = ({ dropdownOpen, comparativeScore, individualScores }, ref) => {
  const scoresByPillarIndividual = individualScores.assessmentScore.scoresByPillar;
  const scoresByPillarComparative = comparativeScore.assessmentScore.scoresByPillar;

  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdownOpen);
  const RotatingArrow = styled(IoIosArrowDropdown)<ArrowProps>`
    transition: transform 0.3s ease-in-out;

    ${({ isdropdownopen }) =>
      isdropdownopen === 'true' &&
      css`
        transform: rotate(180deg);
      `}
  `;

  return (
    <Container>
      <Dropdown onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <RotatingArrow isdropdownopen={isDropdownOpen ? 'true' : 'false'} />
        Resultados Por pilar
      </Dropdown>
      <ScoresContainer isopen={isDropdownOpen ? 'true' : 'false'}>
        <div className="scoreWrapper" ref={ref}>
          {Object.entries(scoresByPillarIndividual).map(([pillarId, individualScore]) => (
            <PillarCard
              key={pillarId}
              pillarId={pillarId}
              individualScore={individualScore}
              comparativeScore={(scoresByPillarComparative as Record<string, number>)[pillarId] || 0}
            />
          ))}
        </div>
      </ScoresContainer>
    </Container>
  );
};

export default React.forwardRef(PillarsResultsComparative);
