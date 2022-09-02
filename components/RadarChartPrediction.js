import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryLegend,
} from "victory-native";

export default function RadarChartPrediction({
  predictionData,
  homeTeam,
  awayTeam,
}) {
  const [data, setData] = useState([]);
  const [maxima, setMaxima] = useState([]);

  useEffect(() => {
    const radarData = [
      {
        "Overall Strength": Number(predictionData?.total?.home?.slice(0, 4)),
        "Offensive Power": Number(predictionData?.att?.home?.slice(0, 2)),
        "Defensive Power": Number(predictionData?.def?.home?.slice(0, 2)),
        "Head-to-head Strength": Number(predictionData?.h2h?.home?.slice(0, 2)),
        "Head-to-head Goals": Number(predictionData?.goals?.home?.slice(0, 2)),
      },
      {
        "Overall Strength": Number(predictionData?.total?.away?.slice(0, 4)),
        "Offensive Power": Number(predictionData?.att?.away?.slice(0, 2)),
        "Defensive Power": Number(predictionData?.def?.away?.slice(0, 2)),
        "Head-to-head Strength": Number(predictionData?.h2h?.away?.slice(0, 2)),
        "Head-to-head Goals": Number(predictionData?.goals?.away?.slice(0, 2)),
      },
    ];

    setData(processData(radarData));
    setMaxima(getMaxima(radarData));
  }, []);

  const getMaxima = (data) => {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  };

  const processData = (data) => {
    const maxByGroup = getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  };

  return (
    <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
      <VictoryLegend
        x={140}
        centerTitle
        orientation="horizontal"
        gutter={20}
        data={[
          {
            name: homeTeam,
            symbol: { fill: "green", type: "square" },
          },
          {
            name: awayTeam,
            symbol: { fill: "red", type: "square" },
          },
        ]}
      />
      <VictoryGroup
        colorScale={["green", "red"]}
        style={{ data: { fillOpacity: 0.3, strokeWidth: 2 } }}
      >
        {data.map((data, i) => {
          return (
            <VictoryArea
              key={i}
              data={data}
              //   animate={{
              //     duration: 1000,
              //     onLoad: { duration: 1000 },
              //   }}
            />
          );
        })}
      </VictoryGroup>
      {Object.keys(maxima).map((key, i) => {
        return (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: { padding: 15 },
              axis: { stroke: "none" },
              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
            }}
            tickLabelComponent={<VictoryLabel labelPlacement="perpendicular" />}
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => Math.ceil(t * 100)}
            tickValues={[0.25, 0.5, 0.75, 1]}
          />
        );
      })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 },
        }}
      />
    </VictoryChart>
  );
}

const styles = StyleSheet.create({});
