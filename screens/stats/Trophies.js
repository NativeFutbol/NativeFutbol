import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";
import { useSelector } from "react-redux";
import CoachButton from "../../components/CoachButton";

export default function Trophies() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [venueInfo, setVenueInfo] = useState("");
  const [trophiesInfo, setTrophiesInfo] = useState("");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const [coachId, setCoachId] = useState("");
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  useEffect(() => {
    getTrophiesInfo();
  }, [trophiesInfo]);

  const getTrophiesInfo = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/trophies?coach=19`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setVenueInfo(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("trophies----", trophiesInfo);

  return (
    <FlatList
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<View style={{ height: 500 }} />}
      data={trophiesInfo}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            League:{item.league}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Country:{item.country}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Season:{item.season}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Place:{item.place}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1100,
    width: 380,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
});
