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
import { empty } from "../resources";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem;
  position: relative;

  .logo {
    margin-top: 2rem;
  }

  .TabBtnOne {
    margin-top: 0.3rem;
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
  display: flex;
  width: 100%;

  .card-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.8rem 0.5rem 0 0.5rem;
  }
  .cardcomponent {
    width: 50%;
  }
`;

const BudDaily = () => {
  const { isLogin } = useLoginStore();
  const { setPlant, getPlantsList, myPlants, deletePlant, resetPlantsList } = useAjaxStore();

  const [isAddBudDialog, setAddBudDialog] = useState(false);
  const [popupInfo, setPopupInfo] = useState(false);

  useEffect(() => {
    if (isLogin) {
      getBuds();
    } else {
      resetPlantsList();
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
      setPopupInfo({ fn: "alreadyExistsBudName" });
    }
  }

  function makePopup(info = "") {
    const tasks = {
      deleteBud() {
        info.deleteBud = asyncDeleteBud;
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        info.text = "정말 삭제하시겠습니까?\n 등록 식물을 삭제하여도 일지는 남습니다.";
        return <ModalByMode info={info} />;
      },
      changeBudImage() {
        info.closePopup = setPopupInfo;
        info.outerFn = () => {};
        info.text = "등록 식물의 사진을 변경합니다.";
        return <ModalByMode info={info} />;
      },
      alreadyExistsBudName() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        info.text = "이미 존재하는 식물 명입니다.";
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
      {!isLogin ? null : <TabBtnOne className="TabBtnOne" tabName="내 식물" btnName="내 식물 추가" fn={openDialog} />}
      {myPlants.length === 0 || !isLogin ? (
        <div className="notice-fist">
          <div className="notice-dsec">
            <div>{!isLogin ? "로그인 후 이용해 주세요" : "등록된 식물이 없습니다"}</div>
          </div>
        </div>
      ) : null}
      <BudLayout>
        {myPlants.length === 0 || !isLogin ? null : (
          <div className="card-wrap">
            {myPlants.map((v, i) => {
              const date = curDate();
              let src = null;
              if (v.Image !== null) src = v.Image.store_path;
              return <Bud key={v.id} src={src || empty.journal} className="cardcomponent" budName={v.name} date={date} plant_id={v.id} setPopupInfo={setPopupInfo} />;
            })}
          </div>
        )}
      </BudLayout>
      {isAddBudDialog ? <PlantAddDialog open={isAddBudDialog} closeFn={setAddBudDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default BudDaily;
