import { createGlobalStyle } from "styled-components";
import NanumGothic from "../styles/fonts/NanumGothic-WEB/NanumGothic.woff";
import NanumGothicBold from "../styles/fonts/NanumGothic-WEB/NanumGothicBold.woff";
import BMJUA from "../styles/fonts/BMJUA-WEB/BMJUA.woff2";

const GlobalStyle = createGlobalStyle`

 @font-face {
        font-family: "NanumGothic";
        src: local("NanumGothic"),
        url(${NanumGothic}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
 @font-face {
        font-family: "NanumGothic Bold";
        src: local("NanumGothic Bold"),
        url(${NanumGothicBold}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
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
    box-sizing: inherit;
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
    padding: 0 auto;
    margin: 0 auto;
}
  
`;

export default GlobalStyle;
