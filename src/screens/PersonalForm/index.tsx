import { Formik, Form, Field, FieldProps, FieldAttributes, useField, FormikProps, FormikHelpers } from 'formik';
import { Container, Explanation, ExplanationText, ExplanationTitle, Title, Wrapper, FormActionsContainer, ClearButton, SubmitButton } from './styles';
import styled from 'styled-components';
import { useState } from 'react';
import Switch from "react-switch";
import { useForms } from '../../context/forms';
import useAssessmentRedirect from '../../hooks/assessmentRedirect';

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
  color: #888788;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
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
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </CustomSelectWrapper>
  );
};
/** CUSTOM SELECT END **/

const PersonalForm: React.FC = () => {
  useAssessmentRedirect();
  const storedFormData = localStorage.getItem('personalForm');

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
  const { handleAssessmentNextStep, assessmentStep } = useForms();
  const handleCleanForm = (formikProps: FormikProps<MyFormValues>) => {
    localStorage.removeItem('personalForm')
    formikProps.resetForm();
  };

  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
    ) => {
    try {
      //criar coleçao "Client" no banco de dados com o documento "personalForm" como um objeto com os dados.
      console.log("values", values)
      console.log("actions", actions)
      localStorage.setItem('personalForm', JSON.stringify(values));
      handleAssessmentNextStep();
      console.log("assessmentStep",assessmentStep)


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
          >
            {
              (formikProps) => (
                <>
                  <Form>
                    <div className="input-wrapper">
                      <label htmlFor="fullName">Nome Completo:</label>
                      <Field id="fullName" name="fullName" placeholder="Nome Completo" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="company">Empresa:</label>
                      <Field id="company" name="company" placeholder="Empresa" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail:</label>
                      <Field id="email" name="email" type="email" placeholder="E-mail" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="sector">Setor:</label>
                      <CustomSelect
                        label="Escolha uma opção"
                        id="sector"
                        name="sector"
                        options={[
                          { value: 'option1', label: 'Opção 1' },
                          { value: 'option2', label: 'Opção 2' },
                        ]}
                      />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="whatsapp">Whatsapp:</label>
                      <Field id="whatsapp" name="whatsapp" type="phone" placeholder="Whatsapp" />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="employeeQuantity">Quantidade de Funcionário:</label>
                      <CustomSelect
                        label="Escolha uma opção"
                        id="employeeQuantity"
                        name="employeeQuantity"
                        options={[
                          { value: 'option1', label: 'Opção 1' },
                          { value: 'option2', label: 'Opção 2' },
                        ]}
                      />
                    </div>

                    <div className="input-wrapper-policy">
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
                          <label htmlFor="privacyPolicy">Politicas de privacidade:</label>
                          <p>Eu li e aceito os termos de privacidade.</p>
                        </div>
                      </div>

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
                      </div>

                    </div>


                    <div className="input-wrapper">
                      <label htmlFor="annualRevenue">Faturamento Anual:</label>
                      <CustomSelect
                        label="Escolha uma opção"
                        id="annualRevenue"
                        name="annualRevenue"
                        options={[
                          { value: 'option1', label: 'Opção 1' },
                          { value: 'option2', label: 'Opção 2' },
                        ]}
                      />
                    </div>

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
