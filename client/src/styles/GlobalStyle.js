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

    
  ::-webkit-scrollbar {
    width: 6px;
    border-radius: ${(props) => props.theme.borderRadius};
  } /* 스크롤 바 */

  ::-webkit-scrollbar-track {
    background-color: DimGrey;
    border-radius: ${(props) => props.theme.borderRadius};
  } /* 스크롤 바 밑의 배경 */

  ::-webkit-scrollbar-thumb {
    background: Snow;
    border-radius: 10px;
    border-radius: ${(props) => props.theme.borderRadius};
  } /* 실질적 스크롤 바 */

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(70, 130, 180, 0.8);
  } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */

  ::-webkit-scrollbar-button {
    display: none;
  } /* 스크롤 바 상 하단 버튼 */
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
