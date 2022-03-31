import create from "zustand";
import persist from "../utils/persist";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useAjaxStore = create((set) => ({
  listByPlantId: [],
  async setListByPlantId(plantId) {
    try {
      const resData = await axios.get(process.env.REACT_APP_API_URL + "/journals/my", { params: { plant: plantId } });
      console.log(resData.data.data);
      set((state) => ({ listByPlantId: [...resData.data.data] }));
    } catch (err) {
      console.log("axios err / setListByPlatId :::", err);
    }
  },
}));

export default useAjaxStore;
