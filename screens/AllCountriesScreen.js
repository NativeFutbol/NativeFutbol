import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomSearchBar from "../components/CustomSearchBar";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("countries");

  const getCountries = () => {
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
    <View>
      <SafeAreaView>
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search countries..."
          onSubmit={getCountries}
        />
      </SafeAreaView>
    </View>
  );
}
