import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, Container, Result, ProgressBarContainer, ScoresContainer, Dropdown } from './styles';
import { IoIosArrowDropdown  } from "react-icons/io";
import styled, { css } from 'styled-components';
import { IAssessmentScoreIndividualResponse } from '../../types/globalTypes';

interface ArrowProps {
  isModalOpen: string;
}

interface PillarsResultsComparativeProps {
  dropdownOpen: boolean;
  comparativeScore: IAssessmentScoreIndividualResponse;
  individualScores: IAssessmentScoreIndividualResponse
}

const PillarCard: React.FC<{ pillarId: string; score: number }> = ({ pillarId, score }) => {
  const { pillarsData } = useForms();
  console.log("score69:", score)
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

const PillarsResultsComparative: React.ForwardRefRenderFunction<HTMLDivElement, PillarsResultsComparativeProps> = ({ dropdownOpen, comparativeScore, individualScores }, ref) => {
  const scoresByPillarIndividual = individualScores.assessmentScore.scoresByPillar;

  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdownOpen);
  const RotatingArrow = styled(IoIosArrowDropdown)<ArrowProps>`
    transition: transform 0.3s ease-in-out;

    ${({ isdropdownopen }) =>
    isdropdownopen === "true" &&
    css`
      transform: rotate(180deg);
    `}
`;

  return (
    <Container>
      <Dropdown onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <RotatingArrow isdropdownopen={isDropdownOpen ? "true" : "false"} />
        Resultados Por pilar
      </Dropdown>
      <ScoresContainer isopen={isDropdownOpen ? "true" : "false"}>
        <div className="scoreWrapper" ref={ref}>
          {Object.entries(scoresByPillarIndividual).map(([pillarId, score]) => (
            <PillarCard key={pillarId} pillarId={pillarId} score={score} />
          ))}
        </div>

      </ScoresContainer>
    </Container>
  );
};

export default React.forwardRef(PillarsResultsComparative);