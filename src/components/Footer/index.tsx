import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const { handleOpenModal } = useForms();
  const navigate = useNavigate();
  const location = useLocation();
  const [notAssessment, setNotAssessment] = useState(false);

  useEffect(() => {
    const getPathAfterResultado = () => {
      const path = window.location.pathname;
      const resultadoIndex = path.indexOf('/resultado/');

      if (resultadoIndex !== -1) {
        // Get the part of the path after "/resultado/"
        const afterResultado = path.substring(resultadoIndex + '/resultado/'.length);
        return afterResultado;
      }

      return null; // If "/resultado/" is not found in the path
    };

    const resultadoPath = getPathAfterResultado();
    const haveAssessmentData = localStorage.getItem('personalData')

    if ((resultadoPath || location.pathname.startsWith('/resultado/')) && !haveAssessmentData) {
      setNotAssessment(true);
    } else {
      setNotAssessment(false)
    }

  }
  , [location.pathname])

  return (
    <ContainerFooter>
      <Wrapper>
        <MainContent>
          <ContainerLogo>
            <LogoLink onClick={notAssessment === true ? () => navigate('/') : handleOpenModal}>
              <img src="/images/logo-light.svg" alt="" />
            </LogoLink>
          </ContainerLogo>
          <ContainerMenu>
            <MenuGroup>
              <Title>A Kentricos</Title>
              <Nav>
                <div className="link" onClick={notAssessment === true ? () => navigate('/') : handleOpenModal}>Início</div>
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
            <a className="bottom-link" href="#">Termos e Condições</a>
            <a className="bottom-link" target="_blank" href="/politicas-de-privacidade">Política de Privacidade</a>
          </BottomMenu>
        </Bottom>
      </Wrapper>
    </ContainerFooter>
  )
}

export default Footer;
