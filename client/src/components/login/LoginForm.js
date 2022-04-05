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
import { makeModal } from "../../utils/errExeption";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../store/loginStore";
import { sleep } from "../../modules/sleep";

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
    font-size: 1rem;
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
  const { setLogin, setNickname, setUserNumber, setImage } = useLoginStore();
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
      const msg = resData.data.message.split(" ");
      if (msg[1] === "AccessToken") {
        const resData = await axios.get(process.env.REACT_APP_API_URL + "/users/userinfo");
        const { nickname, id } = resData.data.data;
        if (resData.data.data.profile_image !== null) {
          setImage(resData.data.data.profile_image.store_path);
        }
        setNickname(nickname);
        setUserNumber(id);
        setLogin(true);
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err);
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
            <FormControlLabel
              className="saved"
              control={<Checkbox value="remember" color="primary" sx={{ mt: 2, "& .MuiSvgIcon-root": { fontSize: "1rem" } }} />}
              label={
                <Box component="div" fontSize={"1.1rem"} sx={{ mt: 2 }}>
                  로그인 저장
                </Box>
              }
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ mt: 1.5, width: "22%", height: "10%", fontSize: "1rem", pl: "1rem", pr: "1rem" }}
              onBlur={() => {
                setModalCode(0);
              }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 1, width: "22%", height: "10%", fontSize: "1rem", pl: "1rem", pr: "1rem" }}
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
                  let resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
                } catch (err) {
                  if (err.response.data.message === "usedEmail") {
                    let logindData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
                    const resData = await axios.get(process.env.REACT_APP_API_URL + "/users/userinfo");
                    const { nickname, id } = resData.data.data;
                    if (resData.data.data.profile_image !== null) {
                      setImage(resData.data.data.profile_image.store_path);
                    }
                    setNickname(nickname);
                    setUserNumber(id);
                  }
                }
                setModalCode("testLogin");
                await sleep(500);
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
