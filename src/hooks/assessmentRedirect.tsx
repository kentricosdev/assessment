import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../context/forms';

const useAssessmentRedirect = () => {
  const { assessmentStarted, assessmentStep } = useForms();
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const id = pathSegments[pathSegments.length - 1];
  const resultIdPattern = /^\/assessment\/resultado\/\w+$/;
  const { param } = useParams();

  useEffect(() => {
    if (assessmentStarted && !resultIdPattern.test(currentPath)) {
      switch (assessmentStep) {
        case 0:
          if (currentPath !== '/assessment') {
            navigate('/assessment');
          }
          break;
        case 1:
          if (currentPath !== '/assessment/pilar-1') {
            navigate('/assessment/pilar-1');
          }
          break;
        case 2:
          if (currentPath !== '/assessment/pilar-2') {
            navigate('/assessment/pilar-2');
          }
          break;
        case 3:
          if (currentPath !== '/assessment/pilar-3') {
            navigate('/assessment/pilar-3');
          }
          break;
        case 4:
          if (currentPath !== '/assessment/pilar-4') {
            navigate('/assessment/pilar-4');
          }
          break;
        case 5:
          if (currentPath !== '/assessment/pilar-5') {
            navigate('/assessment/pilar-5');
          }
          break;
        case 6:
          if (currentPath !== '/assessment/pilar-6') {
            navigate('/assessment/pilar-6');
          }
          break;
        default:
          break;
      }
    } else {
      if (currentPath !== '/' && !resultIdPattern.test(currentPath)) {
        navigate('/');
      }
    }

    if (param) {
      navigate(`/assessment/resultado/${id}/${param}`)
    }
  }, [assessmentStarted, assessmentStep, navigate]);
};

export default useAssessmentRedirect;
