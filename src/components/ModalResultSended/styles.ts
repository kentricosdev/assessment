import styled from "styled-components";


export const Container = styled.div`
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`

export const Card = styled.div`
  display: flex;
  padding: 32px 32px 30px 32px;
  flex-direction: column;
  border-radius: 8px;
  background: #FFF;
  max-width: 480px;
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

export const Title = styled.h4`
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
  margin-bottom: 35px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`

export const Button = styled.button`
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
  border-radius: 100px;
  background: #89E3F5;
  padding: 14px 70px;
`