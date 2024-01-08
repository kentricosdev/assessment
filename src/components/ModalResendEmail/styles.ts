import styled from "styled-components";

export const ModalCard = styled.div`
  border-radius: 8px;
  background: #FFF;
  padding: 32px;
  width: 100%;
  max-width: 544px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  button {
    background-color: transparent;
    border: none;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Title = styled.p`
  color: #242125;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 31.2px */
`

export const Description = styled.p`
  color: #242125;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 23.8px */
  margin: 40px 0;
  `

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  .error-message {
    margin-top: 8px;
    color: #BF3131;
    font-size: 0.875rem;
  }

  label {
    margin-bottom: 8px;
    color: #686770;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
  }

  input {
    width: 100%;
    max-width: 480px;
    padding: 16px;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid var(--Line-stock, #EAEAF0);
    color: #242125;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 160%;

    &::placeholder {
      color: #888788;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 160%; /* 22.4px */
    }
  }
`

export const ActionsContainer = styled.div`
  margin-top: 37px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 21px;
`

export const Cancel = styled.button`
  max-width: 172px;
  width: 100%;
  height: 56px;
  padding: 14px 30px;
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
`


export const Save = styled.button`
  display: flex;
  width: 100%;
  max-width: 165px;
  height: 56px;
  padding: 14px 30px;
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
`