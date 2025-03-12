import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoundState {
  main: { width: number; height: number };
  secondary: { width: number; height: number };
}

const initialState: BoundState = {
  main: { width: 0, height: 0 },
  secondary: { width: 0, height: 0 },
};

const boundsSlice = createSlice({
  name: "bounds",
  initialState,
  reducers: {
    updateBounds: (
      state,
      action: PayloadAction<{ area: string; size: { width: number; height: number } }>
    ) => {
      state[action.payload.area as keyof BoundState] = action.payload.size;
    },
  },
});

export const { updateBounds } = boundsSlice.actions;
export default boundsSlice.reducer;
