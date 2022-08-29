import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryLegend,
} from "victory-native";
import LoadingOverlay from "../../components/LoadingOverlay";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import Logo from "../../components/Logo";
import Legend from "../../components/Legend";

const dummyData = [
  {
    id: 33,
    logo: "https://media.api-sports.io/football/teams/33.png",
    name: "Manchester United",
    points: 6,
    rank: 8,
    season: "2022",
    x: "2022",
    y: 8,
  },
  {
    id: 33,
    logo: "https://media.api-sports.io/football/teams/33.png",
    name: "Manchester United",
    points: 58,
    rank: 6,
    season: "2021",
    x: "2021",
    y: 6,
  },
  {
    id: 33,
    logo: "https://media.api-sports.io/football/teams/33.png",
    name: "Manchester United",
    points: 74,
    rank: 2,
    season: "2020",
    x: "2020",
    y: 2,
  },
  {
    id: 33,
    logo: "https://media.api-sports.io/football/teams/33.png",
    name: "Manchester United",
    points: 66,
    rank: 3,
    season: "2019",
    x: "2019",
    y: 3,
  },
];

const legendDummyData = [
  {
    id: 33,
    logo: "https://media.api-sports.io/football/teams/33.png",
    name: "Manchester United",
    points: 66,
    rank: 3,
    season: "2019",
    x: "2019",
    y: 3,
  },
];

export default function LeagueCharts({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [standings, setStandings] = useState([]);

  const leagueId = route.params?.id;

  //   useEffect(() => {
  //     getHistoricalStandings();
  //   }, []);

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
          const manULeagueStandings = standingsByYear.filter(
            (team) => +team.id === +33
          );
          setStandings(manULeagueStandings);
          setIsLoading(false);
        })
      );
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  //   console.log(standings);

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={0}
        // padding={{ top: 5, bottom: 5 }}
        // range={{ x: [2019, 2022], y: [1, 20] }}
      >
        <VictoryScatter
          size={5}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={dummyData}
          //   labelComponent={<VictoryLabel dy={-4} />}
          dataComponent={<Logo />}
          categories={{ x: ["2019", "2020", "2021", "2022"] }}
        />
      </VictoryChart>
      <VictoryLegend
        x={30}
        y={20}
        title="Legend"
        centerTitle
        orientation="horizontal"
        gutter={30}
        style={{
          border: { stroke: "black" },
          title: { fontSize: 15 },
          labels: { fontSize: 12 },
          data: { size: 15 },
        }}
        dataComponent={<Legend />}
        data={legendDummyData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f5fcff",
  //   },
});
