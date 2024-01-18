import { Formik, Form, Field, FieldProps, FieldAttributes, useField, FormikProps, FormikHelpers, ErrorMessage } from 'formik';
import { Container, Explanation, ExplanationText, ExplanationTitle, Title, Wrapper, FormActionsContainer, ClearButton, SubmitButton, ErrorWrapper } from './styles';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Switch from "react-switch";
import { useForms } from '../../context/forms';
import useAssessmentRedirect from '../../hooks/assessmentRedirect';
import { useMediaQuery } from 'react-responsive';
import * as Yup from 'yup';
import formatPhone from '../../utils/formatPhone';
import emailRegex from '../../utils/emailRegex';

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
  maturityLevel: string;
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
  max-width: 480px;
  gap: 10px;
  color: ${(props) => (props['aria-atomic'] ? '#0A0A0A' : '#888788')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width:0) and (max-width:1320px) {
    width: 100%;
    max-width: 100%;
  }

  p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 200;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, .2);
  max-height: 240px;
  scroll-behavior: auto;
  overflow: auto;

  @media (min-width: 0) and (max-width: 768px) {
    max-height: 230px;
  }
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
  const [field, _, helpers] = useField(props.name as string);
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
          <p>{field.value || 'Selecionar'}</p>
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
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const publicEmailProviders = ['gmail', 'outlook', 'hotmail', 'ig', 'aol', 'icloud', 'protonmail', 'mail', 'yandex', 'yahoo'];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo obrigatório.'),
    company: Yup.string().required('Campo obrigatório.'),
    email: Yup.string()
    .matches(emailRegex, 'Formato de e-mail inválido')
    .required('Campo obrigatório.')
    .test('is-corporate-email', 'Por favor, colocar o seu email corporativo.', function (value) {
      if (!value) return true;
      const domain = value.split('@')[1].split('.')[0];
      return !publicEmailProviders.includes(domain);
    }),
    whatsapp: Yup.string().min(11, "Número inválido. Deve ter pelo menos 10 caracteres.").max(13, "Número muito longo."),
    sector: Yup.string().required('Campo obrigatório'),
    employeeQuantity: Yup.string().required('Campo obrigatório.'),
    privacyPolicy: Yup.bool().oneOf([true], 'Você deve aceitar as políticas de privacidade para continuar.'),
    receiveContent: Yup.bool(),
    annualRevenue: Yup.string().required('Campo obrigatório.'),
    maturityLevel: Yup.string().required('Campo obrigatório.'),
  });


  const initialValues: MyFormValues = storedFormData
    ? JSON.parse(storedFormData)
    : {
        fullName: '',
        company: '',
        email: '',
        whatsapp: whatsappNumber,
        sector: '',
        employeeQuantity: '',
        maturityLevel: '',
        annualRevenue: '',
        privacyPolicy: false,
        receiveContent: false,
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
      console.log(values.whatsapp)
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

  useEffect(() => {
    console.log("aqui")
  }, [handleCleanForm])

  return (
    <>
      <Container>
        <Wrapper>
          <Title>O assessment</Title>

          <Explanation>
            <ExplanationTitle>
              Vamos nos conhecer?
            </ExplanationTitle>
            <ExplanationText>Antes de começar o processo de entendimento da maturidade da sua empresa, precisamos conhecer um pouco mais sobre você e sua empresa, para conseguirmos comparar os seus resultados com o mercado em que sua empresa atua.</ExplanationText>
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
                    <div className='FormFlexWrapper'>
                      <div className="input-wrapper">
                        <label htmlFor="fullName">Nome Completo: *</label>
                        <Field id="fullName" name="fullName" placeholder="Nome Completo" />
                        <ErrorMessage name="fullName" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="email">E-mail: *</label>
                        <Field id="email" name="email" type="email" placeholder="E-mail Corporativo" />
                        <ErrorMessage name="email" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="whatsapp">Whatsapp:</label>
                        <Field
                          id="whatsapp"
                          name="whatsapp"
                          type="phone"
                          placeholder="Whatsapp"
                          value={whatsappNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setWhatsappNumber(formatPhone((e.target.value)))
                            formikProps.setFieldValue("whatsapp", formatPhone((e.target.value)));
                          }}
                        />
                        <ErrorMessage name="whatsapp" component="p" className="error-message" />
                      </div>

                      {!isMobile && (
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
                      )}
                    </div>

                    <div className='FormFlexWrapper'>
                      <div className="input-wrapper">
                        <label htmlFor="company">Empresa: *</label>
                        <Field id="company" name="company" placeholder="Empresa" />
                        <ErrorMessage name="company" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="sector">Setor: *</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="sector"
                          name="sector"
                          options={[
                            { value: 'agencias', label: 'Agências' },
                            { value: 'agronegocio', label: 'Agronegócio' },
                            { value: 'alimentosBebidas', label: 'Alimentos e Bebidas' },
                            { value: 'construcao', label: 'Construção' },
                            { value: 'contactCenter', label: 'Contact Center' },
                            { value: 'ecommerce', label: 'E-commerce' },
                            { value: 'educacao', label: 'Educação' },
                            { value: 'energia', label: 'Energia' },
                            { value: 'entretenimento', label: 'Entretenimento' },
                            { value: 'estetica', label: 'Estética' },
                            { value: 'financeiro', label: 'Financeiro' },
                            { value: 'governo', label: 'Governo' },
                            { value: 'imobiliario', label: 'Imobiliário' },
                            { value: 'industria', label: 'Indústria' },
                            { value: 'saude', label: 'Saúde' },
                            { value: 'seguros', label: 'Seguros' },
                            { value: 'tecnologia', label: 'Tecnologia' },
                            { value: 'telecomunicacoes', label: 'Telecomunicações' },
                            { value: 'transportes', label: 'Transportes' },
                            { value: 'turismoHotelaria', label: 'Turismo e Hotelaria' },
                            { value: 'varejo', label: 'Varejo' },
                            { value: 'outros', label: 'Outros' },
                          ]}
                        />
                        <ErrorMessage name="sector" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="employeeQuantity">Quantidade de Funcionários: *</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="employeeQuantity"
                          name="employeeQuantity"
                          options={[
                            { value: '3', label: 'Até 3' },
                            { value: '4-10', label: '4 a 10' },
                            { value: '11-100', label: '11 a 100' },
                            { value: '101-1000', label: '101 a 1.000' },
                            { value: '1001-10000', label: '1.001 a 10.000' },
                            { value: '10001', label: 'Acima de 10.000' },
                          ]}
                        />
                        <ErrorMessage name="employeeQuantity" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="annualRevenue">Faturamento Anual (R$) *</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="annualRevenue"
                          name="annualRevenue"
                          options={[
                            { value: '50000', label: 'Até 50.000' },
                            { value: '50001-100000', label: '50.001 a 100.000' },
                            { value: '100001-1000000', label: '100.001 a 1.000.000' },
                            { value: '1000001-10000000', label: '1.000.001 a 10.000.000' },
                            { value: '10000001-100000000', label: '10.000.001 a 100.000.000' },
                            { value: '100000001', label: 'Acima de 100.000.000' },
                          ]}
                        />
                        <ErrorMessage name="annualRevenue" component="p" className="error-message" />
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="maturityLevel">Na sua opinião, qual o nível de maturidade em centralidade do cliente que sua empresa está?</label>
                        <CustomSelect
                          label="Escolha uma opção"
                          id="maturityLevel"
                          name="maturityLevel"
                          options={[
                            { value: 'inicial', label: 'Inicial - Não há foco algum no cliente' },
                            { value: 'fundamental', label: 'Fundamental - Se preocupa, mas não possui estratégia definida' },
                            { value: 'organizacional', label: 'Organizacional - Tem estratégia, mas não está integrada entre as áreas' },
                            { value: 'analitico', label: 'Analítico - Cultura centrada, com colaboradores e processos alinhados' },
                            { value: 'inovador', label: 'Inovador - Cultura centrada madura com liderança engajada' },
                            { value: 'naoSei', label: 'Não sei responder' },
                          ]}
                        />
                        <ErrorMessage name="maturityLevel" component="p" className="error-message" />
                      </div>

                      {isMobile && (
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
                      )}
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
