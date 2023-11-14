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

const Footer: React.FC = () => {
  return (
    <ContainerFooter>
      <Wrapper>
        <MainContent>
          <ContainerLogo>
            <LogoLink href="#">
              <img src="/images/logo-light.svg" alt="" />
            </LogoLink>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </ContainerLogo>
          <ContainerMenu>
            <MenuGroup>
              <Title>A Kentricos</Title>
              <Nav>
                <a href="#">Home</a>
                <a href="#">Consultoria</a>
                <a href="#">Experience Lab</a>
                <a href="#">Experience Makers</a>
                <a href="#">Mentoria</a>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Quem somos</Title>
              <Nav>
                <a href="#">Nossa História</a>
                <a href="#">Nosso Time</a>
                <a href="#">Lorem Ipsus</a>
              </Nav>
            </MenuGroup>
            <MenuGroup>
              <Title>Assessment</Title>
              <Nav>
                <a href="#">O que é?</a>
                <a href="#">Como fazer?</a>
                <a href="#">Responda</a>
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
