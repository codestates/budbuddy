import moment from "moment";
export function curDate() {
  let today = new Date();
  const date = moment(today).format("YYYY-MM-DD").replaceAll("-", "/");
  console.log("cur함수", date);
  return date;
}
