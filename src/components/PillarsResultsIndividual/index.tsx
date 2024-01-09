import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, Container, Result, ProgressBarContainer, ScoresContainer, TalkToUsCard, TalkToUsAction, Dropdown } from './styles';
import { IoIosArrowDropdown  } from "react-icons/io";
import styled, { css } from 'styled-components';

interface ArrowProps {
  isModalOpen: boolean;
}

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const RotatingArrow = styled(IoIosArrowDropdown)<ArrowProps>`
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      transform: rotate(180deg);
      transition: transform 0.3s ease-in-out;
    `}
`;

  return (
    <Container>
      <Dropdown onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <RotatingArrow isDropdownOpen={isDropdownOpen} />
        Resultado Por pilar
      </Dropdown>
      <ScoresContainer isOpen={isDropdownOpen}>
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
