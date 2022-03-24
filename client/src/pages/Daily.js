import React from "react";
import styled from "styled-components";
import { budDummy } from "../utils/dummy";
import Logo from "../components/Logo";
import TabBtnOne from "../components/TabBtnOne";
import Bud from "../components/Bud";

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
//카드 컴포넌트
//<Logo />
const Daily = () => {
  return (
    <Layout>
      <Logo className="logo" />
      <TabBtnOne className="TabBtnOne" tabName="내식물" btnName="내 식물 추가" />
      <BudLayout>
        {budDummy.map((v, i) => {
          return <Bud key={i} src={v.src} budName={v.budName} date={v.date} />;
        })}
      </BudLayout>
    </Layout>
  );
};

export default Daily;
