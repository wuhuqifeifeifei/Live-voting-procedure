import { Axios } from "./request";
export function value() {
  return Axios.get("/sta");
}
