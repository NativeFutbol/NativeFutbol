import { createSlice } from "@reduxjs/toolkit";

const myPlayersSlice = createSlice({
  name: "myPlayers",
  initialState: [],
  reducers: {
    resetMyPlayer: (state, { payload }) => {
      return [];
    },
    addMyPlayer: (state, { payload }) => {
      state.push(payload);
      console.log(state);
    },
    removeMyPlayer: (state, { payload }) => {
      return state.filter((player) => +player.player.id !== +payload.player.id);
    },
  },
});

export const { addMyPlayer, removeMyPlayer, resetMyPlayer } =
  myPlayersSlice.actions;

export default myPlayersSlice.reducer;
