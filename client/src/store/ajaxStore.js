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
    devtools((set) => ({
      listByPlantId: [],
      listByUserId: [],
      publicJournal: [],
      userInfo: {},
      myPlants: [],
      replies: [],

      async setReplies(journalId, body, group_id = null) {
        try {
          await axios.post(process.env.REACT_APP_API_URL + `/journals/${journalId}/replies`, { body, group_id });
        } catch (err) {
          // console.log("axios err / setReplies :::", err);
        }
      },
      async deleteReplies(replyId) {
        try {
          const resData = await axios.delete(process.env.REACT_APP_API_URL + `/journals/replies/${replyId}`);
          // console.log("deleteReplies:::", resData, replyId);
        } catch (err) {
          // console.log("axios err / deleteReplies :::", err);
        }
      },
      async getReplies(journalId) {
        try {
          const resData = await axios.get(process.env.REACT_APP_API_URL + `/journals/${journalId}/replies`);
          const arr = [];
          // console.log("추출된 replies:::", resData.data.data);
          for (let i = 0; i < resData.data.data.length; i++) {
            const { id, group_id, journal_id, createdAt, body, User, UserId } = resData.data.data[i];

            const reply = {
              userId: UserId,
              nickname: User.nickname,
              replyId: id,
              body,
              group_id,
              journal_id,
              replyTime: null,
              class: resData.data.data[i].class,
            };
            reply.replyTime = moment(createdAt).format("MM/DD ").replaceAll("0", "") + moment(createdAt).format("h:mm");
            arr.push(reply);
          }

          set((state) => ({ replies: arr }));
        } catch (err) {
          // console.log("axios err / getReplies :::", err);
          set((state) => ({ replies: [] }));
        }
      },
      async setListByPlantId(plantId) {
        try {
          const {
            data: { data },
          } = await axios.get(process.env.REACT_APP_API_URL + "/journals/my", { params: { plant: plantId } });
          // console.log("setListByPlantId:::", data);
          set((state) => ({ listByPlantId: [...data] }));
        } catch (err) {
          // console.log("axios err / setListByPlatId :::", err);
          set((state) => ({ listByPlantId: [] }));
        }
      },
      async setListByUserId() {
        try {
          const {
            data: { data },
          } = await axios.get(process.env.REACT_APP_API_URL + "/journals/my");

          data.sort((a, b) => {
            return moment(a.updatedAt).format("YYMMDDhhmmss") * 1 - moment(b.updatedAt).format("YYMMDDhhmmss") * 1;
          });
          // console.log("setListByUserId:::", data);
          set((state) => ({ listByUserId: [...data] }));
        } catch (err) {
          // console.log("axios err / setListByUserId :::", err);
          set((state) => ({ listByUserId: [] }));
        }
      },
      async deleteListByJournalId(journal_Id) {
        try {
          await axios.delete(process.env.REACT_APP_API_URL + `/journals/${journal_Id}`);
        } catch (err) {
          // console.log("axios err / deleteListByJournalId :::", err);
        }
      },
      async getUserInfo() {
        try {
          const {
            data: { data },
          } = await axios.get(process.env.REACT_APP_API_URL + `/users/userinfo`);

          set((state) => ({ userInfo: data }));
        } catch (err) {
          set((state) => ({}));
          // console.log("axios err / getUserInfo :::", err);
        }
      },
      async getPlantsList() {
        try {
          const resData = await axios.get(process.env.REACT_APP_API_URL + "/plants");
          set((state) => ({ myPlants: resData.data.data }));
        } catch (err) {
          set((state) => ({ myPlants: [] }));
          // console.log("axios err / getPlantsList :::", err);
        }
      },
      resetPlantsList() {
        set((state) => ({ myPlants: [] }));
      },
      async deletePlant(plant_id) {
        try {
          await axios.delete(process.env.REACT_APP_API_URL + `/plants/${plant_id}`);
        } catch (err) {
          // console.log("axios err / deletePlant :::", err);
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
            const imgRes = await axios.post(process.env.REACT_APP_API_URL + "/images", formdata);
            payload["image_id"] = [imgRes.data.data.id];
            await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
            return "ok";
          } else {
            await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
            return "ok";
          }
        } catch (err) {
          // console.log("setPlant/alreadyExistsBudName/err:::", err);
          return "alreadyExistsBudName";
        }
      },
      async changePlantImg(plant_id, budName, upload_img) {
        const payload = {
          name: budName,
          image_id: null,
        };

        try {
          if (upload_img.files.length !== 0) {
            let formdata = new FormData();
            formdata.append("image", upload_img.files[0]);
            const imgRes = await axios.post(process.env.REACT_APP_API_URL + "/images", formdata);
            payload["image_id"] = imgRes.data.data.id;
            await axios.put(process.env.REACT_APP_API_URL + `/plants/${plant_id}`, payload);
            return "ok";
          } else {
            // console.log("changePlantImg:::", "이미지가 정상 등록 안된 상태");
          }
        } catch (err) {
          // console.log("changePlantImg:::err:::", err);
          return "changePlantImg fail";
        }
      },
      async getAllPublicJournal() {
        try {
          let resjournal = await axios.get(process.env.REACT_APP_API_URL + `/journals`);
          resjournal = resjournal.data.data;
          const extractedData = [];
          // console.log(resjournal);
          for (let i = 0; i < resjournal.length; i++) {
            let publicJournal = {
              journalId: resjournal[i].id,
              nickname: resjournal[i].User.nickname,
              profileImg: null,
              plantName: null,
              writingDate: resjournal[i].date_pick,
              updatedAt: resjournal[i].updatedAt,
              title: resjournal[i].title,
              textContent: resjournal[i].body,
              journalImg: null, //유효성 검사 이후 넣어야함
              userId: resjournal[i].UserId,
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
          return extractedData;
        } catch (err) {
          // console.log("axios err / getAllPublicJournal :::", err);
          set((state) => ({ publicJournal: ["none"] }));
          return [];
        }
      },
    })),
  ),
);

export default useAjaxStore;
