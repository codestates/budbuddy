import create from "zustand";
import persist from "../utils/persist";

const useLoginStore = create(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["isLogin", "image"], // optional, will save everything if allowlist is undefined // 어느 데이터를 저장시킬지
      denylist: [], // optional, if allowlist set, denylist will be ignored // 저장시키지 않을 데이터
    },
    (set) => ({
      isLogin: false,
      setLogin: (isLogin) => set((state) => ({ isLogin: isLogin })),
      image: "",
      setImage: (image) =>
        set((state) => ({
          image: image,
        })),
    }),
  ),
);

export default useLoginStore;
