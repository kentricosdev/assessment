import { useForms } from "../../context/forms";
import {
  ContainerFooter,
  ContainerLogo,
  ContainerMenu,
  MenuGroup,
  Nav,
  Wrapper,
  Title,
  MainContent,
  Bottom,
  BottomMenu,
  LogoLink
} from "./styles";
import { Link as ScrollLink } from "react-scroll";

const Footer: React.FC = () => {
  const { handleStartAssessment, handleOpenModal, assessmentStarted } = useForms();

  return (
    <ContainerFooter>
      <Wrapper>
        <MainContent>
          <ContainerLogo>
            <LogoLink onClick={handleOpenModal}>
              <img src="/images/logo-light.svg" alt="" />
            </LogoLink>
          </ContainerLogo>
          <ContainerMenu>
            <MenuGroup>
              <Title>A Kentricos</Title>
              <Nav>
                <div className="link" onClick={handleOpenModal}>Home</div>
                <a href="http://xlabmeetup.com.br">Experience Lab</a>
                <a href="http://paradoxacademy.com.br/experiencemakers">Experience Makers</a>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Quem somos</Title>
              <Nav>
                <a href="http://kentricos.com">Sobre a Kentricos</a>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Contatos</Title>
              <Nav>
                <a href="mailto:contato@kentricos.com">contato@kentricos.com</a>
              </Nav>
            </MenuGroup>
          </ContainerMenu>
        </MainContent>
        <Bottom>
          <p>Todos os direitos reservados.</p>

          <BottomMenu>
            <a href="#">Termos e Condições</a>
            <a href="#">Política de Privacidade</a>
          </BottomMenu>
        </Bottom>
      </Wrapper>
    </ContainerFooter>
  )
}

export default Footer;
