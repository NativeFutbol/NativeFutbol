import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";
import { useSelector } from "react-redux";
import CoachButton from "../../components/CoachButton";

export default function VenueScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [venueInfo, setVenueInfo] = useState({});
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  useEffect(() => {
    getVenueInfo();
  }, []);

  const getVenueInfo = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams?id=${singleTeamData.id}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setVenueInfo(response.data.response[0].venue);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(venueInfo);
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: venueInfo?.image,
          }}
        />

        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Name:{venueInfo?.name}
        </Text>

        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          City:{venueInfo?.city}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Address:{venueInfo?.address}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Surface:{venueInfo?.surface}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Capacity:{venueInfo?.capacity}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: 550,
    width: 400,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",

    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    height: 440,
    width: 400,
  },
});
//
