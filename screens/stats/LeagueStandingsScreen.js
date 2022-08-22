import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

export default function LeagueStandingsScreen() {
  const leagueStandingsData = useSelector((state) => state.standingsData);

  // console.log(leagueStandingsData[0]);

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.header}>
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
        renderItem={({ item }) => {
          return (
            <View style={styles.header}>
              <Image source={item.team.logo} style={styles.logo} />
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
