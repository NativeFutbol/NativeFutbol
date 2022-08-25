import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";
import SeasonFilterV2 from "../../components/SeasonFilterV2";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  // const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");
  const [leagueData, setLeagueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const singleCountryData = useSelector((state) => state.singleScreenData);
  const season = useSelector((state) => state.season);

  const topFiveLeagues = [61, 135, 78, 140, 39];

  useEffect(() => {
    getLeagues();
  }, [season]);

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
        const leagues = response.data.response.filter(
          (league) =>
            topFiveLeagues.includes(league.league.id) &&
            singleCountryData.country.name === league.country.name
        );

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
    <SafeAreaView>
      <View>
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search countries..."
          onSubmit={getLeagues}
        />
        <Filters />
        {/* <SeasonFilter season={season} setSeason={setSeason} /> */}
        <SeasonFilterV2 />
      </View>

      <View style={styles.imageContainer}>
        {singleCountryData.country.flag === "" ? (
          <></>
        ) : (
          <SvgUri width={50} height={50} uri={singleCountryData.country.flag} />
        )}
        <Text style={{ fontWeight: "bold" }}>
          {singleCountryData.country.name}
        </Text>
      </View>

      <CategoryList data={leagueData} filter={filter} />
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
