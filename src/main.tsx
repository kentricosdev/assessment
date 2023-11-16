import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';
import GlobalStyles from './styles/GlobalStyles.ts';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';
import AppRoutes from './Routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
)
