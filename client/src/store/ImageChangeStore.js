import create from "zustand";

const ImageChangeStore = create((set) => ({
  ImageChangeState: 0,
  popUpImageChangeModal: () => set((state) => ({ ImageChangeState: "ImageChangeState" })),
  closeImageChangeModal: () => set((state) => ({ ImageChangeState: 0 })),
}));

export default ImageChangeStore;
