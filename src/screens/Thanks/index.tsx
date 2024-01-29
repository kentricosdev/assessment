import React from 'react';

import {
  Container,
  Wrapper,
  Title,
  Description,
  ButtonContainer,
  SeeResult
} from './styles'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const Thanks: React.FC = () => {
  const navigate = useNavigate();


  const handleSeeResult = () => {
    navigate('/assessment/resultado')
  }

  return (
    <Container>
      <Wrapper>
      <Breadcrumb />
        <Title>
          Resultado
        </Title>
        <Description>
          Obrigado por responder! O objetivo principal desse assessment é realizar uma análise mínima do nível de maturidade em centralidade no cliente que sua empresa está, e conseguir compará-lo com outras empresas. Além disso, entregar para você um mapeamento claro de onde estão os principais pontos de oportunidade em que sua empresa pode investir para conseguir evoluir sua maturidade e entregar uma melhor experiência para os seus consumidores. Clique no link abaixo para acessar o resultado final desta análise.
        </Description>

        <ButtonContainer>
          <SeeResult onClick={handleSeeResult}>
            Acessar Resultado
          </SeeResult>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default Thanks;
