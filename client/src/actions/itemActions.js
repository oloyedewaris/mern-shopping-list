import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const itemsLoading = () => dispatch => {
  dispatch({
    type: ITEMS_LOADING,
  });
};

export const getItems = () => dispatch => {
  // dispatch(itemsLoading());
  axios
    .get("api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch(err => getErrors(err.response.data, err.response.status));
};

export const addItem = newItem => (dispatch, getState) => {
  axios
    .post("api/items", newItem, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch(err => getErrors(err.response.data, err.response.status));
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`api/items/${id}`, tokenConfig(getState))
    .then(
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch(err => getErrors(err.response.data, err.response.status));
};
