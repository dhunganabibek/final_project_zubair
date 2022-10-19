import * as actions from './types';
import { logout } from '../../login/actions';
import { fetchDataAsync } from '../../../common/api';
import { SUBMIT_TICKET } from '../../../common/api/routes';

export const submitSuccess = (data) => ({ type: actions.SUBMIT_TICKET_SUCCESS, data });
export const submitError = (data) => ({ type: actions.SUBMIT_TICKET_ERROR, data });

export const submitTicketData = (data) => async (dispatch) => {
  const fetchInfo = {};
  fetchInfo.data = data;
  fetchInfo.method = 'POST';
  fetchInfo.relURL = SUBMIT_TICKET;
  const response = await fetchDataAsync(fetchInfo);
  if (!response.error) {
    const json = await response.json();
    if (response.status === 401) {
      dispatch(logout());
    } else if (json.data && !json.error) {
      dispatch(submitSuccess(json.data));
    } else {
      dispatch(submitError(json));
    }
  }
};
