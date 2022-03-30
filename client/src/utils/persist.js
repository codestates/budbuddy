import { configurePersist } from "zustand-persist";
const { persist, purge } = configurePersist({
  storage: sessionStorage, // 세션스토리지에 저장
});
export default persist;
export { purge };
