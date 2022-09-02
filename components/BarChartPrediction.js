import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryLegend,
  VictoryBar,
} from "victory-native";

export default function BarChartPrediction({ data, homeTeam, awayTeam }) {
  console.log(data);
  const homeData = [
    { x: "Head-to-head Goals", y: -Number(data?.goals?.home.slice(0, 2)) },
    { x: "Head-to-head Strength", y: -Number(data?.h2h?.home.slice(0, 2)) },
    { x: "Defensive Power", y: -Number(data?.def?.home.slice(0, 2)) },
    { x: "Offensive Power", y: -Number(data?.att?.home.slice(0, 2)) },
    { x: "Overall Strength", y: -Number(data?.total?.home.slice(0, 4)) },
  ];

  const awayData = [
    { x: "Head-to-head Goals", y: Number(data?.goals?.away.slice(0, 2)) },
    { x: "Head-to-head Strength", y: Number(data?.h2h?.away.slice(0, 2)) },
    { x: "Defensive Power", y: Number(data?.def?.away.slice(0, 2)) },
    { x: "Offensive Power", y: Number(data?.att?.away.slice(0, 2)) },
    { x: "Overall Strength", y: Number(data?.total?.away.slice(0, 4)) },
  ];

  return (
    <View style={{ alignContent: "center" }}>
      <VictoryChart
        padding={60}
        height={400}
        horizontal
        responsive={false}
        animate={{
          duration: 500,
          onLoad: { duration: 200 },
        }}
        domainPadding={{ x: 0 }}
        theme={VictoryTheme.material}
      >
        <VictoryLegend
          x={140}
          centerTitle
          orientation="horizontal"
          gutter={20}
          data={[
            { name: homeTeam, symbol: { fill: "green", type: "square" } },
            { name: awayTeam, symbol: { fill: "red", type: "square" } },
          ]}
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel dy={-30} dx={60} />}
          style={{
            axis: { stroke: "transparent" },
          }}
        />
        <VictoryBar
          barRatio={1}
          style={{ data: { fill: "green" } }}
          alignment="middle"
          labels={({ datum }) => `${Math.abs(datum.y)}%`}
          data={homeData}
        />
        <VictoryBar
          barRatio={1}
          style={{ data: { fill: "red" } }}
          alignment="middle"
          labels={({ datum }) => `${datum.y}%`}
          data={awayData}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({});
