import { TableI } from "../../types";
import initialState from "../initialState";
import { SET_NUM_ROWS_SELECTED, SET_SELECTED_ROWS } from "./actionTypes";

export default function reducer(
  state: TableI = initialState.table,
  action: any
) {
  switch (action.type) {
    case SET_NUM_ROWS_SELECTED:
      return {
        ...state,
        numberOfRowsSelected: action.payload,
      };
    case SET_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: [...action.payload],
      };
    default:
      return state;
  }
}
