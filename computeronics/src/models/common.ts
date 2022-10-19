export enum METHOD {
  PUT = "PUT",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}
export interface FetchParamsModel {
  method: METHOD;
  url: string;
  data?: Object;
}
