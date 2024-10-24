import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {
    fullName: "",
    email: "",
  },
  token: null,
  templates: null,
  requests: null,
  favTemplates: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.id = null;
    },
    setGreetings: (state, action) => {
      if (state.user) {
        state.user.greetings = action.payload.templates;
      }
    },
    setTemplates: (state, action) => {
      if (state.user) {
        state.user.templates = action.payload.templates;
      } else console.log("You haven't created any template yet");
    },

    setFavTemplates: (state, action) => {
      if (state.user) {
        state.user.favTemplates = action.payload.favTemplates;
      } else console.log("no fav templates yet");
    },

    setRequests: (state, action) => {
      if (state.user) {
        state.user.requests = action.payload.requests;
      } else console.log("You haven't created any request yet");
    },

    setFullName: (state, action) => {
      if (state.user) {
        state.user.fullName = action.payload.fullName;
      } else console.log("You haven't created any request yet");
    },
    setEmail: (state, action) => {
      if (state.user) {
        state.user.email = action.payload.email;
      } else console.log("You haven't created any request yet");
    },

    setOrganization: (state, action) => {
      if (state.user) {
        state.user.organization = action.payload.organization;
      } else
        console.log(
          "You don't belong to any organization yet, please contact your company"
        );
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setTemplates,
  setRequests,
  setRequest,
  setTemplate,
  setOrganization,
  setFavTemplates,
  setFullName,
  setGreetings
} = authSlice.actions;

export default authSlice.reducer;
