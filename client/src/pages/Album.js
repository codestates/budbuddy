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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .notice {
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
      getPlantsList();
    }
  }, [isLogin]);

  const { publicJournal, getAllPublicJournal } = useAjaxStore();
  useEffect(() => {
    getAllPublicJournal();
  }, []);
  console.log(publicJournal);

  const [plants, setPlants] = useState([]);
  const [pickPlantValue, setPickPlantValue] = useState("");
  const [pickDateValue, setPickDateValue] = useState("");
  // console.log("pickDateValue", pickDateValue);
  // console.log("pickPlantValue", pickPlantValue);
  async function getPlantsList() {
    try {
      const resData = await axios.get(process.env.REACT_APP_API_URL + "/plants");
      setPlants(resData.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <Logo className="logo" />
      <SlideModal></SlideModal>
      <TabOption className="TabBtnOne" tabName="앨범" setPickPlantValue={setPickPlantValue} setPickDateValue={setPickDateValue} publicJournal={publicJournal} />
      <BudLayout>
        {budDummy.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 사진이 없습니다</div>
          </div>
        ) : (
          <div className="card-wrap">
            {publicJournal.map((el) => {
              const date = el.updatedAt.substring(0, 10);
              return (
                <Picture key={el.journalId} src={el.journalImg || "Dummy/diary_4.PNG"} className="cardcomponent" budName={el.nickname} date={date} plant_id={el.journalId} text={el.textContent} />
              );
            })}
          </div>
        )}
      </BudLayout>
    </Layout>
  );
};

export default Album;
