import { LOGIN_MENU_CLICKED_VALUE } from "./types";
export const loginMenuClickedValueAction = (menuItemClicked: string) => {
  console.log(menuItemClicked);
  return { type: LOGIN_MENU_CLICKED_VALUE, data: { item: menuItemClicked } };
};
