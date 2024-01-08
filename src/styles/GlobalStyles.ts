import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 16px;

    @media (min-width: 0) and (max-width: 1180px) {
      font-size: 14px;
    }
  }

  html,
  body {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: 'Ubuntu', sans-serif;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
  }

  *::selection {
    background-color: ${({ theme }) => theme.colors.primary1};
    color: ${({ theme }) => theme.colors.neutral10};
    user-select: auto;
  }

  input, textarea, img, button, label,
  h1, h2, h3, h4, h5, h6 {
    user-select: none !important;
  }

  body {
    scroll-behavior: smooth;
  }

  /* Scrollbar Track */
  ::-webkit-scrollbar {
    width: 12px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary1};
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral60};
  }

  /* Corner */
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  button:hover {
    filter: brightness(1.05);
    transition: filter .3 ease-in-out;
  }
`;

export default GlobalStyles;