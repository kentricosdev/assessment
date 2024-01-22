import styled from "styled-components";

export const Container = styled.div`

`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 62px 120px 83px;

  @media (min-width: 0) and (max-width: 920px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`

// SCORE: TOTAL RESULT

export const TotalScoreContainer = styled.div`
  display: flex;
  align-items: normal;
  gap: 22px;
  margin-top: 58px;
  margin-bottom: 70px;

  @media (min-width: 0) and (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ScoreResultCard = styled.div`
  border-radius: 8px;
  border: 1px solid #CACACA;
  padding: 19px 27px 82px 20px;
  width: 100%;
  min-width: 347px;
  max-width: 347px;
  min-height: 314px;

  @media (min-width: 0) and (max-width: 1200px) {
    max-width: 100%;
    padding-bottom: 40px;
    min-height: 0;
  }

  @media (min-width: 0) and (max-width: 380px) {
    min-width: 0;
  }

  .ResultsFlex {
    display: flex;
    align-items: center;
    gap: 19px;
    margin-top: 34px;

    @media (min-width: 0) and (max-width: 1200px) {
      justify-content: center;
      margin-top: 16px;

      p {
        width: fit-content;
      }
    }

    @media (min-width: 0) and (max-width: 380px) {
      p {
        width: 55%;
      }
    }

  }

  p {
    color: #242125;
    font-size: 3.6458rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 70px */
    width: 50%;

    span {
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      color: #242125;
      text-overflow: ellipsis;
      font-size: 1.8229rem;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;

    }
  }
`;

export const ProgressResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  .mini {
    width: 100% !important;
    color: #242125;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 80%; /* 28px */
  }
`;

export const ProgressResultsIndividual = styled.div`

  font-size: 3.6458rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  p {
    color: #89E3F5;
  }
  span {
    color: #242125;
    font-size: 1.8229rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }
`;

export const ProgressResultsComparative = styled.div`
  font-size: 3.6458rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  span {
    color: #242125;
    font-size: 1.8229rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }
  p {
    color: #184E77;
  }
`;


export const TotalResultCardTitle = styled.h1`
  color: #242125;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
`

export const ScoreExplanationCard = styled.div`
  border-radius: 8px;
  border: 1px solid #CACACA;
  padding: 20px 34px 23px 36px;
`;

export const ScoreExplanation = styled.div`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
  margin-bottom: 36px;
  margin-top: 21px;
`;

export const ScoreResultActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 30px;
  margin-top: 60px;

  @media (min-width: 0) and (max-width: 590px) {
    flex-wrap: wrap;
    gap: 20px;

    button {
      width: 100%;
    }
  }

  @media (min-width: 0) and (max-width: 350px) {
    button {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
`;

export const SendEmail = styled.button`
  display: flex;
  padding: 14px 48px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  border: 1px solid #000;

  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
`;

export const DownloadPdf = styled.button`
  display: flex;
  padding: 14px 80px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #89E3F5;

  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
`;

// --------------------------------------------------

// SCORE: PILLARS RESULTS

export const ProgressBarContainer = styled.div`
  width: 50%;

  @media (min-width: 0) and (max-width: 1200px) {
    max-width: 200px;
  }
`

export const PillarsComparativeContainer = styled.div`
  display: flex;
  gap: 45px;
  align-items: center;

  @media (min-width: 0) and (max-width: 619px) {
    flex-wrap: wrap;
  }
`