import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import moment from "moment";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.13);

const GamesCard = ({ item, index }) => {
  const gameDate = new Date(item.fixture.date);

  return (
    <View style={styles.container} key={index}>
      <View style={{ alignItems: "center" }}>
        <Text>{gameDate.toDateString()}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text>Home</Text>
        <Text>Away</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 15,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: item.teams.home.logo }} style={styles.image} />
          <Text>{item.teams.home.name}</Text>
        </View>
        <Text>vs</Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: item.teams.away.logo }} style={styles.image} />
          <Text>{item.teams.away.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "70%",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});

export default GamesCard;
