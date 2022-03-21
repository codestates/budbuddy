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
  background-color: Aquamarine;
  height: 100vh;

  @media screen and (min-width: 390px) {
    width: ${(props) => props.theme.iphoneWidth};
    * {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 520px) {
    width: ${(props) => props.theme.web520px};
    * {
      font-size: 1.6rem;
    }
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
