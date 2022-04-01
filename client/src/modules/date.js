import moment from "moment";
export function curDate() {
  let today = new Date();
  today = moment(today).format("YYYY-MM-DD").replaceAll("-", "/");
  return today;
}
