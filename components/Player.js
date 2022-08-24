import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

export default function Player({ player }) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: "white" }]}
      >
        <Image
          source={{
            uri: player.player.photo,
          }}
          style={styles.image}
        />
        <View style={{ flexGrow: 1 }}>
          <Text style={[styles.name, { marginVertical: 5 }]}>
            {player.player.name}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: player.statistics[0].team.logo,
                width: 20,
                height: 20,
              }}
            />
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {player.statistics[0].team.name}
            </Text>
          </View>
        </View>

        <View style={[styles.colContainer, { alignItems: "flex-end" }]}>
          <Text style={[styles.text, { marginVertical: 5 }]}>
            {player.player.nationality}
          </Text>
          <Text style={styles.text}>{player.statistics[0].games.position}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  colContainer: {
    marginHorizontal: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    margin: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 13,
  },
  text: {
    fontSize: 12,
  },
});
