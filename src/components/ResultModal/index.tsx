import React from 'react';
import { Button, ButtonContainer, Container, Card, Description, TitleContainer, Title } from './styles';

const ResultModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Container>
      <Card>
        <TitleContainer>
          <Title>Baixar Resultado</Title>
          <button onClick={onClose}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </TitleContainer>
        <Description>
          O PDF com o resultado será enviado em alguns instantes, no e-mail informado
        </Description>
        <ButtonContainer>
          <Button onClick={onClose}>Ok</Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export default ResultModal;
