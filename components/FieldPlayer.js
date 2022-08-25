import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function FieldPlayer(props) {
  const { player, position } = props;

  return (
    <View style={{ alignItems: "center" }}>
      {player ? (
        <Image
          source={{
            uri: player.player.photo,
          }}
          style={styles.image}
        />
      ) : (
        <FontAwesome5 name="tshirt" size={20} color={"white"} />
      )}
      <Text
        style={{
          backgroundColor: player ? "oreangered" : "black",
          color: "white",
          fontWeight: "bold",
          fontSize: 9,
          padding: 2,
          paddingHorizontal: 7,
        }}
      >
        {player ? player.player.name : position}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
  },
});
