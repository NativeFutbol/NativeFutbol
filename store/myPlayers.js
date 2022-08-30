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
    },
    removeMyPlayer: (state, { payload }) => {
      return state.filter((player) => +player.player.id !== +payload.player.id);
    },
    setMyPlayersStore: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addMyPlayer, removeMyPlayer, resetMyPlayer, setMyPlayersStore } =
  myPlayersSlice.actions;

export default myPlayersSlice.reducer;
