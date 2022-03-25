import create from "zustand";

const useStore = create((set) => ({
  login: false,
  setLogin: (isLogin) =>
    set((state) => ({
      login: isLogin,
    })),

  plantCycle: 0,
  popUpPlantCycleChangeModal: () => set((state) => ({ plantCycle: "makePlantCycleChangeModal" })),
  closePlantCycleChangeModal: () => set((state) => ({ plantCycle: 0 })),
}));

export default useStore;
