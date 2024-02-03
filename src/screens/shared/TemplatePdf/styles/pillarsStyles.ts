import styled from "styled-components";

export const Container = styled.div`
`

export const IndividualPillarsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`

export const ScoresContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  .scoreWrapper {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
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
`

export const Result = styled.p`
  overflow: hidden;
  color: #242125;
  text-overflow: ellipsis;
  font-size: 28px;
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
