import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';
import GlobalStyles from './styles/GlobalStyles.ts';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';
import AppRoutes from './Routes.tsx';
import { BrowserRouter } from 'react-router-dom';

const Main: React.FC = () => {
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('assessmentStarted');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
  };

  const handleExit = () => {
    setAssessmentStarted(false);
  };

  useEffect(() => {
    localStorage.setItem('assessmentStarted', JSON.stringify(assessmentStarted));
  }, [assessmentStarted]);

  return (
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header
            assessmentStarted={assessmentStarted}
            onStartAssessment={handleStartAssessment}
            onExit={handleExit}
          />
          <AppRoutes />
          <Footer />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

// Renderiza o componente Main na raiz do HTML
ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);