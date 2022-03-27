import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { budDummy } from "../utils/dummy";
import Logo from "../components/Logo";
import TabBtnOne from "../components/TabBtnOne";
import Bud from "../components/diary/Bud";
import PlantAddDialog from "../components/diary/PlantAddDialog";
import axios from "axios";
import { makeModal } from "../utils/errExeption";
import { curDate } from "../modules/date";

const Layout = styled.div`
  .logo {
    margin-top: 1rem;
  }

  .TabBtnOne {
    margin-top: 0.3rem;
  }
`;

const BudLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(auto);
  margin: 0 auto;

  padding-top: 0.5rem;
  padding-bottom: 2rem;

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
`;

//식물 추가 탭
const Daily = ({ login }) => {
  const [isDialog, setDialog] = useState(false);
  const [plants, setPlants] = useState([]);
  const [modalCode, setModalCode] = useState(0);

  useEffect(() => {
    if (login) {
      getPlantsList();
    }
  }, [login]);

  function openDialog() {
    setDialog(true);
  }

  async function getPlantsList() {
    try {
      const resData = await axios.get(process.env.REACT_APP_API_URL + "/plants");
      // console.log("성공적으로 불러온 애칭 식물 리스트::", resData.data.data);
      setPlants(resData.data.data);
    } catch (err) {
      setModalCode();
      console.log(err);
    }
  }

  async function registerBud(budName) {
    //post /plants name
    //식물 이름 유효성 검사
    //
    try {
      const payload = {
        name: budName,
      };
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
      console.log(resData);
      getPlantsList();
    } catch (err) {
      //alreadyExistsBudName
      setModalCode("alreadyExistsBudName");
      console.log(err);
    }

    console.log("내 식물 추가시 API 호출 코드 작성란", budName);
  }

  return (
    <Layout
      onClick={() => {
        setModalCode("");
      }}>
      {makeModal(modalCode)}
      <Logo className="logo" />
      <TabBtnOne className="TabBtnOne" tabName="내식물" btnName="내 식물 추가" fn={openDialog} />
      <BudLayout>
        {plants.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 식물이 없습니다</div>
          </div>
        ) : (
          plants.map((v, i) => {
            const date = curDate();
            return <Bud key={v.id} src={v.src || "Dummy/diary_4.PNG"} budName={v.name} date={date} />;
          })
        )}
        {/* {budDummy.map((v, i) => {
          return <Bud key={i} src={v.src} budName={v.name} date={v.createdAt} />;
        })} */}
      </BudLayout>
      {isDialog ? <PlantAddDialog open={isDialog} closeFn={setDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default Daily;
