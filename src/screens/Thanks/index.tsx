import React from 'react';
import { useForms } from '../../context/forms';

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

  return (
    <Container>
      <Wrapper>
      <Breadcrumb />
        <Title>
          Resultado
        </Title>
        <Description>
          Obrigado por responder! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Description>

        <ButtonContainer>
          <SeeResult onClick={() => navigate('/assessment/resultado')}>
            Acessar Resultado
          </SeeResult>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default Thanks;
