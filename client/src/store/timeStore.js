import create from "zustand";

export const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const timeStore = create((set) => ({
  dt: new Date(),
}));

export default timeStore;
