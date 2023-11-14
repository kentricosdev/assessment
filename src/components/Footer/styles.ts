import styled from "styled-components";

export const ContainerFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 90px 120px;

  @media (min-width: 0) and (max-width: 920px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const MainContent = styled.div`
  display: flex;
  gap: 64px;
  padding-bottom: 30px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.5);

  @media (min-width: 0) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContainerLogo = styled.div`
  width: 25%;

  p {
    margin-top: 35px;
    color: ${({ theme }) => theme.colors.neutral60};
    font-size: 1rem;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: -0.32px;
  }

  @media (min-width: 0) and (max-width: 1024px) {
    width: 100%
  }
`

export const ContainerMenu = styled.div`
  display: flex;
  width: 75%;

  @media (min-width: 0) and (max-width: 1024px) {
    width: 100%;
    flex-wrap: wrap;
    gap: 24px 0;
  }
`

export const MenuGroup = styled.div`
  width: calc(100% / 4);

  @media (min-width: 425px) and (max-width: 767px) {
    width: calc(100% / 2);
  }

  @media (min-width: 0) and (max-width: 424px) {
    width: 100%;
  }
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    color: ${({ theme }) => theme.colors.neutral60};
    font-size: 1rem;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: -0.32px;
    width: fit-content;
  }
`

export const Title = styled.h3`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.neutral10};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.4px;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  p, a {
    color: ${({ theme }) => theme.colors.neutral60};
    font-size: 1rem;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: -0.32px;
    width: fit-content;
  }

  @media (min-width: 0) and (max-width: 600px) {
    flex-direction: column;
    gap: 24px;

    p {
      order: 1;
    }
  }
`;

export const BottomMenu = styled.nav`
  display: flex;
  gap: 36px;

  @media (min-width: 425px) and (max-width: 600px) {
    order: 0;
  }

  @media (min-width: 0px) and (max-width: 424px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const LogoLink = styled.a`
  display: block;
  width: fit-content;
`;