/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getPillarsData } from '../services/AssessmentServices';
import { IAssessmentAnswers, IAssessmentScoreIndividual, IPersonalFormData, PillarData } from '../types/globalTypes';
import { useNavigate } from 'react-router-dom';
import ResultService from '../services/ResultsServices';

interface FormsContextData {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  assessmentStarted: boolean;
  handleExit: () => void;
  handleStartAssessment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  assessmentStep: number;
  handleAssessmentNextStep: () => void;
  handleAssessmentPreviousStep: () => void;
  pillarsData: PillarData[];
  setAssessmentStep: React.Dispatch<React.SetStateAction<number>>;
  updateAnswers: (answers: IAssessmentAnswers) => void;
  updateScore: (assessmentScore: IAssessmentScoreIndividual) => void;
  assessmentAnswers: IAssessmentAnswers;
  assessmentScoreIndividual: IAssessmentScoreIndividual;
  isEmailModalOpen: boolean;
  setIsEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContactModalOpen: boolean;
  setIsContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FormsContext = createContext<FormsContextData>(
  {} as FormsContextData
)

const FormsProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [pillarsData, setPillarsData] = useState<PillarData[]>([]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [assessmentAnswers, setAssessmentAnswers] = useState<IAssessmentAnswers>(
    () => {
      const storedData = localStorage.getItem('assessmentAnswers');
      return storedData ? (JSON.parse(storedData) as IAssessmentAnswers) : {} as IAssessmentAnswers;
    }
  );

  const [assessmentScoreIndividual, setAssessmentScoreIndividual] = useState<IAssessmentScoreIndividual>(
    () => {
      const storedData = localStorage.getItem('assessmentScoreIndividual');
      return storedData ? (JSON.parse(storedData) as IAssessmentScoreIndividual) : {} as IAssessmentScoreIndividual;
    }
  );

  // Control MODAL state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Control ASSESSMENT STARTED OR NOT state
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('assessmentStarted');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Control ASSESSMENT CURRENT STEP state
  const [assessmentStep, setAssessmentStep] = useState<number>(0);

  const handleStartAssessment = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setAssessmentStarted(true);
  }, []);

  const handleExit = useCallback(() => {
    setAssessmentStarted(false);
    setAssessmentStep(0);
    localStorage.clear();
    setIsModalOpen(false);
    navigate('/')
  }, [assessmentStep]);

  const handleOpenModal = () => {
    if (localStorage.getItem('assessmentStarted') === 'true') {
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(false);
  }

  const handleAssessmentNextStep = useCallback(() => {
    setAssessmentStep((prevStep) => (prevStep < pillarsData.length ? prevStep + 1 : prevStep));
  }, [pillarsData]);

  const handleAssessmentPreviousStep = useCallback(() => {
    setAssessmentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  }, [pillarsData]);

  const updateAnswers = useCallback((answers: any) => {
    localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
    setAssessmentAnswers(answers);
  }, []);

  const updateScore = useCallback(async (scores: IAssessmentScoreIndividual) => {
    localStorage.setItem('assessmentScoreIndividual', JSON.stringify(scores));
    const personalFormData = localStorage.getItem('personalForm');

    if (!personalFormData) return;

    const setorResult = JSON.parse(personalFormData).sector;

    try {
      const resultId = await ResultService.postResult(scores, setorResult);
      localStorage.setItem('currentResultId', resultId);
      setAssessmentScoreIndividual(scores);
      console.log('Result ID:', resultId);
      return resultId;
    } catch (error) {
      console.error('Error:', error);
    }
  }, [assessmentScoreIndividual]);


  useEffect(() => {
    localStorage.setItem('assessmentStarted', JSON.stringify(assessmentStarted));
  }, [assessmentStarted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPillarsData();
        setPillarsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
   const FormsContextValues = useMemo(() => {
    return {
      isModalOpen,
      handleOpenModal,
      handleCloseModal,
      assessmentStarted,
      handleExit,
      handleStartAssessment,
      assessmentStep,
      handleAssessmentNextStep,
      handleAssessmentPreviousStep,
      pillarsData,
      setAssessmentStep,
      updateAnswers,
      assessmentAnswers,
      updateScore,
      assessmentScoreIndividual,
      isEmailModalOpen,
      setIsEmailModalOpen,
      isContactModalOpen,
      setIsContactModalOpen
    }
  }, [isModalOpen, assessmentStarted, assessmentStep, pillarsData, assessmentAnswers, isEmailModalOpen, isContactModalOpen])

  return (
    <FormsContext.Provider value={FormsContextValues}>
      {children}
    </FormsContext.Provider>
  )
}

function useForms(): FormsContextData {
  const context = useContext(FormsContext)

  if (!context) throw new Error('useForms must be used within a UserProvider')

  return context
}

export { FormsProvider, useForms }