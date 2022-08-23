import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function FieldPlayer(props) {
  const { player, position } = props;

  return (
    <View style={{ alignItems: "center" }}>
      <FontAwesome5
        name="tshirt"
        size={35}
        color={player ? "orangered" : "white"}
      />
      <Text
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          fontSize: 12,
          padding: 2,
          paddingHorizontal: 7,
        }}
      >
        {player ? player.name : position}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
