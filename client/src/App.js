import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import MypageRecord from "./pages/MypageRecord";
import Story from "./pages/Story";
import BudDaily from "./pages/BudDaily";
import Album from "./pages/Album";
import Write from "./pages/Write";
import DairyListByBud from "./pages/DairyListByBud";
import DairyByMode from "./pages/DairyByMode";
import NavigationBar from "./components/common/NavigationBar";
import { OutLine, Content } from "./styles/CommonStyled";
import useLoginStore from "./store/loginStore";
import { PersistGate } from "zustand-persist";
var moment = require("moment");
require("moment-timezone");
moment.locale();
moment.tz.setDefault("Asia/Seoul");

const App = () => {
  const { isLogin } = useLoginStore();

  return (
    <div>
      <PersistGate>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <OutLine>
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/story" element={<Story />} />
                <Route path="/daily" element={<BudDaily />} />
                <Route path="/daily/:mode" element={<DairyByMode />} />
                <Route path="/write" element={<Write />} />
                <Route path="/list" element={<DairyListByBud />} />
                <Route path="/album" element={<Album />} />
                <Route path="/signup" element={<Signup />} />
                {isLogin ? <Route path="/mypage" element={<Mypage />} /> : <Route path="/login" element={<Login />} />}
                <Route path="/mypage/list/record" element={<MypageRecord />} />
              </Routes>
            </Content>
            <NavigationBar classNsame="navi" />
          </OutLine>
        </ThemeProvider>
      </PersistGate>
    </div>
  );
};

export default App;
