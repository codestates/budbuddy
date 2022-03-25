import create from "zustand";

const useLoginStore = create((set) => ({
  isLogin: false,
  setLogin: (isLogin) =>
    set((state) => ({
      isLogin: isLogin,
    })),
}));

export default useLoginStore;
