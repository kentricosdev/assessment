import React from 'react';
import ExitModal from '../../components/ExitModal';
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
  ProgressBarContainer
} from './styles'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import ResultModal from '../../components/ResultModal';
import { IndividualResultActions, ResultActionsButton, ResultActionsCard, ResultActionsCardContent, ResultActionsImgContainer } from './resultActionsStyles';
import PillarsResultsIndividual from '../../components/PillarsResultsIndividual';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const IndividualResult: React.FC = () => {
  const { handleExit, assessmentScoreIndividual } = useForms();
  const navigate = useNavigate();
  console.log("assessmentScoreIndividual", assessmentScoreIndividual)
  return (
    <Container>
      <ExitModal confirmClear={handleExit}/>
      <Wrapper>
        <Breadcrumb />

        <ResultThanksTitle>
          Resultado
        </ResultThanksTitle>
        <ResultThanksDescription>
          Obrigado por responder! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ResultThanksDescription>

        <TotalScoreContainer>
          <ScoreResultCard>
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
              Explicação Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ScoreExplanation>

            <ScoreResultActions>
              <SendEmail>
                Reenviar por e-mail
              </SendEmail>
              <DownloadPdf>
                Baixar PDF
              </DownloadPdf>
            </ScoreResultActions>
          </ScoreExplanationCard>
        </TotalScoreContainer>

        <PillarsResultsIndividual />

        <IndividualResultActions>
          <ResultActionsCard>
            <ResultActionsImgContainer>
              <img src="/images/see-comparative-result.png" alt="Ver resultado comparativo" />
            </ResultActionsImgContainer>

            <ResultActionsCardContent>
              <h2>Quer comparar com o mercado?</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

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
              <h2>Compartilhe esse teste</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <ResultActionsButton>
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
