import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import TabOption from "../components/Album/TabOption";
import Picture from "../components/Album/Picture";
import SlideModal from "../components/Album/SlideModal";
import useLoginStore from "../store/loginStore";
import useAjaxStore from "../store/ajaxStore";
import { useLocation } from "react-router-dom";
const qs = require("query-string");

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 1rem;
  padding-bottom: 3rem;
  .logo {
    margin-top: 1rem;
  }
  .TabBtnOne {
    margin-top: 0.3rem;
  }
  .none {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: dimgray;
    font-size: ${(props) => props.theme.fontWritePageSmall};
  }

  .notice-fist {
    position: absolute;
    /* border: solid 1px red; */
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    .notice-dsec {
      flex-grow: 1;
      font-size: ${(props) => props.theme.fontWritePageSmall};
      color: dimgray;
    }
  }
`;
const BudLayout = styled.div`
  width: 100%;
  margin: 0 auto;

  .card-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.8rem 0.5rem 0 0.5rem;
  }
  .cardcomponent {
    /* width: calc(100 / 3); */
    width: 33.3%;
  }
`;
const Album = () => {
  const { isLogin } = useLoginStore();
  const { listByUserId, setListByUserId, publicJournal } = useAjaxStore();
  const [pickPlantValue, setPickPlantValue] = useState("");
  const [pickDateValue, setPickDateValue] = useState("");
  const [SlideState, setSlideState] = useState("close");
  const [PictureNumber, setPictureNumber] = useState(0);
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const currentUser = decodeURI(parsed.name); // 클릭하면 여기 바꾸게 해줘야함

  useEffect(() => {
    if (isLogin) {
      setListByUserId();
    }
    setListByUserId();
    return () => {
      setListByUserId();
    };
  }, [isLogin, setListByUserId, publicJournal, currentUser]);

  useEffect(() => {
    if (currentUser === "undefined") {
      setPickPlantValue("");
    }
    if (currentUser !== "undefined") {
      setPickPlantValue(currentUser);
    }
  }, [currentUser]);

  const TempFillteredValue = listByUserId.filter((el) => {
    if (pickPlantValue === "식물이름") {
      return el;
    }
    if (pickPlantValue) {
      return el.Plant.name === pickPlantValue;
    }
    return el;
  });

  const FillteredValue = TempFillteredValue.filter((el) => {
    if (pickDateValue === "날짜") {
      return el;
    }
    if (pickDateValue) {
      return el.date_pick === pickDateValue;
    }
    return el;
  });
  const Value = FillteredValue.filter((el) => {
    return el.Journal_Images.length > 0;
  });

  return (
    <Layout>
      <Logo className="logo" />
      {isLogin ? (
        <>
          <SlideModal FillteredValue={Value} SlideState={SlideState} setSlideState={setSlideState} PictureNumber={PictureNumber} setPictureNumber={setPictureNumber} />
          <TabOption className="TabBtnOne" tabName="앨범" setPickPlantValue={setPickPlantValue} setPickDateValue={setPickDateValue} listByUserId={listByUserId} currentUser={currentUser} />
          {Value.length === 0 ? (
            <div className="notice-fist">
              <div className="notice-dsec">등록된 사진이 없습니다</div>
            </div>
          ) : null}
          <BudLayout>
            {Value.length === 0 ? null : (
              <div className="card-wrap">
                {Value.map((el, idx) => {
                  return (
                    <Picture
                      key={idx}
                      src={el.Journal_Images[0].Image.store_path || "Dummy/diary_4.PNG"}
                      className="cardcomponent"
                      budName={el.User.nickname}
                      date={el.date_pick}
                      text={el.body}
                      setSlideState={setSlideState}
                      setPictureNumber={setPictureNumber}
                      idx={idx}
                    />
                  );
                })}
              </div>
            )}
          </BudLayout>
        </>
      ) : (
        <div className="none">
          <div>로그인 후 이용해 주세요</div>
        </div>
      )}
    </Layout>
  );
};

export default Album;
