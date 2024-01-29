import styled from "styled-components"

export const TalkToUsCard = styled.div`
    padding: 16px 12px 28px;
    border-radius: 7px;
    background: #89E3F5;
    max-width: 202px;
    min-width: 202px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width:0) and (max-width:768px) {
      width: 100%;
      max-width: 430px;
      min-width: 0;
      margin: 0 auto;
    }

    img {
      max-width: 40px;
      height: auto;
      object-fit: contain;
    }

    p {
      color: #242125;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%; /* 22.4px */
      margin: 12px 0 16px;
    }
`

export const TalkToUsAction = styled.button`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
  padding: 14px 25px;
  border-radius: 100px;
  background: #FFF;
`