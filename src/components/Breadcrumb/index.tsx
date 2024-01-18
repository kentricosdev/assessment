import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from './styles';
import { useForms } from '../../context/forms';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { pillarsData } = useForms();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  const formatPilarName = (order: number) => {
    const pillar = pillarsData.find(p => p.ordem === order);
    return pillar ? `Pilar ${order} - ${pillar.nome}` : '';
  };

  // Find the index of 'resultado' in the path
  const resultadoIndex = pathSegments.indexOf('resultado');

  return (
    <Container>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment}>
          {index > 0 && ' > '}
          {resultadoIndex !== -1 && index >= resultadoIndex ? (
            // Display 'Resultado' only once
            index === resultadoIndex && <p>Resultado</p>
          ) : (
            <p>
              {segment.startsWith('pilar-') ? formatPilarName(parseInt(segment.split('-')[1], 10)) : segment}
            </p>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Breadcrumb;
