import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import News from "../components/News";
import Games from "../components/Games";
import {
  apiFootballDummyLastMatches,
  apiFootballDummyNextMatches,
} from "../constants/apiFootballDummyData";
import { ScrollView } from "react-native-gesture-handler";
import {
  apiNewsDummyData,
  apiNewsDummyDataV2,
} from "../constants/apiNewsDummyData";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import { FOOTBALL_API_KEY } from "@env";
import { useSelector } from "react-redux";
import { NEWS_API_KEY } from "@env";

export default function HomeScreen() {
  const [league, setLeague] = useState("Premier League");
  const [isLoading, setIsLoading] = useState(false);
  const [nextGames, setNextGames] = useState(apiFootballDummyNextMatches);
  const [lastGames, setLastGames] = useState(apiFootballDummyLastMatches);

  const [articles1, setArticles1] = useState(apiNewsDummyData);
  const [articles2, setArticles2] = useState(apiNewsDummyDataV2);

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

    const optionForLastMatches = (last = 5) => {
      return {
        method: "GET",
        url: `${baseUrl}&last=${last}`,
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "v3.football.api-sports.io",
        },
      };
    };

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

    const getLastMatches = axios.request(optionForLastMatches("20"));
    const getNextMatches = axios.request(optionForNextMatches("20"));

    axios.all([getLastMatches, getNextMatches]).then(
      axios.spread((...matches) => {
        const lastMatches = matches[0].data.response;
        const nextMatches = matches[1].data.response;

        if (
          lastMatches &&
          nextMatches &&
          lastMatches.length &&
          nextMatches.length
        ) {
          setLastGames(lastMatches);
          setNextGames(nextMatches);
        }

        setIsLoading(false);
      })
    );
  };

  useEffect(() => {
    getArticles1();
  }, []);

  const getArticles1 = async () => {
    const query = "";
    const cateogry = "sports";
    const pageSize = 40;
    const page = 1;
    const country = "gb";

    const url = query
      ? `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&page=${page}&country=${country}&q=${query}&apiKey=${NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&page=${page}&country=${country}&apiKey=${NEWS_API_KEY}`;

    try {
      setIsLoading(true);
      const res = await axios.get(url);
      if (res && res?.data && res?.data?.articles.length) {
        setArticles1(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles2();
  }, []);

  const getArticles2 = async () => {
    const query = "";
    const cateogry = "sports";
    const pageSize = 40;
    const page = 2;
    const country = "gb";

    const url = query
      ? `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&page=${page}&country=${country}&q=${query}&apiKey=${NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&page=${page}&country=${country}&apiKey=${NEWS_API_KEY}`;

    try {
      setIsLoading(true);
      const res = await axios.get(url);
      if (res && res?.data && res?.data?.articles.length) {
        setArticles2(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  console.log("NEXT GAMES", nextGames);
  return (
    <View>
      <ScrollView>
        <Games
          matchesData={nextGames}
          label={"<Upcoming Matches>"}
          setLeague={setLeague}
        />
        <Games
          matchesData={lastGames}
          label={"<Recent FT Matches>"}
          setLeague={setLeague}
        />
        <News newsData={articles1} />
        <News newsData={articles2} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
