import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Player from "./Player";
import LoadingOverlay from "./LoadingOverlay";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";

const PlayersList = ({ searchPlayerName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const myTeamFilters = useSelector((state) => state.myTeamFilters);
  const season = myTeamFilters?.season;
  const leagueId = myTeamFilters?.league;
  const teamId = myTeamFilters?.team;
  const position = myTeamFilters?.position;

  const regex = new RegExp(`(${searchPlayerName.toLowerCase()})`);

  // if (searchPlayerName && searchPlayerName !== "" && players?.length) {

  //   console.log(players[0]?.player?.name.toLowerCase());
  //   console.log(searchPlayerName);
  //   console.log(regex.test(players[0]?.player?.name.toLowerCase()));

  //   setPlayers((prev) => {
  //     return prev.filter((player) =>
  //       regex.test(player?.player?.name.toLowerCase())
  //     );
  //   });
  // }

  // useEffect(() => {
  //   getPlayers();
  // }, [season, leagueId, teamId, position]);

  // const getPlayers = (page = 1) => {
  //   setIsLoading(true);

  //   const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
  //   const url = teamId
  //     ? `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}&team=${teamId}&page=${page}`
  //     : `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}&page=${page}`;

  //   const options = {
  //     method: "GET",
  //     url: url,
  //     headers: {
  //       "X-RapidAPI-Key": FOOTBALL_API_KEY,
  //       "X-RapidAPI-Host": "v3.football.api-sports.io",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setIsLoading(false);

  //       const players = position
  //         ? response.data.response.filter(
  //             (player) =>
  //               player?.statistics[0]?.games?.position.toLowerCase() ===
  //               position.toLowerCase()
  //           )
  //         : response.data.response;

  //       setPlayers(players);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    getPlayers();
  }, [season, leagueId, teamId, position]);

  const getPlayers = () => {
    setIsLoading(true);

    const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
    const url = teamId
      ? `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}&team=${teamId}`
      : `${FOOTBALL_API_URL}/players?season=${season}&league=${leagueId}`;

    const option = (page) => {
      return {
        method: "GET",
        url: `${url}&page=${page}`,
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "v3.football.api-sports.io",
        },
      };
    };

    const getPlayerPage1 = axios.request(option("1"));
    const getPlayerPage2 = axios.request(option("2"));
    const getPlayerPage3 = axios.request(option("3"));
    const getPlayerPage4 = axios.request(option("4"));

    axios
      .all([getPlayerPage1, getPlayerPage2, getPlayerPage3, getPlayerPage4])
      .then(
        axios.spread((...playerPages) => {
          const page1 = playerPages[0].data.response;
          const page2 = playerPages[1].data.response;
          const page3 = playerPages[2].data.response;
          const page4 = playerPages[3].data.response;

          const players = position
            ? [...page1, ...page2, ...page3, ...page4].filter(
                (player) =>
                  player?.statistics[0]?.games?.position.toLowerCase() ===
                  position.toLowerCase()
              )
            : [...page1, ...page2, ...page3, ...page4];

          setPlayers(players);
          setIsLoading(false);
        })
      );
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <BottomSheetFlatList
      data={
        searchPlayerName && searchPlayerName !== "" && players?.length
          ? players.filter((player) =>
              regex.test(player?.player?.name.toLowerCase())
            )
          : players
      }
      renderItem={({ item }) => <Player player={item} />}
    />
  );
};

export default PlayersList;
//
