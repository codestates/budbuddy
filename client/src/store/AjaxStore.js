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
      allowlist: ["listByPlantId", "listByUserId", "publicJournal", "userInfo", "myPlants"],
      denylist: [],
    },
    (set) => ({
      listByPlantId: [],
      listByUserId: [],
      publicJournal: [],
      userInfo: {},
      myPlants: [],
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
      async getPlantsList() {
        try {
          const resData = await axios.get(process.env.REACT_APP_API_URL + "/plants");
          // console.log("getPlantsList:::", resUser);
          set((state) => ({ myPlants: resData.data.data }));
        } catch (err) {
          set((state) => ({ myPlants: [] }));
          console.log("axios err / getPlantsList :::", err);
        }
      },
      async deletePlant(plant_id) {
        try {
          console.log("deletePlant:::plant_id", plant_id);
          const resData = await axios.delete(process.env.REACT_APP_API_URL + `/plants/${plant_id}`);
          console.log("deletePlant:::", resData);
        } catch (err) {
          console.log("axios err / deletePlant :::", err);
        }
      },
      async setPlant(budName, upload_img) {
        //
        const payload = {
          name: budName,
          image_id: null,
        };

        try {
          if (upload_img.files.length !== 0) {
            let formdata = new FormData();
            formdata.append("image", upload_img.files[0]);
            console.log("imgRes:::", upload_img, payload);
            const imgRes = await axios.post(process.env.REACT_APP_API_URL + "/images", formdata);
            payload["image_id"] = [imgRes.data.data.id];
            const resData = await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
            console.log("setPlant:::with img:::", resData);
            return "ok";
          } else {
            const resData = await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
            console.log("setPlant::none img:::", resData);
            return "ok";
          }
        } catch (err) {
          console.log("setPlant:::err:::", err);
          return "alreadyExistsBudName";
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
              plantName: null,
              updatedAt: resjournal[i].updatedAt,
              title: resjournal[i].title,
              textContent: resjournal[i].body,
              journalImg: null, //유효성 검사 이후 넣어야함
            };

            if (resjournal[i].Plant) {
              publicJournal.plantName = resjournal[i].Plant.name;
            }
            if (resjournal[i].User.profile_image !== null) {
              publicJournal.profileImg = resjournal[i].User.profile_image.store_path;
            }

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
