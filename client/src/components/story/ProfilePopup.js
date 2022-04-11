import React from "react";
import styled from "styled-components";
import { empty } from "../../resources";

const Layout = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin: 0;

  .popup {
    display: flex;
    position: fixed;
    width: 85vw;
    min-height: 45vh;
    max-height: 60vh;
    overflow-y: auto;
    background: snow;
    animation: flipIn 0.7s ease-out;
    z-index: 2;
    top: 8rem;
    /* display: none; */
    border-radius: ${(props) => props.theme.borderRadius};

    @media screen and (min-width: ${(props) => props.theme.webWidth + 1 + "px"}) {
      width: ${(props) => props.theme.webWidth * 0.85 + "px"};
    }
  }

  @keyframes flipIn {
    0% {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transition-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transition-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    100% {
      transform: perspective(400px);
    }
  }
`;
const BlackScreen = styled.div`
  /* border: solid 1px blue; */
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  animation: darken 0.2s ease;
  z-index: 1;
  top: 0;

  @keyframes darken {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.35);
    }
  }

  @media screen and (min-width: ${(props) => props.theme.webWidth + 1 + "px"}) {
    width: ${(props) => props.theme.webWidth + "px"};
  }
`;

const StoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  .top {
    width: 100%;
    height: 100%;
    padding: 0.3rem 0;
    margin: 0 auto;
    align-items: center;

    display: flex;
    align-items: center;

    .profile {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .img {
      object-fit: cover;
      width: 100%;
      height: 80%;
    }
  }
`;

const ProfilePopup = ({ setProfile, src }) => {
  function close() {
    setProfile({ isOpen: false, src: null });
  }

  return (
    <Layout>
      <BlackScreen className="black" onClick={close} />
      <div className="popup">
        <StoryLayout>
          <div className="top">
            <div className="profile">
              <img className="img" src={src || empty.user} alt="젤리프로필" />
            </div>
          </div>
        </StoryLayout>
      </div>
    </Layout>
  );
};

export default ProfilePopup;
