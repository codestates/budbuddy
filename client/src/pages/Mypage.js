import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import SideBar from "../components/MyPage/SideBar";
import { budDummy } from "../utils/dummy";
import DiaryList from "../components/list/DiaryList";
import useAjaxStore from "../store/AjaxStore";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .logo {
    margin-top: 1rem;
  }
`;

const IdPost = styled.div`
  display: grid;
  grid-template-columns: 42% 58%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 0.4rem;

  .id {
    margin-left: 2%;
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.fontWritePageSmall};

    .nick {
      font-size: ${(props) => props.theme.fontWritePageLarge};
      margin-left: 0.2rem;
      color: DarkGreen;
    }
  }

  .post {
    font-size: ${(props) => props.theme.fontWritePageSmall};
    display: flex;
    align-items: center;
  }
`;

const MyPageBg = styled.div`
  .mypageBg {
    object-fit: cover;
    width: 100%;
    height: 20vh;
    border-top: solid 1px rgb(0, 0, 0, 0.4);
    border-bottom: solid 1px rgb(0, 0, 0, 0.4);
  }
`;

const Mypage = () => {
  const { userInfo, getUserInfo, listByUserId, setListByUserId } = useAjaxStore();

  useEffect(() => {
    getMapageInfo();
  }, []);

  async function getMapageInfo() {
    await setListByUserId();
    await getUserInfo(1);
  }
  // console.log(userInfo);
  return (
    <Layout>
      <Logo className="logo" />
      <SideBar />
      <IdPost>
        <div className="id">
          <div>{"ID :"}</div>
          <div className="nick">{userInfo.nickname}</div>
        </div>
        <div className="post">
          <div>POST {listByUserId.length} 개</div>
        </div>
      </IdPost>
      <MyPageBg>
        <img className="mypageBg" src={budDummy[0].src} alt={`bg`} />
      </MyPageBg>
      <DiaryList diaryList={listByUserId} isBudName={true} type="user" />
    </Layout>
  );
};

export default Mypage;
