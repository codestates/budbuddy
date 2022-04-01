import create from "zustand";
import persist from "../utils/persist";
import { devtools } from "zustand/middleware";
import axios from "axios";
axios.defaults.withCredentials = true;

const useAjaxStore = create(
  persist(
    {
      key: "ajax",
      allowlist: ["listByPlantId"],
      denylist: [],
    },
    (set) => ({
      listByPlantId: [],
      listByUserId: [],
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
          set((state) => ({ listByUserId: [] }));
        }
      },
    }),
  ),
);

export default useAjaxStore;
