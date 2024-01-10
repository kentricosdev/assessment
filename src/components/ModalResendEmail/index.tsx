import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ActionsContainer, Cancel, TitleContainer, Description, InputGroup, ModalCard, ModalOverlay, Save, Title } from './styles';
import formatPhone from '../../utils/formatPhone';

interface ResendEmailProps {
  onClose: () => void;
}

interface MyFormValues {
  email: string;
  whatsapp: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  whatsapp: Yup.string().min(11, "Número inválido. Deve ter pelo menos 10 caracteres.").max(13, "Número muito longo.")
});

const ModalResendEmail: React.FC<ResendEmailProps> = ({ onClose }) => {
  const modalRootRef = useRef(document.getElementById('modal-email-root') || document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));
  const storedPersonalFormData = localStorage.getItem('personalForm');
  const [whatsappNumber, setWhatsappNumber] = useState(storedPersonalFormData && JSON.parse(storedPersonalFormData).whatsapp || '');

  const initialValues = {
    email: storedPersonalFormData && JSON.parse(storedPersonalFormData).email || '',
    whatsapp: whatsappNumber,
  };

  useEffect(() => {
    if (!document.getElementById('modal-email-root')) {
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
    // Get values from localStorage
    const storedValues = storedPersonalFormData
      ? JSON.parse(storedPersonalFormData)
      : {};

    // Merge current form values with stored values
    const updatedValues = { ...storedValues, ...values };
    localStorage.setItem('personalForm',  JSON.stringify(updatedValues))
  } catch (error) {
    actions.setSubmitting(false);
    throw new Error("Erro ao atualizar email e whatsapp.")
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
                  <Title>Reenviar por e-mail</Title>
                  <button onClick={onClose}>
                    <img src="/icons/CardExit.png" alt="Sair" />
                  </button>
                </TitleContainer>
                <Description>Informe qual e-mail o resultado deverá ser enviado:</Description>

                <InputGroup>
                  <label htmlFor="email">E-mail:</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemplo@mail.com"
                  />
                  <ErrorMessage name="email" component="p" className="error-message" />
                </InputGroup>

                <InputGroup>
                  <label htmlFor="whatsapp">WhatsApp:</label>
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
                  <Save type="submit">Salvar</Save>
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

export default ModalResendEmail;
