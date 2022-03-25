import create from "zustand";

const useStore = create((set) => ({
  plantCycle: 0,
  popUpPlantCycleChangeModal: () => set((state) => ({ plantCycle: "makePlantCycleChangeModal" })),
  closePlantCycleChangeModal: () => set((state) => ({ plantCycle: 0 })),
}));

export default useStore;
