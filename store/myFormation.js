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
      state.Attacker = payload[0];
      state.Midfielder = payload[2];
      state.Defender = payload[4];
    },
  },
});

export const { setMyFormation } = myFormationSlice.actions;

export default myFormationSlice.reducer;
