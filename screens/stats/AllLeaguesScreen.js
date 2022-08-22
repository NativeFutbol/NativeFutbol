import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AllLeaguesScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");

  const [leagueData, setLeagueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const topFiveLeagues = [61, 135, 78, 140, 39];

  useEffect(() => {
    getLeagues();
  }, []);

  const getLeagues = () => {
    setIsLoading(true);

    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/${filter}?season=${season}`
        : `https://v3.football.api-sports.io/${filter}?search=${query}`;

    const options = {
      method: "GET",
      url: searchUrl,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const leagues = response.data.response.filter((league) => {
          return topFiveLeagues.includes(league.league.id);
        });

        setLeagueData(leagues);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <View
        style={{
          zIndex: 5000,
        }}
      >
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search leagues..."
          onSubmit={getLeagues}
        />
        <Filters />
        <SeasonFilter season={season} setSeason={setSeason} />
      </View>
      <CategoryList data={leagueData} filter={filter} />
    </View>
  );
}
