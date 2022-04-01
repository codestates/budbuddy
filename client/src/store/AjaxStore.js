import create from "zustand";
import persist from "../utils/persist";
import { devtools } from "zustand/middleware";
import moment from "moment";
import axios from "axios";
axios.defaults.withCredentials = true;

const useAjaxStore = create(
  persist(
    {
      key: "ajax",
      allowlist: ["listByPlantId", "listByUserId", "publicJournal", "userInfo"],
      denylist: [],
    },
    (set) => ({
      listByPlantId: [],
      listByUserId: [],
      publicJournal: [],
      userInfo: {},
      async setListByPlantId(plantId) {
        try {
          const resData = await axios.get(process.env.REACT_APP_API_URL + "/journals/my", { params: { plant: plantId } });
          // console.log("setListByPlantId:::", resData.data.data);
          set((state) => ({ listByPlantId: [...resData.data.data] }));
        } catch (err) {
          console.log("axios err / setListByPlatId :::", err);
          set((state) => ({ listByPlantId: [] }));
        }
      },
      async setListByUserId() {
        try {
          const resData = await axios.get(process.env.REACT_APP_API_URL + "/journals/my");
          // console.log("setListByUserId:::", resData.data.data);
          set((state) => ({ listByUserId: [...resData.data.data] }));
        } catch (err) {
          console.log("axios err / setListByUserId :::", err);
          set((state) => ({ listByUserId: [] }));
        }
      },
      async deleteListByJournalId(journal_Id) {
        try {
          const resData = await axios.delete(process.env.REACT_APP_API_URL + `/journals/${journal_Id}`);
          console.log("deleteListByJournalId:::", resData);
        } catch (err) {
          console.log("axios err / deleteListByJournalId :::", err);
        }
      },
      async getUserInfo() {
        try {
          const resUser = await axios.get(process.env.REACT_APP_API_URL + `/users/userinfo`);
          // console.log("getUserInfo:::", resUser);
          set((state) => ({ userInfo: resUser.data.data }));
        } catch (err) {
          console.log("axios err / getUserInfo :::", err);
        }
      },
      async getAllPublicJournal() {
        try {
          let resjournal = await axios.get(process.env.REACT_APP_API_URL + `/journals`);

          resjournal = resjournal.data.data;
          const extractedData = [];
          console.log(resjournal);
          for (let i = 0; i < resjournal.length; i++) {
            let publicJournal = {
              journalId: resjournal[i].id,
              nickname: resjournal[i].User.nickname,
              profileImg: null,
              plantName: resjournal[i].Plant.name,
              updatedAt: resjournal[i].updatedAt,
              textContent: resjournal[i].body,
              journalImg: null,
            };

            publicJournal.date_pick = moment(resjournal[i].updatedAt).format("MM/DD");
            if (resjournal[i].Journal_Images.length !== 0) {
              publicJournal.journalImg = resjournal[i].Journal_Images[0].Image.store_path;
            }
            extractedData.push(publicJournal);
          }

          set((state) => ({ publicJournal: extractedData }));
        } catch (err) {
          console.log("axios err / getAllPublicJournal :::", err);
          set((state) => ({ publicJournal: [] }));
        }
      },
    }),
  ),
);

export default useAjaxStore;
