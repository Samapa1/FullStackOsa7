import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction(state, action) {
      return action.payload;
    },
  },
});

export const { setUserAction } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUserAction(user));
      blogService.setToken(user.token);
    }
  };
};

export const setUser = (data) => {
  return async (dispatch) => {
    const user = await loginService.login(data);
    dispatch(setUserAction(user));
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUserAction(null));
  };
};

export default userSlice.reducer;
