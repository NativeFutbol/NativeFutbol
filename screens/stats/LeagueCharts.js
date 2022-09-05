import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
} from "victory-native";
import LoadingOverlay from "../../components/LoadingOverlay";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import Logo from "../../components/Logo";
import Legend from "../../components/Legend";
import { MaterialIcons } from "@expo/vector-icons";

export default function LeagueCharts({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [standings, setStandings] = useState([]);
  const [points, setPoints] = useState([]);
  const [legends, setLegends] = useState([]);
  const [selected, setSelected] = useState("Top 6");
  const [isClosed, setIsClosed] = useState(false);

  const leagueId = route.params?.id;

  const getSixTeams = (year2) => {
    if (selected === "Top 6") {
      return year2
        .filter((team) => +team.rank <= 6)
        .map((team) => team.team.id);
    } else if (selected === "Next 6") {
      return year2
        .filter((team) => +team.rank > 6 && +team.rank <= 12)
        .map((team) => team.team.id);
    }

    return null;
  };

  useEffect(() => {
    getHistoricalStandings();
  }, [selected]);

  const getHistoricalStandings = () => {
    setIsLoading(true);

    const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
    const url = `${FOOTBALL_API_URL}/standings?league=${leagueId}`;

    const option = (season = 2022) => {
      return {
        method: "GET",
        url: `${url}&season=${season}`,
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "v3.football.api-sports.io",
        },
      };
    };

    const getStandingsYear1 = axios.request(option(2022));
    const getStandingsYear2 = axios.request(option(2021));
    const getStandingsYear3 = axios.request(option(2020));
    const getStandingsYear4 = axios.request(option(2019));

    axios
      .all([
        getStandingsYear1,
        getStandingsYear2,
        getStandingsYear3,
        getStandingsYear4,
      ])
      .then(
        axios.spread((...playerPages) => {
          const Year1 = playerPages[0].data.response[0].league.standings[0];
          const Year2 = playerPages[1].data.response[0].league.standings[0];
          const Year3 = playerPages[2].data.response[0].league.standings[0];
          const Year4 = playerPages[3].data.response[0].league.standings[0];

          const standingsByYear = [
            ...Year1.map((team) => {
              return {
                ...team.team,
                points: team.points,
                season: "2022",
                rank: team.rank,
                x: "2022",
                y: team.rank,
              };
            }),
            ...Year2.map((team) => {
              return {
                ...team.team,
                points: team.points,
                season: "2021",
                rank: team.rank,
                x: "2021",
                y: team.rank,
              };
            }),
            ...Year3.map((team) => {
              return {
                ...team.team,
                points: team.points,
                season: "2020",
                rank: team.rank,
                x: "2020",
                y: team.rank,
              };
            }),
            ...Year4.map((team) => {
              return {
                ...team.team,
                points: team.points,
                season: "2019",
                rank: team.rank,
                x: "2019",
                y: team.rank,
              };
            }),
          ];

          const Year2SixTeams = getSixTeams(Year2);

          const filteredStandingsByYear = standingsByYear.filter((team) =>
            Year2SixTeams.includes(team.id)
          );

          const filteredPointsByYear = filteredStandingsByYear.map((team) => {
            return {
              ...team,
              y: team.points,
            };
          });

          const uniqueTeamIds = new Set();

          const standingsByYearLegends = filteredStandingsByYear.filter(
            (team) => {
              const isDuplicate = uniqueTeamIds.has(team.id);

              uniqueTeamIds.add(team.id);

              if (!isDuplicate) {
                return true;
              }

              return false;
            }
          );

          setLegends(standingsByYearLegends);
          setStandings(filteredStandingsByYear);
          setPoints(filteredPointsByYear);

          setIsLoading(false);
        })
      );
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 8,
                backgroundColor: selected === "Top 6" ? "orangered" : "grey",
                marginRight: 30,
                width: "28%",
              }}
              onPress={() => setSelected("Top 6")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Top 6
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 8,
                backgroundColor: selected === "Next 6" ? "orangered" : "grey",
                width: "28%",
              }}
              onPress={() => setSelected("Next 6")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Next 6
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Teams as of 2021
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={0}
            height={450}
          >
            <VictoryScatter
              size={10}
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={standings}
              dataComponent={<Logo />}
              categories={{ x: ["2019", "2020", "2021", "2022"] }}
            />
            <VictoryAxis
              label="Year"
              style={{
                axisLabel: {
                  fontSize: 13,
                  padding: 35,
                  fontWeight: "bold",
                  color: "black",
                },
                grid: { stroke: "#ddd444", strokeWidth: 0.3 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Rank"
              style={{
                axisLabel: { fontSize: 13, padding: 35, fontWeight: "bold" },
                grid: { stroke: "#ddd444", strokeWidth: 0.3 },
              }}
            />
          </VictoryChart>
        </View>

        <View style={styles.container}>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={0}
            height={700}
          >
            <VictoryScatter
              size={10}
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={points}
              dataComponent={<Logo />}
              categories={{ x: ["2019", "2020", "2021", "2022"] }}
            />
            <VictoryAxis
              label="Year"
              style={{
                axisLabel: {
                  fontSize: 13,
                  padding: 35,
                  fontWeight: "bold",
                  color: "black",
                },
                grid: { stroke: "#ddd444", strokeWidth: 0.3 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Points"
              style={{
                axisLabel: { fontSize: 13, padding: 35, fontWeight: "bold" },
                grid: { stroke: "#ddd444", strokeWidth: 0.3 },
              }}
            />
          </VictoryChart>
        </View>
      </ScrollView>

      {!isClosed ? (
        <View style={styles.bottomView}>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            <TouchableOpacity
              style={{ paddingRight: 5, paddingTop: 3 }}
              onPress={() => setIsClosed(true)}
            >
              <MaterialIcons
                name="cancel-presentation"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <VictoryLegend
            title="Teams"
            centerTitle
            orientation="vertical"
            gutter={30}
            style={{
              title: { fontSize: 12, fontWeight: "bold" },
              labels: { fontSize: 10, fontWeight: "bold" },
              data: { size: 12 },
            }}
            borderPadding={{ left: 10, right: 10, bottom: 40 }}
            dataComponent={<Legend />}
            data={legends}
          />
        </View>
      ) : (
        <View style={styles.bottomViewTwo}>
          <TouchableOpacity
            onPress={() => setIsClosed(false)}
            style={{
              backgroundColor: "orangered",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              View Legend
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 10,
    width: "100%",
    marginTop: 0,
    paddingTop: 0,
  },
  bottomView: {
    width: "40%",
    height: 210,
    position: "absolute",
    marginLeft: 5,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    marginBottom: 5,
  },
  bottomViewTwo: {
    width: "35%",
    position: "absolute",
    marginLeft: 5,
    bottom: 0,
    left: 15,
  },
});
