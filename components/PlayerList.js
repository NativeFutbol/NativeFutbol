import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Player from "./Player";
import LoadingOverlay from "./LoadingOverlay";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";

const PlayersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const season = 2022;
  const leagueId = 39;

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        // dispatch(setMostCardsData(response.data));
        setPlayers(response.data.response);
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
