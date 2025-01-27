import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '@/services/user.service';

interface UserState {
  agency: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  agency: [],
  loading: false,
  error: null
};

export const getUserAgency = createAsyncThunk(
  'user/getUserAgency',
  async () => {
    const response = await UserService.getAgencyUsers();
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.agency = action.payload;
      })
      .addCase(getUserAgency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agency users';
      });
  },
});

export default userSlice.reducer; 