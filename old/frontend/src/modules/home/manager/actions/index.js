import * as types from './types';
import fetchData from '../../../../common/api';
import { SUBMIT_TICKET } from '../../../../common/api/routes';

export function getTicketDetails(data) {
  return { type: types.GET_TICKETS_DATA, data };
}

export function ticketDataErrors(data) {
  return { type: types.TICKET_DATA_ERRORS, data };
}

export function getTicketsData() {
  return (dispatch) => {
    const fetchInfo = {};
    fetchInfo.relURL = SUBMIT_TICKET;
    fetchData(fetchInfo)
      .then((response) => response.json())
      .then((json) => {
        if (json.data && !json.error) {
          dispatch(getTicketDetails(json.data));
        } else {
          console.log('error');
        }
      });
  };
}
