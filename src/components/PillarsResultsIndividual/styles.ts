import styled from "styled-components";

export const Container = styled.div`
`

export const Dropdown = styled.button`
  margin: 0 auto 20px;
  width: 100%;
  display: flex;
  font-weight: 600;
  align-items: center;
  font-size: 16px;
  border: 1px solid #000;
  background-color: transparent;
  padding: 8px;
  border-radius: 100px;
  max-width: 430px;
  justify-content: center;

  @media (min-width: 619px) {
    display: none;
  }

  svg {
    font-size: 30px;
    margin-right: 8px;
  }
`

interface ScoresContainerProps {
  isOpen: boolean;
}

export const ScoresContainer = styled.div<ScoresContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  @media (min-width: 0) and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
  }

  .scoreWrapper {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;

    @media (min-width: 0) and (max-width: 768px) {
      justify-content: center;
    }

    @media (min-width: 0) and (max-width: 618px) {
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
    }

    @media (min-width: 0) and (max-width: 425px) {
      max-height: ${({ isOpen }) => (isOpen ? "1650px" : "0")};
    }

    @media (min-width: 426px) and (max-width: 618px) {
      max-height: ${({ isOpen }) => (isOpen ? "1100px" : "0")};
    }
  }
`

export const Card = styled.div`
  padding: 24px 32px;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid #CACACA;
  max-width: 202px;

  @media (min-width:0) and (max-width: 425px) {
    max-width: 100%;
    width: 100%;
  }
`

export const CardTitle = styled.p`
  overflow: hidden;
  color: #888788;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 22.4px */

  width: 137px;
  text-align: center;

  @media (min-width: 0) and (max-width: 420px) {
    width: 100%;
  }
`

export const Result = styled.p`
  overflow: hidden;
  color: #242125;
  text-overflow: ellipsis;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 33.6px */

  span {
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #242125;
    text-overflow: ellipsis;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 121px;
  max-height: 121px;
`

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
    }

    img {
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