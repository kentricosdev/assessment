import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForms } from '../../../context/forms';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Breadcrumb from '../../../components/Breadcrumb';
import TalkToUs from '../../../components/TalkToUs';
import useAssessmentRedirect from '../../../hooks/assessmentRedirect';

import {
  Title as ResultThanksTitle,
  Description as ResultThanksDescription,
} from '../../Thanks/styles';

import {
  Container,
  Wrapper,
  TotalScoreContainer,
  ScoreResultCard,
  TotalResultCardTitle,
  ProgressBarContainer,
  ScoreExplanationCard,
  ScoreExplanation,
  SendEmail,
  ScoreResultActions,
  DownloadPdf,
  // IndividualResultActions,
  // ResultActionsCard,
  // ResultActionsImgContainer,
  // ResultActionsCardContent,
  // ResultActionsButton,
} from './styles';
import ResultService from '../../../services/ResultsServices';
import ModalResultSended from '../../../components/ModalResultSended';
import ModalResendEmail from '../../../components/ModalResendEmail';
import ModalGetInTouch from '../../../components/ModalGetInTouch';
import { IndividualResultActions, ResultActionsButton, ResultActionsCard, ResultActionsCardContent, ResultActionsImgContainer } from './resultActionsStyles';
import { IAssessmentScoreIndividualResponse, IPersonalFormData } from '../../../types/globalTypes';
import axios from 'axios';

const IndividualResult: React.FC = () => {
  const {
    setIsEmailModalOpen,
    isEmailModalOpen,
    isContactModalOpen,
    setIsContactModalOpen
  } = useForms();
  const totalScoreRef = useRef<HTMLDivElement>(null);
  const resultThanksTitleRef = useRef<HTMLDivElement>(null);
  const resultThanksDescriptionRef = useRef<HTMLDivElement>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const { resultId } = useParams();
  const [score, setScore] = useState<IAssessmentScoreIndividualResponse>({} as IAssessmentScoreIndividualResponse)
  const [_, setDropdownOpen] = useState(false);

  useAssessmentRedirect();

  useEffect(() => {
    if (!resultId) return
    const fetchScoreData = async () => {
      try {
        const assessmentScore = await ResultService.getResultById(resultId);
        if (assessmentScore) {
          setScore(assessmentScore);
        } else {
          console.error('Assessment score not found for resultId:', resultId);
        }
      } catch (error) {
        console.error('Error fetching score data:', error);
      }
    };

    fetchScoreData();
  }, [resultId]);

  const shareContent = async () => {
    try {
      await navigator.share({
        title: 'Veja esse resultado do assesment Xcore',
        text: 'Descubra o nível de maturidade de centralidade no cliente da sua empresa em poucos cliques!',
        url: `https://xcore-assessment.web.app/assessment/resultado/${resultId}`
      });
    } catch (error) {
      console.error('Erro ao compartilhar conteúdo:', error);
    }
  };


  const handleSendEmail = async () => {
    try {
      const storedItem = localStorage.getItem('personalForm');
      if (!storedItem) {
        alert('Cadastre um e-mail')
        return
      }
      setDropdownOpen(true)
      setShowResultModal(true);
      const personalFormObject = JSON.parse(storedItem);
      const userEmail = personalFormObject.email;

      const response = await axios.post('http://localhost:3002/api/send-email', {
        to: userEmail,
        url: 'https://example.com/results',
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
    score  &&  Object.keys(score).length > 0 &&
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
          Confira abaixo o resultado consolidado do assessment realizado. Vale lembrar que esse resultado reflete o momento atual, ou seja, você pode realizar esse assessment em um momento futuro e os resultados serão diferentes.
        </ResultThanksDescription>

        <TotalScoreContainer>
          <ScoreResultCard ref={totalScoreRef}>
            <TotalResultCardTitle>Xcore Total</TotalResultCardTitle>
            <div className="ResultsFlex">
              <ProgressBarContainer>
              <CircularProgressbarWithChildren
              strokeWidth={35}
              value={score.assessmentScore.totalScore}
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
                {score.assessmentScore.totalScore || '0'}<span>/100</span>
              </p>
            </div>
          </ScoreResultCard>

          <ScoreExplanationCard>
            <TotalResultCardTitle>Xcore Total - Explicação</TotalResultCardTitle>
            <ScoreExplanation>
              O resultado consolidado compartilha uma informação direta e objetiva do nível de maturidade que a empresa está em cada pilar das disciplinas de Customer Experience. Se você desejar saber um pouco mais de detalhes e conclusões sobre o seu resultado, clique no botão abaixo para enviarmos para você. Você receberá essas informações no email que você cadastrou. Se ainda não recebeu, veja em sua caixa de SPAM ou clique no botão “reenviar por e-mail”.
            </ScoreExplanation>

            <ScoreResultActions>
              <SendEmail onClick={() => setIsEmailModalOpen(true)}>
                Reenviar por e-mail
              </SendEmail>
              <DownloadPdf onClick={handleSendEmail}>
                Enviar PDF
              </DownloadPdf>
            </ScoreResultActions>
          </ScoreExplanationCard>
        </TotalScoreContainer>

        <TalkToUs />

        <IndividualResultActions>
          <ResultActionsCard>
            <ResultActionsImgContainer>
              <img src="/images/see-comparative-result.png" alt="Ver resultado comparativo" />
            </ResultActionsImgContainer>

            <ResultActionsCardContent>
              <h2>Quer comparar com o mercado?</h2>

              <p>Clique no botão abaixo para receber um e-mail com o link para acessar o relatório com o resultado do assessment comparando com os resultados de outras empresas do mesmo mercado.</p>

              <ResultActionsButton onClick={handleSendEmailComparative}>
                Compare aqui
              </ResultActionsButton>
            </ResultActionsCardContent>
          </ResultActionsCard>
          <ResultActionsCard>
            <ResultActionsImgContainer>
              <img src="/images/share-individual-result.png" alt="Compartilhar Resultado" />
            </ResultActionsImgContainer>

            <ResultActionsCardContent>
              <h2>Compartilhe os resultados</h2>
              <p>Quer compartilhar esse relatório final com outra pessoa? Clique no botão abaixo.</p>
              <ResultActionsButton onClick={shareContent}>
                Compartilhar
              </ResultActionsButton>
            </ResultActionsCardContent>
          </ResultActionsCard>
        </IndividualResultActions>
      </Wrapper>
    </Container>)
  );
};

export default IndividualResult;
