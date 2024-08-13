import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sidebarType {
  isOpen: boolean;
}

const initialState: sidebarType = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    changeSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { changeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
