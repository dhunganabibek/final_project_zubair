import { LOGIN_MENU_CLICKED_VALUE } from "../actions/types";
export default function getLoginClickedReducer(
  state = {},
  action: { data: any; type: string }
) {
  switch (action.type) {
    case LOGIN_MENU_CLICKED_VALUE:
      return action.data;
    default:
      return state;
  }
}
