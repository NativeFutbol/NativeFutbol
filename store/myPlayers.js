import { createSlice } from "@reduxjs/toolkit";

const myPlayersSlice = createSlice({
  name: "myPlayers",
  initialState: [],
  reducers: {
    addMyPlayer: (state, { payload }) => {
      state.push(payload);
    },
    removeMyPlayer: (state, { payload }) => {
      return state.filter((player) => +player.id !== +payload.id);
    },
  },
});

export const { addMyPlayer, removeMyPlayer } = myPlayersSlice.actions;

export default myPlayersSlice.reducer;
