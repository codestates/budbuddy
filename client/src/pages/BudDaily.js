import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import TabBtnOne from "../components/common/TabBtnOne";
import Bud from "../components/diary/Bud";
import PlantAddDialog from "../components/diary/PlantAddDialog";
import { curDate } from "../modules/date";
import useLoginStore from "../store/loginStore";
import useAjaxStore from "../store/ajaxStore";
import ModalByMode from "../components/common/ModalByMode";

const Layout = styled.div`
  /* position: relative; */
  padding-top: 1rem;

  .logo {
    margin-top: 1rem;
  }

  .TabBtnOne {
    margin-top: 0.3rem;
  }

  padding-bottom: 3rem;
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
const errAlreadyExist = "이미 존재하는 식물 명입니다.";

const BudDaily = () => {
  const { isLogin } = useLoginStore();
  const { setPlant, getPlantsList, myPlants, deletePlant } = useAjaxStore();

  const [isAddBudDialog, setAddBudDialog] = useState(false);
  const [popupInfo, setPopupInfo] = useState(false);

  useEffect(() => {
    if (isLogin) {
      getBuds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  async function getBuds() {
    await getPlantsList();
  }
  async function asyncDeleteBud() {
    await deletePlant(popupInfo.plant_id);
    await getPlantsList();
  }
  function openDialog() {
    setAddBudDialog(true);
  }

  async function registerBud(budName, upload_img) {
    const res = await setPlant(budName, upload_img);
    getPlantsList();
    if (res === "alreadyExistsBudName") {
      setPopupInfo({ fn: "alreadyExistsBudName", text: errAlreadyExist });
    }
  }

  function makePopup(info = "") {
    const tasks = {
      deleteBud() {
        info.deleteBud = asyncDeleteBud;
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        return <ModalByMode info={info} />;
      },
      changeBudImage() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        return <ModalByMode info={info} />;
      },
      alreadyExistsBudName() {
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
              return <Bud key={v.id} src={src || "Dummy/empty_bud.jpg"} className="cardcomponent" budName={v.name} date={date} plant_id={v.id} setPopupInfo={setPopupInfo} />;
            })}
          </div>
        )}
      </BudLayout>
      {isAddBudDialog ? <PlantAddDialog open={isAddBudDialog} closeFn={setAddBudDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default BudDaily;
