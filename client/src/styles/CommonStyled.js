import styled from "styled-components";

export const OutLine = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  display: grid;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin: auto auto;
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.subColor};
  width: 100vw;
  min-height: 100vh;
  margin: auto auto;
  border: none;

  @media screen and (min-width: ${(props) => props.theme.webWidth + 1 + "px"}) {
    width: ${(props) => props.theme.webWidth + "px"};
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
  }

  .backText {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    white-space: pre-wrap;

    font-weight: ${(props) => props.theme.fontWeightBg};
    color: ${(props) => props.theme.backgroundTextColor};
  }
`;
