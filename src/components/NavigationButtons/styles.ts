import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 34px;
  align-items: center;

  flex-wrap: wrap;

  @media (min-width:0) and (max-width:600px) {
    gap: 18px;
    button {
      max-width: 100%;
    }
  }
`

export const Previous = styled.button`
  display: flex;
  width: 100%;
  max-width: 160px;
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
`

export const Next = styled.button`
  display: flex;
  width: 100%;
  max-width: 217px;
  height: 56px;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #76E2F4;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.32px;
`

export const SeeResult = styled.button`
  display: flex;
  width: 100%;
  max-width: 217px;
  height: 56px;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #A5BE00;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.32px;
`