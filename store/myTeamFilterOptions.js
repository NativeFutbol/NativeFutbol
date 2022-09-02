import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";

const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;

export const fetchTeams = createAsyncThunk("teams", async (seasonAndLeague) => {
  const options = {
    method: "GET",
    url: `${FOOTBALL_API_URL}/teams?season=${seasonAndLeague.season}&league=${seasonAndLeague.league}`,
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data.response;
  } catch (error) {
    return error.message;
  }
});

const myTeamFiltersOptionsSlice = createSlice({
  name: "myTeamFiltersOptions",
  initialState: {
    season: ["2022", "2021", "2020", "2019"],
    league: {
      39: "Premier League",
      61: "Ligue 1",
      78: "Bundesliga",
      135: "Serie A",
      140: "La Liga",
    },

    team: {},
    position: ["Attacker", "Midfielder", "Defender", "Goalkeeper"],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, { payload }) => {
      const idAndLeagueObj = {};
      payload.forEach(({ team }) => {
        const id = team.id;
        const name = team.name;

        return (idAndLeagueObj[id] = name);
      });

      state.team = idAndLeagueObj;
    });
  },
});

export default myTeamFiltersOptionsSlice.reducer;
