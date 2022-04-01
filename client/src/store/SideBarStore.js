import create from "zustand";

const SideBarStore = create((set) => ({
  SideBarState: false,
  popUpSideBarStore: () => set((state) => ({ SideBarState: true })),
  DownSideBarStore: () => set((state) => ({ SideBarState: false })),
}));

export default SideBarStore;
