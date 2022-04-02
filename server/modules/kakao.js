const axios = require("axios");
const url = require("url");

module.exports = {
  /**
   * ### 인가코드로 카카오서버에서 악세스토큰과 리플래쉬토큰을 받아옵니다
   * Request Access Token and Refresh Token to Kakao auth server
   * @param {string} code The Authenticate code, 인가코드
   * @return {Promise.<{accessToken:String, refreshToken:String}, kakaoError>} Tokens
   */
  getToken: (code) => {
    return new Promise(async (resolve, reject) => {
      const wwwFormBody = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      };
      const params = new url.URLSearchParams(wwwFormBody);
      try {
        const kakaoResponse = await axios.post("https://kauth.kakao.com/oauth/token", params.toString(), {
          headers: {
            "content-Type": "application/x-www-form-urlencoded",
          },
        });
        const accessToken = kakaoResponse.data.access_token;
        const refreshToken = kakaoResponse.data.refresh_token;
        resolve({ accessToken, refreshToken });
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * ### AccessToken으로 토큰의 정보를 가져옵니다
   * Request Access Token and Refresh Token to Kakao auth server
   * @param {string} code The Authenticate code, 인가코드
   * @return {Promise.<Object, kakaoError>} accessToken data
   */
  getAccessTokenInfo: (accessToken) => {
    return new Promise(async (resolve, reject) => {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const kakaoResponse = await axios.get("https://kapi.kakao.com/v1/user/access_token_info", options);
        resolve(kakaoResponse.data);
      } catch (err) {
        reject(err);
      }
    });
  },

  getUserInfo: (accessToken) => {
    return new Promise(async (resolve, reject) => {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-Type": "application/x-www-form-urlencoded",
        },
      };
      const params = new url.URLSearchParams({
        secure_resource: true,
      });
      try {
        const kakaoResponse = await axios.post("https://kapi.kakao.com/v2/user/me", params.toString(), options);
        resolve(kakaoResponse.data);
      } catch (err) {
        reject(err);
      }
    });
  },
  logout: (accessToken) => {
    return new Promise(async (resolve, reject) => {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const kakaoResopnse = await axios.post("https://kapi.kakao.com/v1/user/logout", {}, options);
        resolve(kakaoResopnse.data);
      } catch (err) {
        reject(err);
      }
    });
  },
};
