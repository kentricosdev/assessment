import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 60px 120px 90px;

    .error-message {
      color: #BF3131 !important;
      font-size: 0.875rem;
      width: 100%;
    }

    @media (min-width:0) and (max-width:1320px) {
      padding-left: 24px;
      padding-right: 24px;
    }

    @media (min-width:0) and (max-width:425px) {
      padding-left: 16px;
      padding-right: 16px;
    }
`;

export const ErrorWrapper = styled.div`

`

export const Wrapper = styled.div`

  Form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 26px 100px;

    @media (min-width:0) and (max-width:1320px) {
        justify-content: center;
      }

    .FormFlexWrapper {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 26px;

      @media (min-width:0) and (max-width:1320px) {
        width: 100%;
        max-width: 600px;
      }
    }


    .input-wrapper {
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        max-width: 480px;

        @media (min-width:0) and (max-width:1320px) {
          max-width: 100%;
        }
      }

      @media (min-width:0) and (max-width:1320px) {
        width: 100%;
        max-width: 600px;

        input {
          width: 100%;
        }
      }

      input {
        color: #0A0A0A;
        &::placeholder {
          color: #888788;
        }
      }
    }

    .input-wrapper-policy {
      display: flex;
      flex-direction: column;
      width: 480px;
      gap: 26px;

      @media (min-width:0) and (max-width:1320px) {
        width: 100%;
        max-width: 600px;
      }

      .policy-inner-wrapper {
        display: flex;
        align-items: center;
        gap: 22px;

        .check-description {
          label {
            margin-bottom: 8px;
            display: block;
          }
        }
      }

      .check-field {
        height: fit-content;
      }

      label {
        color: rgba(49, 46, 50, 0.80);
        font-size: 1.0625rem;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 23.8px */
      }

      p {
        color: #888788;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 22.4px */
      }
    }

    input {
      width: 480px;
      padding: 16px;
      gap: 10px;
      border-radius: 4px;
      border: 1px solid #C2C2C2;

      &:hover {
        border-color: #686770;
      }
    }

    label {
      color: #686770;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: 160%;
    }
  }
`;

export const Title = styled.h1`
  color: #0A0A0A;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.48px;
  width: 100%;
  margin-bottom: 40px;
`;

export const Explanation = styled.div`
  /* Your explanation styles here */
  @media (min-width:0) and (max-width: 1320px) {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const ExplanationTitle = styled.h2`
  width: 100%;
  color: #0A0A0A;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -1.44px;
  margin-bottom: 31px;
`;

export const ExplanationText = styled.p`
  width: 100%;
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.4px;
  margin-bottom: 100px;
`;

export const AssessmentForm = styled.form`
  /* Your form styles here */
`;

export const Label = styled.label`
  /* Your label styles here */
`;

export const Input = styled.input`
  /* Your input styles here */
`;

export const Select = styled.select`
  /* Your select styles here */
`;

export const ToggleButton = styled.input`
  /* Your toggle button styles here */
`;

export const FormActionsContainer = styled.div`
  margin-top: 26px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 23px;

  @media (min-width:0) and (max-width:1320px) {
    margin-top: 32px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
  }
`;

export const ClearButton = styled.button`
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
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
  background-color: transparent;

  @media (min-width:0) and (max-width:600px) {
    max-width: 100%;
  }
`;

export const SubmitButton = styled.button`
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
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;

  @media (min-width:0) and (max-width:600px) {
    max-width: 100%;
  }

  &:hover {
    filter: brightness(1.03);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.neutral50};
  }

  &:disabled:hover {
    filter: none;
  }
`;