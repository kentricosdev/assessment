/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getPillarsData } from '../services/AssessmentServices';
import { IAssessmentAnswers, IAssessmentScoreIndividual, PillarData } from '../types/globalTypes';

interface FormsContextData {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  assessmentStarted: boolean;
  handleExit: () => void;
  handleStartAssessment: () => void;
  assessmentStep: number;
  handleAssessmentNextStep: () => void;
  handleAssessmentPreviousStep: () => void;
  pillarsData: PillarData[];
  setAssessmentStep: React.Dispatch<React.SetStateAction<number>>;
  updateAnswers: (answers: IAssessmentAnswers) => void;
  updateScore: (assessmentScore: IAssessmentScoreIndividual) => void;
  assessmentAnswers: IAssessmentAnswers;
  assessmentScoreIndividual: IAssessmentScoreIndividual
}
export const FormsContext = createContext<FormsContextData>(
  {} as FormsContextData
)

const FormsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pillarsData, setPillarsData] = useState<PillarData[]>([]);

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

  const handleStartAssessment = useCallback(() => {
    setAssessmentStarted(true);
  }, []);

  const handleExit = useCallback(() => {
    setIsModalOpen(false);
    setAssessmentStarted(false);
    setAssessmentStep(0)
    localStorage.removeItem('assessmentAnswers');
    console.log('aq')
  }, [assessmentStep]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
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

  const updateScore = useCallback((scores: any) => {
    localStorage.setItem('assessmentScoreIndividual', JSON.stringify(scores));
    setAssessmentScoreIndividual(scores);
  }, []);

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
      assessmentScoreIndividual
    }
  }, [isModalOpen, assessmentStarted, assessmentStep, pillarsData, assessmentAnswers])

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