import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeModal } from "../utils/errExeption";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/loginStore";
import { sleep } from "../modules/sleep";

const Layout = styled.div`
  display: grid;
  font-size: 10px;

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
        fontSize: 4,
      },
    },
  },
});

const LoginForm = () => {
  const { setLogin } = useLoginStore();
  let navigate = useNavigate();
  const [modalCode, setModalCode] = useState(0);

  async function loginReq(e) {
    e.preventDefault();
    const { email, password } = e.target;
    if (email.value === "" || password.value === "") {
      setModalCode("reqfillLoginform");
      return;
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      // console.log("호출", email.value, password.value, resData);
      // console.log("응답::::", resData.data);
      const msg = resData.data.message.split(" ");
      if (msg[1] === "AccessToken") {
        // console.log("로그인 성공");
        const loginInfo = {
          isLogined: true,
          type: "normal",
        };

        sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        setLogin(true);
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err.response.data);
      setModalCode(err.response.data.message);
    }
  }

  return (
    <Layout>
      {makeModal(modalCode)}
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
              InputProps={{ style: { fontSize: 10 } }}
              InputLabelProps={{ style: { fontSize: 10 } }}
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
              InputProps={{ style: { fontSize: 10 } }}
              InputLabelProps={{ style: { fontSize: 10 } }}
              fullWidth
            />
            <FormControlLabel
              className="saved"
              control={<Checkbox value="remember" color="primary" sx={{ "& .MuiSvgIcon-root": { fontSize: "0.5rem" } }} />}
              label={
                <Box component="div" fontSize={"0.6rem"}>
                  로그인 저장
                </Box>
              }
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: "22%", height: "10%", fontSize: "0.7rem" }}
              onBlur={() => {
                setModalCode(0);
              }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 0.5, width: "22%", height: "10%", fontSize: "0.7rem" }}
              size="small"
              onClick={async () => {
                const loginInfo = {
                  isLogined: true,
                  type: "test",
                };
                const payload = {
                  email: "test@test.com",
                  password: "1111",
                  nickname: "test",
                };
                try {
                  const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
                  console.log(resData.data);
                } catch (err) {
                  console.log("테스트계정 로그인 오류:::", err);
                }
                setModalCode("testLogin");
                await sleep(500);
                sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
                setLogin(true);
                navigate("/mypage");
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
