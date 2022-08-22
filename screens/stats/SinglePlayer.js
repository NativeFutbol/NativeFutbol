import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { FOOTBALL_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";

function DisplayPlayer(props) {
  const navigation = useNavigation();
  const [player, setPlayer] = useState({});
  const [statistics, setStatistics] = useState({
    cards: {
      red: 0,
      yellow: 0,
      yellowred: 0,
    },
    dribbles: {
      attempts: null,
      past: null,
      success: null,
    },
    duels: {
      total: null,
      won: null,
    },
    fouls: {
      committed: null,
      drawn: null,
    },
    games: {
      appearences: 2,
      captain: false,
      lineups: 2,
      minutes: 92,
      number: null,
      position: "Attacker",
      rating: null,
    },
    goals: {
      assists: null,
      conceded: null,
      saves: null,
      total: 3,
    },
    league: {
      country: null,
      flag: null,
      id: null,
      logo: null,
      name: "Club Friendlies",
      season: 2020,
    },
    passes: {
      accuracy: null,
      key: null,
      total: null,
    },
    penalty: {
      commited: null,
      missed: null,
      saved: null,
      scored: null,
      won: null,
    },
    shots: {
      on: null,
      total: null,
    },
    substitutes: {
      bench: 0,
      in: 0,
      out: 2,
    },
    tackles: {
      blocks: null,
      interceptions: null,
      total: null,
    },
    team: {
      id: 85,
      logo: "https://media.api-sports.io/football/teams/85.png",
      name: "Paris Saint Germain",
    },
  });

  useEffect(() => {
    console.log(
      "player    ",
      props.route.params.player,
      "stats     ",
      props.route.params.statistics[0]
    );
    setPlayer(props.route.params.player);
    setStatistics(props.route.params.statistics[0]);
  }, []);
  // const options = {
  //   method: "GET",
  //   url: "https://api-football-v1.p.rapidapi.com/v3/players",
  //   params: { id: "276", season: "2020" },
  //   headers: {
  //     "X-RapidAPI-Key": "b0c9cca14dmsh2175322c9f70626p1a13a8jsneeb5f96cbbf6",
  //     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data.response[0]);
  //       setPlayer(response.data.response[0].player);
  //       setStatistics(response.data.response[0].statistics[0]);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <View style={styles.background}>
      <View style={styles.playerInfo}>
        <View style={styles.playerImageBorder}>
          <Image
            style={styles.playerImage}
            source={{
              width: "100%",
              height: "100%",
              uri: player.photo,
            }}
          />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 24, paddingTop: 4 }}>
          {player.name}
        </Text>
        <View style={styles.infoBar}>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, width: 50 }}>
                {" "}
                Age:{" "}
              </Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {player.age}{" "}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, width: 80 }}>
                Weight:
              </Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {player.age}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, width: 50 }}>
                Height:
              </Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {player.age}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.statImage}
                source={{
                  width: "100%",
                  height: "100%",
                  uri: statistics.team.logo,
                }}
              />
              <View style={{ justifyContent: "center", width: 100 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {statistics.team.name}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  playerInfo: {
    marginTop: 20,
    width: "95%",
    height: "100%",
    alignItems: "center",
  },
  playerImageBorder: {
    width: "70%",
    height: "45%",
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  playerImage: {
    borderRadius: 10,
  },
  infoBar: {
    marginTop: 10,
    width: "100%",
    height: "10%",
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "white",
  },
  statImage: {
    height: 85,
    width: 85,
  },
});
export default DisplayPlayer;
