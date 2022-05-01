import {createSlice} from "@reduxjs/toolkit";
import ProfileImage from "../../images/profilepic.jpg";

const initialState = {
  user: null,
  userProfile: {
    email: null,
    first_name: null,
    last_name: null,
    gender: null,
    position: null,
    birth_date: null,
    total_score: null,
  },
  userProfilePic: ProfileImage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state, action) => {
      state.user = null;
    },
    updateAccessToken: (state, action) => {
      state.user.access_token = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.userProfile = action.payload;
    },
    userLogout: () => {
      console.log("clearing redux states after logging out");
    },
    toggleRememberUser:() =>{
      console.log("Toggling keep me signed in")
    },
    setUserProfilePic: (state, action) => {
      if (action.payload.length > 25) {
        state.userProfilePic = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserData,
  clearUserData,
  setUserProfileData,
  clearUserProfileData,
  updateAccessToken,
  userLogout,
  toggleRememberUser,
  setUserProfilePic,
} = userSlice.actions;

export default userSlice.reducer;
