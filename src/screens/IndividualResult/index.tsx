import React from 'react';
import ExitModal from '../../components/ExitModal';
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

const IndividualResult: React.FC = () => {
  const { handleExit, assessmentStep, pillarsData } = useForms();
  const navigate = useNavigate();

  return (
    <Container>
      <ExitModal confirmClear={handleExit}/>
      <Wrapper>
      <Breadcrumb />
       resultado aqui!!!!!
      </Wrapper>
    </Container>
  );
};

export default IndividualResult;
