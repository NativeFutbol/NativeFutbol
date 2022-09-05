import React from "react";
import { Image } from "react-native-svg";

export default function Legend({ x, y, datum }) {
  return (
    <Image x={x - 8} y={y - 9} width="20" height="20" xlinkHref={datum.logo} />
  );
}
