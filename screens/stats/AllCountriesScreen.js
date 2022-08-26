import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";
import WorldMap from "../../components/WorldMap";
import { ScrollView } from "react-native-gesture-handler";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("countries");
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapView, setMapView] = useState(true);
  const season = useSelector((state) => state.season);

  const topFiveLeaguesCountries = [
    "France",
    "Italy",
    "Germany",
    "Spain",
    "England",
  ];

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    setIsLoading(true);

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
        const countries = response.data.response.filter((country) =>
          topFiveLeaguesCountries.includes(country.name)
        );

        setCountriesData(countries);
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
        <SeasonFilterV2 />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setMapView(true)}>
          <View
            style={[
              styles.buttonContainer,
              {
                marginRight: 50,
                backgroundColor: mapView ? "orangered" : "grey",
              },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Map</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMapView(false)}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: mapView ? "grey" : "orangered" },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>List</Text>
          </View>
        </TouchableOpacity>
      </View>

      {mapView ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "60%" }}
        >
          <ScrollView
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
          >
            <WorldMap data={countriesData} />
          </ScrollView>
        </ScrollView>
      ) : (
        <CategoryList data={countriesData} filter={filter} />
      )}
    </SafeAreaView>
  );
}
// comment

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    padding: 6,
    marginBottom: 5,
    width: 70,
    alignItems: "center",
  },
});
