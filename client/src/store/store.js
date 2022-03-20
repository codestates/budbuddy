import create from "zustand";

const useStore = create((set) => ({
  login: false,
  setLogin: (isLogin) =>
    set((state) => ({
      login: isLogin,
    })),
}));

export default useStore;
