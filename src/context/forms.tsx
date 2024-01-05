/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getPillarsData } from '../services/AssessmentServices';
import { PillarData } from '../types/globalTypes';

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
  updateAnswers: (answers: any) => void;
}
export const FormsContext = createContext<FormsContextData>(
  {} as FormsContextData
)

const FormsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pillarsData, setPillarsData] = useState<PillarData[]>([]);
  console.log("pillarsData", pillarsData)

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
    console.log("assstep", assessmentStep)
  }, [assessmentStep]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleAssessmentNextStep = useCallback(() => {
    console.log("DDDDDDD", pillarsData )
    setAssessmentStep((prevStep) => (prevStep < pillarsData.length ? prevStep + 1 : prevStep));
    console.log('assessmentNextStep handler', assessmentStep)
  }, [pillarsData]);

  const handleAssessmentPreviousStep = useCallback(() => {
    setAssessmentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    console.log('assessmentPreviousStep handler', assessmentStep)
  }, [pillarsData]);

  const updateAnswers = useCallback((answers: any) => {
    // Log the answers or perform any other desired actions
    console.log('Answers:', answers);
  }, []);

  useEffect(() => {
    localStorage.setItem('assessmentStarted', JSON.stringify(assessmentStarted));
  }, [assessmentStarted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPillarsData();
        console.log("cu", data)
        setPillarsData(
          [
            {
              id: '1',
              ordem: 1,
              texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
              nome: 'Cultura e EX',
              peso: 0.22,
              questoes: [
                {
                  id: '1',
                  ordem: 1,
                  texto: 'Lorem lorem?',
                  opcoes: [
                    {
                      id: '1',
                      peso: 0,
                      texto: 'Lorem'
                    },
                    {
                      id: '2',
                      peso: 25,
                      texto: 'Lorem'
                    },
                    {
                      id: '3',
                      peso: 50,
                      texto: 'Lorem'
                    },
                    {
                      id: '4',
                      peso: 75,
                      texto: 'Lorem'
                    },
                    {
                      id: '5',
                      peso: 100,
                      texto: 'Lorem'
                    }
                  ]
                },
              ]
            },
            {
              id: '2',
              ordem: 2,
              texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              nome: 'Outro Aspecto',
              peso: 0.22,
              questoes: [
                {
                  id: '1',
                  ordem: 1,
                  texto: 'Lorem lorem?',
                  opcoes: [
                    {
                      id: '1',
                      peso: 0,
                      texto: 'Lorem'
                    },
                    {
                      id: '2',
                      peso: 25,
                      texto: 'Lorem'
                    },
                    {
                      id: '3',
                      peso: 50,
                      texto: 'Lorem'
                    },
                    {
                      id: '4',
                      peso: 75,
                      texto: 'Lorem'
                    },
                    {
                      id: '5',
                      peso: 100,
                      texto: 'Lorem'
                    }
                  ]
                },
              ]
            },
          ]
        );
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
    }
  }, [isModalOpen, assessmentStarted, assessmentStep, pillarsData])

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