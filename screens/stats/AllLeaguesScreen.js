import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";

export default function AllLeaguesScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");

  const [leagueData, setLeagueData] = useState([]);

  useEffect(() => {
    getLeagues();
  }, []);

  const getLeagues = () => {
    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/${filter}`
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
        setLeagueData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
