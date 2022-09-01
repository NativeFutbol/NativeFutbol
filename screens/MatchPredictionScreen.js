import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";

export default function MatchPredictionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState({});
  const [winnerId, setWinnerId] = useState("");
  const [winnerInfo, setWinnerInfo] = useState({});

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
          padding: 10,
        }}
      >
        Team Ratings
      </Text>
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
        <FlatList
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 125 }} />}
          data={matchInfo.h2h}
          renderItem={({ item, index }) => (
            <View style={styles.container} key={index}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                  {new Date(item.fixture.date).toDateString()}
                </Text>
                <Text>{item.league.round}</Text>
                <Text style={{ marginBottom: 10 }}>
                  {item.fixture.venue.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Home</Text>
                {item.goals.home === 0 || item.goals.home ? (
                  <Text>
                    {item.goals.home} : {item.goals.away}
                  </Text>
                ) : (
                  <Text>vs</Text>
                )}
                <Text style={{ fontWeight: "bold" }}>Away</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {item.teams.home.logo ? (
                    <Image
                      source={{ uri: item.teams.home.logo }}
                      style={styles.image}
                    />
                  ) : (
                    <></>
                  )}
                  <Text>{item.teams.home.name}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  {item.goals.home === 0 || item.teams.away.logo ? (
                    <Image
                      source={{ uri: item.teams.away.logo }}
                      style={styles.image}
                    />
                  ) : (
                    <></>
                  )}
                  <Text>{item.teams.away.name}</Text>
                </View>
              </View>
            </View>
          )}
        />
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
});
