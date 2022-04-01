import React from "react";
import styled from "styled-components";
import MenuBar from "../components/MyPage/MenuBar";
import Logo from "../components/common/Logo";
import { budDummy } from "../utils/dummy";
import SideBar from "../components/MyPage/SideBar";
import SideBarStore from "../store/SideBarStore";
import { dummyList } from "../utils/dummy";
import DiaryList from "../components/list/DiaryList";
import useLoginStore from "../store/LoginStore";

const Layout = styled.div`
  display: grid;
  /* height: inherit; */
  .logo {
    margin-top: 1rem;
  }
`;
const MypageContainer = styled.div`
  display: grid;
  z-index: ${({ SideBarState }) => (SideBarState ? 0 : 9)};
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
  border: solid 2px rgb(0, 0, 0, 0.65);
  margin: auto;
  z-index: 0;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Mypage = () => {
  const { isLogin, nickname } = useLoginStore();
  const { SideBarState } = SideBarStore();

  return (
    <Layout>
      <SideBar />
      <Logo className="logo" />
      <MenuBar />
      {isLogin ? (
        <MypageContainer SideBarState={SideBarState}>
          <IdPost>
            <div className="id">ID {nickname}</div>
            <div className="post">POST {dummyList.length} 개</div>
          </IdPost>
          <ProfileImg src={budDummy[0].src} alt={`bg`} />
          <DiaryList diaryList={dummyList} />
        </MypageContainer>
      ) : (
        <div> 로그인을 진행해주세요 </div>
      )}
    </Layout>
  );
};

export default Mypage;
