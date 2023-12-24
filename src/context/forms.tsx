/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface FormsContextData {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  assessmentStarted: boolean;
  handleExit: () => void;
  handleStartAssessment: () => void;
}

export const FormsContext = createContext<FormsContextData>(
  {} as FormsContextData
)

const FormsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('assessmentStarted');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
  };

  const handleExit = () => {
    setIsModalOpen(false);
    setAssessmentStarted(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    localStorage.setItem('assessmentStarted', JSON.stringify(assessmentStarted));
  }, [assessmentStarted]);

  const FormsContextValues = useMemo(() => {
    return {
      isModalOpen,
      handleOpenModal,
      handleCloseModal,
      assessmentStarted,
      handleExit,
      handleStartAssessment
    }
  }, [isModalOpen, assessmentStarted])

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