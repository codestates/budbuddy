import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Story from "./pages/Story";
import Daily from "./pages/Daily";
import Album from "./pages/Album";
import NavigationBar from "./components/NavigationBar";
import { OutLine, Content } from "./styles/CommonStyled";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <OutLine>
          <Content className="Content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/album" element={<Album />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage" element={<Mypage />} />
            </Routes>
            <NavigationBar className="navi" />
          </Content>
        </OutLine>
      </ThemeProvider>
    </div>
  );
};

export default App;
