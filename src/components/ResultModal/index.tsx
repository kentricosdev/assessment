import React, { useEffect, useRef } from 'react';
import { Button, ButtonContainer, Container, Card, Description, TitleContainer, Title } from './styles';
import { createPortal } from 'react-dom';

interface ResultModalProps {
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  const modalRootRef = useRef(document.getElementById('modal-root') || document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (!document.getElementById('modal-root')) {
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

  const modalContent = (
    <Container>
      <Card>
        <TitleContainer>
          <Title>Baixar Resultado</Title>
          <button onClick={onClose}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </TitleContainer>
        <Description>
          O PDF com o resultado será enviado em alguns instantes, no e-mail informado.
        </Description>
        <ButtonContainer>
          <Button onClick={onClose}>Ok</Button>
        </ButtonContainer>
      </Card>
    </Container>
  );

  return createPortal(modalContent, modalContainerRef.current);
};

export default ResultModal;
