import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 544px;
  height: 292px;
  padding: 32px 32px 40px;
  border-radius: 8px;
  background: #FFF;
`;

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

export const Title = styled.p`
  color: #242125;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
`;

export const Text = styled.p`
  color: var#242125;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 43px;

  b {
    color: #242125;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 21px;
`;

export const Exit = styled.button`
  display: flex;
  width: 172px;
  height: 56px;
  padding: 14px 30px;
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
  line-height: 160%;
  letter-spacing: -0.32px;
  background-color: transparent;
`;

export const Cancel = styled.button`
  display: flex;
  width: 165px;
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

  &:hover {
    filter: brightness(1.03);
  }
`;
