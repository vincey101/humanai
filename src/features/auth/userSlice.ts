import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '@/services/user.service';

interface UserState {
  agency: any[];
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  agency: [],
  user: UserService.getUserFromSession()||null,
  loading: false,
  error: null,
};

// Async Thunks for Login and Register
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: { email: string; password: string }) => {
    const response = await UserService.login(userData);
    return response.data; // Assuming response contains user data
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: { email: string; password: string; name:string }) => {
    const response = await UserService.register(userData);
    return response.data; // Assuming response contains user data
  }
);

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
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        UserService.persistUserToSession({token: action.payload.token, user: action.payload.user});
        if(action.payload.user.role==='user'){
          window.location.href='/';
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.error=state.error === 'Request failed with status code 401'
          ?'Invalid email or password'
          :state.error
        
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Get Agency Users
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
