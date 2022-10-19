import { BACKEND_DOMAIN } from "../config";
import { FetchParamsModel } from "../models/common";
export const fetchResource = async (
  fetchBody: FetchParamsModel
): Promise<any | undefined> => {
  const method = fetchBody.method;
  const url = BACKEND_DOMAIN + fetchBody.url;
  const body = JSON.stringify(fetchBody.data);
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await fetch(url, {
      method: method ? method : "GET",
      body,
      headers,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
