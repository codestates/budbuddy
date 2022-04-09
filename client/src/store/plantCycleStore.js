import create from "zustand";
import persist from "../utils/persist";

const useStore = create(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["plantCycle", "userId", "defaultWater", "defaultFertilize", "defaultRepot"], // optional, will save everything if allowlist is undefined // 어느 데이터를 저장시킬지
      denylist: [], // optional, if allowlist set, denylist will be ignored // 저장시키지 않을 데이터
    },
    (set) => ({
      plantCycle: 0,
      popUpPlantCycleChangeModal: () => set((state) => ({ plantCycle: "makePlantCycleChangeModal" })),
      closePlantCycleChangeModal: () => set((state) => ({ plantCycle: 0 })),
      userId: "",
      defaultWater: 10,
      defaultFertilize: 90,
      defaultRepot: 180,
      setuserId: (userId) =>
        set((state) => ({
          userId: userId,
        })),
      setDefaultWater: (defaultWater) =>
        set((state) => ({
          defaultWater: defaultWater,
        })),
      setDefaultFertilize: (defaultFertilize) =>
        set((state) => ({
          defaultFertilize: defaultFertilize,
        })),
      setDefaultRepot: (defaultRepot) =>
        set((state) => ({
          defaultRepot: defaultRepot,
        })),
    }),
  ),
);

export default useStore;
