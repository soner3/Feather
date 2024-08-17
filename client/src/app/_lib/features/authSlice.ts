import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setLogout } = auhtSlice.actions;
export default auhtSlice.reducer;
