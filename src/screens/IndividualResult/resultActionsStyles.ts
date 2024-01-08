import styled from "styled-components";

export const IndividualResultActions = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
  margin-top: 55px;
  flex-wrap: wrap;
`;

export const ResultActionsCard = styled.div`
  padding: 20px 20px 34px 33px;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid #CACACA;
  width: calc(50% - 19px);

  display: flex;
  gap: 32px;

  @media (min-width: 0) and (max-width: 1420px) {
    width: 100%;
  }

  @media (min-width: 0) and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ResultActionsImgContainer = styled.div`
  width: fit-content;
`;

export const ResultActionsCardContent = styled.div`
  h2 {
    color: #0A0A0A;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 135%; /* 54px */
    letter-spacing: -1.2px;
    margin-bottom: 19px;
  }

  p {
    color: #616161;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 32px */
    letter-spacing: -0.4px;
    margin-bottom: 27px;
    max-width: 250px;

    @media (min-width: 0) and (max-width: 1420px) {
    max-width: 100%;
    }
  }
`;

export const ResultActionsButton = styled.button`
  display: flex;
  padding: 14px 72px;
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