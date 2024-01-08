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

export const Title = styled.h3`
  color: #0A0A0A;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 67.2px */
  letter-spacing: -1.44px;
  margin-top: 76px;
`

export const Description = styled.p`
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
  letter-spacing: -0.4px;
  margin-top: 30px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 72px;
`

export const SeeResult = styled.button`
  display: flex;
  width: 100%;
  max-width: 241px;
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

  @media (min-width: 0) and (max-width: 600px) {
    max-width: 100%;
  }
`