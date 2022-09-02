import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.13);

const GamesCard = ({ item, index }) => {
  const gameDate = item.fixture.date ? new Date(item.fixture.date) : null;

  return (
    <View style={styles.container} key={index}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
          {gameDate ? gameDate.toDateString() : "Date"}
        </Text>
        <Text>{item.fixture.venue.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Home</Text>
        <Text style={{ fontWeight: "bold" }}>Away</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 15,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {item.teams.home.logo ? (
            <Image
              source={{ uri: item.teams.home.logo }}
              style={styles.image}
            />
          ) : (
            <></>
          )}
          <Text>{item.teams.home.name}</Text>
        </View>
        {item.goals.home === 0 || item.goals.home ? (
          <Text>
            {item.goals.home} : {item.goals.away}
          </Text>
        ) : (
          <Text>vs</Text>
        )}
        <View style={{ flexDirection: "row" }}>
          {item.goals.home === 0 || item.teams.away.logo ? (
            <Image
              source={{ uri: item.teams.away.logo }}
              style={styles.image}
            />
          ) : (
            <></>
          )}
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
