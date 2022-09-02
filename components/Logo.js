import React from "react";
import { Image } from "react-native-svg";

export default function Logo({ x, y, datum }) {
  return (
    <Image
      x={x - 10}
      y={y - 10}
      width="20"
      height="20"
      xlinkHref={datum.logo}
      //   xlinkHref="https://media.api-sports.io/football/teams/33.png"
    />
  );
}
