import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  templates: [],
  requests: [],
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
    setTemplates: (state, action) => {
      if (state.user) {
        state.user.templates = action.payload.templates;
      } else console.log("You haven't created any template yet");
    },
    setRequests: (state, action) => {
      if (state.user) {
        state.user.requests = action.payload.requests;
      } else console.log("You haven't created any request yet");
    },
    setTemplate: (state, action) => {
      const updatedTemplate = state.templates.map((template) => {
        if (template._id === action.payload.template_id)
          return action.payload.template;
      });
      state.templates = updatedTemplate;
    },
    setRequest: (state, action) => {
      const updatedRequest = state.templates.map((request) => {
        if (request._id === action.payload.request)
          return action.payload.request;
      });
      state.requests = updatedRequest;
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
} = authSlice.actions;

export default authSlice.reducer