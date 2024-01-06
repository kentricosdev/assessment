import styled from 'styled-components';

export const ContainerHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.neutral100};

  background-image: url('/images/hero-main-banner-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 640px;

  @media (min-width: 0) and (max-width: 425px) {
    height: fit-content;
    min-height: 640px;
  }
`;

export const Menu = styled.div`
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  @media (min-width: 992px) {
    height: 56px;
  }

  .leave-assessment--button {
    display: none;


    @media (min-width: 500px) {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
`;

export const Logo = styled.div`
  flex: 1;
  display: block;
  width: fit-content;
  cursor: pointer;
`;

export const LogoMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-bottom: 60px;
  cursor: pointer;
  width: 100%;

  img {
    width: 100%;
    max-width: 200px;
  }
`;

export const Navigation = styled.nav`
  flex-shrink: 0 auto;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 2;
  display: none;

  @media (min-width: 992px) {
    display: flex;
    gap: 48px;
  }

  @media (min-width: 0px) and (max-width: 1300px) {
    gap: 20px;
  }
`;

export const MobileNavigation = styled.div`
  display: block;
  margin-left: 20px;

  svg {
    font-size: 30px;
    display: block;
  }

  @media (min-width: 992px) {
    display: none;
  }
`

export const MobileNavContent = styled.div<{ ishidden?: string }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.ishidden === 'true' ? '-70%' : '0')};
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutral100};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: right 0.3s;
  padding: 18px 24px;

  @media (min-width: 500px) {
    right: ${(props) => (props.ishidden === 'true' ? '-40%' : '0')};
    width: 40%;
    z-index: 999;
  }
`

export const MobileNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 40px;
`

export const NavigationItem = styled.div`
  margin-bottom: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 993px) {
    margin-bottom: 0px;
    text-align: start;
  }

  a, .link {
    color: ${({ theme }) => theme.colors.neutral40};
    text-align: center;
    font-weight: 700;
    position: relative;
    font-size: 1.2rem;
    cursor: pointer;
    width: fit-content;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary2};
      transition: width 0.3s;
    }

    &:hover::after {
      width: 100%;
    }

    /* Optional: Add transition for the color change */
    &:hover {
      transition: color 0.3s;
    }

    @media (min-width: 993px) {
      font-size: 1rem;
    }
  }
`;

export const MainContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const LeftSide = styled.div`
  padding-right: 10px;
  padding-top: 70px;
  padding-left: 120px;
  width: 50%;

  @media (min-width: 0px) and (max-width: 1180px) {
    padding-left: 16px;
    width: 70%;
  }

  @media (min-width: 0px) and (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 21px;

  h1 {
    color: ${({ theme }) => theme.colors.neutral10};
    font-size: 3.375rem;
    font-weight: 700;
    letter-spacing: -1.62px;

    @media (min-width: 0) and (max-width: 375px) {
      font-size: 2.375rem;
    }
  }

  img {
    cursor: pointer;
    @media (min-width: 0) and (max-width: 430px) {
      max-width: 100px;
    }
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.neutral10};
  font-size: 1.25rem;
  margin-bottom: 69px;
  letter-spacing: -0.4px;
  font-weight: 500;
  line-height: 32px;
  max-width: 434px;

  @media (min-width: 0) and (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;

  @media (min-width: 0px) and (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  @media (min-width: 375px) and (max-width: 465px) {
    gap: 20px;
  }
`;

export const StartAssessment = styled.div`
  width: fit-content;

  a {
    display: block;
  }

  button {
    cursor: pointer;
    border-radius: 100px;
    background: ${({ theme }) => theme.colors.primary2};
    padding: 14px 37px;
    height: 56px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.neutral100};
    font-weight: 700;
    letter-spacing: -0.32px;

    @media (min-width: 420px) {
      max-width: 217px;
    }

    @media (min-width: 0px) and (max-width: 420px) {
      width: 100%;
    }
  }

  @media (min-width: 420px) and (max-width: 465px) {
    width: 55%;
  }

  @media (min-width: 0px) and (max-width: 420px) {
    width: 100%;
  }
`;

export const SeeVideo = styled.div`
  width: fit-content;

  a {
    display: block;
  }

  button {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.neutral100};
    font-weight: 700;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.neutral10};
    letter-spacing: -0.32px;
    border-radius: 100px;
    height: 56px;
    padding: 14px 30px;border: 1px solid rgba(255, 255, 255, 0.50);

    @media (min-width: 420px) {
      max-width: 180px;
    }

    @media (min-width: 0) and (max-width: 768px) {
      width: 100%;
    }
  }

  @media (min-width: 420px) and (max-width: 465px) {
    width: 45%;
  }

  @media (min-width: 0px) and (max-width: 420px) {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const RightSide = styled.div`
  img {
    display: block;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding-top: 24px;
  padding-bottom: 6%;

  @media (min-width: 992px) {
    padding:  42px 0 6% 0;
  }

  @media (min-width: 0) and (max-width: 768px) {
    padding-bottom: 14%;
  }
`


export const Leave = styled.button`
  color: #FFF;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: -0.32px;
  display: flex;
  width: 160px;
  height: 56px;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  background-color: transparent;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.50);
`