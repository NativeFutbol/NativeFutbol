import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";

export default function MatchPredictionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState({});

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

    axios.request(options).then(function (response) {
      setMatchInfo(response.data.response[0]);
    });
  };

  //   console.log(matchInfo);

  return (
    <SafeAreaView>
      <Text>MatchPredictionScreen</Text>
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
          ListFooterComponent={<View style={{ height: 150 }} />}
          data={matchInfo.h2h}
          renderItem={({ item, index }) => (
            <View style={styles.container} key={index}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                  {new Date(item.fixture.date).toDateString()}
                </Text>
                <Text>{item.league.round}</Text>
                <Text>{item.fixture.venue.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Home</Text>
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
                {item.goals.home === 0 || item.goals.home ? (
                  <Text>
                    {item.goals.home} : {item.goals.away}
                  </Text>
                ) : (
                  <Text>vs</Text>
                )}
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
    </SafeAreaView>
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
});
