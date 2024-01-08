import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Container, Card, Title, TitleContainer, Text, Actions, Exit, Cancel } from './styles';
import { useForms } from '../../context/forms';

interface ExitModalProps {
  confirmClear: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ confirmClear }) => {
  const { isModalOpen, handleCloseModal } = useForms();
  const modalRootRef = useRef(document.getElementById('modal-exit-root') || document.createElement('div'));

  useEffect(() => {
    if (!document.getElementById('modal-exit-root')) {
      document.body.appendChild(modalRootRef.current);
    }

    return () => {
      if (modalRootRef.current.parentElement) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, [modalRootRef]);

  if (!isModalOpen) return null;

  return createPortal(
    <Container>
      <Card>
        <TitleContainer>
          <Title>Atenção: Você perderá sua evolução!</Title>
          <button onClick={handleCloseModal}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </TitleContainer>
        <Text>
          Ao clicar em <b>Sair</b>, você perderá todos os dados respondidos até o momento. Você tem certeza que deseja sair?
        </Text>
        <Actions>
          <div>
            <Exit onClick={confirmClear}>Sair</Exit>
          </div>
          <Cancel onClick={handleCloseModal}>Voltar</Cancel>
        </Actions>
      </Card>
    </Container>,
    modalRootRef.current
  );
};

export default ExitModal;
