import { Axios } from "./request";
export function name() {
  console.log("success");
  return Axios.post("/name");
}
