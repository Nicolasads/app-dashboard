import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
    isLogged: false,
    user: [],
  },
  reducers: {
    saveToken: (state, action) => {
      // const token = localStorage.setItem("token", action.payload.accessToken);
      state.token = action.payload.accessToken;
      state.isLogged = true;

      console.log(state.isLogged);

      state.user.push({
        user: {
          id: action.payload.id,
          age: action.payload.age,
          email: action.payload.email,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
        },
      });
    },
    logout: (state) => {
      state.token = "";
      state.user = [];
      state.isLogged = false;
    },
  },
});

export const userToken = (state) => state.token;

export const userLogged = (state) => state.logged;

export const { saveToken, logout } = appSlice.actions;

export default appSlice.reducer;
