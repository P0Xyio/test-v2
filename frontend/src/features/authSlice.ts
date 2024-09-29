import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  selectors: {
    selectToken: (state: AuthState) => state.token,
  },
});

export const { setToken } = authSlice.actions;
export const { selectToken } = authSlice.selectors;

export default authSlice.reducer;
