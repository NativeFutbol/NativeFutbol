import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { FOOTBALL_API_KEY } from "@env";

import { apiFootballDummyNextMatches } from "../constants/apiFootballDummyData";
import LoadingOverlay from "../components/LoadingOverlay";

export default function PredictionsScreen() {
  const [league, setLeague] = useState("Premier League");
  const [isLoading, setIsLoading] = useState(false);
  const [nextGames, setNextGames] = useState(apiFootballDummyNextMatches);

  const myTeamsFilterOptions = useSelector(
    (state) => state.myTeamFilterOptions
  );

  const findId = (value) => {
    return Object.keys(myTeamsFilterOptions?.league).find(
      (key) => myTeamsFilterOptions?.league[key] === league
    );
  };

  useEffect(() => {
    getMatches();
  }, [league]);

  const getMatches = () => {
    setIsLoading(true);

    const leagueId = findId(league);
    const season = 2022;

    const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
    const baseUrl = `${FOOTBALL_API_URL}/fixtures?season=${season}&league=${leagueId}`;

    const optionForNextMatches = (next = 5) => {
      return {
        method: "GET",
        url: `${baseUrl}&next=${next}`,
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "v3.football.api-sports.io",
        },
      };
    };

    const getNextMatches = axios.request(optionForNextMatches("20"));

    axios.all([getNextMatches]).then(
      axios.spread((...matches) => {
        const nextMatches = matches[0].data.response;

        if (nextMatches && nextMatches.length) {
          setNextGames(nextMatches);
        }

        setIsLoading(false);
      })
    );
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  console.log("NEXT GAMES 2", nextGames[19]);

  return (
    <SafeAreaView>
      <View>
        <Text>PredictionsScreen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
