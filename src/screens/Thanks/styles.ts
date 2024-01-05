import styled from "styled-components";

export const Container = styled.div`

`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 90px 120px;

  @media (min-width: 0) and (max-width: 920px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`