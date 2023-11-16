import styled from 'styled-components';

export const ContainerHeader = styled.header`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.neutral100};

  @media (min-width: 992px) {
    padding:  42px 0 0 120px;
  }
`;

export const Menu = styled.div`
  margin-bottom: 40px;

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
  }
`;

export const Logo = styled.a`
  flex: 1;

  a {
    display: block;
    width: fit-content;
  }
`;

export const Navigation = styled.nav`
  flex-shrink: 0 auto;
  justify-content: center;
  flex: 2;

  @media (min-width: 993px) {
    display: flex;
    gap: 48px;
  }
`;

export const NavigationItem = styled.div`
  a {
    color: ${({ theme }) => theme.colors.neutral40};
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    position: relative;

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
  }
`;

export const MainContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftSide = styled.div`
  padding-right: 10px;
  width: 50%;
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
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
`;

export const StartAssessment = styled.div`
  width: fit-content;

  button {
    cursor: pointer;
    border-radius: 100px;
    background: ${({ theme }) => theme.colors.primary2};
    padding: 14px 30px;
    width: 217px;
    height: 56px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.neutral100};
    font-weight: 700;
    letter-spacing: -0.32px;
  }
`;

export const SeeVideo = styled.div`
  width: fit-content;

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
  }
`;

export const RightSide = styled.div`
  img {
    display: block;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
`