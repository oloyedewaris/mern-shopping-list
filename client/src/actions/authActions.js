import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";

//Log user in
export const login = ({ email, password }) => dispatch => {
  const body = JSON.stringify({ email, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        getErrors(err.response.data, err.response.status, "LOGIN_FAILED")
      );
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

//Register User
export const register = ({ name, email, password }) => dispatch => {
  const body = JSON.stringify({ name, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        getErrors(err.response.data, err.response.status, "REGISTER_FAILED")
      );
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
      }
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
