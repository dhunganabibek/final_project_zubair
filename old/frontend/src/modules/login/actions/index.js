import * as types from './types';
import fetchData from '../../../common/api';
import { LOGIN, USER, OTP } from '../../../common/api/routes';

export function loginSuccess(data) {
  return { type: types.LOGIN_SUCCESS, data };
}
export function loginError(data) {
  return { type: types.LOGIN_ERROR, data };
}
export function loginDialogOpen(data) {
  return { type: types.LOGIN_DIALOG_OPEN, data };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}
export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logoutSuccess());
  };
}
export function getUserDetails() {
  return (dispatch) => {
    const fetchInfo = {};
    fetchInfo.relURL = USER;
    fetchData(fetchInfo)
      .then((response) => response.json())
      .then((json) => {
        if (json.data && !json.error) {
          dispatch(loginSuccess(json.data));
        } else {
          console.log('error');
        }
      });
  };
}
export function verifyOtp(data) {
  return (dispatch) => {
    const fetchInfo = {};
    fetchInfo.data = data;
    fetchInfo.method = 'POST';
    fetchInfo.relURL = OTP;
    fetchData(fetchInfo)
      .then((response) => response.json())
      .then((json) => {
        if (json.data && !json.error) {
          localStorage.setItem('access_token', json.data.token);
          dispatch(getUserDetails());
        } else {
          dispatch(loginError(json));
        }
      });
  };
}

export function getAccessToken(data) {
  return (dispatch) => {
    const fetchInfo = {};
    fetchInfo.data = data;
    fetchInfo.method = 'POST';
    fetchInfo.relURL = LOGIN;
    fetchData(fetchInfo)
      .then((response) => response.json())
      .then((json) => {
        if (json.data && !json.error && !json.data.notFound) {
          localStorage.setItem('access_token', json.data.token);
          dispatch(getUserDetails());
        } else {
          dispatch(loginError(json));
        }
      });
  };
}
