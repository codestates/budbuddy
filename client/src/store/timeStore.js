import create from "zustand";
import persist from "../utils/persist";
export const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const timeStore = create((set) => ({
  dt: new Date(),
}));

export const useNaviStore = create(
  persist(
    {
      key: "navi",
      allowlist: ["idx"],
      denylist: [],
    },
    (set) => ({
      idx: false,
      setIdx: (idx) => set((state) => ({ idx: idx })),
    }),
  ),
);

export default timeStore;
