import { Link } from "react-router-dom";
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
  Leave
} from "./styles";

interface HeaderProps {
  assessmentStarted: boolean;
  onStartAssessment: () => void;
  onExit: () => void;
}

const Header: React.FC<HeaderProps> = ({ assessmentStarted, onStartAssessment, onExit }) => {
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

          <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            {assessmentStarted  && (
              <Link to="/">
                <Leave onClick={onExit}>
                  Sair
                </Leave>
              </Link>
            )}
          </div>
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
                  <Link to="/personalForm">
                    <button onClick={onStartAssessment}>Iniciar Assessment</button>
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
