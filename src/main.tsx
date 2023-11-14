import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';
import Home from './screens/Home/index.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
)
