import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForms } from '../../context/forms';
import { Card, CardTitle, Container, Result, ProgressBarContainer, ScoresContainer, Dropdown, Action } from './styles';
import { IoIosArrowDropdown  } from "react-icons/io";
import styled, { css } from 'styled-components';
import ModalPillarExplanation from '../ModalPillarExplanation';
import { IoMdInformationCircleOutline } from 'react-icons/io';

interface ArrowProps {
  isModalOpen: string;
}

interface PillarsResultsIndividualProps {
  dropdownOpen: boolean;
}

const PillarCard: React.FC<{ pillarId: string; score: number, openModalExplanation: () => void }> = ({ pillarId, score, openModalExplanation }) => {
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

      <Action onClick={openModalExplanation}>
        <IoMdInformationCircleOutline  style={{ fontSize: '18px' }}/>
        Ver Explicação
      </Action>
    </Card>
  );
};

const PillarsResultsIndividual: React.ForwardRefRenderFunction<HTMLDivElement, PillarsResultsIndividualProps> = ({ dropdownOpen }, ref) => {
  const localScore = localStorage.getItem('assessmentScoreIndividual')
  const { scoresByPillar }: { scoresByPillar?: { [key: number]: number } } = localScore && JSON.parse(localScore);
  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdownOpen);
  const [isModalPillarOpen, setIsModalPillarOpen] = useState(false);
  const [currentModalScore, setCurrentModal] = useState(0);
  const [currentModalPillarId, setCurrentModalPillarId] = useState(0);
  const RotatingArrow = styled(IoIosArrowDropdown)<ArrowProps>`
    transition: transform 0.3s ease-in-out;

    ${({ isdropdownopen }) =>
    isdropdownopen === "true" &&
    css`
      transform: rotate(180deg);
    `}
  `;

  if (!scoresByPillar) return

  const handleOpenModal = (score: number, pillarId: number) => {
    setIsModalPillarOpen(true);
    setCurrentModal(score)
    setCurrentModalPillarId(pillarId)
  }

  const handleCloseModal = () => {
    console.log("abre modal")
    setIsModalPillarOpen(false);
  }

  return (
    <Container>
      <Dropdown onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <RotatingArrow isdropdownopen={isDropdownOpen ? "true" : "false"} />
        Resultados Por pilar
      </Dropdown>
      <ScoresContainer isopen={isDropdownOpen ? "true" : "false"}>
        <div className="scoreWrapper" ref={ref}>
          {Object.entries(scoresByPillar).map(([pillarId, score]) => (
            <PillarCard key={pillarId} pillarId={pillarId} score={score} openModalExplanation={() => handleOpenModal(score, Number(pillarId))} />
          ))}
        </div>

      </ScoresContainer>

      {isModalPillarOpen && (
        <ModalPillarExplanation pillarScore={currentModalScore} PillarId={currentModalPillarId} closeModal={handleCloseModal} />
      )}
    </Container>
  );
};

export default React.forwardRef(PillarsResultsIndividual);
