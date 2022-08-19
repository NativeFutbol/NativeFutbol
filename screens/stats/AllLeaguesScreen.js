import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";

export default function AllLeaguesScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");

  const dummydata = [
    {
      league: {
        name: "fei",
        logo: "https://media.api-sports.io/football/leagues/801.png",
        id: 1,
      },
    },
    {
      league: {
        name: "alexis",
        logo: "https://media.api-sports.io/football/players/1.png",
        id: 2,
      },
    },
    {
      league: {
        name: "connor",
        logo: "https://media.api-sports.io/football/leagues/214.png",
        id: 3,
      },
    },
    {
      league: {
        name: "kevin",
        logo: "https://media.api-sports.io/football/teams/165.png",
        id: 4,
      },
    },
  ];

  const getLeagues = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/${filter}?search=${query}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
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
      <CategoryList data={dummydata} filter={filter} />
    </SafeAreaView>
  );
}
