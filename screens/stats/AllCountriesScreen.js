import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";
import WorldMap from "../../components/WorldMap";

export default function AllCountriesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("countries");
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapView, setMapView] = useState(true);
  const season = useSelector((state) => state.season);
  const singleScreenData = useSelector((state) => state.singleScreenData);

  const horiScrollRef = useRef();
  const vertiScrollRef = useRef();

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
        {mapView ? (
          <></>
        ) : (
          <CustomSearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search countries..."
            onSubmit={getCountries}
          />
        )}

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
        <View>
          <View>
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              Selected country will appear below. Press to be redirected!
            </Text>
            <CategoryList
              footer={false}
              data={[singleScreenData.country]}
              filter={filter}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} ref={vertiScrollRef}>
            <ScrollView
              horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              ref={horiScrollRef}
            >
              <WorldMap
                data={countriesData}
                filter={filter}
                vertiScrollRef={vertiScrollRef}
                horiScrollRef={horiScrollRef}
              />
            </ScrollView>
          </ScrollView>
        </View>
      ) : (
        <CategoryList data={countriesData} filter={filter} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    padding: 2,
    marginBottom: 3,
    width: 70,
    alignItems: "center",
  },
});
