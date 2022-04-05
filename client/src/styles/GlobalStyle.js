import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

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
    font-family: 'Sunflower', sans-serif;
    /* font-family: 'Jua', sans-serif; */
    font-style: normal;
    font-weight: 500;
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
