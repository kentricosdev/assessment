import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root {
  font-size: 0.875rem;

  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
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
  }

  input, textarea, img, button, label,
  h1, h2, h3, h4, h5, h6 {
    user-select: none;
  }

  p::selection,
  a::selection,
  span::selection {
    background-color: ${({ theme }) => theme.colors.primary1};
    color: ${({ theme }) => theme.colors.neutral10};
    user-select: auto;
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
`;

export default GlobalStyles;