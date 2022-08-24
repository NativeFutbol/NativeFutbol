import { createSlice } from "@reduxjs/toolkit";

const mostCardsDataSlice = createSlice({
  name: "mostCardsData",
  initialState: {
    red: [],
    yellow: [],
  },
  reducers: {
    setMostCardsData: (state, action) => {
      if (action.payload.get.includes("red")) {
        const res = action.payload.response;
        state.red = res.filter((data) => data.statistics[0].cards.red >= 1);
      } else if (action.payload.get.includes("yellow")) {
        const res = action.payload.response;
        state.yellow = res.filter(
          (data) => data.statistics[0].cards.yellow >= 1
        );
      }
    },
  },
});

export const setMostCardsData = mostCardsDataSlice.actions.setMostCardsData;

export default mostCardsDataSlice.reducer;
