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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </ContainerLogo>
          <ContainerMenu>
            <MenuGroup>
              <Title>A Kentricos</Title>
              <Nav>
                <div className="link" onClick={handleOpenModal}>Home</div>
                <a href="https://kentricos.com/consultoria">Consultoria</a>
                <a href="https://kentricos.com/">Experience Lab</a>
                <a href="https://kentricos.com/">Experience Makers</a>
                <a href="https://kentricos.com">Mentoria</a>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Quem somos</Title>
              <Nav>
                <a href="https://kentricos.com/sobre-mim/">Nossa História</a>
                <a href="https://kentricos.com/sobre-mim/">Nosso Time</a>
                <ScrollLink to="AboutKentricosId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : () => {return}}>Sobre a Kentricos</ScrollLink>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Assessment</Title>
              <Nav>
                <ScrollLink to="oAssessmentId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : () => {return}}>O que é?</ScrollLink>
                <ScrollLink to="oAssessmentId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : () => {return}}>Como fazer?</ScrollLink>
                <div className="link" onClick={handleStartAssessment}>Responda</div>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Contatos</Title>
              <Nav>
                <a href="#">kentricos@kentricos</a>
                <a href="#">+55 11 0000 0000</a>
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
