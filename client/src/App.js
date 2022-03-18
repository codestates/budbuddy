import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
