import { Link } from "react-router-dom";
import { Container, Card, Title, TitleContainer, Text, Actions, Exit, Cancel } from "./styles";
import { useForms } from "../../context/forms";

interface ExitModalProps {
  confirmClear: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ confirmClear }) => {
  const { isModalOpen, handleCloseModal } = useForms();

  if (!isModalOpen) return null;

  return (
    <Container>
      <Card>
        <TitleContainer>
          <Title>Atenção: Você perderá sua evolução!</Title>
          <button onClick={handleCloseModal}>
            <img src="/icons/CardExit.png" alt="Sair" />
          </button>
        </TitleContainer>
        <Text>Ao clicar em <b>Sair</b>, você perderá todos os dados respondidos até o momento. Você tem certeza que deseja sair?</Text>
        <Actions>
          <Link to="/">
            <Exit onClick={confirmClear}>
              Sair
            </Exit>
          </Link>
          <Cancel onClick={handleCloseModal}>
            Voltar
          </Cancel>
        </Actions>
      </Card>
    </Container>
  )
}


export default ExitModal;