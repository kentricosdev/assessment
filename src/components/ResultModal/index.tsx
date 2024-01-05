import React, { useState, useEffect } from 'react';
import { Button, ButtonContainer, Container, Card, Description, TitleContainer, Title } from './styles';
import { useForms } from '../../context/forms';

const ResultModal: React.FC = () => {
  const [modalClosed, setModalClosed] = useState(() => {
    return localStorage.getItem('modalClosed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('modalClosed', modalClosed.toString());
  }, [modalClosed]);

  if (modalClosed) return null;

  return (
    <Container>
      <Card>
        <TitleContainer>
          <Title>Baixar Resultado</Title>
          <button onClick={() => setModalClosed(true)}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </TitleContainer>
        <Description>
          O PDF com o resultado será enviado em alguns instantes, no e-mail informado
        </Description>
        <ButtonContainer>
          <Button onClick={() => setModalClosed(true)}>Ok</Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export default ResultModal;
