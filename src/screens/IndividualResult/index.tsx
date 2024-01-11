import React, { useRef, useState } from 'react';
import { useForms } from '../../context/forms';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  ProgressBarContainer
} from './styles'
import Breadcrumb from '../../components/Breadcrumb';
import { IndividualResultActions, ResultActionsButton, ResultActionsCard, ResultActionsCardContent, ResultActionsImgContainer } from './resultActionsStyles';
import PillarsResultsIndividual from '../../components/PillarsResultsIndividual';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ModalResultSended from '../../components/ModalResultSended';
import ModalResendEmail from '../../components/ModalResendEmail';
import ModalGetInTouch from '../../components/ModalGetInTouch';

const IndividualResult: React.FC = () => {
  const { assessmentScoreIndividual, setIsEmailModalOpen, isEmailModalOpen, isContactModalOpen, setIsContactModalOpen } = useForms();
  const totalScoreRef = useRef<HTMLDivElement>(null);
  const resultThanksTitleRef = useRef<HTMLDivElement>(null);
  const resultThanksDescriptionRef = useRef<HTMLDivElement>(null);
  const pillarsResultsIndividualRef = useRef<HTMLDivElement>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const shareContent = async () => {
    try {
      await navigator.share({
        title: 'Conheça o Xcore',
        text: 'Descubra o nível de maturidade de experiência do cliente da sua empresa em poucos cliques!',
        url: 'https://kentricos.com/xcore'
      });
    } catch (error) {
      throw new Error("Erro ao compartilhar conteúdo:" + error);
      ;
    }
  };

  const downloadPDF = async () => {
    setShowResultModal(true);
    const pdf = new jsPDF();

    const titleCanvas = await html2canvas(resultThanksTitleRef.current!);
    const titleImageData = titleCanvas.toDataURL('image/png');
    pdf.addImage(titleImageData, 'PNG', 10, 10, 100, 0);

    const descriptionCanvas = await html2canvas(resultThanksDescriptionRef.current!);
    const descriptionImageData = descriptionCanvas.toDataURL('image/png');
    pdf.addImage(descriptionImageData, 'PNG', 10, 20, 190, 0);

    const totalScoreCanvas = await html2canvas(totalScoreRef.current!);
    const totalScoreImageData = totalScoreCanvas.toDataURL('image/png');
    pdf.addImage(totalScoreImageData, 'PNG', 10, 50, 80, 0);

    const pillarsCanvas = await html2canvas(pillarsResultsIndividualRef.current!);
    const pillarsImageData = pillarsCanvas.toDataURL('image/png');
    pdf.addImage(pillarsImageData, 'PNG', 10, 135, 180, 0);

    pdf.save('output.pdf');
  };

  return (
    <Container>
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
              value={assessmentScoreIndividual.totalScore}
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
                {assessmentScoreIndividual.totalScore}<span>/100</span>
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
              <DownloadPdf onClick={downloadPDF}>
                Enviar PDF
              </DownloadPdf>
            </ScoreResultActions>
          </ScoreExplanationCard>
        </TotalScoreContainer>

        <PillarsResultsIndividual ref={pillarsResultsIndividualRef} />

        <IndividualResultActions>
          <ResultActionsCard>
            <ResultActionsImgContainer>
              <img src="/images/see-comparative-result.png" alt="Ver resultado comparativo" />
            </ResultActionsImgContainer>

            <ResultActionsCardContent>
              <h2>Quer comparar com o seu mercado?</h2>

              <p>Clique no botão abaixo para receber um e-mail com o link para acessar o relatório com o resultado do seu assessment comparando com os resultados de outras empresas do seu mercado.</p>

              <ResultActionsButton>
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
              <ResultActionsButton onClick={shareContent}>
                Compartilhar
              </ResultActionsButton>
            </ResultActionsCardContent>
          </ResultActionsCard>
        </IndividualResultActions>
      </Wrapper>
    </Container>
  );
};

export default IndividualResult;
