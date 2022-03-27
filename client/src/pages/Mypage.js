import React from "react";
import styled from "styled-components";
import MenuBar from "../components/MenuBar";
import Logo from "../components/Logo";
import { budDummy, writingValues } from "../utils/dummy";
import MyWritings from "../components/MyWriting";

const Layout = styled.div`
  display: grid;
  /* height: inherit; */
  .logo {
    margin-top: 1rem;
  }
`;
const MypageContainer = styled.div`
  display: grid;
`;

const IdPost = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(1fr, auto));
  grid-template-areas: " id post . . ";
  width: 80%;
  height: 10vh;
  margin: auto;
  > .id {
    grid-area: id;
    transform: translateY(70%);
  }
  > .post {
    grid-area: post;
    transform: translateY(70%);
  }
`;

const ProfileImg = styled.img`
  object-fit: cover;
  width: 80%;
  height: 18vh;
  mix-blend-mode: darken;
  border: solid 2px rgb(0, 0, 0, 0.65);
  margin: auto;
`;
const WritingPlace = styled.div`
  width: 80%;
  height: auto;
  margin: auto;
`;

const Mypage = ({ login }) => {
  return (
    <Layout>
      <Logo className="logo" />
      <MenuBar />
      {login ? (
        <MypageContainer>
          <IdPost>
            <div className="id">ID 옆집할매토종닭죽</div>
            <div className="post">POST {writingValues.length} 개</div>
          </IdPost>
          <ProfileImg src={budDummy[0].src} alt={`bg`} />
          <WritingPlace>
            <MyWritings writingValues={writingValues}></MyWritings>
          </WritingPlace>
        </MypageContainer>
      ) : (
        <div> 로그인을 진행해주세요 </div>
      )}
    </Layout>
  );
};

export default Mypage;
