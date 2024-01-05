import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';
import GlobalStyles from './styles/GlobalStyles.ts';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';
import AppRoutes from './Routes.tsx';
import { BrowserRouter } from 'react-router-dom';
// import ExitModal from './components/ExitModal/index.tsx';
import { FormsProvider } from './context/forms.tsx';
import React from 'react';

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <FormsProvider>
            <GlobalStyles />
            <Header/>
            <AppRoutes  />
            <Footer />
          </FormsProvider>
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

// Renderiza o componente Main na raiz do HTML
ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);