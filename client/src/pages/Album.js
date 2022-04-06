import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import TabOption from "../components/Album/TabOption";
import { budDummy } from "../utils/dummy";
import Picture from "../components/Album/Picture";
import SlideModal from "../components/Album/SlideModal";
import useLoginStore from "../store/LoginStore";
import axios from "axios";
import { curDate } from "../modules/date";
import useAjaxStore from "../store/AjaxStore";

const Layout = styled.div`
  display: grid;
  position: relative;
  .logo {
    margin-top: 1rem;
  }
  .TabBtnOne {
    margin-top: 0.3rem;
  }
`;
const BudLayout = styled.div`
  /* padding-top: 0.5rem;
  padding-bottom: 2rem; */
  width: 100%;
  margin: 0 auto;
  .notice-pos {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 500%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .notice {
    display: table-cell;
    vertical-align: middle;
    font-size: 0.9rem;
    color: DimGrey;
  }
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
  useEffect(() => {
    if (isLogin) {
      getAllPublicJournal();
    }
  }, [isLogin]);

  const { publicJournal, getAllPublicJournal } = useAjaxStore();
  useEffect(() => {
    getAllPublicJournal();
  }, []);

  const [pickPlantValue, setPickPlantValue] = useState("");
  const [pickDateValue, setPickDateValue] = useState("");

  const TempFillteredValue = publicJournal.filter((el) => {
    if (pickPlantValue === "식물이름") {
      return el;
    }
    if (pickPlantValue) {
      return el.plantName === pickPlantValue;
    }
    return el;
  });

  const FillteredValue = TempFillteredValue.filter((el) => {
    if (pickDateValue === "날짜") {
      return el;
    }
    if (pickDateValue) {
      return el.writingDate === pickDateValue;
    }
    return el;
  });

  const [SlideState, setSlideState] = useState("close");
  const [PictureNumber, setPictureNumber] = useState(0);

  return (
    <Layout>
      <Logo className="logo" />
      <SlideModal FillteredValue={FillteredValue} SlideState={SlideState} setSlideState={setSlideState} PictureNumber={PictureNumber} setPictureNumber={setPictureNumber} />
      <TabOption className="TabBtnOne" tabName="앨범" setPickPlantValue={setPickPlantValue} setPickDateValue={setPickDateValue} publicJournal={publicJournal} />
      <BudLayout>
        {FillteredValue.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 사진이 없습니다</div>
          </div>
        ) : (
          <div className="card-wrap">
            {FillteredValue.map((el, idx) => {
              return (
                <Picture
                  key={el.journalId}
                  src={el.journalImg || "Dummy/diary_4.PNG"}
                  className="cardcomponent"
                  budName={el.nickname}
                  date={el.writingDate}
                  plant_id={el.journalId}
                  text={el.textContent}
                  setSlideState={setSlideState}
                  setPictureNumber={setPictureNumber}
                  idx={idx}
                />
              );
            })}
          </div>
        )}
      </BudLayout>
    </Layout>
  );
};

export default Album;
