import React, { useEffect, useRef, useState } from 'react';
import { ModalCard, ModalOverlay } from '../ModalResendEmail/styles';
import { createPortal } from 'react-dom';
import { pillarsExplanations } from './PillarsTexts';
import { HeaderTitle, HeaderModal, ModalContent, Intro, ExplanationText } from './styles';

interface PillarComponentProps {
  pillarScore: number;
  PillarId: number;
  closeModal: () => void;
}

const ModalPillarExplanation: React.FC<PillarComponentProps> = ({ pillarScore, PillarId, closeModal }) => {
  const modalRootRef = useRef(document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));
  const [pillarScoreText, setPillarScoreText] = useState('');
  const [pillarName, setPillarName] = useState('');


  useEffect(() => {
    if (!document.getElementById('modal-sended-result-root')) {
      document.body.appendChild(modalRootRef.current);
    }

    modalRootRef.current.appendChild(modalContainerRef.current);

    return () => {
      if (modalRootRef.current.parentElement) {
        modalRootRef.current.removeChild(modalContainerRef.current);
        if (modalRootRef.current.childElementCount === 0) {
          document.body.removeChild(modalRootRef.current);
        }
      }
    };
  }, [modalRootRef]);

  useEffect(() => {
    const currentPillar = pillarsExplanations.pillars.find(pillar => pillar.id === PillarId)?.texts

    if (!currentPillar) return;

    switch (true) {
      case pillarScore >= 0 && pillarScore <= 19:
        setPillarScoreText(currentPillar[0])
        break;
      case pillarScore >= 20 && pillarScore <= 39:
        setPillarScoreText(currentPillar[1])
        break;
      case pillarScore >= 40 && pillarScore <= 59:
        setPillarScoreText(currentPillar[2])
        break;
      case pillarScore >= 60 && pillarScore <= 79:
        setPillarScoreText(currentPillar[3])
        break;
      case pillarScore >= 80 && pillarScore <= 100:
        setPillarScoreText(currentPillar[4])
        break;
      default:
        setPillarScoreText("Indefinido.");
    }

    switch (PillarId) {
      case 1:
        setPillarName('Compreensão')
        break;
      case 2:
        setPillarName('Medição')
        break;
      case 3:
        setPillarName('Design de Experiência')
        break;
      case 4:
        setPillarName('Cultura e EX')
        break;
      case 5:
        setPillarName('Governança')
        break;
      case 6:
        setPillarName('Estratégia')
        break;
      default:
        setPillarName('')
    }
  }, [])

  const modalContent = (
    <ModalOverlay>
      <ModalCard>
        <HeaderModal>
          <HeaderTitle>{pillarName}</HeaderTitle>
          <button onClick={closeModal}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </HeaderModal>
        <ModalContent>
          <Intro>O Xcore, nesse pilar, indica o seguinte sobre o seu negócio:</Intro>
          <ExplanationText>{pillarScoreText}</ExplanationText>
        </ModalContent>
      </ModalCard>
    </ModalOverlay>
  );

  return createPortal(modalContent, modalContainerRef.current);
};

export default ModalPillarExplanation;
