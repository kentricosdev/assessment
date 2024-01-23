import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ActionsContainer, Cancel, TitleContainer, Description, InputGroup, ModalCard, ModalOverlay, Save, Title } from './styles';
import formatPhone from '../../utils/formatPhone';
import emailRegex from '../../utils/emailRegex';

interface GetInTouchProps {
  onClose: () => void;
}

interface MyFormValues {
  email: string;
  whatsapp: string;
}


const ModalGetInTouch: React.FC<GetInTouchProps> = ({ onClose }) => {
  const modalRootRef = useRef(document.getElementById('modal-contact-root') || document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));
  const publicEmailProviders = ['gmail', 'outlook', 'hotmail', 'ig', 'aol', 'icloud', 'protonmail', 'mail', 'yandex', 'yahoo'];

  const storedPersonalContactUsData = localStorage.getItem('personalDataContactUs');
  const storedPersonalFormData = localStorage.getItem('personalForm');

  const [whatsappNumber, setWhatsappNumber] = useState(
    storedPersonalFormData
    ? JSON.parse(storedPersonalFormData).whatsapp
    : (storedPersonalContactUsData
      ? JSON.parse(storedPersonalContactUsData).whatsapp
      : ''
    ),
  );

  const initialValues = {
    email: storedPersonalFormData
      ? JSON.parse(storedPersonalFormData).email
      : (storedPersonalContactUsData
          ? JSON.parse(storedPersonalContactUsData).email
          : ''
        ),
    whatsapp: whatsappNumber,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
    .matches(emailRegex, 'Formato de e-mail inválido')
    .required('Campo obrigatório.')
    .test('is-corporate-email', 'Por favor, colocar o seu email corporativo.', function (value) {
      if (!value) return true;
      const domain = value.split('@')[1].split('.')[0];
      return !publicEmailProviders.includes(domain);
    }),
    whatsapp: Yup.string().min(11, "Número inválido. Deve ter pelo menos 10 caracteres.").max(13, "Número muito longo.").required('Campo obrigatório.')
  });


  useEffect(() => {
    if (!document.getElementById('modal-contact-root')) {
      document.body.appendChild(modalRootRef.current);
    }

    modalRootRef.current.appendChild(modalContainerRef.current);

    return () => {
      if (modalRootRef.current.parentElement) {
        modalRootRef.current.removeChild(modalContainerRef.current);
        if (modalRootRef.current.childElementCount === 0) {
          document.body.removeChild(modalRootRef.current);
        }
      }
    };
  }, [modalRootRef]);

  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
  try {
    const personalData = { ...values };
    localStorage.setItem('personalDataContactUs',  JSON.stringify(personalData))

    if (storedPersonalFormData) {
      const companyName = JSON.parse(storedPersonalFormData).company
      const fullname = JSON.parse(storedPersonalFormData).fullName

      const whatsappLink = `https://wa.me/5511981878299?text=Olá,%20meu%20nome%20é%20${fullname}%20e%20represento%20a%20empresa%20${companyName}.%20Acabo%20de%20concluir%20o%20seu%20assessment%20e%20estou%20interessado%20em%20entender%20mais%20sobre%20a%20análise%20realizada.%20Você%20pode%20entrar%20em%20contato%20comigo%20pelo%20e-mail%20${personalData.email}.`;

      window.open(whatsappLink, '_blank');
    } else {
      const whatsappLink = `https://wa.me/5511981878299?text=Olá!%20Acabei%20de%20conferir%20o%20resultado%20de%20um%20assessment%20e%20gostaria%20de%20entender%20mais%20sobre%20a%20análise.%20Você%20pode%20entrar%20em%20contato%20comigo%20pelo%20e-mail%20${personalData.email}.`;

      window.open(whatsappLink, '_blank');
    }
  } catch (error) {
    actions.setSubmitting(false);
    throw new Error("Erro ao salvar dados de contato.")
  } finally {
    onClose();
  }
};

  return createPortal(
    <ModalOverlay>
      <ModalCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            (formikProps) => (
              <Form>
                <TitleContainer>
                  <Title>Receba nosso contato</Title>
                  <button onClick={onClose}>
                    <img src="/icons/CardExit.png" alt="Sair" />
                  </button>
                </TitleContainer>
                <Description>Informe e-mail e WhatsApp. Entraremos em contato em até 12 horas úteis.</Description>

                <InputGroup>
                  <label htmlFor="email">E-mail: *</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemplo@empresa.com"
                  />
                  <ErrorMessage name="email" component="p" className="error-message" />
                </InputGroup>

                <InputGroup>
                  <label htmlFor="whatsapp">WhatsApp: *</label>
                  <Field
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="11 00000-0000"
                    value={whatsappNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setWhatsappNumber(formatPhone((e.target.value)))
                      formikProps.setFieldValue("whatsapp", formatPhone((e.target.value)));
                    }}
                  />
                  <ErrorMessage name="whatsapp" component="p" className="error-message" />
                </InputGroup>

                <ActionsContainer>
                  <Cancel type="button" onClick={onClose}>Cancelar</Cancel>
                  <Save type="submit">Quero o contato!</Save>
                </ActionsContainer>
              </Form>
            )
          }
        </Formik>
      </ModalCard>
    </ModalOverlay>,
    modalContainerRef.current
  );
};

export default ModalGetInTouch;
