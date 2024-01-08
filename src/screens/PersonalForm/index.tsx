import { Formik, Form, Field, FieldProps, FieldAttributes, useField, FormikProps, FormikHelpers, ErrorMessage } from 'formik';
import { Container, Explanation, ExplanationText, ExplanationTitle, Title, Wrapper, FormActionsContainer, ClearButton, SubmitButton, ErrorWrapper } from './styles';
import styled from 'styled-components';
import { useState } from 'react';
import Switch from "react-switch";
import { useForms } from '../../context/forms';
import useAssessmentRedirect from '../../hooks/assessmentRedirect';
import { useMediaQuery } from 'react-responsive';
import * as Yup from 'yup';

interface MyFormValues {
  fullName: string;
  company: string;
  email: string;
  sector: string;
  whatsapp: string;
  employeeQuantity: string;
  privacyPolicy: boolean;
  receiveContent: boolean;
  annualRevenue: string;
}

const StyledSwitch = styled(Switch)`

`;

/** CUSTOM SELECT START **/

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends FieldAttributes<any> {
  label: string;
  options: Option[];
}

const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #C2C2C2;
  border-radius: 4px;

  img {
    display: inline-flex;
  }

  &:hover {
    border-color: #686770;
  }
`;

const StyledSelect = styled.div`
  padding: 16px;
  width: 480px;
  gap: 10px;
  color: ${(props) => (props['aria-atomic'] ? '#0A0A0A' : '#888788')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

   @media (min-width:0) and (max-width:1320px) {
    width: 100%;
  }
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, .2);
`;

const StyledOption = styled.div<{ isselected: string }>`
  padding: 8px;
  background-color: ${(props) => (props.isselected === "true" ? '#ccc' : 'white')};
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props.name as string);
  console.log(meta)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelect = (value: string) => {
    helpers.setValue(value);
    setIsDropdownOpen(false);
  };

  return (
    <CustomSelectWrapper>
        <StyledSelect
          {...field}
          {...props}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={() => setIsDropdownOpen(false)}
          aria-atomic={!!field.value}
        >
          {field.value || 'Selecionar'}
          <img src="/icons/arrow-down.svg" alt="icon" />
        </StyledSelect>
      {isDropdownOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <StyledOption
              key={option.value}
              isselected={field.value === option.label ? "true" : "false"}
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </StyledOption>
          ))}
        </OptionsContainer>
      )}
    </CustomSelectWrapper>
  );
};
/** CUSTOM SELECT END **/

const PersonalForm: React.FC = () => {
  useAssessmentRedirect();
  const storedFormData = localStorage.getItem('personalForm');
  const isMobile = useMediaQuery({ maxWidth: 1320 });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo obrigatório'),
    company: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Formato de e-mail inválido').required('Campo obrigatório'),
    sector: Yup.string().required('Campo obrigatório'),
    whatsapp: Yup.string(),
    employeeQuantity: Yup.string().required('Campo obrigatório'),
    privacyPolicy: Yup.bool().oneOf([true], 'Você deve aceitar as políticas de privacidade'),
    receiveContent: Yup.bool(),
    annualRevenue: Yup.string().required('Campo obrigatório'),
  });

  const initialValues: MyFormValues = storedFormData
    ? JSON.parse(storedFormData)
    : {
        fullName: '',
        company: '',
        email: '',
        sector: '',
        whatsapp: '',
        employeeQuantity: '',
        privacyPolicy: false,
        receiveContent: false,
        annualRevenue: '',
      };
  const { handleAssessmentNextStep } = useForms();
  const handleCleanForm = (formikProps: FormikProps<MyFormValues>) => {
    localStorage.removeItem('personalForm')
    formikProps.resetForm()
    formikProps.validateForm();
  };

  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
    ) => {
    try {
      //criar coleçao "Client" no banco de dados com o documento "personalForm" como um objeto com os dados.
      localStorage.setItem('personalForm', JSON.stringify(values));
      handleAssessmentNextStep();

      // finalizar enviando os dados para o service do personal form e assim criar e adicionar os dados a uma coleçao de users do firebase,
      // para no futuro conectar o id desse user baseado no id/nome da coleção com as respostas submetidas ao fim do formulario.
    } catch (error) {
      actions.setSubmitting(false);
      throw new Error("Erro ao enviar dados pessoais.")
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>O assessment</Title>

          <Explanation>
            <ExplanationTitle>
              Vamos nos conhecer?
            </ExplanationTitle>
            <ExplanationText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</ExplanationText>
          </Explanation>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {
              (formikProps) => (
                <>
                  <Form>
                    <div className="input-wrapper">
                      <label htmlFor="fullName">Nome Completo: *</label>
                      <Field id="fullName" name="fullName" placeholder="Nome Completo" />
                      <ErrorMessage name="fullName" component="p" className="error-message" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="company">Empresa: *</label>
                      <Field id="company" name="company" placeholder="Empresa" />
                      <ErrorMessage name="company" component="p" className="error-message" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail: *</label>
                      <Field id="email" name="email" type="email" placeholder="E-mail" />
                      <ErrorMessage name="email" component="p" className="error-message" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="sector">Setor: *</label>
                      <CustomSelect
                        label="Escolha uma opção"
                        id="sector"
                        name="sector"
                        options={[
                          { value: 'option1', label: 'Opção 1' },
                          { value: 'option2', label: 'Opção 2' },
                        ]}
                      />
                      <ErrorMessage name="sector" component="p" className="error-message" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="whatsapp">Whatsapp:</label>
                      <Field id="whatsapp" name="whatsapp" type="phone" placeholder="Whatsapp" />
                      <ErrorMessage name="whatsapp" component="p" className="error-message" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="employeeQuantity">Quantidade de Funcionário: *</label>
                      <CustomSelect
                        label="Escolha uma opção"
                        id="employeeQuantity"
                        name="employeeQuantity"
                        options={[
                          { value: 'option1', label: 'Opção 1' },
                          { value: 'option2', label: 'Opção 2' },
                        ]}
                      />
                      <ErrorMessage name="employeeQuantity" component="p" className="error-message" />
                    </div>

                    {isMobile && (
                      <div className="input-wrapper">
                        <label htmlFor="annualRevenue">Faturamento Anual: *</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="annualRevenue"
                          name="annualRevenue"
                          options={[
                            { value: 'option1', label: 'Opção 1' },
                            { value: 'option2', label: 'Opção 2' },
                          ]}
                        />
                        <ErrorMessage name="annualRevenue" component="p" className="error-message" />
                      </div>
                    )}

                    <div className="input-wrapper-policy">
                      <ErrorWrapper>
                        <div className="policy-inner-wrapper">
                          <Field name="privacyPolicy">
                            {({ field, form }: FieldProps<MyFormValues>) => (
                              <StyledSwitch
                                offColor="#e4e5e7"
                                onColor="#e4e5e7"
                                height={13}
                                width={33}
                                handleDiameter={16}
                                offHandleColor="#888788"
                                onHandleColor="#184E77"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onChange={(checked) => {
                                  form.setFieldValue(field.name, checked);
                                }}
                                checked={!!field.value}
                              />
                            )}
                          </Field>
                          <div className="check-description">
                            <label htmlFor="privacyPolicy">Politicas de privacidade: *</label>
                            <p>Eu li e aceito os termos de privacidade.</p>
                          </div>
                        </div>
                        <ErrorMessage name="privacyPolicy" component="p" className="error-message" />
                      </ErrorWrapper>

                      <ErrorWrapper>
                        <div className="policy-inner-wrapper">
                          <Field name="receiveContent">
                            {({ field, form }: FieldProps<MyFormValues>) => (
                              <StyledSwitch
                                offColor="#e4e5e7"
                                onColor="#e4e5e7"
                                height={13}
                                width={33}
                                handleDiameter={16}
                                offHandleColor="#888788"
                                onHandleColor="#184E77"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onChange={(checked) => {
                                  form.setFieldValue(field.name, checked);
                                }}
                                checked={!!field.value}
                              />
                            )}
                          </Field>
                          <div className="check-description">
                            <label htmlFor="receiveContent">Aceito Receber conteúdos e noticias:</label>
                            <p>Eu aceito receber os conteúdos e notícias desta empresa.</p>
                          </div>
                          <ErrorMessage name="receiveContent" component="p" className="error-message" />
                        </div>
                      </ErrorWrapper>
                    </div>

                    {!isMobile && (
                      <div className="input-wrapper">
                        <label htmlFor="annualRevenue">Faturamento Anual: *</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="annualRevenue"
                          name="annualRevenue"
                          options={[
                            { value: 'option1', label: 'Opção 1' },
                            { value: 'option2', label: 'Opção 2' },
                          ]}
                        />
                        <ErrorMessage name="annualRevenue" component="p" className="error-message" />
                      </div>
                    )}

                    <FormActionsContainer>
                      <ClearButton type="button" onClick={() => handleCleanForm(formikProps)}>Limpar</ClearButton>
                      <SubmitButton type="submit">Iniciar Assessment</SubmitButton>
                    </FormActionsContainer>
                  </Form>
                </>
              )
            }
          </Formik>
        </Wrapper>
      </Container>
    </>
  )
}

export default PersonalForm;
