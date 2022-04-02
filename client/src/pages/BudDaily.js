import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import TabBtnOne from "../components/common/TabBtnOne";
import Bud from "../components/diary/Bud";
import PlantAddDialog from "../components/diary/PlantAddDialog";
import { makeModal } from "../utils/errExeption";
import { curDate } from "../modules/date";
import useLoginStore from "../store/LoginStore";
import useAjaxStore from "../store/AjaxStore";

const Layout = styled.div`
  .logo {
    margin-top: 1rem;
  }

  .TabBtnOne {
    margin-top: 0.3rem;
  }

  padding-bottom: 3rem;
`;
const BudLayout = styled.div`
  /* padding-top: 0.5rem;
  padding-bottom: 2rem; */
  width: 100%;
  margin: 0 auto;
  .card-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.8rem 0.5rem 0 0.5rem;
  }
  .cardcomponent {
    width: 50%;
  }

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

const BudDaily = () => {
  const { isLogin } = useLoginStore();
  const { setPlant, getPlantsList, myPlants } = useAjaxStore();

  const [isDialog, setDialog] = useState(false);
  const [modalCode, setModalCode] = useState(0);

  useEffect(() => {
    if (isLogin) {
      getBuds();
    }
  }, [isLogin]);

  async function getBuds() {
    await getPlantsList();
  }

  function openDialog() {
    setDialog(true);
  }

  async function registerBud(budName, upload_img) {
    const res = await setPlant(budName, upload_img);
    getPlantsList();
    setModalCode(res); //alreadyExistsBudName
  }

  return (
    <Layout
      onClick={() => {
        setModalCode("");
      }}>
      {makeModal(modalCode)}
      <Logo className="logo" />
      <TabBtnOne className="TabBtnOne" tabName="내 식물" btnName="내 식물 추가" fn={openDialog} />
      <BudLayout>
        {myPlants.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 식물이 없습니다</div>
          </div>
        ) : (
          <div className="card-wrap">
            {myPlants.map((v, i) => {
              const date = curDate();
              let src = null;
              if (v.Image !== null) src = v.Image.store_path;
              return <Bud key={v.id} src={src || "Dummy/empty_bud.png"} className="cardcomponent" budName={v.name} date={date} plant_id={v.id} />;
            })}
          </div>
        )}
      </BudLayout>
      {isDialog ? <PlantAddDialog open={isDialog} closeFn={setDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default BudDaily;
