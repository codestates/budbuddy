import { createGlobalStyle } from "styled-components";
import BMJUA from "../styles/fonts/BMJUA-WEB/BMJUA.woff2";

const GlobalStyle = createGlobalStyle`

 @font-face {
        font-family: "BMJUA";
        src: local("BMJUA"),
        url(${BMJUA}) format('woff2');
        font-weight: 100;
        font-style: normal;
    }

html {
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: border-box;
    font-family: 'BMJUA', monospace;
    font-style: normal;
    font-weight: 100;
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
  }

body {
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
}
  
`;

export default GlobalStyle;
