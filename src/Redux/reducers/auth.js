const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loginData: {
    username: "",
    loginStatus: false,
  },
};

export const loginSlice = createSlice({
  name: "loginauth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.loginData.username = action.payload;
      state.loginData.loginStatus = true;
    },
    logOutHandler: (state) => {
      state.loginData.username = "";
      state.loginData.loginStatus = false;
    },
  },
});

export const { loginHandler, logOutHandler } = loginSlice.actions;
export default loginSlice.reducer;
