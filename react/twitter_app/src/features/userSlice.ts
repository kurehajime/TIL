import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER{
  displayName: string;
  photoURL: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:{
      uid: '',
      name: '',
      photoUrl: '',
      displayName: '',
    }
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state,action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {uid: '', name: '', photoUrl: '', displayName: ''};
    },
    updateUserProfile: (state,action:PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoURL;
    }
  },
});

export const { login, logout,updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
