import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ActionsContainer, Cancel, TitleContainer, Description, InputGroup, ModalCard, ModalOverlay, Save, Title } from './styles';

interface GetInTouchProps {
  onClose: () => void;
}

interface MyFormValues {
  email: string;
  whatsapp: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  whatsapp: Yup.number().required('Campo obrigatório.')
});

const ModalGetInTouch: React.FC<GetInTouchProps> = ({ onClose }) => {
  const modalRootRef = useRef(document.getElementById('modal-contact-root') || document.createElement('div'));
  const modalContainerRef = useRef(document.createElement('div'));

  const storedPersonalContactUsData = localStorage.getItem('personalDataContactUs');
  const storedPersonalFormData = localStorage.getItem('personalForm');

  const initialValues = {
    email: storedPersonalContactUsData
      ? JSON.parse(storedPersonalContactUsData).email
      : (storedPersonalFormData
          ? JSON.parse(storedPersonalFormData).email
          : ''
        ),
    whatsapp: storedPersonalContactUsData
      ? JSON.parse(storedPersonalContactUsData).whatsapp
      : (storedPersonalFormData
          ? JSON.parse(storedPersonalFormData).whatsapp
          : ''
        ),
  };


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
          <Form>
            <TitleContainer>
              <Title>Receba nosso contato</Title>
              <button onClick={onClose}>
                <img src="/icons/CardExit.png" alt="Sair" />
              </button>
            </TitleContainer>
            <Description>Informe e-mail e WhatsApp. Entraremos em contato em até 12 horas úteis.</Description>

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
              />
              <ErrorMessage name="whatsapp" component="p" className="error-message" />
            </InputGroup>

            <ActionsContainer>
              <Cancel type="button" onClick={onClose}>Cancelar</Cancel>
              <Save type="submit">Quero o contato!</Save>
            </ActionsContainer>
          </Form>
        </Formik>
      </ModalCard>
    </ModalOverlay>,
    modalContainerRef.current
  );
};

export default ModalGetInTouch;
