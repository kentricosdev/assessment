import React, { useEffect, useRef, useState } from 'react';
import { useForms } from '../../context/forms';

import {
  Title as ResultThanksTitle,
  Description as ResultThanksDescription
} from '../Thanks/styles'

import {
  Container,
  Wrapper,
  TotalScoreContainer,
  ScoreResultCard,
  ScoreExplanationCard,
  ScoreExplanation,
  ScoreResultActions,
  SendEmail,
  DownloadPdf,
  TotalResultCardTitle,
  ProgressBarContainer,
  PillarsComparativeContainer,
  CompanyName,
  MaturityOptionChosen
} from './styles'
import Breadcrumb from '../../components/Breadcrumb';
import { IndividualResultActions, ResultActionsButton, ResultActionsCard, ResultActionsCardContent, ResultActionsImgContainer } from './resultActionsStyles';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ModalResultSended from '../../components/ModalResultSended';
import ModalResendEmail from '../../components/ModalResendEmail';
import ModalGetInTouch from '../../components/ModalGetInTouch';
import axios from 'axios';
import TalkToUs from '../../components/TalkToUs';
import { IAssessmentScoreIndividual, IPersonalFormData } from '../../types/globalTypes';
import PillarsResultsIndividual from '../../components/PillarsResultsIndividual';
import ExplanationOverallResult from '../../components/ExplanationOverallResult/intex';
import { WhatsappShareButton } from 'react-share';

const IndividualResult: React.FC = () => {
  const { setIsEmailModalOpen, isEmailModalOpen, isContactModalOpen, setIsContactModalOpen } = useForms();
  const assessmentScoreIndividualString = localStorage.getItem('assessmentScoreIndividual');
  const assessmentScoreIndividual: IAssessmentScoreIndividual = assessmentScoreIndividualString
    ? JSON.parse(assessmentScoreIndividualString)
    : null;

  const totalScoreRef = useRef<HTMLDivElement>(null);
  const resultThanksTitleRef = useRef<HTMLDivElement>(null);
  const resultThanksDescriptionRef = useRef<HTMLDivElement>(null);
  // const pillarsResultsIndividualRef = useRef<HTMLDivElement>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [realMaturityLevel, setRealMaturityLevel] = useState('');
  const resultId = localStorage.getItem('currentResultId')
  const personalFormData = localStorage.getItem('personalForm')
  const currentResultId = localStorage.getItem('currentResultId')

  // const shareContent = async () => {
  //   try {
  //     await navigator.share({
  //       title: 'Veja meu resultado no assesment Xcore',
  //       text: 'Descubra o nível de maturidade de centralidade no cliente da sua empresa em poucos cliques!',
  //       url: `https://xcore-assessment.web.app/assessment/resultado/${resultId}`
  //     });
  //   } catch (error) {
  //     throw new Error("Erro ao compartilhar conteúdo:" + error);
  //     ;
  //   }
  // };

  useEffect(() => {
    const  generalScore = assessmentScoreIndividual.totalScore
    switch (true) {
      case generalScore >= 0 && generalScore <= 19:
        setRealMaturityLevel('Inicial - Não há foco algum no cliente')
        break;
      case generalScore >= 20 && generalScore <= 39:
        setRealMaturityLevel('Conscientização - Se preocupa, mas não possui estratégia definida')
        break;
      case generalScore >= 40 && generalScore <= 59:
        setRealMaturityLevel('Organizacional - Há engajamento das áreas em CX')
        break;
      case generalScore >= 60 && generalScore <= 79:
        setRealMaturityLevel('Estruturação - Estruturas se fortalecem em CX')
        break;
      case generalScore >= 80 && generalScore <= 100:
        setRealMaturityLevel('Proatividade - Cultura centrada madura com liderança engajada')
        break;
      default:
        setRealMaturityLevel("Indefinido.");
    }
  }, [])

  const handleSendEmail = async () => {
    try {
      const storedItem = localStorage.getItem('personalForm');
      if (!storedItem) {
        alert('Nenhum e-mail informado. Cadastre em "reenviar por e-mail"')
        throw new Error ('Não há dados de email.');
      }

      setDropdownOpen(true)
      setShowResultModal(true);

      const personalFormObject = JSON.parse(storedItem);
      const userEmail = personalFormObject.email;

      const response = await axios.post('https://email-service-peach.vercel.app/api/', {
        to: userEmail,
        url: `https://xcore-assessment.web.app/assessment/resultado/${resultId}`,
        additionalContent: {
          linkText: 'Veja o resultado aqui',
          link: `https://xcore-assessment.web.app/assessment/resultado/${resultId}`,
        }
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSendEmailComparative = async () => {
    try {
      const storedItem = localStorage.getItem('personalForm');
      if (!storedItem) {
        alert('Nenhum e-mail informado. Cadastre em "reenviar por e-mail"')
        throw new Error ('Não há dados de email.');
      }

      setDropdownOpen(true)
      setShowResultModal(true);

      const personalFormObject: IPersonalFormData = JSON.parse(storedItem);
      const userEmail = personalFormObject.email;
      const userSector = personalFormObject.sector;

      const response = await axios.post('https://email-service-peach.vercel.app/api/', {
        to: userEmail,
        url: `https://xcore-assessment.web.app/assessment/resultado/${resultId}/${userSector}`,
        additionalContent: {
          linkText: 'Veja o resultado comparativo aqui',
          link: `https://xcore-assessment.web.app/assessment/resultado/${resultId}/${userSector}`,
        }
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    assessmentScoreIndividual &&  Object.keys(assessmentScoreIndividual).length > 0 &&
      (<Container>
        {showResultModal && <ModalResultSended onClose={() => setShowResultModal(false)} />}
        {isEmailModalOpen && <ModalResendEmail onClose={() => setIsEmailModalOpen(false)} />}
        {isContactModalOpen && <ModalGetInTouch onClose={() => setIsContactModalOpen(false)} />}
        <Wrapper>
          <Breadcrumb />

          <ResultThanksTitle ref={resultThanksTitleRef}>
            Resultado
          </ResultThanksTitle>
          <ResultThanksDescription ref={resultThanksDescriptionRef}>
            Confira abaixo o resultado consolidado do assessment que você acabou de realizar. Vale lembrar que esse resultado reflete o momento atual, ou seja, você pode voltar a realizar esse assessment em um momento futuro e os resultados serão diferentes, pois sua empresa terá evoluído sua maturidade.
          </ResultThanksDescription>

          {personalFormData && (
            <CompanyName>Empresa: <span>{JSON.parse(personalFormData).company}</span></CompanyName>
          )}

          {personalFormData && (
            <MaturityOptionChosen>
              Antes de começar esta pesquisa, você respondeu a uma pergunta no cadastro dizendo qual era o nível de maturidade que você achava que sua empresa estava e sua escolha foi: <span>{JSON.parse(personalFormData).maturityLevel}</span>.
              Depois de respondido a esta pesquisa comparamos a resposta final com a resposta inicial. O resultado é esse: <span>{realMaturityLevel}</span>
            </MaturityOptionChosen>
          )}

          <ExplanationOverallResult
          totalScore={assessmentScoreIndividual.totalScore}/>

          <TotalScoreContainer>
            <ScoreResultCard ref={totalScoreRef}>
              <TotalResultCardTitle>Xcore Total</TotalResultCardTitle>
              <div className="ResultsFlex">
                <ProgressBarContainer>
                <CircularProgressbarWithChildren
                strokeWidth={35}
                value={assessmentScoreIndividual.totalScore && assessmentScoreIndividual.totalScore}
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: 'butt',
                  pathTransitionDuration: 0.5,
                  pathColor: `#89E3F5`,
                  textColor: '#89E3F5',
                  trailColor: '#E7F4FB'
                })}
              >
                </CircularProgressbarWithChildren>
                </ProgressBarContainer>
                <p>
                  {JSON.stringify(assessmentScoreIndividual.totalScore)}<span>/100</span>
                </p>
              </div>
            </ScoreResultCard>

            <ScoreExplanationCard>
              <TotalResultCardTitle>Xcore Total - Explicação</TotalResultCardTitle>
              <ScoreExplanation>
                O resultado consolidado compartilha uma informação direta e objetiva do nível de maturidade que sua empresa está em cada pilar das disciplinas de Customer Experience. Se você desejar saber um pouco mais de detalhes e conclusões sobre o seu resultado, clique no botão abaixo para enviarmos para você. Você receberá essas informações no email que você cadastrou no início do assessment. Se ainda não recebeu, veja em sua caixa de SPAM ou clique no botão “reenviar por e-mail”.
              </ScoreExplanation>

              <ScoreResultActions>
                <SendEmail onClick={() => setIsEmailModalOpen(true)}>
                  Reenviar por e-mail
                </SendEmail>
                <DownloadPdf onClick={handleSendEmail}>
                  Enviar Resultado
                </DownloadPdf>
              </ScoreResultActions>
            </ScoreExplanationCard>
          </TotalScoreContainer>

          <PillarsComparativeContainer>
            <PillarsResultsIndividual dropdownOpen={dropdownOpen} />
            <TalkToUs />
          </PillarsComparativeContainer>


          <IndividualResultActions>
            <ResultActionsCard>
              <ResultActionsImgContainer>
                <img src="/images/see-comparative-result.png" alt="Ver resultado comparativo" />
              </ResultActionsImgContainer>

              <ResultActionsCardContent>
                <h2>Quer comparar com o seu mercado?</h2>

                <p>Clique no botão abaixo para receber um e-mail com o link para acessar o relatório com o resultado do seu assessment comparando com os resultados de outras empresas do seu mercado.</p>

                <ResultActionsButton onClick={handleSendEmailComparative} role="button" tabIndex={0}>
                  Compare aqui
                </ResultActionsButton>
              </ResultActionsCardContent>
            </ResultActionsCard>

            <ResultActionsCard>
              <ResultActionsImgContainer>
                <img src="/images/share-individual-result.png" alt="Compartilhar Resultado" />
              </ResultActionsImgContainer>

              <ResultActionsCardContent>
                <h2>Compartilhe os seus resultados</h2>
                <p>Quer compartilhar esse relatório final com outra pessoa? Clique no botão abaixo.</p>
                <WhatsappShareButton url={`https://xcore-assessment.web.app/assessment/resultado/${currentResultId}`} title={'Confira o resultado do meu assessment de maturidade Xcore: '}>
                  <ResultActionsButton role="button" tabIndex={0}>
                    Compartilhar
                  </ResultActionsButton>
                </WhatsappShareButton>
              </ResultActionsCardContent>
            </ResultActionsCard>
          </IndividualResultActions>
        </Wrapper>
      </Container>)
  );
};

export default IndividualResult;
