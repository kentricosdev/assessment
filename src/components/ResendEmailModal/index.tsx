import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ActionsContainer, Cancel, TitleContainer, Description, InputGroup, ModalCard, ModalOverlay, Save, Title } from './styles';

interface ResendEmailProps {
  onClose: () => void;
}

interface MyFormValues {
  email: string;
  whatsapp: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.')
});

const ResendEmailModal: React.FC<ResendEmailProps> = ({ onClose }) => {
  const modalRootRef = useRef(document.getElementById('modal-root') || document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (!document.getElementById('modal-root')) {
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

  const initialValues = {
    email: '',
    whatsapp: '',
  };

  const handleSubmit = async (
  values: MyFormValues,
  actions: FormikHelpers<MyFormValues>
) => {
  try {
    // Get values from localStorage
    const storedPersonalFormData = localStorage.getItem('personalForm');
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
                placeholder={(JSON.parse(localStorage.getItem('personalForm') || '')?.email) || ''}
              />
              <ErrorMessage name="email" component="p" className="error-message" />
            </InputGroup>

            <InputGroup>
              <label htmlFor="whatsapp">WhatsApp:</label>
              <Field
                type="text"
                id="whatsapp"
                name="whatsapp"
                placeholder={(JSON.parse(localStorage.getItem('personalForm') || '')?.whatsapp) || ''}
              />
            </InputGroup>

            <ActionsContainer>
              <Cancel type="button" onClick={onClose}>Cancelar</Cancel>
              <Save type="submit">Salvar</Save>
            </ActionsContainer>
          </Form>
        </Formik>
      </ModalCard>
    </ModalOverlay>,
    modalContainerRef.current
  );
};

export default ResendEmailModal;
