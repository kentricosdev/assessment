import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5"
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
  Wrapper,
  Leave,
  MobileNavigation,
  MobileNavContent,
  MobileNavHeader
} from "./styles";
import { useState } from "react";
import { useForms } from "../../context/forms";


const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {handleOpenModal, assessmentStarted, handleStartAssessment } = useForms();

  const handleOpenMenuMobile = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <ContainerHeader>
      <Wrapper>
        <Menu>
          <Logo onClick={handleOpenModal}>
            <img src="/images/logo.svg" alt="Logo Kentricos" />
          </Logo>

          <Navigation>
            <NavigationItem>
              <div className="link" onClick={handleOpenModal}>Início</div>
            </NavigationItem>
            <NavigationItem>
              <a href="https://kentricos.com/consultoria">Consultoria</a>
            </NavigationItem>
            <NavigationItem>
              <Link to="/assessment" onClick={handleStartAssessment}>Xcore</Link>
            </NavigationItem>
            <NavigationItem>
              <a href="/#AboutKentricosId">Quem somos?</a>
            </NavigationItem>
            <NavigationItem>
              <a href="/#comunityId">Comunidade</a>
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
            <MobileNavContent ishidden={!menuOpen}>
              <MobileNavHeader>
                <button onClick={handleOpenMenuMobile}>
                  <IoClose color='#FFF' />
                </button>
              </MobileNavHeader>
              <NavigationItem>
                <div className="link" onClick={handleOpenModal}>Início</div>
              </NavigationItem>
              <NavigationItem>
                <a href="https://kentricos.com/consultoria">Consultoria</a>
              </NavigationItem>
              <NavigationItem>
                <Link to="/assessment" onClick={handleStartAssessment}>Xcore</Link>
              </NavigationItem>
              <NavigationItem>
                <a href="/#AboutKentricosId">Quem somos?</a>
              </NavigationItem>
              <NavigationItem>
                <a href="/#comunityId">Comunidade</a>
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

            <Text>Descubra o nível de maturidade de experiência do cliente da sua empresa em poucos cliques!</Text>

            {
              !assessmentStarted && (
                <Actions>
                  <StartAssessment>
                  <Link to="/assessment">
                    <button onClick={handleStartAssessment}>Iniciar Assessment</button>
                  </Link>
                  </StartAssessment>
                  <SeeVideo>
                    <a href="/#videoContainerId"><button>Confira o vídeo</button></a>
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
