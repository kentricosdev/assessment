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
  Wrapper
} from "./styles";

const Header: React.FC = () => {
  return (
    <ContainerHeader>
      <Wrapper>
        <Menu>
          <Logo>
            <a href="#">
              <img src="/images/logo.svg" alt="Logo Kentricos" />
            </a>
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

          <div style={{flex: 1}}></div>
        </Menu>

        <MainContentContainer>
          <LeftSide>
            <Title>
              <h1>Conheça o</h1>
              <img src="/images/xcore-logo.svg" alt="Logo Xcore" />
            </Title>

            <Text>Descubra o nível de maturidade de experiência do cliente da sua empresa em poucos cliques!</Text>

            <Actions>
              <StartAssessment>
                <button>Iniciar Assessment</button>
              </StartAssessment>
              <SeeVideo>
                <button>Confira o vídeo</button>
              </SeeVideo>
            </Actions>
          </LeftSide>
          <RightSide>
            <img src="/images/conceito-de-negocios.png" alt="Homem olhando para um quadro de ideias" />
          </RightSide>
        </MainContentContainer>
      </Wrapper>
    </ContainerHeader>
  )
}

export default Header;
