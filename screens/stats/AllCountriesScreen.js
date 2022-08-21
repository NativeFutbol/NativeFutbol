import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("countries");
  const [data, setData] = useState([]);

  const dummydata = [
    {
      name: "kevin",
      flag: "https://media.api-sports.io/football/leagues/801.png",
      id: 1,
    },
    {
      name: "connor",
      flag: "https://media.api-sports.io/football/players/1.png",
      id: 2,
    },
    {
      name: "alexis",
      flag: "https://media.api-sports.io/football/leagues/214.png",
      id: 3,
    },
    {
      name: "fei",
      flag: "https://media.api-sports.io/football/teams/165.png",
      id: 4,
    },
  ];

  useEffect(() => {
    getCountries();
  }, [query]);

  const getCountries = async () => {
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

    await axios
      .request(options)
      .then(function (response) {
        setData(response.data.response);
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
          placeholder="Search countries..."
          onSubmit={getCountries}
        />
        <Filters />
        <SeasonFilter season={season} setSeason={setSeason} />
      </View>
      <View>
        <CategoryList data={data} filter={filter} />
      </View>
    </SafeAreaView>
  );
}
