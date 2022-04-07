import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextOnImg from "../components/common/TextOnImg";
import Hr from "../components/common/Hr";
import ImgSlide from "../components/common/ImgSlide";
import { proverbs, slideImgs } from "../resources";
import useLoginStore from "../store/loginStore";
import axios from "axios";
import ModalByMode from "../components/common/ModalByMode";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .version {
    padding-top: 0.5rem;
    margin: 0 0 3rem 0.5rem;
    font-size: 0.4rem;
    color: gray;
  }
  .greeting {
    padding: 0rem 0rem 1rem 0.5rem;
    white-space: pre;
  }
`;

const Home = () => {
  useEffect(() => {
    if (!isLogin) getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { isLogin, setLogin, setNickname, setUserNumber, setImage } = useLoginStore();
  const [popupInfo, setPopupInfo] = useState({ fn: "" });

  async function getUserInfo() {
    try {
      const resData = await axios.get(process.env.REACT_APP_API_URL + "/users/userinfo");
      if (resData.data.message === "ok") {
        const { nickname, id } = resData.data.data;
        if (resData.data.data.profile_image) {
          setImage(resData.data.data.profile_image.store_path);
        }
        setNickname(nickname);
        setUserNumber(id);
        setLogin(true);
        setPopupInfo({ fn: "kakaoGreeting" });
      }
    } catch (err) {
      // console.log("kakaoLogin:::", err);
    }
  }

  function makePopup(info = "") {
    const tasks = {
      kakaoGreeting() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        return <ModalByMode info={info} />;
      },
    };

    if (!tasks[info.fn]) {
      return null;
    }
    return tasks[info.fn]();
  }

  return (
    <Layout>
      {makePopup(popupInfo)}
      <p className="version">ver1.2</p>
      <p className="greeting">{`안녕하세요!\n자신의 식물을 일기처럼 기록해보세요!`}</p>
      <TextOnImg texts={proverbs} />
      <Hr t={4} b={4} width={80} />
      <ImgSlide images={slideImgs} />
    </Layout>
  );
};

export default Home;
