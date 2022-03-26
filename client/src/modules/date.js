import moment from "moment";
export function curDate() {
  let today = new Date();
  const date = moment(today).format("YY-MM-DD").replaceAll("-", "/");
  return date;
}
