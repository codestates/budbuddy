import styled from "styled-components";

export const OutLine = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  display: grid;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin: 0 auto;
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.subColor};
  min-height: 100vh;

  @media screen and (max-width: 390px) {
    width: 100vw;
  }

  @media screen and (min-width: 390px) {
    width: ${(props) => props.theme.iphoneWidth};
  }

  @media screen and (min-width: 400px) {
    width: ${(props) => props.theme.webWidth};
  }
`;

export const BGWrapper = styled.div`
  text-align: center;

  .std {
    display: grid;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(1px);
    border: none;
  }

  .backText {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    white-space: pre;

    font-weight: ${(props) => props.theme.fontWeightBg};
    color: ${(props) => props.theme.backgroundTextColor};
  }
`;
