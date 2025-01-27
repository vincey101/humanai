import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '@/services/user.service';

interface AdminState {
  plans: Array<{
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  plans: [],
  loading: false,
  error: null
};

export const getPlans = createAsyncThunk(
  'admin/getPlans',
  async () => {
    const response = await UserService.getPlans();
    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch plans';
      });
  },
});

export default adminSlice.reducer; 