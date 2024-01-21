import React, { useEffect, useRef, useState } from 'react';
import { useForms } from '../../../context/forms';

import {
  Title as ResultThanksTitle,
  Description as ResultThanksDescription
} from '../../Thanks/styles'

import {
  Container,
  Wrapper,
  TotalScoreContainer,
  ScoreResultCard,
  TotalResultCardTitle,
  ProgressBarContainer,
  ScoreExplanationCard,
  ScoreExplanation,
  ScoreResultActions,
  SendEmail,
  DownloadPdf,
  PillarsComparativeContainer
} from './styles'
import Breadcrumb from '../../../components/Breadcrumb';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ModalResultSended from '../../../components/ModalResultSended';
import ModalResendEmail from '../../../components/ModalResendEmail';
import ModalGetInTouch from '../../../components/ModalGetInTouch';
import axios from 'axios';
import TalkToUs from '../../../components/TalkToUs';
import { ComparativeResultResponse, IAssessmentScoreIndividualResponse } from '../../../types/globalTypes';
import PillarsResultsComparative from '../../../components/PillarsResultsComparative';
import { useParams } from 'react-router-dom';
import ResultService from '../../../services/ResultsServices';

const ComparativeResult: React.FC = () => {
  const { setIsEmailModalOpen, isEmailModalOpen, isContactModalOpen, setIsContactModalOpen } = useForms();
  const totalScoreRef = useRef<HTMLDivElement>(null);
  const resultThanksTitleRef = useRef<HTMLDivElement>(null);
  const resultThanksDescriptionRef = useRef<HTMLDivElement>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isDropDowOpen, setDropdownOpen] = useState(false);
  const { resultId, param } = useParams();
  const [comparativeScore, setComparativeScore] = useState<IAssessmentScoreIndividualResponse>({} as IAssessmentScoreIndividualResponse)
  const [scoreIndividual, setScoreIndividual] = useState<IAssessmentScoreIndividualResponse>({} as IAssessmentScoreIndividualResponse)




  useEffect(() => {
    if (!resultId || !param) return;
    console.log('resultId', resultId)
    const fetchScoreData = async () => {
      try {
        const assessmentScores = await ResultService.getResultBySector(param);
        console.log("assessmentScores::", assessmentScores)

        if (!assessmentScores) throw new Error('Assessment scores not available.');

         // Calculate average total score
         const totalScores = assessmentScores.results.map((result) => result.scores.totalScore);
         const averageTotalScore = Math.round(totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length);

         // Calculate average scores for each pillar
         const pillarScores: { [key: string]: number } = {};
         assessmentScores.results.forEach((result) => {
           Object.entries(result.scores.scoresByPillar).forEach(([pillar, score]) => {
             pillarScores[pillar] = (pillarScores[pillar] || 0) + score;
           });
         });

         Object.keys(pillarScores).forEach((pillar) => {
          pillarScores[pillar] = Math.round(pillarScores[pillar] / assessmentScores.results.length);
        });

         // Set the calculated scores
         const assessmentScore = {
          assessmentScore: {
            totalScore: averageTotalScore,
            scoresByPillar: pillarScores,
          },
          sector: param,
        };

        setComparativeScore(assessmentScore);

      } catch (error) {
        console.error('Error fetching score comparative data:', error);
      }

      try {
        const assessmentScore = await ResultService.getResultById(resultId);
        if (assessmentScore) {
          setScoreIndividual(assessmentScore);
        } else {
          console.error('Assessment score not found for resultId:', resultId);
        }
      } catch (error) {
        console.error('Error fetching score individual data:', error);
      }
    };

    fetchScoreData();
  }, [resultId, param]);

  console.log("score:::", comparativeScore)
  const handleSendEmail = async () => {
    setDropdownOpen(true)
    setShowResultModal(true);

    try {
      const storedItem = localStorage.getItem('personalForm');
      if (!storedItem) throw new Error ('Não há dados de email.');

      const personalFormObject = JSON.parse(storedItem);
      const userEmail = personalFormObject.email;

      const response = await axios.post('https://email-service-peach.vercel.app/api/', {
        to: userEmail,
        url: `https://xcore-assessment.web.app/assessment/resultado/${resultId}/${param}`,
        additionalContent: {
          linkText: 'Veja o resultado aqui',
          link: `https://xcore-assessment.web.app/assessment/resultado/${resultId}/${param}`,
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
  console.log(scoreIndividual)
  return (
    comparativeScore &&  Object.keys(comparativeScore).length > 0 &&
    scoreIndividual && Object.keys(scoreIndividual).length > 0 &&
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

          <TotalScoreContainer>
            <ScoreResultCard ref={totalScoreRef}>
              <TotalResultCardTitle>Xcore Total</TotalResultCardTitle>
              <div className="ResultsFlex">
                <ProgressBarContainer>
                <CircularProgressbarWithChildren
                strokeWidth={35}
                value={comparativeScore.assessmentScore.totalScore && comparativeScore.assessmentScore.totalScore}
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
                  {JSON.stringify(comparativeScore.assessmentScore.totalScore)}<span>/100</span>
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
            <PillarsResultsComparative dropdownOpen={isDropDowOpen} comparativeScore={comparativeScore} individualScores={scoreIndividual} />
            <TalkToUs />
          </PillarsComparativeContainer>
        </Wrapper>
      </Container>)
  );
};

export default ComparativeResult;
