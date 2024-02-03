import styled from "styled-components";

export const Container = styled.div`

`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 60px 83px;
`

export const TotalScoreContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 22px;
  margin-top: 58px;
  margin-bottom: 70px;
`;

export const ScoreResultCard = styled.div`
  border-radius: 8px;
  border: 1px solid #CACACA;
  padding: 19px 27px 82px 20px;
  width: 100%;
  min-width: 347px;
  max-width: 347px;
  min-height: 314px;

  .ResultsFlex {
    display: flex;
    align-items: center;
    gap: 19px;
    margin-top: 34px;
  }

  p {
    color: #242125;
    font-size: 58.3328px;
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
      font-size: 29.1664px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;

    }
  }
`;

export const TotalResultCardTitle = styled.h1`
  color: #242125;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
`

export const ProgressBarContainer = styled.div`
  width: 50%;
`

export const PillarsComparativeContainer = styled.div`
  display: flex;
  gap: 45px;
  align-items: center;
`

export const CompanyName = styled.p`
  font-size: 32px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 300;

  span {
    font-weight: 500;
  }
`

export const MaturityOptionChosen = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 130%;
  font-weight: 400;

  span {
    font-style: italic;
    font-weight: 500;
  }
`