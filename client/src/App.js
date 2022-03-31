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
import Daily from "./pages/Daily";
import Album from "./pages/Album";
import Write from "./pages/Write";
import DairyList from "./pages/DairyList";
import DailyRead from "./pages/DailyRead";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import NavigationBar from "./components/common/NavigationBar";
import { OutLine, Content } from "./styles/CommonStyled";
import useLoginStore from "./store/LoginStore";
import { PersistGate } from "zustand-persist";

const App = () => {
  const { isLogin } = useLoginStore();
  // console.log("isLogin::", isLogin);

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
                <Route path="/daily" element={<Daily />} />
                <Route path="/daily/read" element={<DailyRead />} />
                <Route path="/write" element={<Write />} />
                <Route path="/list" element={<DairyList />} />
                <Route path="/album" element={<Album />} />
                <Route path="/signup" element={<Signup />} />
                {isLogin ? <Route path="/mypage" element={<Mypage />} /> : <Route path="/login" element={<Login />} />}
                <Route path="/test" element={<Test />} />
                <Route path="/test2" element={<Test2 />} />
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
