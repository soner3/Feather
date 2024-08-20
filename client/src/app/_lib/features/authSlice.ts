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
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
    setLogin: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
  },
});

export const { setAuth, setLogout, setLogin } = auhtSlice.actions;
export default auhtSlice.reducer;
