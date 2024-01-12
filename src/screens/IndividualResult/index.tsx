import React, { useRef, useState } from 'react';
import { useForms } from '../../context/forms';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';

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
import axios from 'axios';

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

  const handleSendEmail = async () => {
    setShowResultModal(true);
    const createPdfWithImages = async (
      images: { canvasRef: React.RefObject<HTMLDivElement>; x: number; y: number; width: number }[]
    ): Promise<string> => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      for (const { canvasRef, x, y, width } of images) {
        const canvas = await html2canvas(canvasRef.current as HTMLElement);
        const height = (canvas.height * width) / canvas.width;

        const imageData = canvas.toDataURL('image/png');
        const imageBytes = Uint8Array.from(atob(imageData.split(',')[1]), (c) => c.charCodeAt(0));
        const image = await pdfDoc.embedPng(imageBytes);

        page.drawImage(image, { x, y, width, height });
      }

      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));
      return pdfBase64;
    };

    // Example usage
    const images = [
      { canvasRef: pillarsResultsIndividualRef, x: 10, y: 135, width: 180 },
      { canvasRef: totalScoreRef, x: 10, y: 50, width: 80 },
      { canvasRef: resultThanksDescriptionRef, x: 10, y: 20, width: 190 },
      { canvasRef: resultThanksTitleRef, x: 10, y: 10, width: 100 },
    ];

    const combinedPdfContent = await createPdfWithImages(images);

    try {
      const storedItem = localStorage.getItem('personalForm');
      if (!storedItem) throw new Error ('Não há dados de email.')
      const personalFormObject = JSON.parse(storedItem);
      const userEmail = personalFormObject.email;

      const response = await axios.post('http://localhost:3002/api/send-email', {
        to: userEmail,
        pdfContent: combinedPdfContent, // Replace with your PDF content
      }, {
        withCredentials: true, // Include cookies in the request
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
              <DownloadPdf onClick={handleSendEmail}>
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
