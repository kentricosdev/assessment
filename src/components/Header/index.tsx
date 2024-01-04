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
  RightSide,
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
  const {isModalOpen, handleOpenModal, handleCloseModal, assessmentStarted, handleStartAssessment } = useForms();

  const handleOpenMenuMobile = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <ContainerHeader>
      <Wrapper>
        <Menu>
          <Logo href="#">
            <img src="/images/logo.svg" alt="Logo Kentricos" />
          </Logo>

          <Navigation>
            <NavigationItem>
              <a href="#">Início</a>
            </NavigationItem>
            <NavigationItem>
              <a href="#">Consultoria</a>
            </NavigationItem>
            <NavigationItem>
              <a href="#">Xcore</a>
            </NavigationItem>
            <NavigationItem>
              <a href="#">Quem somos?</a>
            </NavigationItem>
            <NavigationItem>
              <a href="#">Comunidade</a>
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
                <a href="#">Início</a>
              </NavigationItem>
              <NavigationItem>
                <a href="#">Consultoria</a>
              </NavigationItem>
              <NavigationItem>
                <a href="#">Xcore</a>
              </NavigationItem>
              <NavigationItem>
                <a href="#">Quem somos?</a>
              </NavigationItem>
              <NavigationItem>
                <a href="#">Comunidade</a>
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
                    <button>Confira o vídeo</button>
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
