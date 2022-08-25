import { createSlice } from "@reduxjs/toolkit";

const myFormationSlice = createSlice({
  name: "myFormation",
  initialState: {
    Attacker: 3,
    Midfielder: 3,
    Defender: 4,
    Goalkeeper: 1,
  },
  reducers: {
    setMyFormation: (state, { payload }) => {
      return action.payload;
    },
  },
});

export const { setMyFormation } = myFormationSlice.actions;

export default myFormationSlice.reducer;
