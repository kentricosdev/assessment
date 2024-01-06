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
        <VideoContainer id="videoContainerId">
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

        <TheAssessment id="oAssessmentId">
          <AsessmentWrapper>
            <h2 className="assessment-title">O Assessment</h2>
            <h1 className="main-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>

            <Infos>
              <InfoItem>
                <img src="/icons/circle-people.svg" />
                <InfoTitle>Título 1</InfoTitle>
                <InfoDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</InfoDescription>
              </InfoItem>
              <InfoItem>
                <img src="/icons/circle-money.svg" />
                <InfoTitle>Título 1</InfoTitle>
                <InfoDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</InfoDescription>
              </InfoItem>
              <InfoItem>
                <img src="/icons/circle-person.svg" />
                <InfoTitle>Título 1</InfoTitle>
                <InfoDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</InfoDescription>
              </InfoItem>
              <InfoItem>
                <img src="/icons/circle-document.svg" />
                <InfoTitle>Título 1</InfoTitle>
                <InfoDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</InfoDescription>
              </InfoItem>
            </Infos>
          </AsessmentWrapper>
        </TheAssessment>

        <About id="AboutKentricosId">
          <h2>Sobre a Kenrtricos</h2>

          <AboutContent>
            <AboutImage>
              <img src="/images/meeting-rounded.png" alt="Pessoas em reunião" />
            </AboutImage>

            <AboutDescription>
              <h3 className="title-description">Lorem ipsum dolor sit amet, consectetur</h3>
              <p className="text-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>

              <AboutDatas>
                <DataItem>
                  <DataNumber>
                    900+
                  </DataNumber>
                  <DataText>consultorias</DataText>
                </DataItem>

                <DataItem>
                  <DataNumber>
                    250+
                  </DataNumber>
                  <DataText>Mentorias</DataText>
                </DataItem>

                <DataItem>
                  <DataNumber>
                    1200+
                  </DataNumber>
                  <DataText>Assessments</DataText>
                </DataItem>
              </AboutDatas>

              <AboutSeeMore href="https://kentricos.com/sobre-mim/">
                Confira mais
                <img src="/icons/arrow-right.svg" />
              </AboutSeeMore>
            </AboutDescription>
          </AboutContent>
        </About>

        <Newsletter id="comunityId">
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
      </Container>
    </>
  )
}

export default Home
