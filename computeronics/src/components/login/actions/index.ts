import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from "./types";
import { LOGIN, GET_USER, LOGIN_OTP } from "../../../api/url";
import { fetchResource } from "../../../api/fetch";
import { LoginPayloadModel } from "../../../models/login";
import { METHOD } from "../../../models/common";
export const loginLoadingAction = () => {
  return { type: LOGIN_LOADING, data: { loading: true } };
};

export const loginSuccessAction = (data: any) => {
  return { type: LOGIN_SUCCESS, data };
};
export const logoutAction = () => {
  return { type: LOGOUT };
};
export const loginErrorAction = () => {
  return { type: LOGIN_ERROR, data: { error: true } };
};

export const userAction = (): any => {
  return async (dispatch: any) => {
    const data = {
      method: METHOD.GET,
      url: GET_USER,
    };
    try {
      const res = await fetchResource(data);
      const result = await res?.json();
      dispatch(loginSuccessAction(result));
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginAction = (payload: LoginPayloadModel): any => {
  return async (dispatch: any) => {
    const data = {
      method: METHOD.POST,
      url: payload.otp ? LOGIN_OTP : LOGIN,
      data: payload,
    };
    try {
      const res = await fetchResource(data);
      const result = await res?.json();
      if (result?.data?.token) {
        localStorage.setItem("token", result?.data?.token);
        dispatch(userAction());
      } else if (result.userNotFound) {
        dispatch(loginSuccessAction(result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
