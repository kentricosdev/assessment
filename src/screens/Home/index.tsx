import { useState } from "react";
import useAssessmentRedirect from "../../hooks/assessmentRedirect";
import {
  Container,
  VideoContainer,
  Video,
  BubblesLeft,
  BubblesRight,
  TheAssessment,
  AsessmentWrapper,
  Infos,
  InfoItem,
  InfoTitle,
  InfoDescription,
  About,
  AboutContent,
  AboutImage,
  DataNumber,
  DataItem,
  AboutDatas,
  AboutDescription,
  DataText,
  AboutSeeMore,
  Newsletter,
  InputContainer,
  NewsletterWrapper
} from "./styles"
import { Element } from "react-scroll";

const Home: React.FC = () => {
  useAssessmentRedirect();

  const [email, setEmail] = useState('');

  const validarEmail = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
      alert('Por favor, preencha o campo de e-mail.');
    } else if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
    } else {
      window.location.href = "https://bit.ly/clovers_01";
    }
  };

  return (
    <>
      <Container>
        {/* Container do video abaixo, remover o style diplay: none quando tiver video */}
        <Element name="videoContainerId" style={{ display:'none' }}>
          <VideoContainer>
            <BubblesLeft>
              <img src="/images/bubbles-left.svg" />
            </BubblesLeft>

            <Video>
              <img src="https://picsum.photos/980/520" alt="Video de apresentação Xcore - Kentricos" />
            </Video>

            <BubblesRight>
              <img src="/images/bubbles-right.svg" />
            </BubblesRight>
          </VideoContainer>
        </Element>

        <Element name="oAssessmentId">
          <TheAssessment>
            <AsessmentWrapper>
              <h2 className="assessment-title">O Assessment</h2>
              <h1 className="main-title">Compreenda o nível que sua empresa está de maturidade de experiência do cliente</h1>

              <Infos>
                <InfoItem>
                  <img src="/icons/circle-people.svg" />
                  <InfoTitle>Saiba por onde começar</InfoTitle>
                  <InfoDescription>Entenda quais são os pilares que precisam de mais atenção para evoluir a maturidade e cultura do cliente dentro da sua empresa.</InfoDescription>
                </InfoItem>
                <InfoItem>
                  <img src="/icons/circle-money.svg" />
                  <InfoTitle>Compare com o mercado</InfoTitle>
                  <InfoDescription>Compare o resultado de maturidade da sua empresa com outras empresas do mercado que você atua. Conseguindo compreender qual o caminho que você terá que percorrer.</InfoDescription>
                </InfoItem>
                <InfoItem>
                  <img src="/icons/circle-person.svg" />
                  <InfoTitle>Visão clara</InfoTitle>
                  <InfoDescription>Saiba onde estão os pontos de dor da sua empresa para conseguir atingir um nível alto de excelência em maturidade de cliente.</InfoDescription>
                </InfoItem>
                <InfoItem>
                  <img src="/icons/circle-document.svg" />
                  <InfoTitle>Evolua sua maturidade</InfoTitle>
                  <InfoDescription>Tenha em mãos o caminho para evoluir a maturidade da sua empresa em centralidade do cliente.</InfoDescription>
                </InfoItem>
              </Infos>
            </AsessmentWrapper>
          </TheAssessment>
        </Element>

        <Element name="AboutKentricosId">
          <About>
            <h2>Sobre a Kentricos</h2>

            <AboutContent>
              <AboutImage>
                <img src="/images/meeting-rounded.png" alt="Pessoas em reunião" />
              </AboutImage>

              <AboutDescription>
                <h3 className="title-description">Ajudando as empresas a evoluirem suas relações com os clientes</h3>
                <p className="text-description">A Kentricos é especializada em Customer Experience e em Empresas Centradas no Cliente (Customer Centric Companies). Ajudamos a compreender o que são os conceitos de CX e como torná-los realidade em sua empresa, para que você se diferencie e mantenha uma posição única na mente e no coração de seus clientes.</p>

                <AboutDatas>
                  <DataItem>
                    <DataNumber>
                    100+
                    </DataNumber>
                    <DataText>Consultorias</DataText>
                  </DataItem>

                  <DataItem>
                    <DataNumber>
                      50+
                    </DataNumber>
                    <DataText>Mentorias</DataText>
                  </DataItem>

                  <DataItem>
                    <DataNumber>
                      70+
                    </DataNumber>
                    <DataText>Assessments</DataText>
                  </DataItem>
                </AboutDatas>

                <AboutSeeMore href="https://kentricos.com">
                  Confira mais
                  <img src="/icons/arrow-right.svg" />
                </AboutSeeMore>
              </AboutDescription>
            </AboutContent>
          </About>
        </Element>

        <Element name="comunityId">
          <Newsletter>
            <NewsletterWrapper>
              <h2>Faça parte da Comunidade Customer Lovers</h2>
              <p>Receba o link para acesso à Comunidade Customer Lovers.</p>

              <InputContainer>
                <input type="email" placeholder="Digite seu E-mail"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <a href="https://bit.ly/clovers_01" target="_blank" onClick={validarEmail}>
                  <button>
                    Fazer parte da Comunidade
                  </button>
                </a>
              </InputContainer>
            </NewsletterWrapper>
          </Newsletter>
        </Element>


      </Container>
    </>
  )
}

export default Home
