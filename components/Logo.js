import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-svg";

export default function Logo({ x, y, datum }) {
  return (
    <Image
      x={x}
      y={y}
      width="10"
      height="10"
      xlinkHref={datum.logo}
      //   xlinkHref="https://media.api-sports.io/football/teams/33.png"
    />
  );
}
