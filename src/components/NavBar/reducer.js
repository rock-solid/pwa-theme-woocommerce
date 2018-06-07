import { combineReducers } from 'redux';
import * as types from './actions';

const sidemenu = (state = false, action) => {
  switch (action.type) {
  case types.MENU_OPEN:
    return true;
  case types.MENU_CLOSE:
    return false;
  default:
    return state;
  }
};
const searchInput = (state = false, action) => {
  switch (action.type) {
  case types.SEARCH_OPEN:
    return true;
  case types.SEARCH_CLOSE:
    return false;
  default:
    return state;
  }
};

export const getSideMenu = state => state.sidemenu;
export const getSearchInput = state => state.searchInput;

export default combineReducers({ sidemenu, searchInput });
