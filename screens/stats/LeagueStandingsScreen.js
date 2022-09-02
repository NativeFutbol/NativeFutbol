import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function LeagueStandingsScreen() {
  const leagueStandingsData = useSelector((state) => state.standingsData);

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <View style={{ marginRight: 3, width: "5%" }}>
          <Text style={{ fontSize: 12 }}></Text>
        </View>
        <Image style={styles.logo} />
        <Text style={[styles.team, styles.fontWeight]}>Team</Text>
        <Text style={[styles.stat, styles.fontWeight]}>PL</Text>
        <Text style={[styles.stat, styles.fontWeight]}>W</Text>
        <Text style={[styles.stat, styles.fontWeight]}>D</Text>
        <Text style={[styles.stat, styles.fontWeight]}>L</Text>
        <Text style={[styles.stat, styles.fontWeight]}>GD</Text>
        <Text style={[styles.stat, styles.fontWeight]}>PTS</Text>
      </View>

      <FlatList
        data={leagueStandingsData}
        ListFooterComponent={<View style={{ height: 50 }} />}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.header}>
              <View style={{ marginRight: 3, width: "5%" }}>
                <Text style={{ fontSize: 12 }}>{index + 1}</Text>
              </View>
              <Image
                source={{ uri: item.team.logo, width: 50, height: 50 }}
                style={styles.logo}
              />
              <Text style={styles.team}>{item.team.name}</Text>
              <Text style={styles.stat}>{item.all.played}</Text>
              <Text style={styles.stat}>{item.all.win}</Text>
              <Text style={styles.stat}>{item.all.draw}</Text>
              <Text style={styles.stat}>{item.all.lose}</Text>
              <Text style={styles.stat}>{item.goalsDiff}</Text>
              <Text style={styles.stat}>{item.points}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    padding: 5,
    margin: 5,
  },

  fontWeight: {
    fontWeight: "bold",
  },

  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  team: {
    fontSize: 12,
    flex: 5,
  },

  stat: {
    fontSize: 12,
    flex: 1,
  },
});

//
