import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function LeagueAssists() {
  const leagueAssistsData = useSelector((state) => state.topAssistsData);
  //   console.log(leagueGoalsData[1].player.name);

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={[styles.header, { marginHorizontal: 10 }]}>
        <Text style={[styles.fontWeight]}>Player</Text>
        <Text style={[styles.fontWeight]}>Assists</Text>
      </View>

      <FlatList
        data={leagueAssistsData}
        ListFooterComponent={<View style={{ height: 50 }} />}
        renderItem={({ item }) => {
          return (
            <View style={[styles.header]}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.logo}
                  source={{ uri: item.player.photo, width: 40, height: 40 }}
                />

                <View style={{ alignItems: "flex-start" }}>
                  <Text style={styles.name}>{item.player.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.logo}
                      source={{
                        uri: item.statistics[0].team.logo,
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text style={styles.team}>
                      {item.statistics[0].team.name}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={{ marginRight: 10 }}>
                {item.statistics[0].goals.assists}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
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
    justifyContent: "space-between",
  },

  fontWeight: {
    fontWeight: "bold",
  },

  logo: {
    marginRight: 10,
  },

  name: {
    fontSize: 14,
    margin: 1,
    marginBottom: 3,
  },

  team: {
    fontSize: 13,
  },
});

//
