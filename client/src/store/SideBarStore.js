import create from "zustand";

const SideBarStore = create((set) => ({
  isSideBarState: false,
  popUpSideBarStore: () => set((state) => ({ isSideBarState: true })),
  DownSideBarStore: () => set((state) => ({ isSideBarState: false })),
}));

export default SideBarStore;
