import { Link, useNavigate, useParams } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5"
import { Link as ScrollLink } from 'react-scroll';
import { useLocation } from "react-router-dom";

import {
  Actions,
  ContainerHeader,
  LeftSide,
  Logo,
  MainContentContainer,
  Menu,
  Navigation,
  NavigationItem,
  SeeVideo,
  StartAssessment,
  Text,
  Title,
  LogoMobile,
  Wrapper,
  Leave,
  MobileNavigation,
  MobileNavContent,
  MobileNavHeader
} from "./styles";
import { useEffect, useState } from "react";
import { useForms } from "../../context/forms";


const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {handleOpenModal, assessmentStarted, handleStartAssessment } = useForms();
  const [notAssessment, setNotAssessment] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const unlisten = () => {
      setMenuOpen(false);
    };

    return () => {
      unlisten();
    };
  }, [location.pathname]);

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

  console.log("notAssessment", notAssessment)

  const handleOpenMenuMobile = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <ContainerHeader>
      <Wrapper>
        <Menu>
          <Logo onClick={notAssessment === true ? () => navigate('/') : handleOpenModal}>
            <img src="/images/logo.svg" alt="Logo Kentricos" />
          </Logo>

          <Navigation>
            <NavigationItem>
              {
                notAssessment === true ?
                (<a className="link" href="/">Início</a>):
                (<div className="link" onClick={handleOpenModal}>Início</div>)
              }
            </NavigationItem>
            <NavigationItem>
              <ScrollLink to="oAssessmentId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Assessment</ScrollLink>
            </NavigationItem>
            <NavigationItem>
              <ScrollLink to="AboutKentricosId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Quem somos</ScrollLink>
            </NavigationItem>
            <NavigationItem>
              <ScrollLink to="comunityId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Comunidade</ScrollLink>
            </NavigationItem>
          </Navigation>

          <div className="leave-assessment--button">
            {assessmentStarted  && (
              <Leave onClick={handleOpenModal}>
                Sair
              </Leave>
            )}
          </div>

          <MobileNavigation>
            <button onClick={handleOpenMenuMobile}>
              <IoMenu color='#FFF' />
            </button>
            <MobileNavContent ishidden={!menuOpen === true ? "true" : "false"}>
              <MobileNavHeader>
                <button onClick={handleOpenMenuMobile}>
                  <IoClose color='#FFF' />
                </button>
              </MobileNavHeader>
              <LogoMobile>
                <img src="/images/logo.svg" alt="Logo Kentricos" />
              </LogoMobile>
              <NavigationItem>
                {
                  notAssessment === true ?
                  (<a className="link" href="/">Início</a>):
                  (<div className="link" onClick={handleOpenModal}>Início</div>)
                }
              </NavigationItem>
              <NavigationItem>
                <ScrollLink to="oAssessmentId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Assessment</ScrollLink>
              </NavigationItem>
              <NavigationItem>
                <ScrollLink to="AboutKentricosId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Quem somos</ScrollLink>
              </NavigationItem>
              <NavigationItem>
                <ScrollLink to="comunityId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : notAssessment === true ? () => navigate("/") : () => {return}}>Comunidade</ScrollLink>
              </NavigationItem>


              {assessmentStarted  && (
                <Leave onClick={handleOpenModal} style={{width: '100%'}}>
                  Sair
                </Leave>
              )}
            </MobileNavContent>
          </MobileNavigation>
        </Menu>

        <MainContentContainer>
          <LeftSide>
            <Title>
              <h1>Conheça o</h1>
              <img src="/images/xcore-logo.svg" alt="Logo Xcore" />
            </Title>

            <Text>Descubra o nível de maturidade de centralidade no cliente da sua empresa em poucos cliques!</Text>

            {
              !assessmentStarted && notAssessment === false && (
                <Actions>
                  <StartAssessment>
                  <Link to="/assessment">
                    <button onClick={handleStartAssessment}>Iniciar Assessment</button>
                  </Link>
                  </StartAssessment>
                  <SeeVideo>
                    <ScrollLink to="videoContainerId" smooth={true} duration={100} onClick={assessmentStarted ? handleOpenModal : () => {return}}><button>Confira o vídeo</button></ScrollLink>
                  </SeeVideo>
                </Actions>
              )
            }
          </LeftSide>
        </MainContentContainer>
      </Wrapper>
    </ContainerHeader>
  )
}

export default Header;
