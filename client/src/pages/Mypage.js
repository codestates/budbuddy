import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import SideBar from "../components/MyPage/SideBar";
import DiaryList from "../components/list/DiaryList";
import useAjaxStore from "../store/ajaxStore";
import { bg } from "../resources";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .logo {
    margin-top: 2rem;
  }

  .desc {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    color: dimgray;
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
    font-size: ${(props) => props.theme.fontWritePageXSmall};

    .nick {
      font-size: ${(props) => props.theme.fontWritePageSmall};
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
    getMypageInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getMypageInfo() {
    await setListByUserId();
    await getUserInfo();
  }
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
        <img className="mypageBg" src={bg[0] || ""} alt={`bg`} />
      </MyPageBg>
      {!listByUserId.length ? (
        <div className="desc">
          <div>등록된 식물이 없습니다</div>
        </div>
      ) : (
        <DiaryList diaryList={listByUserId} isBudName={true} type="user" />
      )}
    </Layout>
  );
};

export default Mypage;
