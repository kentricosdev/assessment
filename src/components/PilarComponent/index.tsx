import React from 'react';
import { Container, PillarHeader, Description } from './styles';

interface PillarComponentProps {
  title: string;
  description: string;
  ordem: number;
}

const PillarComponent: React.FC<PillarComponentProps> = ({ title, description, ordem }) => {
  return (
    <Container>
      <PillarHeader>
        <img src={`/icons/form/pilar${ordem}.svg`} alt="Icone do pilar" />
        <h2>{`Pilar ${ordem} - ${title}`}</h2>
      </PillarHeader>
      <Description>{description}</Description>
    </Container>
  );
};

export default PillarComponent;
