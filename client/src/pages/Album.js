import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import TabOption from "../components/Album/TabOption";
import { budDummy } from "../utils/dummy";
import Picture from "../components/Album/Picture";
import useLoginStore from "../store/LoginStore";
import axios from "axios";
import { curDate } from "../modules/date";

const Layout = styled.div`
  display: grid;
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

  const [plants, setPlants] = useState([]);
  const [pickValue, setPickValue] = useState("");
  console.log("pickValue", pickValue);

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
      <TabOption className="TabBtnOne" tabName="앨범" setPickValue={setPickValue} />
      <BudLayout>
        {budDummy.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 사진이 없습니다</div>
          </div>
        ) : (
          <div className="card-wrap">
            {plants.map((el) => {
              const date = curDate();
              return <Picture key={el.id} src={el.src || "Dummy/diary_4.PNG"} className="cardcomponent" budName={el.name} date={date} plant_id={el.id} text="안녕안녕해!" />;
            })}
          </div>
        )}
      </BudLayout>
    </Layout>
  );
};

export default Album;
