import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  eMail: null,
  token: null,
  rememberMe: false,
  firstName: null,
  lastName: null,
  logged: false, //to change header signIn or SignOut
  username: null,
};



export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      rememberMe: action.payload.rememberMe,
      token: action.payload.token,
      eMail: action.payload.eMail,
      lastName: action.payload.lastName,
      firstName: action.payload.firstName,
      logged: action.payload.logged,
      username: action.payload.username,
    }),
    getToken: (state, action) => {
      return {
        ...state,
        eMail: action.payload.email,
        token: `${action.payload.token}`,
      };
    },
    setUsername: (state, action) =>({
      ...state,
      username: action.payload.username,
    }),
    getNamesofUser: (state, action) => {
      return {
        ...state,
        lastName: action.payload.lastName,
        firstName: action.payload.firstName,
        username: action.payload.username,
      };
    },

    logOut: () => initialState,

    
  },
});

export const { logOut, setUsername, getToken, login, getNamesofUser } = user.actions;
export default user.reducer;