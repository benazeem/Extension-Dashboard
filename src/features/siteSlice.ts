import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SiteItem {
  id: string;
  name: string;
  url: string;
  x: number;
  y: number;
  area: string;
  icon: string;
  bgColor: string;
}

interface SiteItemState {
  items: SiteItem[];
}

const initialState: SiteItemState = {
  items: [],
};

const siteItemSlice = createSlice({
  name: "siteItems",
  initialState,
  reducers: {
    addSite: (state, action: PayloadAction<SiteItem>) => {
      state.items.push(action.payload);
      console.log(state.items);
    },
    removeSite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateSite: (state, action: PayloadAction<SiteItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addSite, removeSite, updateSite } = siteItemSlice.actions;
export default siteItemSlice.reducer;
