import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../store/loginStore";
import ModalByMode from "../common/ModalByMode";

const Layout = styled.div`
  display: grid;

  .title {
    color: white;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: black;
  }

  .signup {
    > a {
      font-family: "Jua", sans-serif;
      font-size: ${(props) => props.theme.font1rem};
      font-weight: 500;
    }
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      ligth: "#6cb842",
      dark: "#005900",
    },
    secondary: {
      light: "#01689b",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        fontSize: 6,
      },
    },
  },
});

const LoginForm = () => {
  const { setLogin } = useLoginStore();
  let navigate = useNavigate();
  const [popupInfo, setPopupInfo] = useState({ fn: "" });

  function makePopup(info = "") {
    const tasks = {
      testLogin() {
        info.done = () => {
          setLogin(true);
          navigate("/mypage");
          setPopupInfo({});
        };
        info.closePopup = setPopupInfo;
        info.outerFn = info.done;
        info.text = "테스트 계정으로 로그인 합니다.\nBudBuddy에 오신것을 환영합니다.";
        return <ModalByMode info={info} />;
      },
      reqfillLoginform() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        info.text = "로그인 양식을 채워주세요.";
        return <ModalByMode info={info} />;
      },
      NotFound() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        info.text = "가입되지 않은 이메일입니다.";
        return <ModalByMode info={info} />;
      },
      wrongPassword() {
        info.closePopup = setPopupInfo;
        info.outerFn = setPopupInfo;
        info.text = "비밀번호가 잘못되었습니다.";
        return <ModalByMode info={info} />;
      },
    };

    if (!tasks[info.fn]) {
      return null;
    }
    return tasks[info.fn]();
  }

  async function loginReq(e) {
    e.preventDefault();
    const { email, password } = e.target;
    if (email.value === "" || password.value === "") {
      setPopupInfo({ fn: "reqfillLoginform" });
      return;
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      const msg = resData.data.message.split(" ");
      if (msg[1] === "AccessToken") {
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err.response.data.message);

      setPopupInfo({ fn: err.response.data.message });
    }
  }

  return (
    <Layout>
      {makePopup(popupInfo)}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}>
          <Box component="form" onSubmit={loginReq} noValidate sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%" }}>
            <TextField
              margin="none"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              InputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              fullWidth
            />
            <TextField
              type="password"
              margin="none"
              required
              id="password"
              label="password"
              name="current-password"
              autoComplete="current-password"
              variant="standard"
              InputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              fullWidth
            />
            <Button type="submit" variant="contained" size="small" sx={{ mt: 3.5, width: "22%", height: "10%", fontSize: "1rem", pl: "1rem", pr: "1rem" }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 1, width: "22%", height: "10%", fontSize: "1rem", pl: "1rem", pr: "1rem" }}
              size="small"
              onClick={async () => {
                const payload = {
                  email: "test@test.com",
                  password: "1111",
                  nickname: "테스트",
                };
                try {
                  await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
                } catch (err) {
                  if (err.response.data.message === "usedEmail") {
                    await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
                  }
                }
                setPopupInfo({ fn: "testLogin" });
              }}>
              Test
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item className="signup">
                <Link href="/signup">회원가입</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Layout>
  );
};

export default LoginForm;
