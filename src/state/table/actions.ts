import { SET_NUM_ROWS_SELECTED, SET_SELECTED_ROWS } from "./actionTypes";

export function setNumberOfRowsSelected(payload: number) {
  return {
    type: SET_NUM_ROWS_SELECTED,
    payload,
  };
}

export function setSelectedRows(payload: Array<string>) {
  return {
    type: SET_SELECTED_ROWS,
    payload,
  };
}
