import styled from "styled-components";

export const Container = styled.main`

`

export const VideoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral30};
  display: flex;
  justify-content: space-between;
  padding-top: 34px;
`

export const Video = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  img {
    border-radius: 10px;
    width: 100%;
    height: auto;
  }
`

export const BubblesLeft = styled.div`

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const BubblesRight = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const TheAssessment = styled.div`
  background-color: #0E334F;
  padding: 90px 120px;

  @media (min-width: 0) and (max-width: 920px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  .assessment-title {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral10};
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 38px;
    letter-spacing: -0.48px;
    margin-bottom: 40px;
  }

  .main-title {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral10};
    font-size: 3rem;
    font-weight: 500;
    line-height: 59px;
    letter-spacing: -1.44px;
  }
`

export const AsessmentWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 0) and (max-width: 479px) {
    .main-title {
      margin-bottom: 30px;
    }
  }
`

export const Infos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;


  @media (min-width: 0) and (max-width: 1200px) {
    gap: 0;
  }
`

export const InfoItem = styled.div`
  width: calc((100% - 180px) / 4);
  padding: 48px 32px;

  img {
    width: 100%;
    height: auto;
    max-width: 69px;
    max-height: 69px;
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    width: calc((100%) / 2);
  }

  @media (min-width: 0) and (max-width: 479px) {
    width: 100%;
    padding: 24px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const InfoDescription = styled.div`
  color: #DADADA;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;

  @media (min-width: 0) and (max-width: 479px) {
    text-align: center;
  }
`

export const InfoTitle = styled.div`
  margin: 24px 0;
  color: #FFF;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.4px;
`

export const About = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral30};
  padding: 89px 120px 89px 100px;

  @media (min-width: 0) and (max-width: 920px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  > h2:first-child {
    margin-bottom: 10px;
    text-align: center;
  }
`

export const AboutContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  display: flex;
  gap: 100px;
  align-items: center;

  @media (min-width: 0px) and (max-width: 860px) {
    gap: 50px;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    flex-direction: column;
    margin-top: 40px;
  }
`

export const AboutDescription = styled.div`
  width: calc(50% - 50px);

  @media (min-width: 768px) and (max-width: 860px) {
    width: calc(55% - 50px);
  }

  @media (min-width: 0) and (max-width: 767px) {
    max-width: 500px;
    width: 100%;
  }

  .title-description {
    color: ${({ theme }) => theme.colors.neutral100};
    font-size: 3.375rem;
    font-weight: 700;
    line-height: 72px;
    letter-spacing: -1.62px;
    margin-bottom: 24px;
  }

  .text-description {
    color: ${({ theme }) => theme.colors.neutral80};
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.4px;
    margin-bottom: 18px;
  }
`

export const AboutImage = styled.div`
  width: calc(50% - 50px);

  @media (min-width: 768px) and (max-width: 860px) {
    width: calc(45%);
    margin-left: 30px;
  }

  @media (min-width: 0) and (max-width: 767px) {
    width: fit-content;
  }

  img {
    width: 100%;
    max-width: 520px;
    height: auto;
    object-fit: contain;

    @media (min-width: 0) and (max-width: 767px) {
      max-width: 400px;
    }
  }
`

export const AboutDatas = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;

  @media (min-width: 375px) and (max-width: 767px) {
    gap: 25px;
  }

  @media (min-width: 0px) and (max-width: 375px) {
    gap: 15px;
  }
`

export const DataItem = styled.div`
`

export const DataNumber = styled.p`
  color: ${({ theme }) => theme.colors.neutral100};
  font-size: 2rem;
  font-weight: 700;
  line-height: 51px;
  letter-spacing: -0.64px;
`

export const DataText = styled.p`
  color: ${({ theme }) => theme.colors.neutral80};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.4px;
`

export const AboutSeeMore = styled.a`
  color: ${({ theme }) => theme.colors.primary1};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
`

export const Newsletter = styled.div`
  background-color: ${({ theme }) => theme.colors.primary2};
  background-image: url('/images/all-blue-rounded.png');
  background-position: center 35px;
  background-repeat: no-repeat;
  padding: 89px 16px;

  h2 {
    color: ${({ theme }) => theme.colors.neutral100};
    text-align: center;
    font-size: 2.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: -0.76px;
    margin-bottom: 24px;
    max-width: 500px;
  }

  p {
    color: ${({ theme }) => theme.colors.neutral100};
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: -0.32px;
    margin-bottom: 60px;
  }

`

export const NewsletterWrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InputContainer = styled.div`
  display: inline-flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #fff;

  @media (min-width: 0) and (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 0) and (max-width: 460px) {
    display: flex;
    flex-direction: column;
    background: transparent;
  }

  input {
    width: 399px;
    color: ${({ theme }) => theme.colors.neutral100};
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: -0.32px;
    padding: 20px 10px 20px 30px;
    margin-right: 6px;
    background-color: transparent;

    &::placeholder {
      opacity: 0.6;
    }

    @media (min-width: 0) and (max-width: 460px) {
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 20px 30px;
      background-color: #FFF;
      border-radius: 100px;
      margin-bottom: 20px;
    }
  }

  button {
    width: 269px;
    display: flex;
    padding: 20px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    background: #184E77;
    color: #FFF;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: -0.32px;

    @media (min-width: 0) and (max-width: 460px) {
      width: 100%;
    }
  }

`