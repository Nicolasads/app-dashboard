import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
    isLogged: false,
    user: {},
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.accessToken;
      state.isLogged = true;

      console.log(state.token);

      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.user = [];
      state.isLogged = false;
    },
  },
});

export const userToken = (state) => state.app.token;

export const userLogged = (state) => state.app.logged;

export const { saveToken, logout } = appSlice.actions;

export default appSlice.reducer;
