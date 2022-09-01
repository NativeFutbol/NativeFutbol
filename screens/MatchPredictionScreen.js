import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import PastMatches from "../components/PastMatches";

export default function MatchPredictionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState({});
  const [winnerId, setWinnerId] = useState("");
  const [winnerInfo, setWinnerInfo] = useState({});
  const [isRadar, setIsRadar] = useState(true);

  const match = useSelector((state) => state.singleScreenData.match);
  const fixtureId = match?.fixture?.id;

  useEffect(() => {
    getPrediction();
  }, []);

  const getPrediction = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMatchInfo(response.data.response[0]);
        setWinnerId(response.data.response[0].predictions?.winner?.id);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getWinner();
  }, [winnerId]);

  const getWinner = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams?id=${winnerId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setWinnerInfo(response.data.response[0]);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("matchinfo", matchInfo.predictions);
  console.log("winnerinfo", winnerInfo);

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          padding: 10,
        }}
      >
        Predicted Outcome
      </Text>
      <Image
        style={styles.winnerLogo}
        source={{
          uri: winnerInfo?.team?.logo,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {winnerInfo?.team?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text>Home Wins: {matchInfo?.predictions?.percent?.home}</Text>
        <Text>Draw: {matchInfo?.predictions?.percent?.draw}</Text>
        <Text>Away Wins: {matchInfo?.predictions?.percent?.away}</Text>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Team Ratings
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setIsRadar(true)}>
          <View
            style={[
              styles.buttonContainer,
              {
                marginRight: 50,
                backgroundColor: isRadar ? "orangered" : "grey",
              },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Radar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRadar(false)}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isRadar ? "grey" : "orangered" },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Bar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Past Matches
        </Text>
        <PastMatches data={matchInfo.h2h} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  winnerLogo: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
  buttonContainer: {
    borderRadius: 20,
    padding: 6,
    marginTop: 10,
    width: 70,
    alignItems: "center",
  },
});
