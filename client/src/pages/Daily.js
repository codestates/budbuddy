import React, { useState } from "react";
import styled from "styled-components";
import { budDummy } from "../utils/dummy";
import Logo from "../components/Logo";
import TabBtnOne from "../components/TabBtnOne";
import Bud from "../components/Bud";
import PlantAddDialog from "../components/PlantAddDialog";

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
`;

//식물 추가 탭
const Daily = () => {
  const [isDialog, setDialog] = useState(false);

  function openDialog() {
    setDialog(true);
  }

  function registerBud() {
    console.log("API 호출 코드 작성란");
  }

  return (
    <Layout>
      <Logo className="logo" />
      <TabBtnOne className="TabBtnOne" tabName="내식물" btnName="내 식물 추가" fn={openDialog} />
      <BudLayout>
        {budDummy.map((v, i) => {
          return <Bud key={i} src={v.src} budName={v.budName} date={v.date} />;
        })}
      </BudLayout>
      {isDialog ? <PlantAddDialog open={isDialog} closeFn={setDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default Daily;
