import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("countries");
  const [countries, setCountries] = useState([
    "England",
    "France",
    "Germany",
    "Italy",
    "Spain",
  ]);

  const getCountries = () => {
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
        console.log(
          response.data.response.filter((country) =>
            countries.includes(country.name)
          )
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(country);

  return (
    <SafeAreaView>
      <View>
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search countries..."
          onSubmit={getCountries}
        />
        <Filters />
        <SeasonFilter season={season} setSeason={setSeason} />
      </View>
      {/* <View style={styles.imageContainer}>
        {league.logo === "" ? (
          <></>
        ) : (
          <Image source={{ uri: league.logo, width: 100, height: 100 }} />
        )}
        <Text>{league.name}</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});
