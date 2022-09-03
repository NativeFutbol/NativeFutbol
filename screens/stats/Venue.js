import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export default function VenueScreen() {
  const [venueInfo, setVenueInfo] = useState({});
  const [venueSurface, setVenueSurface] = useState("");
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
        setVenueSurface(
          response.data.response[0].venue?.surface[0].toUpperCase() +
            response.data.response[0].venue?.surface.slice(1)
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: venueInfo?.image,
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              marigin: 10,
            }}
          >
            Name:{" "}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marigin: 10,
            }}
          >
            {venueInfo?.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            City:{" "}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marigin: 10,
            }}
          >
            {venueInfo?.city}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Address:{" "}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marigin: 10,
            }}
          >
            {venueInfo?.address}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Surface:{" "}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marigin: 10,
            }}
          >
            {/* {venueInfo?.surface} */}
            {venueSurface}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Capacity:{" "}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marigin: 10,
            }}
          >
            {venueInfo?.capacity}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: 500,
    width: 400,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    height: 350,
    width: 350,
  },
});
