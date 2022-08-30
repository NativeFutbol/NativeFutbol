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
  Dimensions,
} from "react-native";
import { FOOTBALL_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

function DisplayPlayer(props) {
  const navigation = useNavigation();
  const [player, setPlayer] = useState({});
  const [stats2022, setStats2022] = useState({
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
  const [stats2021, setStats2021] = useState({
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
  const [stats2020, setStats2020] = useState({
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
  const [stats2019, setStats2019] = useState({
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
  const options = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: { id: props.route.params.player.id, season: "2022" },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2021 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: { id: props.route.params.player.id, season: "2021" },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2020 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: { id: props.route.params.player.id, season: "2020" },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2019 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: { id: props.route.params.player.id, season: "2019" },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  // May have to switch to an api call
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(
          "player    ",
          response.data.response[0].player,
          "stats     ",
          response.data.response[0].statistics
        );
        setPlayer(response.data.response[0].player);
        setStats2022(response.data.response[0].statistics[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    getStats();
  }, []);

  function getStats() {
    axios
      .request(options2021)
      .then(function (response) {
        console.log("2021", response.data.response[0].statistics[0]);
        setStats2021(response.data.response[0].statistics[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(options2020)
      .then(function (response) {
        console.log("2020", response.data.response[0].statistics[0]);
        setStats2020(response.data.response[0].statistics[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(options2019)
      .then(function (response) {
        setStats2019(response.data.response[0].statistics[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function isNull(val) {
    if (val === null) {
      return 0;
    } else {
      return val;
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.playerInfo}>
        <View style={styles.playerImages}>
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
          <View style={{ flex: 1 }}>
            <View style={styles.border}>
              <Image
                style={styles.playerLogos}
                source={{
                  width: "100%",
                  height: "100%",
                  uri: stats2022.league.logo,
                }}
              />
              <Text
                style={{
                  width: 80,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                {stats2022.league.name}
              </Text>
            </View>
            <View style={styles.border}>
              <Image
                style={styles.playerLogos}
                source={{
                  width: "100%",
                  height: "100%",
                  uri: stats2022.team.logo,
                }}
              />
              <Text
                style={{
                  width: 80,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                {stats2022.team.name}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 24, paddingTop: 4 }}>
          {player.name}
        </Text>
        <View style={styles.infoBar}>
          <ScrollView horizontal={true}>
            <View style={styles.infoBox}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {" "}
                Age:
              </Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {player.age}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Weight:</Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  {player.weight}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Height:</Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 14 }}>
                  {player.height}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>DOB:</Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 13 }}>
                  {player?.birth?.date}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Nationality:
              </Text>
              <View style={{ width: 50, alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 13 }}>
                  {player.nationality}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            height: "43%",
            width: "100%",
            borderRadius: 10,
            backgroundColor: "white",
            marginTop: 5,
          }}
        >
          <ScrollView>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Red Cards
              </Text>
              <BarChart
                data={{
                  labels: ["2019", "2020", "2021", "2022"],
                  datasets: [
                    {
                      data: [
                        // Math.floor(Math.random() * 10),
                        // Math.floor(Math.random() * 10),
                        // Math.floor(Math.random() * 10),
                        // 10,
                        stats2019?.cards?.red,
                        stats2020?.cards?.red,
                        stats2021?.cards?.red,
                        stats2022?.cards?.red,
                      ],
                    },
                  ],
                }}
                width={370} // from react-native
                height={180}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                segments={5}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  backgroundColor: "gray",
                  backgroundGradientFrom: "gray",
                  backgroundGradientTo: "lightgray",

                  fillShadowGradientTo: "red",
                  fillShadowGradientOpacity: 1,
                  color: (opacity = 1) => `red`,
                  labelColor: (opacity = 1) => `#333`,
                  strokeWidth: 2,

                  barPercentage: 0.5,
                  useShadowColorFromDataset: false,
                  decimalPlaces: 0,
                  propsForBackgroundLines: {
                    stroke: "black",
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Yellow Cards
              </Text>
              <BarChart
                data={{
                  labels: ["2019", "2020", "2021", "2022"],
                  datasets: [
                    {
                      data: [
                        // Math.floor(Math.random() * 10),
                        // 10,
                        // Math.floor(Math.random() * 10),
                        // Math.floor(Math.random() * 10),
                        stats2019?.cards?.yellow,
                        stats2020?.cards?.yellow,
                        stats2021?.cards?.yellow,
                        stats2022?.cards?.yellow,
                      ],
                    },
                  ],
                }}
                width={370} // from react-native
                height={180}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                segments={5}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  backgroundColor: "gray",
                  backgroundGradientFrom: "gray",
                  backgroundGradientTo: "lightgray",

                  fillShadowGradientTo: "yellow",
                  fillShadowGradientOpacity: 1,
                  color: (opacity = 1) => `yellow`,
                  labelColor: (opacity = 1) => `#333`,
                  strokeWidth: 2,

                  barPercentage: 0.5,
                  useShadowColorFromDataset: false,
                  decimalPlaces: 0,
                  propsForBackgroundLines: {
                    stroke: "black",
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              <Text>Rating</Text>
              <LineChart
                data={{
                  labels: ["2019", "2020", "2021", "2022"],
                  datasets: [
                    {
                      data: [
                        isNull(stats2019?.games?.rating),
                        isNull(stats2020?.games?.rating),
                        isNull(stats2021?.games?.rating),
                        isNull(stats2022?.games?.rating),
                      ],
                    },
                  ],
                }}
                width={370}
                height={180}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                segments={5}
                chartConfig={{
                  backgroundColor: "gray",
                  backgroundGradientFrom: "gray",
                  backgroundGradientTo: "lightgray",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `#333`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#A9A9A9",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              <StackedBarChart
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                segments={5}
                data={{
                  labels: ["2019", "2020", "2021", "2022"],
                  legend: ["Red", "Yellow"],
                  data: [
                    [1, 4],
                    [2, 8],
                    [3, 1],
                    [7, 2],
                  ],
                  barColors: ["red", "yellow"],
                }}
                width={370}
                height={180}
                chartConfig={{
                  backgroundColor: "gray",
                  backgroundGradientFrom: "gray",
                  backgroundGradientTo: "lightgray",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `#333`,
                  strokeWidth: 2,
                  decimalPlaces: 0,
                }}
              />
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
    width: "50%",
    height: "100%",
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  playerImages: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
  },
  playerImage: {
    borderRadius: 10,
  },
  playerLogos: {
    height: 100,
    width: 100,
  },
  infoBar: {
    marginTop: 10,
    width: "100%",
    height: "10%",
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "baseline",
  },
  infoBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    marginHorizontal: 5,
  },
  border: {
    flex: 1,
    flexDirection: "row",
  },
});
export default DisplayPlayer;
//
