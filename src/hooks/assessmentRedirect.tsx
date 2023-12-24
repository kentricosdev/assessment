import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForms } from '../context/forms';

const useAssessmentRedirect = () => {
  const { assessmentStarted } = useForms();
  const navigate = useNavigate();

  useEffect(() => {
    if (assessmentStarted) {
      navigate('/personalForm');
    } else {
      navigate('/')
    }
  }, [assessmentStarted, navigate]);
};

export default useAssessmentRedirect;
