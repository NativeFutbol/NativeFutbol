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
import BarChartComp from "../../components/BarChartComp";
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
      appearences: 0,
      captain: false,
      lineups: 0,
      minutes: 0,
      number: null,
      position: "",
      rating: null,
    },
    goals: {
      assists: null,
      conceded: null,
      saves: null,
      total: 0,
    },
    league: {
      country: null,
      flag: null,
      id: null,
      logo: null,
      name: "",
      season: "2020",
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
      out: 0,
    },
    tackles: {
      blocks: null,
      interceptions: null,
      total: null,
    },
    team: {
      id: 85,
      logo: "",
      name: "",
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
      appearences: 0,
      captain: false,
      lineups: 0,
      minutes: 0,
      number: null,
      position: "",
      rating: null,
    },
    goals: {
      assists: null,
      conceded: null,
      saves: null,
      total: 0,
    },
    league: {
      country: null,
      flag: null,
      id: null,
      logo: null,
      name: "",
      season: "2020",
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
      out: 0,
    },
    tackles: {
      blocks: null,
      interceptions: null,
      total: null,
    },
    team: {
      id: 85,
      logo: "",
      name: "",
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
      appearences: 0,
      captain: false,
      lineups: 0,
      minutes: 0,
      number: null,
      position: "",
      rating: null,
    },
    goals: {
      assists: null,
      conceded: null,
      saves: null,
      total: 0,
    },
    league: {
      country: null,
      flag: null,
      id: null,
      logo: null,
      name: "",
      season: "2020",
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
      out: 0,
    },
    tackles: {
      blocks: null,
      interceptions: null,
      total: null,
    },
    team: {
      id: 85,
      logo: "",
      name: "",
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
      appearences: 0,
      captain: false,
      lineups: 0,
      minutes: 0,
      number: null,
      position: "",
      rating: null,
    },
    goals: {
      assists: null,
      conceded: null,
      saves: null,
      total: 0,
    },
    league: {
      country: null,
      flag: null,
      id: null,
      logo: null,
      name: "",
      season: "2020",
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
      out: 0,
    },
    tackles: {
      blocks: null,
      interceptions: null,
      total: null,
    },
    team: {
      id: 85,
      logo: "",
      name: "",
    },
  });
  const options = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: {
      id: props.route.params.player?.id || props.route.params.id,
      season: "2022",
    },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2021 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: {
      id: props.route.params.player?.id || props.route.params.id,
      season: "2021",
    },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2020 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: {
      id: props.route.params.player?.id || props.route.params.id,
      season: "2020",
    },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  const options2019 = {
    method: "GET",
    url: `https://v3.football.api-sports.io/players`,
    params: {
      id: props.route.params.player?.id || props.route.params.id,
      season: "2019",
    },
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

  if (stats2022.games.position === "Attacker") {
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
                    uri: stats2022.league?.logo,
                  }}
                />
                <Text
                  style={{
                    width: 100,
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
                    width: 100,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  {stats2022.team.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", height: 50 }}>
            <View
              style={{
                height: "100%",
                width: 300,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 4 }}>
                {player.firstname} {player.lastname}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Position: {stats2022.games.position}
              </Text>
            </View>
          </View>
          <View style={styles.infoBar}>
            <ScrollView horizontal={true}>
              <View style={styles.infoBox}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
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
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Weight:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    {player.weight}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Height:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 14 }}>
                    {player.height}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>DOB:</Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player?.birth?.date}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Nationality:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player.nationality}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              height: "52%",
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 5,
            }}
          >
            <ScrollView>
              <View style={{ flex: 1, alignItems: "center" }}>
                <BarChartComp
                  title="Minutes"
                  labels={["2019", "2020", "2021", "2022"]}
                  data={[
                    stats2019.games.minutes,
                    stats2020.games.minutes,
                    stats2021.games.minutes,
                    stats2022.games.minutes,
                  ]}
                  color="#000099"
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rating</Text>
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Shots</Text>
                <Text>On: 🟢 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.shots?.total),
                          isNull(stats2020?.shots?.total),
                          isNull(stats2021?.shots?.total),
                          isNull(stats2022?.shots?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.shots?.on),
                          isNull(stats2020?.shots?.on),
                          isNull(stats2021?.shots?.on),
                          isNull(stats2022?.shots?.on),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Goals</Text>
                <Text>Assists: 🟠 Goals: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.goals?.total),
                          isNull(stats2020?.goals?.total),
                          isNull(stats2021?.goals?.total),
                          isNull(stats2022?.goals?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.goals?.assists),
                          isNull(stats2020?.goals?.assists),
                          isNull(stats2021?.goals?.assists),
                          isNull(stats2022?.goals?.assists),
                        ],
                        color: (opacity = 1) => `rgba(255, 128, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Passes</Text>
                <Text>Key: 🔴 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.passes?.total),
                          isNull(stats2020?.passes?.total),
                          isNull(stats2021?.passes?.total),
                          isNull(stats2022?.passes?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.passes?.key),
                          isNull(stats2020?.passes?.key),
                          isNull(stats2021?.passes?.key),
                          isNull(stats2022?.passes?.key),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Dribbles
                </Text>
                <Text>Attempts: ⚪ Successes: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.dribbles?.attempts),
                          isNull(stats2020?.dribbles?.attempts),
                          isNull(stats2021?.dribbles?.attempts),
                          isNull(stats2022?.dribbles?.attempts),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.dribbles?.success),
                          isNull(stats2020?.dribbles?.success),
                          isNull(stats2021?.dribbles?.success),
                          isNull(stats2022?.dribbles?.success),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Fouls</Text>
                <Text>Committed: 🔴 Drawn: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.fouls?.drawn),
                          isNull(stats2020?.fouls?.drawn),
                          isNull(stats2021?.fouls?.drawn),
                          isNull(stats2022?.fouls?.drawn),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
                      },
                      {
                        data: [
                          isNull(stats2019?.fouls?.committed),
                          isNull(stats2020?.fouls?.committed),
                          isNull(stats2021?.fouls?.committed),
                          isNull(stats2022?.fouls?.committed),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Red/Yellow Cards
                </Text>
                <StackedBarChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  segments={5}
                  data={{
                    labels: ["2019", "2020", "2021", "2022", "E.G."],
                    legend: ["Red", "Yellow"],
                    data: [
                      [stats2019.cards.red, stats2019.cards.yellow],
                      [stats2020.cards.red, stats2020.cards.yellow],
                      [stats2021.cards.red, stats2021.cards.yellow],
                      [stats2022.cards.red, stats2022.cards.yellow],
                      [5, 5],
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
  } else if (stats2022.games.position === "Defender") {
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
                    width: 100,
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
                    width: 100,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  {stats2022.team.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", height: 50 }}>
            <View
              style={{
                height: "100%",
                width: 300,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 4 }}>
                {player.firstname} {player.lastname}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Position: {stats2022.games.position}
              </Text>
            </View>
          </View>
          <View style={styles.infoBar}>
            <ScrollView horizontal={true}>
              <View style={styles.infoBox}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
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
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Weight:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    {player.weight}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Height:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 14 }}>
                    {player.height}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>DOB:</Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player?.birth?.date}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Nationality:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player.nationality}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              height: "52%",
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 5,
            }}
          >
            <ScrollView>
              <View style={{ flex: 1, alignItems: "center" }}>
                <BarChartComp
                  title="Minutes"
                  labels={["2019", "2020", "2021", "2022"]}
                  data={[
                    stats2019.games.minutes,
                    stats2020.games.minutes,
                    stats2021.games.minutes,
                    stats2022.games.minutes,
                  ]}
                  color="#000099"
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rating</Text>
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Passes</Text>
                <Text>Key: 🔴 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.passes?.total),
                          isNull(stats2020?.passes?.total),
                          isNull(stats2021?.passes?.total),
                          isNull(stats2022?.passes?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.passes?.key),
                          isNull(stats2020?.passes?.key),
                          isNull(stats2021?.passes?.key),
                          isNull(stats2022?.passes?.key),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Dribbles
                </Text>
                <Text>Attempts: ⚪ Successes: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.dribbles?.attempts),
                          isNull(stats2020?.dribbles?.attempts),
                          isNull(stats2021?.dribbles?.attempts),
                          isNull(stats2022?.dribbles?.attempts),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.dribbles?.success),
                          isNull(stats2020?.dribbles?.success),
                          isNull(stats2021?.dribbles?.success),
                          isNull(stats2022?.dribbles?.success),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Shots</Text>
                <Text>On: 🟢 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.shots?.total),
                          isNull(stats2020?.shots?.total),
                          isNull(stats2021?.shots?.total),
                          isNull(stats2022?.shots?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.shots?.on),
                          isNull(stats2020?.shots?.on),
                          isNull(stats2021?.shots?.on),
                          isNull(stats2022?.shots?.on),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Goals</Text>
                <Text>Assists: 🟠 Goals: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.goals?.total),
                          isNull(stats2020?.goals?.total),
                          isNull(stats2021?.goals?.total),
                          isNull(stats2022?.goals?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.goals?.assists),
                          isNull(stats2020?.goals?.assists),
                          isNull(stats2021?.goals?.assists),
                          isNull(stats2022?.goals?.assists),
                        ],
                        color: (opacity = 1) => `rgba(255, 128, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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

                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Fouls</Text>
                <Text>Committed: 🔴 Drawn: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.fouls?.drawn),
                          isNull(stats2020?.fouls?.drawn),
                          isNull(stats2021?.fouls?.drawn),
                          isNull(stats2022?.fouls?.drawn),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
                      },
                      {
                        data: [
                          isNull(stats2019?.fouls?.committed),
                          isNull(stats2020?.fouls?.committed),
                          isNull(stats2021?.fouls?.committed),
                          isNull(stats2022?.fouls?.committed),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Red/Yellow Cards
                </Text>
                <StackedBarChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  segments={5}
                  data={{
                    labels: ["2019", "2020", "2021", "2022", "E.G."],
                    legend: ["Red", "Yellow"],
                    data: [
                      [stats2019.cards.red, stats2019.cards.yellow],
                      [stats2020.cards.red, stats2020.cards.yellow],
                      [stats2021.cards.red, stats2021.cards.yellow],
                      [stats2022.cards.red, stats2022.cards.yellow],
                      [5, 5],
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
  } else if (stats2022.games.position === "Goalkeeper") {
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
                    width: 100,
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
                    width: 100,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  {stats2022.team.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", height: 50 }}>
            <View
              style={{
                height: "100%",
                width: 300,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 4 }}>
                {player.firstname} {player.lastname}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Position: {stats2022.games.position}
              </Text>
            </View>
          </View>
          <View style={styles.infoBar}>
            <ScrollView horizontal={true}>
              <View style={styles.infoBox}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
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
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Weight:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    {player.weight}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Height:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 14 }}>
                    {player.height}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>DOB:</Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player?.birth?.date}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Nationality:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player.nationality}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              height: "52%",
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 5,
            }}
          >
            <ScrollView>
              <View style={{ flex: 1, alignItems: "center" }}>
                <BarChartComp
                  title="Minutes"
                  labels={["2019", "2020", "2021", "2022"]}
                  data={[
                    stats2019.games.minutes,
                    stats2020.games.minutes,
                    stats2021.games.minutes,
                    stats2022.games.minutes,
                  ]}
                  color="#000099"
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rating</Text>
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Goals</Text>
                <Text>Saves: 🟢 Conceded: 🔴</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.goals?.saves),
                          isNull(stats2020?.goals?.saves),
                          isNull(stats2021?.goals?.saves),
                          isNull(stats2022?.goals?.saves),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
                      },
                      {
                        data: [
                          isNull(stats2019?.goals?.conceded),
                          isNull(stats2020?.goals?.conceded),
                          isNull(stats2021?.goals?.conceded),
                          isNull(stats2022?.goals?.conceded),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Passes</Text>
                <Text>Key: 🔴 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.passes?.total),
                          isNull(stats2020?.passes?.total),
                          isNull(stats2021?.passes?.total),
                          isNull(stats2022?.passes?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.passes?.key),
                          isNull(stats2020?.passes?.key),
                          isNull(stats2021?.passes?.key),
                          isNull(stats2022?.passes?.key),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Fouls</Text>
                <Text>Committed: 🔴 Drawn: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.fouls?.drawn),
                          isNull(stats2020?.fouls?.drawn),
                          isNull(stats2021?.fouls?.drawn),
                          isNull(stats2022?.fouls?.drawn),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
                      },
                      {
                        data: [
                          isNull(stats2019?.fouls?.committed),
                          isNull(stats2020?.fouls?.committed),
                          isNull(stats2021?.fouls?.committed),
                          isNull(stats2022?.fouls?.committed),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Red/Yellow Cards
                </Text>
                <StackedBarChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  segments={5}
                  data={{
                    labels: ["2019", "2020", "2021", "2022", "E.G."],
                    legend: ["Red", "Yellow"],
                    data: [
                      [stats2019.cards.red, stats2019.cards.yellow],
                      [stats2020.cards.red, stats2020.cards.yellow],
                      [stats2021.cards.red, stats2021.cards.yellow],
                      [stats2022.cards.red, stats2022.cards.yellow],
                      [5, 5],
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
  } else if (stats2022.games.position === "Midfielder") {
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
                    width: 100,
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
                    width: 100,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  {stats2022.team.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", height: 50 }}>
            <View
              style={{
                height: "100%",
                width: 300,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 4 }}>
                {player.firstname} {player.lastname}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Position: {stats2022.games.position}
              </Text>
            </View>
          </View>
          <View style={styles.infoBar}>
            <ScrollView horizontal={true}>
              <View style={styles.infoBox}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
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
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Weight:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    {player.weight}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Height:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 14 }}>
                    {player.height}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>DOB:</Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player?.birth?.date}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Nationality:
                </Text>
                <View style={{ width: 50, alignItems: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 13, width: 80 }}
                  >
                    {player.nationality}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              height: "52%",
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 5,
            }}
          >
            <ScrollView>
              <View style={{ flex: 1, alignItems: "center" }}>
                <BarChartComp
                  title="Minutes"
                  labels={["2019", "2020", "2021", "2022"]}
                  data={[
                    stats2019.games.minutes,
                    stats2020.games.minutes,
                    stats2021.games.minutes,
                    stats2022.games.minutes,
                  ]}
                  color="#000099"
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rating</Text>
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Passes</Text>
                <Text>Key: 🔴 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.passes?.total),
                          isNull(stats2020?.passes?.total),
                          isNull(stats2021?.passes?.total),
                          isNull(stats2022?.passes?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.passes?.key),
                          isNull(stats2020?.passes?.key),
                          isNull(stats2021?.passes?.key),
                          isNull(stats2022?.passes?.key),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Shots</Text>
                <Text>On: 🟢 Total: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.shots?.total),
                          isNull(stats2020?.shots?.total),
                          isNull(stats2021?.shots?.total),
                          isNull(stats2022?.shots?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.shots?.on),
                          isNull(stats2020?.shots?.on),
                          isNull(stats2021?.shots?.on),
                          isNull(stats2022?.shots?.on),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Goals</Text>
                <Text>Assists: 🟠 Goals: ⚪</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.goals?.total),
                          isNull(stats2020?.goals?.total),
                          isNull(stats2021?.goals?.total),
                          isNull(stats2022?.goals?.total),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.goals?.assists),
                          isNull(stats2020?.goals?.assists),
                          isNull(stats2021?.goals?.assists),
                          isNull(stats2022?.goals?.assists),
                        ],
                        color: (opacity = 1) => `rgba(255, 128, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Dribbles
                </Text>
                <Text>Attempts: ⚪ Successes: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.dribbles?.attempts),
                          isNull(stats2020?.dribbles?.attempts),
                          isNull(stats2021?.dribbles?.attempts),
                          isNull(stats2022?.dribbles?.attempts),
                        ],
                      },
                      {
                        data: [
                          isNull(stats2019?.dribbles?.success),
                          isNull(stats2020?.dribbles?.success),
                          isNull(stats2021?.dribbles?.success),
                          isNull(stats2022?.dribbles?.success),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Fouls</Text>
                <Text>Committed: 🔴 Drawn: 🟢</Text>
                <LineChart
                  data={{
                    labels: ["2019", "2020", "2021", "2022"],
                    datasets: [
                      {
                        data: [
                          isNull(stats2019?.fouls?.drawn),
                          isNull(stats2020?.fouls?.drawn),
                          isNull(stats2021?.fouls?.drawn),
                          isNull(stats2022?.fouls?.drawn),
                        ],
                        color: (opacity = 1) =>
                          `rgba(124, 179, 66, ${opacity})`,
                      },
                      {
                        data: [
                          isNull(stats2019?.fouls?.committed),
                          isNull(stats2020?.fouls?.committed),
                          isNull(stats2021?.fouls?.committed),
                          isNull(stats2022?.fouls?.committed),
                        ],
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
                  showValuesOnTopOfBars={true}
                  chartConfig={{
                    backgroundColor: "gray",
                    backgroundGradientFrom: "gray",
                    backgroundGradientTo: "lightgray",
                    useShadowColorFromDataset: true,
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
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Red/Yellow Cards
                </Text>
                <StackedBarChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  segments={5}
                  data={{
                    labels: ["2019", "2020", "2021", "2022", "E.G."],
                    legend: ["Red", "Yellow"],
                    data: [
                      [stats2019.cards.red, stats2019.cards.yellow],
                      [stats2020.cards.red, stats2020.cards.yellow],
                      [stats2021.cards.red, stats2021.cards.yellow],
                      [stats2022.cards.red, stats2022.cards.yellow],
                      [5, 5],
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
    width: "40%",
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
    height: "25%",
    flexDirection: "row",
  },
  playerImage: {
    borderRadius: 10,
  },
  playerLogos: {
    height: 80,
    width: 80,
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
    justifyContent: "center",
  },
});
export default DisplayPlayer;
//
