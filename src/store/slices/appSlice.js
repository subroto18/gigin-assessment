import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogedIn: false,
  loginInfo: {},

  jobListApiLoading: false,
  jobListData: [],
  jobListApiError: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateLoginStatus: (state, action) => {
      state.isLogedIn = action.payload.isLogedIn;
      state.loginInfo = action.payload.loginInfo;
    },
    updateJobList: (state, action) => {
      console.log(action.payload);
      state.jobListApiLoading = action.payload.loading;
      state.jobListData = action.payload.data;
      state.jobListApiError = action.payload.error;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLoginStatus, updateJobList } = appSlice.actions;

export default appSlice.reducer;
