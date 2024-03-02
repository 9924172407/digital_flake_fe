import { createSlice } from '@reduxjs/toolkit';
import { setJwtToken } from '../../utils/helper';

const initialState = {
  user: {},
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data;
      state.isLoggedIn = true,
        setJwtToken(action.payload.data.token)
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
