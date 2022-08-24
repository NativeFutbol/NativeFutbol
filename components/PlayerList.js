import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Player from "./Player";
import LoadingOverlay from "./LoadingOverlay";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";

const PlayersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  // const season = 2022;
  // const leagueId = 39;

  const myTeamFilters = useSelector((state) => state.myTeamFilters);
  const season = myTeamFilters?.season;
  const leagueId = myTeamFilters?.league;
  const teamId = myTeamFilters?.team;
  const position = myTeamFilters?.position;

  useEffect(() => {
    getPlayers();
  }, [season, leagueId, teamId, position]);

  const getPlayers = () => {
    setIsLoading(true);

    const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
    const url = teamId
      ? `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}&team=${teamId}`
      : `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}`;

    const options = {
      method: "GET",
      url: url,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        const players = position
          ? response.data.response.filter(
              (player) =>
                player?.statistics[0]?.games?.position.toLowerCase() ===
                position.toLowerCase()
            )
          : response.data.response;

        setPlayers(players);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <BottomSheetFlatList
      data={players}
      renderItem={({ item }) => <Player player={item} />}
    />
  );
};

export default PlayersList;
